<template>

	<div class="platform">

		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" />
			<platform-header />
		</div>

		<div class="container-fluid">

			<div class="row">
				<div class="col-9">
					<div class="platform-rooms">
						<div class="platform-filters">
							<div v-if="data.length" class="platform-filters__info">Показано {{ total }} из {{ overall }} покер-румов</div>
							<div v-if="data.length" class="platform-filters__geo">
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
							<toc-list v-if="platform.toc">
								<template v-slot="{ inline }">
									<toc-item v-for="(item, index) in platform.toc" :key="index"
										:index="index"
										:inline="inline"
										:anchor="item.anchor_id"
										:text="item.text">
									</toc-item>
								</template>
							</toc-list>
						</div>

						<div class="col">
								<!-- Article -->
								<page-article :text="platform.text">
									<template v-slot:footer>
										<!-- Faq -->
										<faq-list v-if="platform.faq && platform.faq.mainEntity.length" label="FAQ">
											<faq-item v-for="(item, index) in platform.faq.mainEntity" :key="index"
												:question="item.name"
												:answer="item.acceptedAnswer.text">
											</faq-item>
										</faq-list>
										<!-- Author -->
										<author v-if="platform.author" :author="platform.author" />
										<!-- Comments -->
										<comments commentable_type="App\PlatformTranslation" :commentable_id="pageable.pageable_id"
										/>
									</template>
								</page-article>
						</div>
					</div>
				</div>

				<div class="col-3">
					<platform-filters
						v-if="filters"
						:geo="geo"
						:kycs="filters.kycs"
						:tags="filters.tags"
						:payments="filters.payments"
						:types="filters.types"
						:licenses="filters.licenses"
						@change="handleFilterChange"
					/>

					<room-top-list />

					<topic-list v-if="platform.topics">
						<topic-item
							v-for="(item, index) in platform.topics" :key="index"
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
import Room from '~/components/cards/Room'

export default {

	name: 'PlatformPage',

	head () {
		return { 
			title: this.platform.meta_title,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: this.platform.meta_description },
				{ name: 'keywords', content: this.platform.meta_keywords }
			],
		}
	},

	components: {
		Pagination,
		Room
	},

	data: () => ({
		loading: false,
		per_page: 10,
		page: 1,
		sort: 'rating',
		order: 'desc',
		geo: null, 
		game_id: null,
		kyc: [],
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
		overall: 0
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			user: 'auth/user',
			pageable: 'pages/page',
			platform: 'platforms/platform',
			rooms: 'rooms/rooms',
			filters: 'platforms/filters'
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
				platform_id: this.platform.id,
				geo: this.geo,
				kyc: this.kyc,
				tags: this.tags,
				payments: this.payments,
				types: this.types,
				licenses: this.licenses,
				ids: this.platform.list
			}
		}
	},

	async fetch() {

		await axios.get(`platforms/${this.pageable.slug}`).then((response) => {
			this.$store.commit('platforms/FETCH_PLATFORM', { platform: {
				id: response.data.id,
				title: response.data.title,
				heading: response.data.heading,
				summary: response.data.summary,
				toc: response.data.toc,
				text: response.data.text,
				icon: response.data.icon,
				created_at: response.data.created_at,
				updated_at: response.data.updated_at,
				topics: response.data.topics.map(this.mapTopics),
		meta_title: response.data.meta_title,
		meta_description: response.data.meta_description,
		meta_keywords: response.data.meta_keywords,
		author: {
			username: response.data.author.username,
			full_name: response.data.author.full_name,
			image: response.data.author.image ? {
				filename: response.data.author.image.filename
			} : null,
		},
			} })
		})

		await axios.get('rooms/list', {
			params: {
				geo: this.country.code,
				per_page: 10,
				sort: 'rating',
				order: 'desc',
				platform_id: this.platform.id,
				ids: this.platform.list
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

		await axios.get(`/platforms/filters/list`, {
			params: {
				geo: this.country.code,
				platform_id: this.platform.id,
				ids: this.platform.list
			}
		}).then((response) => {
			this.$store.commit('platforms/FETCH_FILTERS', { filters: response.data })
		})

	},

	created () {
		this.geo = this.country.code
	},

	watch: {

	},

	methods: {

		async fetchItems() {

			this.$nuxt.$loading.start()

			await axios.get(`/platforms/filters/list`, {
				params: this.params
			}).then((response) => {
				this.$store.commit('platforms/FETCH_FILTERS', { filters: response.data })
			})

			await axios.get('rooms/list', { params: this.params }).then((response) => {
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
		},

		mapTopics(item) {
			return ({
				title: item.title,
				url: item.url,
				created_at: item.created_at,
		author: {
			username: item.author.username,
			full_name: item.author.full_name,
			image: item.author.image ? {
				filename: item.author.image.filename
			} : null,
		}
			})
		}
	}
}
</script>

<style lang="scss">
.platform-filters {
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

.platform-rooms {
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