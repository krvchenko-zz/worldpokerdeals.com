<template>
	<div class="rooms">

		<!-- Header -->
		<room-category-header />

		<div class="container-fluid">
			<div class="row">
				<div class="col-9">
        <client-only>

          <filter-header v-if="rooms"
            :geo.sync="geo"
            :sort.sync="sort"
            :total.sync="total"
            :overall.sync="overall"
            :sort-options="sortOptions"
            entity-label="покер-румов"
            @update:sort="fetchItems"
            @update:geo="fetchItems"
          />

          <filter-selected-list v-if="selected.length">
            <filter-selected v-for="(item, index) in selected" :key="index"
              :label="item.label"
              :value="item.value"
              :item-key="item.key"
            />
            <filter-selected
              label="Очистить фильтры"
              :clear="true"
              :value="null"
              :key="null"
            />
          </filter-selected-list>

        </client-only>

					<div class="rooms-list">

						<template v-if="rooms" v-for="(item, index) in rooms">
							<room
								:key="index"
								:id="item.id"
								:title="item.title"
								:slug="item.slug"
								:rating="item.rating"
								:rakeback="item.rakeback"
								:bonus="item.bonus"
								:background="item.background"
								:restricted="item.restricted"
								:available="item.available"
								:blacklist="item.blacklist"
								:summary="item.summary"
								:claim_amount="item.claim_amount"
								:claim_currency="item.claim_currency"
								:image="item.image"
								:network="item.network"
								:tags="item.tags"
								:review="item.review"
							/>
							<room-category-banner :key="index + 6" v-if="index > 3 && index < 5" />
						</template>

						<pagination
							v-if="rooms.length"
							:query="true"
							:last="last_page"
							:current="parseInt(page)"
							:prev-url="prev_page_url"
							:next-url="next_page_url"
							:total="total"
							:from="from"
							:to="to"
							:load-more-width="208"
							load-more-text="Показать еще румы"
							total-text="покер-румов"
							@next="handlePageNext"
							@prev="handlePagePrev"
							@change="handlePageChange"
							@more="handleShowMore">
						</pagination>
					</div>

					<div class="row">
						<!-- Toc -->
						<div class="col-auto">

							<toc-list v-if="category.toc">
								<template v-slot="{ inline }">
									<toc-item v-for="(item, index) in category.toc" :key="index"
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
							<page-article :title="false" :text="category.text">

								<template v-slot:footer>
									<!-- Faq -->
									<faq-list v-if="category.faq && category.faq.mainEntity.length" label="FAQ">
										<faq-item v-for="(item, index) in category.faq.mainEntity" :key="index"
											:question="item.name"
											:answer="item.acceptedAnswer.text">
										</faq-item>
									</faq-list>
									
									<!-- Author -->
									<author v-if="category.author" :author="category.author" />

									<!-- Comments -->
									<comments commentable_type="App\RoomCategory" :commentable_id="category.id"/>
								</template>

							</page-article>
						</div>
					</div>
				</div>

				<div class="col-3">

					<room-category-filters
						v-if="filters"
						:kycs="filters.kycs"
						:platforms="filters.platforms"
						:tags="filters.tags"
						:payments="filters.payments"
						:types="filters.types"
						:networks="filters.networks"
						:licenses="filters.licenses"
						:limits="filters.limits"
						:disciplines="filters.disciplines"
						:games="filters.games"
						:huds="filters.huds"
						:certificates="filters.certificates"
						@change="handleFilterChange"
						@filterOpen="handleFilterOpen"
					/>

					<div class="block-title">Последние акции</div>

					<promotion-item
						v-if="promotions"
						v-for="(item, index) in promotions" :key="index"
						:image="item.image"
						:title="item.title"
						:summary="item.summary"
						:page="item.page"
						:author="item.author"
						:created="item.created_at"
						:category="item.category"
						:time_left="item.time_left"
						:time_before="item.time_before"
						:prize="item.prize"
						:currency="item.currency ? item.currency.symbol: '$'"
						:exclusive="item.exclusive"
					></promotion-item>

					<topic-list v-if="category.topics.length">
						<topic-item
							v-for="(item, index) in category.topics" :key="index"
							:title="item.title"
							:url="item.url"
							:author="item.author"
							:created="item.created_at"
						/>
					</topic-list>

					<game-search-banner />

				</div>

			</div>

		</div>

		<page-banners />
		
	</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

import Room from '~/components/cards/Room'

