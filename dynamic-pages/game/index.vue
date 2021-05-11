<template>

	<div class="game">

		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" />
			<game-header />
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="col-9">
					<div v-if="tab.show_rooms" class="game-rooms">
						<div class="game-filters">
							<div v-if="data.length" class="game-filters__info">Показано {{ total }} из {{ overall }} покер-румов</div>
							<div v-if="data.length" class="game-filters__geo">
								<geo-switcher :value="country.code" :geo.sync="geo" @change="fetchItems"/>
							</div>
						</div>

						<room v-if="data.length"
							v-for="(item, index) in data" :key="index"
							:id="item.id"
							:title="item.title"
							:slug="item.slug"
							:rating="item.rating"
							:rakeback="item.rakeback"
							:bonus="item.bonus"
							:background="item.background"
							:image="item.image"
							:restricted="item.restricted"
							:network="item.network"
							:tags="item.tags"
							:review="item.review"
						/>

						<pagination
							v-if="data.length"
							:last="last_page"
							:current="page"
							:prevUrl="prev_page_url"
							:nextUrl="next_page_url"
							:total="total"
							:from="from"
							:to="to"
							@next="handlePageNext"
							@prev="handlePagePrev"
							@change="handlePageChange"
							@more="handleShowMore">
						</pagination>
					</div>
					
					<div class="row">

						<div class="col-auto">
							<toc-list v-if="tab.toc">
								<template v-slot="{ inline }">
									<toc-item v-for="(item, index) in tab.toc" :key="index"
										:index="index"
										:inline="inline"
										:anchor="item.anchor_id"
										:text="item.text">
									</toc-item>
								</template>
							</toc-list>
						</div>

						<div class="col col-article">
							<!-- Article -->
							<page-article :text="tab.text">
								<template v-slot:footer>
									<!-- Faq -->
									<faq-list v-if="tab.faq && tab.faq.mainEntity.length" label="FAQ">
										<faq-item v-for="(item, index) in tab.faq.mainEntity" :key="index"
											:question="item.name"
											:answer="item.acceptedAnswer.text">
										</faq-item>
									</faq-list>
									<!-- Author -->
									<author v-if="tab.author" :author="tab.author"/>
									<!-- Comments -->
									<comments commentable_type="App\Tab" :commentable_id="tab.id"/>
								</template>
							</page-article>
						</div>

					</div>
				</div>

				<div class="col-3">
					<game-filters
						v-if="tab.show_rooms && filters"
						:geo="geo"
						:kycs="filters.kycs"
						:platforms="filters.platforms"
						:tags="filters.tags"
						:payments="filters.payments"
						:types="filters.types"
						:licenses="filters.licenses"
						@change="handleFilterChange"
					/>

					<room-top-list />
					<!-- <room-top-list v-sticky="{topSpacing: 100}" /> -->

					<topic-list v-if="tab.topics">
						<topic-item
							v-for="(item, index) in tab.topics" :key="index"
							:title="item.title"
							:url="item.url"
							:author="item.author"
							:created="item.created_at"
						/>
					</topic-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

import Pagination from '~/components/pagination/Pagination'
import Comments from '~/components/comments/Comments'
import Room from '~/components/cards/Room'

export default {

	name: 'GamePage',

	head () {
		return { 
			title: this.game.meta_title,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: this.game.meta_description },
				{ name: 'keywords', content: this.game.meta_keywords }
			],

			script: [{ type: 'application/ld+json', json: this.tab.faq }]
		}
	},

	components: {
		Pagination,
		Comments,
		Room
	},

	data: () => ({
		// loading: true,
		loading: false,
		per_page: 10,
		page: 1,
		sort: 'rating',
		order: 'desc',
		geo: null, 
		game_id: null,
		kyc: [],
		platforms: [],
		tags: [],
		payments: [],
		types: [],
		licenses: [],
		ids: [],
		data: [],
		from: 0,
		to: 0,
		next_page_url: null,
		prev_page_url: null,
		current_page: null,
		last_page: null,
		total: 0,
		overall: 0,
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			user: 'auth/user',
			pageable: 'pages/page',
			game: 'games/game',
			tab: 'games/tab',
			rooms: 'rooms/rooms',
			filters: 'games/filters'
		}),

		mediaUrl() {
			return process.env.mediaUrl
		},

		params() {
			return {
				per_page: this.per_page,
				page: this.page,
				sort: this.sort,
				order: this.order,
				query: this.query,
				locale: this.locale,
				game_id: this.game.id,
				geo: this.geo,
				kyc: this.kyc,
				platforms: this.platforms,
				tags: this.tags,
				payments: this.payments,
				types: this.types,
				licenses: this.licenses,
				ids: this.tab.list
			}
		}
	},

	async fetch() {

		await this.$axios.get(`games/${this.pageable.slug}`).then((response) => {
			this.$store.commit('games/FETCH_GAME', { game: response.data.game })
			this.$store.commit('games/FETCH_TAB', { tab: response.data.tab })
		})

		if (this.tab.show_rooms) {
			await this.$axios.get('rooms/list', {
				params: {
					geo: this.country.code,
					per_page: 10,
					sort: 'rating',
					order: 'desc',
					game_id: this.game.id,
					ids: this.tab.list
				}
			})
			.then((response) => {
				Object.keys(response.data).forEach(key => {
					this[key] = response.data[key]
				})
				this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
			})
			.catch((e) => {
			})

			await this.$axios.get(`/games/filters/list`, {
				params: {
					geo: this.country.code,
					game_id: this.game.id,
					ids: this.tab.list
				}
			}).then((response) => {
				this.$store.commit('games/FETCH_FILTERS', { filters: response.data })
			})
		}
	},

	created () {
		this.geo = this.country.code
	},

	watch: {

	},

	methods: {

		async fetchItems() {

			this.$nuxt.$loading.start()

			await this.$axios.get(`/games/filters/list`, {
				params: {
					geo: this.geo,
					game_id: this.game.id,
					ids: this.tab.list
				}
			}).then((response) => {
				this.$store.commit('games/FETCH_FILTERS', { filters: response.data })
			})

			await this.$axios.get(`rooms/list`, { params: this.params }).then((response) => {
				this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
				Object.keys(response.data).forEach(key => {
					this[key] = response.data[key]
				})
				this.loading = false
				this.$nuxt.$loading.finish()
			})
		},

		handlePageNext() {
			this.page = this.current_page + 1
			this.fetchItems()
		},

		handlePagePrev() {
			this.page = this.current_page - 1
			this.fetchItems()
		},

		handlePageChange(number) {
			this.page = number
			this.fetchItems()
			// history.replaceState({}, null, `${this.$route.path}/page/${number}`)
		},

		handleShowMore() {
			this.per_page = parseInt(this.per_page) + 6
			this.fetchItems()
		},

		handleSortChange(order) {
			this.sort = order
			this.fetchItems()
		},

		handleFilterChange(selected) {

			Object.keys(selected).forEach(key => {
				this[key] = selected[key]
			})
			this.fetchItems()
		}
	}
}
</script>

<style lang="scss">
.game-filters {
	margin-bottom: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__geo {
		margin-left: auto;
	}

	&__info {
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 16px;
		color: #222222;
	}
}

.game-rooms {
	margin-bottom: 40px;
	&__title {
		margin-bottom: 20px;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: -0.2px;
		color: #222222;
	}
}
</style>