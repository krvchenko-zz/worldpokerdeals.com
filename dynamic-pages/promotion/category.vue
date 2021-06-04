<template>
	<div class="promotions">
		<!-- Header -->
		<promotion-category-header class="promotions__header" />

		<nav-list class="promotions__nav">
			<nav-item
				v-for="(item, index) in navs"
				:key="index"
				:name="item.label"
				:page="item.page"
				:icon="item.icon"
			/>
		</nav-list>

		<div class="promotions__filter">
			<client-only>
				<filter-header
					v-if="items"
					:geo.sync="geo"
					:sort.sync="sort"
					:total.sync="total"
					:overall.sync="overall"
					:sort-options="sortOptions"
					entity-label="акций"
					@update:sort="fetchItems"
					@update:geo="fetchItems"
				/>

				<filter-selected-list v-if="selected.length">
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
		</div>

		<!-- List -->
		<template v-if="category.entity === 'promotion'">
			<promotion-list v-if="!loading && data.length" class="promotions__list">
				<promotion-item
					v-for="(item, index) in data"
					:key="index"
					:image="item.image"
					:title="item.title"
					:summary="item.summary"
					:page="item.page"
					:author="item.user"
					:created="item.created_at"
					:category="item.category"
					:time_left="item.time_left"
					:time_before="item.time_before"
					:regularity="item.regularity"
					:prize="item.prize"
					:currency="item.currency ? item.currency.symbol : ''"
					:exclusive="item.exclusive"
					:active="item.active"
				></promotion-item>
			</promotion-list>
		</template>

		<template v-else>
			<bonus-list v-if="!loading && data.length" class="promotions__list">
				<bonus-item
					v-for="(item, index) in data"
					:key="index"
					:title="item.title"
					:slug="item.slug"
					:created="item.created_at"
					:code="item.code"
					:terms="item.terms"
					:room="item.room"
					:page="item.page"
					:category="item.category"
					:min_deposit="item.min_deposit"
					:min_deposit_currency="item.min_deposit_currency"
					:cashback_value="item.cashback_value"
					:max_bonus="item.max_bonus"
					:max_bonus_currency="item.max_bonus_currency"
					:deposit_bonus="item.deposit_bonus"
					:index="index"
				></bonus-item>
			</bonus-list>
		</template>

		<!-- Pagination -->
		<pagination
			v-if="data.length"
			:last="last_page"
			:current="page"
			:prev-url="prev_page_url"
			:next-url="next_page_url"
			:total="total"
			:from="from"
			:to="to"
			:load-more-width="208"
			:load-more-text="
				category.entity === 'promotion'
					? 'Показать еще акции'
					: 'Показать еще бонусы'
			"
			total-text="акций"
			@next="handlePageNext"
			@prev="handlePagePrev"
			@change="handlePageChange"
			@more="handleShowMore"
			class="promotions__pagination"
		>
		</pagination>

		<!-- Toc -->
		<div class="promotions__toc">
			<toc-list v-if="category.toc && category.toc.length">
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

		<!-- Article -->
		<page-article
			:meta="false"
			:text="category.text"
			:author="category.author ? category.author.full_name : null"
			:created="category.created_at"
			:updated="category.updated_at"
			class="promotions__article"
		>
			<template #footer>
				<!-- Faq -->
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

				<!-- Author -->
				<author v-if="category.author" :author="category.author" />

				<!-- Comments -->
				<comments
					commentable_type="App\PromotionCategory"
					:commentable_id="category.id"
				/>
			</template>
		</page-article>

		<div class="promotions__aside">
			<client-only>
				<promotion-category-filters
					v-if="filters"
					:geo="geo"
					:categories="filters.categories"
					:disciplines="filters.disciplines"
					:limits="filters.limits"
					:games="filters.games"
					:rooms="filters.rooms"
					:networks="filters.networks"
					:exclusive="filters.exclusive"
					@change="handleFilterChange"
				/>
			</client-only>
			<room-top-list v-if="category.entity === 'promotion'" />

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
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'PromotionCategoryPage',

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
				category: 'promotions/category',
				navs: 'promotions/categories',
				items: 'promotions/items',
				filters: 'promotions/filters',
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
					exclusive: this.exclusive,
					promotion_category_id: this.category.id,
					categories: this.categories,
					disciplines: this.disciplines,
					limits: this.limits,
					games: this.games,
					rooms: this.rooms,
					networks: this.networks,
				}
			},
		},

		data: () => ({
			loading: false,
			per_page: 9,
			page: 1,
			sort: 'created_at',
			order: 'desc',
			exclusive: null,
			geo: null,
			disciplines: [],
			limits: [],
			games: [],
			rooms: [],
			categoies: [],
			networks: [],
			data: [],
			from: 0,
			to: 0,
			next_page_url: null,
			prev_page_url: null,
			current_page: null,
			last_page: null,
			total: 0,
			overall: 0,
			entity: 'promotion',
			selected: [],
			sortOptions: [
				{
					label: 'Сначала новые',
					value: 'created_at',
				},
				{
					label: 'Сначала эксклюзивные',
					value: 'exclusive',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get(`promotion/category/${this.pageable.slug}`, {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('promotions/FETCH_CATEGORY', {
						category: response.data,
					})
				})

			await this.$axios
				.get(`promotion/list`, { params: this.params })
				.then(response => {
					this.$store.commit('promotions/FETCH_ITEMS', {
						items: response.data.data,
					})
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
				})

			await this.$axios.get(`promotion/category/list`).then(response => {
				this.$store.commit('promotions/FETCH_CATEGORIES', {
					categories: response.data,
				})
			})

			await this.$axios
				.get(`/promotion/filters/list`, {
					params: {
						geo: this.country.code,
						type: this.category.entity,
						exclusive: null,
						promotion_category_id: this.category.id,
					},
				})
				.then(response => {
					this.$store.commit('promotions/FETCH_FILTERS', {
						filters: response.data,
					})
				})
		},

		watch: {},

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

			async fetchItems() {
				this.$nuxt.$loading.start()

				// await this.$axios.get(`/promotion/filters/list`, {
				//   params: {
				//     geo: this.geo,
				//     type: this.category.entity,
				//     exclusive: this.exclusive,
				//     promotion_category_id: this.category.id
				//   }
				// }).then((response) => {
				//   this.$store.commit('promotions/FETCH_FILTERS', { filters: response.data })
				// })

				await this.$axios
					.get(`promotion/list`, { params: this.params })
					.then(response => {
						this.$store.commit('promotions/FETCH_ITEMS', {
							items: response.data.data,
						})
						Object.keys(response.data).forEach(key => {
							this[key] = response.data[key]
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
		},
	}
</script>

<style lang="scss">
	.promotions {
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		column-gap: 28px;
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		grid-template-areas:
			'header header header'
			'nav nav nav'
			'filter filter aside'
			'list list aside'
			'pagination pagination aside'
			'toc article aside';
		&__nav {
			grid-area: nav;
			margin-top: -26px;
			margin-bottom: 32px;
		}
		&__header {
			grid-area: header;
		}
		&__filter {
			grid-area: filter;
		}
		&__article {
			grid-area: article;
		}
		&__list {
			grid-area: list;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 28px;
		}
		&__pagination {
			grid-area: pagination;
		}
		&__toc {
			grid-area: toc;
		}
		&__aside {
			grid-area: aside;
		}
	}

	@include mq('laptop') {
		.promotions {
			@include paddings('tablet');
			grid-template-columns: 100%;
			grid-template-areas:
				'header'
				'nav'
				'filter'
				'list'
				'pagination'
				'toc'
				'article'
				'aside';
		}
	}

	@include mq('tablet') {
		.promotions {
			@include paddings('mobile');
			&__list {
				grid-template-columns: 100%;
			}
		}
	}
</style>
