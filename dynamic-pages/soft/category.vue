<template>
	<div class="soft-category">
		<!-- Header -->
		<soft-category-header class="soft-category__header" />

		<div class="soft-list" v-if="items && data.length">
			<client-only>
				<filter-header
					:style="{
						marginBottom: '36px'
					}"
					:class="['platform__filter-header']"
					:geo.sync="geo"
					:sort.sync="sort"
					:total.sync="total"
					:overall.sync="overall"
					:show-geo="false"
					:sort-options="[
						{
							label: 'По стоимости',
							value: 'price',
						},
						{
							label: 'Сначала новые',
							value: 'created_at',
						},
					]"
					:selected="selected.length"
					entity-label="программ для покера"
					@update:sort="fetchItems"
					@update:geo="fetchItems"
				/>

				<filter-selected-list
					v-if="selected.length"
					class="platform__filter-selected"
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

			<div class="soft-list__list">
				<soft-item
					v-for="(item, index) in data"
					:key="index"
					:id="item.id"
					:title="item.title"
					:review="item.review"
					:url="item.url"
					:short_description="item.short_description"
					:discount="item.discount"
					:available="item.available"
					:discount_value="item.discount_value"
					:price="item.price"
					:image="item.image"
					:category="item.category.title"
					:currency="item.currency ? item.currency.symbol : ''"
				/>
			</div>

			<pagination
				v-if="data.length"
				:last="last_page"
				:current="page"
				:prev-url="prev_page_url"
				:next-url="next_page_url"
				:total="total"
				:from="from"
				:to="to"
				:showPages="false"
				@next="handlePageNext"
				@prev="handlePagePrev"
				@change="handlePageChange"
				@more="handleShowMore"
				class="soft-list__pagination"
			>
			</pagination>
		</div>

		<!-- Toc -->
		<div class="soft-category__toc">
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
		<page-article :text="category.text" class="soft-category__article">
			<template #footer>
				<!-- Faq -->
				<faq-list
					v-if="category.faq && category.faq.mainEntity.length"
					:label="$t('faq')"
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
				<!-- 				<comments
					commentable_type="App\SoftCategory"
					:commentable_id="category.id"
				/> -->
			</template>
		</page-article>

		<div class="soft-category__aside">
			<div
				v-if="filters"
				class="filters__wrapper"
				:class="{ 'filters__wrapper--opened': showFilter }"
				@click.self="handleOutsideClick($event)"
			>
				<filters
					:geo="geo"
					:categories="filters.categories"
					:free="filters.free"
					@change="handleFilterChange"
					@filterOpen="handleFilterOpen"
				/>
			</div>

			<room-top-list />

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

		<page-banners class="soft-category__banners" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	import Filters from '~/components/soft/category/Filters'

	export default {
		name: 'SoftCategory',

		components: {
			Filters,
		},

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
				category: 'soft/category',
				items: 'soft/items',
				filters: 'soft/filters',
				isTouch: 'ui/isTouch',
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
					soft_category_id: this.category.id,
					categories: this.categories,
					free: this.free,
				}
			},
		},

		data: () => ({
			loading: false,
			per_page: 9,
			page: 1,
			sort: 'price',
			order: 'asc',
			geo: null,
			categories: [],
			free: null,
			data: [],
			from: 0,
			to: 0,
			next_page_url: null,
			prev_page_url: null,
			current_page: null,
			last_page: null,
			total: 0,
			overall: 0,
			selected: [],
			showFilter: false,
		}),

		async fetch() {
			await this.$axios
				.get(`soft/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('soft/FETCH_CATEGORY', { category: response.data })
				})

			await this.$axios.get(`soft/category/list`).then(response => {
				this.$store.commit('soft/FETCH_CATEGORIES', {
					categories: response.data,
				})
			})

			await this.$axios
				.get(`soft/list`, { params: this.params })
				.then(response => {
					this.$store.commit('soft/FETCH_ITEMS', { items: response.data.data })
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
					this.$store.commit('soft/FETCH_FILTERS', {
						filters: response.data.filters,
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
		},

		methods: {
			async fetchItems() {
				this.$nuxt.$loading.start()

				console.log(this.params)

				await this.$axios
					.get(`soft/list`, { params: this.params })
					.then(response => {
						this.$store.commit('soft/FETCH_ITEMS', {
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

			handleSortChange(sort) {
				this.sort = sort
				this.fetchItems()
			},

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

			handleFilterOpen() {},
		},
	}
</script>

<style lang="scss">
	.soft-category {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		display: grid;
		&__header {
			grid-area: header;
		}
		&__toc {
			grid-area: toc;
			padding-right: 14px;
		}
		&__article {
			grid-area: article;
			padding-left: 14px;
			padding-right: 28px;
		}
		&__aside {
			grid-area: aside;
		}
		&__banners {
			grid-area: banners;
		}
		&__filter-button {
			margin-left: auto;
		}
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		grid-template-areas:
			'header header header'
			'filter-soft filter-soft aside'
			'soft-list soft-list aside'
			'toc article aside'
			'banners banners banners';
		column-gap: 28px;
		grid-template-rows: auto auto auto 1fr;
	}
	.soft-list {
		grid-area: soft-list;
		&__list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 28px;
			row-gap: 48px;
		}
		&__pagination {
			margin-top: 28px;
		}
	}

	.soft-category__info {
		width: 100%;
	}

	.soft__filter-selected {
		width: 100%;
	}

	.soft-category-top {
		flex-direction: column;
		grid-area: filter-soft;
		margin-bottom: 38px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__geo {
			// margin-left: auto;
			// margin-right: 24px;
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

	@include mq('desktop') {
		.soft-category {
			column-gap: 24px;
			grid-template-columns: 2fr minmax(704px, 7fr) minmax(288px, 3fr);
			&__toc {
				padding-right: 0;
			}
			&__article {
				padding-left: 0;
				padding-right: 0;
			}
			.soft-item__wrap {
				padding-left: 24px;
				padding-right: 24px;
			}
		}
		.soft-list {
			&__list {
				column-gap: 24px;
			}
		}
	}

	@include mq('laptop') {
		.soft-category {
			@include paddings('tablet');
			grid-template-columns: 100%;
			grid-template-areas:
				'header'
				'filter-soft'
				'soft-list'
				'toc'
				'article'
				'aside'
				'banners';

			&__banners {
				margin-right: -24px;
				width: calc(100% + 24px);
			}
		}

		.soft-list {
			&__list {
				grid-template-columns: repeat(2, 1fr);
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.soft-category {
			@include paddings('mobile');
			&__banners {
				margin-right: -20px;
				width: calc(100% + 20px);
			}
		}

		.soft-list {
			&__list {
				grid-template-columns: 100%;
			}
		}
	}
</style>