export default {

	name: 'RoomCategory',

	head () {
		return { 
			title: this.category.meta_title,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: this.category.meta_description },
				{ name: 'keywords', content: this.category.meta_keywords }
			],
		}
	},

	components: {
		Room
	},

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			user: 'auth/user',
			pageable: 'pages/page',
			category: 'rooms/category',
			rooms: 'rooms/rooms',
			best: 'rooms/best',
			filters: 'rooms/filters',
			promotions: 'promotions/items'
		}),

		params() {

			return {
				per_page: this.per_page,
				page: this.page,
				sort: this.sort,
				order: this.order,
				query: this.query,
				locale: this.locale,
				geo: this.geo,
				room_category_id: this.category.id,
				ids: this.category.list,
				types: this.types,
				payments: this.payments,
				platforms: this.platforms,
				licenses: this.licenses,
				tags: this.tags,
				currencies: this.currencies,
				disciplines: this.disciplines,
				limits: this.limits,
				games: this.games,
				networks: this.networks,
				certificates: this.certificates,
				categories: this.categories,
				hud: this.hud,
				kyc: this.kyc
			}
		}
	},

	data: () => ({
		loading: false,
		per_page: 10,
		page: 1,
		sort: 'rating',
		order: 'desc',
		geo: null,
		types: [],
		payments: [],
		platforms: [],
		licenses: [],
		tags: [],
		currencies: [],
		disciplines: [],
		limits: [],
		games: [],
		networks: [],
		certificates: [],
		categories: [],
		hud: [],
		kyc: null,
		ids: null,
		data: [],
		from: 0,
		to: 0,
		next_page_url: null,
		prev_page_url: null,
		current_page: null,
		last_page: null,
		total: 0,
		overall: 0,
		countries: [],
    selected: [],
    sortOptions: [{
      label: 'Сначала лучшие',
      value: 'rating'
    },{
      label: 'Сначала новые',
      value: 'created_at'
    }]
	}),

	async fetch() {
		await axios.get(`rooms/category/${this.pageable.slug}`).then((response) => {
			this.$store.commit('rooms/FETCH_ROOM_CATEGORY', {
				category: {
					id: response.data.item.id,
					title: response.data.item.title,
					icon: response.data.item.icon,
					author: {
						full_name: response.data.item.author.full_name,
						image: {
							filename: response.data.item.author.image.filename
						}
					},
					created_at: response.data.item.created_at,
					updated_at: response.data.item.updated_at,
					summary: response.data.item.summary,
					text: response.data.item.text,
					faq: response.data.item.faq,
					toc: response.data.item.toc,
					topics: response.data.item.topics,
					list: response.data.item.list,
					meta_title: response.data.item.meta_title,
					meta_description: response.data.item.meta_description,
					meta_keywords: response.data.item.meta_keywords
				}
			})

			this.$store.commit('rooms/FETCH_BEST', { best: response.data.best })
		})

		await axios.get(`rooms/list`, { params: this.params }).then((response) => {
			this.$store.commit('rooms/FETCH_ROOMS', {
				rooms: response.data.data.map(item => ({
					id: item.id,
					title: item.title,
					slug: item.slug,
					rating: item.rating,
					rakeback: item.rakeback,
					bonus: item.bonus,
					background: item.background,
					restricted: item.restricted,
					available: item.available,
					blacklist: item.blacklist,
					summary: item.summary,
					claim_amount: item.claim_amount,
					claim_currency: item.claim_currency ? {
						code: item.claim_currency.code,
						symbol: item.claim_currency.symbol
					}: null,
					image: {
						filename: item.image.filename
					},
					network: {
						title: item.network.title
					},
					tags: item.tags.map(tag => ({
						title: tag.title
					})),
					review: item.review,
				}))
			})

			Object.keys(response.data).forEach(key => {
				if (key !== 'data') {
					this[key] = response.data[key]
				}
			})
		})

		await axios.get(`rooms/category/list`).then((response) => {
			this.$store.commit('rooms/FETCH_ROOM_CATEGORIES', { categories: response.data })
		})
		
		await axios.get(`/rooms/filters/list`, {
			params: {
				geo: this.country.code,
				ids: this.category.list,
				room_category_id: this.category.id
			}
		}).then((response) => {
			this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
		})

		await axios.get(`promotion/latest`, {
			params: {
				type: 'promotion',
				per_page: 3
			}
		}).then((response) => {
			this.$store.commit('promotions/FETCH_ITEMS', { items: response.data })
		})

	},

	created() {
		this.geo = this.country.code
	},

	mounted () {
		this.geo = this.country.code
	},

	watch: {
		'$route.query': 'fetchItems'
	},

	methods: {

    handleFilterChange(selected) {
      this.selected = selected.flatten
      Object.keys(selected.values).forEach(key => {
        this[key] = selected.values[key]
      })
      this.fetchItems()
    },

		async fetchItems(query) {

			this.$nuxt.$loading.start()

			if (query) {
				this.page = query.page
			}

			// await axios.get(`/rooms/filters/list`, {
			//   params: {
			//     geo: this.geo,
			//     room_category_id: this.category.id
			//   }
			// }).then((response) => {
			//   this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
			// })

			await axios.get(`rooms/list`, { params: this.params }).then((response) => {
				this.$store.commit('rooms/FETCH_ROOMS', {
					rooms: response.data.data.map(item => ({
						id: item.id,
						title: item.title,
						slug: item.slug,
						rating: item.rating,
						rakeback: item.rakeback,
						bonus: item.bonus,
						background: item.background,
						restricted: item.restricted,
						available: item.available,
						blacklist: item.blacklist,
						summary: item.summary,
						claim_amount: item.claim_amount,
						claim_currency: item.claim_currency ? {
							code: item.claim_currency.code,
							symbol: item.claim_currency.symbol
						}: null,
						image: {
							filename: item.image.filename
						},
						network: {
							title: item.network.title
						},
						tags: item.tags.map(tag => ({
							title: tag.title
						})),
						review: item.review,
					}))
				})
				Object.keys(response.data).forEach(key => {
					if (key !== 'data') {
						this[key] = response.data[key]
					}
				})
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

		handleFilterOpen() {

		}

	}

}
</script>

<style lang="scss">

.rooms-top {
	margin-bottom: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__geo {
		margin-left: auto;
		margin-right: 24px;
		&-label {
			margin-right: 16px;
			display: inline-flex;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 16px;
			color: #333333;
		}
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
</style>