<template>
	<div class="rooms">
		<!-- Header -->
		<room-category-header />

		<div class="rooms__catalog">
			<client-only>
				<filter-header
					v-if="!category.is_blacklist"
					class="rooms__filter-header"
					:geo.sync="geo"
					:sort.sync="sort"
					:total.sync="total"
					:overall.sync="overall"
					:sort-options="sortOptions"
					entity-label="покер-румов"
					@update:sort="fetchItems"
					@update:geo="fetchItems"
				/>

				<filter-selected-list
					v-if="selected.length && !category.is_blacklist"
					class="rooms__filter-selected"
				>
					<filter-selected
						v-for="(item, index) in selected"
						:key="index"
						:label="item.label"
						:value="item.value"
						:item-key="item.key"
					/>
					<filter-selected
						:key="null"
						label="Очистить фильтры"
						:clear="true"
						:value="null"
					/>
				</filter-selected-list>
			</client-only>

			<div class="rooms-list">
				<template v-for="(item, index) in items">
					<room
						v-if="!item.banner"
						:id="item.id"
						:key="index"
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

					<room-category-banner v-else :key="index" />
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
					@more="handleShowMore"
				>
				</pagination>
			</div>

			<div class="rooms__toc">
				<toc-list v-if="category.toc">
					<template #default="{ inline }">
						<toc-item
							v-for="(item, index) in category.toc"
							:key="index"
							:index="index"
							:inline="inline"
							:anchor="item.anchor_id"
							:text="item.text"
						>
						</toc-item>
					</template>
				</toc-list>
			</div>

			<div class="rooms__info">
				<page-article :title="false" :text="category.text">
					<template #footer>
						<faq-list
							v-if="category.faq && category.faq.mainEntity.length"
							label="FAQ"
						>
							<faq-item
								v-for="(item, index) in category.faq.mainEntity"
								:key="index"
								:question="item.name"
								:answer="item.acceptedAnswer.text"
							>
							</faq-item>
						</faq-list>

						<author v-if="category.author" :author="category.author" />

						<comments
							commentable_type="App\RoomCategory"
							:commentable_id="category.id"
						/>
					</template>
				</page-article>
			</div>

			<div class="rooms__category-filters">
				<room-category-filters
					v-if="filters && !category.is_blacklist"
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

				<div v-if="!category.is_blacklist" class="block-title">
					Последние акции
				</div>

				<promotion-item
					v-for="(item, index) in promotions"
					v-if="promotions && !category.is_blacklist"
					:key="index"
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
					:currency="item.currency ? item.currency.symbol : '$'"
					:exclusive="item.exclusive"
				></promotion-item>

				<topic-list v-if="category.topics.length">
					<topic-item
						v-for="(item, index) in category.topics"
						:key="index"
						:title="item.title"
						:url="item.url"
						:author="item.author"
						:created="item.created_at"
					/>
				</topic-list>

				<game-search-banner />
			</div>
		</div>
		<div class="rooms__page-banners">
			<page-banners />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomCategory',

		components: {},

		head() {
			return {
				title: this.category.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category.meta_description },
					{ name: 'keywords', content: this.category.meta_keywords },
				],

				script: [{ type: 'application/ld+json', json: this.category.faq }],
			}
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
				promotions: 'promotions/items',
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
					kyc: this.kyc,
				}
			},

			items() {
				return [
					...this.rooms.slice(0, this.rooms.length / 2),
					{ banner: true },
					...this.rooms.slice(this.rooms.length / 2, this.rooms.length),
				]
			},
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
			sortOptions: [
				{
					label: 'Сначала лучшие',
					value: 'rating',
				},
				{
					label: 'Сначала новые',
					value: 'created_at',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get(`rooms/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOM_CATEGORY', {
						category: {
							id: response.data.item.id,
							title: response.data.item.title,
							icon: response.data.item.icon,
							author: {
								full_name: response.data.item.author.full_name,
								image: {
									filename: response.data.item.author.image.filename,
								},
							},
							created_at: response.data.item.created_at,
							updated_at: response.data.item.updated_at,
							summary: response.data.item.summary,
							text: response.data.item.text,
							is_blacklist: response.data.item.is_blacklist,
							faq: response.data.item.faq,
							toc: response.data.item.toc,
							topics: response.data.item.topics,
							meta_title: response.data.item.meta_title,
							meta_description: response.data.item.meta_description,
							meta_keywords: response.data.item.meta_keywords,
						},
					})

					this.$store.commit('rooms/FETCH_BEST', { best: response.data.best })
				})

			await this.$axios
				.get(`rooms/list`, { params: this.params })
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })

					Object.keys(response.data).forEach(key => {
						if (key !== 'data') {
							this[key] = response.data[key]
						}
					})
				})

			await this.$axios.get(`rooms/category/list`).then(response => {
				this.$store.commit('rooms/FETCH_ROOM_CATEGORIES', {
					categories: response.data,
				})
			})

			await this.$axios
				.get(`/rooms/filters/list`, {
					params: {
						geo: this.country.code,
						ids: this.category.list,
						room_category_id: this.category.id,
					},
				})
				.then(response => {
					this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
				})

			await this.$axios
				.get(`promotion/latest`, {
					params: {
						type: 'promotion',
						per_page: 3,
					},
				})
				.then(response => {
					this.$store.commit('promotions/FETCH_ITEMS', { items: response.data })
				})
		},

		watch: {
			'$route.query': 'fetchItems',
		},

		created() {
			this.geo = this.country.code
		},

		mounted() {
			this.geo = this.country.code
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

				// await this.$axios.get(`/rooms/filters/list`, {
				//   params: {
				//     geo: this.geo,
				//     room_category_id: this.category.id
				//   }
				// }).then((response) => {
				//   this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
				// })

				await this.$axios
					.get(`rooms/list`, { params: this.params })
					.then(response => {
						this.$store.commit('rooms/FETCH_ROOMS', {
							rooms: response.data.data,
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
			},

			handleShowMore() {
				this.per_page = parseInt(this.per_page) + 6
				this.fetchItems()
			},

			handleSortChange(order) {
				this.sort = order
				this.fetchItems()
			},

			handleFilterOpen() {},
		},
	}
</script>

<style lang="scss">
	.rooms {
		max-width: 100%;
		&__catalog {
			display: grid;
			grid-template-columns: [left-part] 2fr [central-part] minmax(0, 7fr) [right-part] 3fr;
			column-gap: 28px;
			grid-template-areas:
				'filter filter category-filter'
				'selected selected category-filter'
				'rooms-list rooms-list category-filter'
				'toc info category-filter';
			@include paddings('desktop');
			max-width: 1440px;
		}
		&__filter-header {
			grid-area: filter;
		}
		&__filter-selected {
			grid-area: selected;
		}
		&__category-filters {
			grid-area: category-filter;
		}
		&__toc {
			grid-area: toc;
		}
		&__info {
			grid-area: info;
		}
		&__page-banners {
			padding-left: 26px;
		}
	}

	.rooms-list {
		grid-area: rooms-list;
	}

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

	@include mq('laptop') {
		.rooms {
			&__catalog {
				@include paddings('laptop');
				grid-template-columns: 100%;
				grid-template-areas:
					'filter'
					'rooms-list'
					'toc'
					'info';
			}
			&__category-filters {
				display: none;
			}
			&__page-banners {
				padding-left: 24px;
			}
		}
	}

	@include mq('tablet') {
		.rooms {
			&__catalog {
				@include paddings('tablet');
			}
			&__page-banners {
				padding-left: 20px;
			}
		}
		.rooms-list {
			margin-left: -25px;
			margin-right: -24px;
		}
	}

	@include mq('mobile') {
		.rooms {
			&__catalog {
				@include paddings('mobile');
			}
		}
		.rooms-list {
			margin-left: -21px;
			margin-right: -20px;
		}
	}
</style>
