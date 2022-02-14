<template>
	<div class="promotions-page">
		<div class="promotions">
			<!-- Header -->
			<category-header
				class="promotions__header"
				:meta="true"
				:loading="$fetchState.pending"
				:title="pageable.title"
				:author="
						pageable.author
					? pageable.author.full_name
					: null
				"
				:created="pageable.created_at"
				:updated="pageable.updated_at"
				:summary="pageable.summary"
				:icon="
						pageable.pageable.entity === 'promotion'
					? 'promotion-category' 
					: 'bonus-category'
				"
				background-url="promotions-bg.jpg"
			>
				<template #breadcrumbs>
					<breadcrumb-list
						class="promotions-header__breadcrumbs"
						:white="true"
					/>
				</template>

				<template v-if="category.entity === 'bonus'" #promotion>
					<room-top
						v-if="best && !$fetchState.pending"
						:id="best.id"
						:title="best.title"
						:slug="best.slug"
						:url="best.url"
						:restricted="best.restricted"
						:country="country"
						:rating="best.rating"
						:bonus="best.top_bonus"
						:review="best.review"
						:label="$t('bonus_best')"
					/>
					<skeleton-top-room
						v-else
						class="promotions-header__room-top"
						:label="$t('room_best')"
					/>
				</template>
				<template v-else #promotion>
					<promotion-item
						v-if="category.promotion && category.entity === 'promotion'"
						:image="category.promotion.image"
						:title="category.promotion.page.title"
						:summary="category.promotion.summary"
						:page="category.promotion.page"
						:author="category.promotion.page.author"
						:created="category.promotion.created_at"
						:category="category.promotion.category"
						:time_left="category.promotion.time_left"
						:time_before="category.promotion.time_before"
						:regularity="category.promotion.regularity"
						:prize="category.promotion.prize"
						:currency="
							category.promotion.currency
								? category.promotion.currency.symbol
								: ''
						"
						:exclusive="category.promotion.exclusive"
						:active="category.promotion.active"
						:featured="true"
					/>
				</template>
			</category-header>

			<nav-list class="promotions__nav">
				<nav-item
					v-for="(item, index) in navs"
					:key="index"
					:name="item.label"
					:page="item.page"
					:icon="item.icon"
				/>
			</nav-list>

			<div class="promotions__container">
				<div class="promotions__filter">
					<client-only>
						<filter-header
							v-if="items"
							:geo.sync="geo"
							:sort.sync="sort"
							:total.sync="total"
							:overall.sync="overall"
							:sort-options="sortOptions"
							:entity-label="
								category.entity === 'promotion' ?
								$t('promotions_entity_label') :
								$t('bonuses_entity_label')
							"
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
								:label="$t('clear_filters')"
								:clear="true"
								:value="null"
							/>
						</filter-selected-list>
					</client-only>
				</div>

				<!-- List -->
				<template v-if="category.entity === 'promotion'">
					<promotion-list v-if="$fetchState.pending" class="promotions__list">
						<skeleton-promotion
							v-for="(item, index) in parseInt(per_page)"
							:key="index"
						/>
					</promotion-list>
					<promotion-list v-else class="promotions__list">
						<promotion-item
							v-for="(item, index) in data"
							:key="index"
							:image="item.image"
							:title="item.page.title"
							:summary="item.page.summary"
							:page="item.page"
							:author="item.page.author"
							:created="item.page.created_at"
							:category="item.category"
							:time_left="item.time_left"
							:time_before="item.time_before"
							:regularity="item.regularity"
							:prize="item.prize"
							:currency="item.currency ? item.currency.symbol : ''"
							:exclusive="item.exclusive"
							:active="item.active"
						/>
					</promotion-list>

				</template>

				<template v-else>
					<bonus-list
						v-if="!loading && data.length"
						class="promotions__bonus-list"
					>
						<skeleton-bonus />
						<bonus-item
							v-for="(item, index) in data"
							:key="index"
							:title="item.page.title"
							:slug="item.page.slug"
							:url="item.url"
							:created="item.page.created_at"
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
							:has-page="item.has_page"
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
					:show-pages="false"
					:load-more-width="208"
					:load-more-text="$t('show_more')"
					:total-text="
						category.entity === 'promotion' ?
						$t('promotions_entity_label') :
						$t('bonuses_entity_label')
					"
					@next="handlePageNext"
					@prev="handlePagePrev"
					@change="handlePageChange"
					@more="handleShowMore"
					class="promotions__pagination"
				>
				</pagination>

				<!-- Toc -->
				<div class="promotions__toc">
					<toc-list v-if="pageable.toc && pageable.toc.length">
						<template #default="{ inline }">
							<toc-item
								v-for="(item, index) in pageable.toc"
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
					:text="pageable.text"
					:author="pageable.author ? pageable.author.full_name : null"
					:created="pageable.created_at"
					:updated="pageable.updated_at"
					class="promotions__article"
				>
					<template #footer>
						<!-- Faq -->
						<faq-list
							v-if="pageable.faq && pageable.faq.mainEntity.length"
							:label="$t('faq')"
						>
							<faq-item
								v-for="(item, index) in pageable.faq.mainEntity"
								:key="index"
								:question="item.name"
								:answer="item.acceptedAnswer.text"
							>
							</faq-item>
						</faq-list>

						<!-- Author -->
						<author v-if="pageable.author" :author="pageable.author" />

						<!-- Comments -->
					</template>
				</page-article>
			</div>

			<aside class="promotions__aside">
				<client-only>
					<div
						v-if="filters"
						class="filters__wrapper"
						:class="{ 'filters__wrapper--opened': showFilter }"
						@click.self="handleOutsideClick($event)"
					>
						<promotion-category-filters
							:geo.sync="geo"
							:categories="filters.categories"
							:disciplines="filters.disciplines"
							:limits="filters.limits"
							:games="filters.games"
							:rooms="filters.rooms"
							:networks="filters.networks"
							:exclusive="filters.exclusive"
							@change="handleFilterChange"
							@update:geo="fetchItems"
						/>
					</div>
				</client-only>
				<room-top-list v-if="category.entity === 'promotion'" />

				<topic-list v-if="pageable.topics.length">
					<topic-item
						v-for="(item, index) in pageable.topics"
						:key="index"
						:title="item.title"
						:url="item.url"
						:author="item.author"
						:created="item.created_at"
					/>
				</topic-list>

				<game-search-banner />
			</aside>
		</div>

		<page-banners v-if="category.entity === 'bonus'" class="promotions__page-banners" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import axios from 'axios'

	export default {
		name: 'PromotionCategoryPage',

		components: {},

		head() {
			return {
				meta: [
				],

				link: [
				],
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
				best: 'rooms/best',
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
					label: 'sort.created_at',
					value: 'created_at',
				},
				{
					label: 'sort.exclusive',
					value: 'exclusive',
				},
			],
			showFilter: false,
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
						category: response.data.category,
					})
					this.$store.commit('promotions/FETCH_CATEGORIES', {
						categories: response.data.categories,
					})
				})

			await this.$axios
				.get(`promotion/list`, { params: this.params })
				.then(response => {
					this.$store.commit('promotions/FETCH_ITEMS', {
						items: response.data.data,
					})
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0].room,
					})
					this.$store.commit('promotions/FETCH_FILTERS', {
						filters: response.data.filters,
					})
					Object.keys(response.data).forEach(key => {
						if (key !== 'filters') {
							this[key] = response.data[key]
						}
					})
				})
		},

		watch: {},

		created() {
			this.geo = this.country.code
		},

		mounted() {
			eventBus.$on('filter:toggle', () => {
				this.toggleMobileFilter()
			})
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

			toggleMobileFilter() {
				document.body.classList.toggle('modal-open')
				this.showFilter = !this.showFilter
			},

			handleOutsideClick(event) {
				const filtersElement = document.querySelector('.filters')
				if (this.showFilter && !filtersElement?.contains(event.target)) {
					this.toggleMobileFilter()
				}
			},

			async fetchItems() {
				this.$nuxt.$loading.start()

				await this.$axios
					.get(`promotion/list`, { params: this.params })
					.then(response => {
						this.$store.commit('promotions/FETCH_ITEMS', {
							items: response.data.data,
						})
						this.$store.commit('rooms/FETCH_BEST', {
							best: response.data.data[0].room,
						})
						this.$store.commit('promotions/FETCH_FILTERS', {
							filters: response.data.filters,
						})
						Object.keys(response.data).forEach(key => {
							if (key !== 'filters') {
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
		},
	}
</script>

<style lang="scss">
	.promotions {
		&-page {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
		}
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		column-gap: 28px;
		grid-template-areas:
			'header header header'
			'nav nav nav'
			'container container aside';
		&__nav {
			grid-area: nav;
			margin-top: -26px;
			margin-bottom: 32px;
		}
		&__container {
			grid-area: container;
			display: grid;
			grid-template-columns: 2fr minmax(0, 7fr);
			column-gap: 28px;
			grid-auto-rows: max-content;
			grid-template-areas:
				'filter filter'
				'list list'
				'pagination pagination'
				'toc article';
		}
		&__header {
			grid-area: header;
		}
		&__filter {
			grid-area: filter;
		}
		&__article {
			grid-area: article;
			padding-left: 14px;
			padding-right: 28px;
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
			padding-right: 14px;
		}
		&__aside {
			grid-area: aside;
		}
	}

	@include mq('desktop') {
		.promotions {
			grid-template-columns: 2fr minmax(704px, 7fr) minmax(288px, 1fr);
			column-gap: 24px;
			&__container {
				column-gap: 24px;
				grid-template-columns: 2fr minmax(704px, 7fr);
			}
			&__toc {
				padding-right: 0;
			}
			&__article {
				padding-left: 0;
				padding-right: 0;
			}
		}
	}

	@include mq('laptop') {
		.promotions {
			&-page {
				@include paddings('tablet');
			}
			grid-template-columns: 100%;
			grid-template-areas:
				'header'
				'nav'
				'container'
				'aside';
			&__container {
				grid-template-columns: 100%;
				grid-template-areas:
					'filter'
					'list'
					'pagination'
					'toc'
					'article';
			}
			&__aside {
				margin-top: 40px;
			}
			&__page-banners {
				width: initial;
				margin-right: -24px;
				padding-top: 0;
				padding-left: 0;
			}
		}
	}

	@include mq('tablet') {
		.promotions {
			&-page {
				@include paddings('mobile');
			}
			&__list {
				grid-template-columns: 100%;
			}

			.promotion-item {
				max-width: none;
				&__img {
					width: 100%;
				}
				&__prize {
					max-width: 326px;
					margin-left: auto;
					margin-right: auto;
				}
			}

			&__page-banners {
				margin-right: -20px;
			}
		}
	}
</style>
