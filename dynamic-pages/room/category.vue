<template>
	<div class="rooms-page">
		<div class="rooms">
			<!-- Header -->
			<category-header
				class="rooms__header"
				:loading="$fetchState.pending"
				:meta="true"
				:title="pageable.title"
				:author="pageable.author ? pageable.author.full_name : null"
				:created="pageable.created_at"
				:updated="pageable.updated_at"
				:summary="pageable.summary"
				:icon="pageable.pageable.icon"
				icon-width="90px"
				background-url="rooms-bg.webp"
			>
				<template #breadcrumbs>
					<breadcrumb-list
						:white="true"
						:auto="false"
						class="rooms-header__breadcrumbs"
					>
						<breadcrumb-item
							v-if="pageable.slug !== 'best-poker-rooms-2020'"
							slug="best-poker-rooms-2020"
							:title="$t('menu.best_rooms')"
							:index="1"
							:parent="{
								slug: 'rakeback-deals'
							}"
							:last="pageable.slug !== 'best-poker-rooms-2020' ? false : true"
							:white="true"
						/>
						<breadcrumb-item
							:slug="pageable.slug"
							:title="pageable.title"
							:index="pageable.slug !== 'best-poker-rooms-2020' ? 2 : 1"
							:parent="{
								slug: 'rakeback-deals'
							}"
							:last="true"
							:white="true"
						/>
					</breadcrumb-list>
				</template>

				<template #promotion>
					<room-top
						v-if="best && !$fetchState.pending"
						class="room-header__room-top"
						:id="best.id"
						:title="best.title"
						:slug="best.slug"
						:url="best.url"
						:restricted="best.restricted"
						:country="country"
						:rating="best.rating"
						:bonus="best.top_bonus"
						:review="best.review"
						:label="$t('room_best')"
					/>
					<skeleton-top-room
						v-else
						class="room-header__room-top"
						:label="$t('room_best')"
					/>
				</template>
			</category-header>

			<!-- Navs -->
			<div v-if="categories && categories.length" class="rooms__nav">
				<nav-list>
					<nav-item
						v-for="(item, index) in categories"
						:key="index"
						:name="item.label"
						:page="item.page"
						:icon="item.icon_small"
					/>
				</nav-list>
			</div>

			<!-- Container -->
			<div class="rooms__container">
				<div class="rooms__filter">
					<client-only>
						<filter-header
							v-if="!pageable.is_blacklist"
							class="rooms__filter"
							:geo.sync="geo"
							:sort.sync="sort"
							:total.sync="total"
							:overall.sync="overall"
							:sort-options="sortOptions"
							:selected="selected.length"
							:entity-label="$t('rooms_entity_label')"
							@update:sort="handleSortChange"
							@update:geo="handleGeoChange"
						/>

						<filter-selected-list
							v-if="selected.length &&!pageable.is_blacklist"
							class="filters-selected rooms__filter-selected"
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
								:label="$t('clear_filters')"
								:clear="true"
								:value="null"
							/>
						</filter-selected-list>
					</client-only>
				</div>

				<div v-if="$fetchState.pending" class="rooms-list rooms__list">
					<lazy-skeleton-room v-for="(item, index) in parseInt(per_page)" :key="index" />
				</div>
				<div v-else class="rooms-list rooms__list">
					<template v-for="(item, index) in items">
						<lazy-room
							v-if="!item.banner"
							:key="index"
							:id="item.id"
							:title="item.title"
							:slug="item.slug"
							:url="item.url"
							:rating="item.rating"
							:rakeback="item.rakeback"
							:bonus="item.bonus"
							:background="item.background"
							:restricted="item.restricted"
							:available="item.available"
							:blacklist="item.blacklist"
							:summary="item.summary"
							:claim_amount="item.claim_amount"
							:claim_currency="item.claim_currency ? item.claim_currency : {'symbol': '$'}"
							:image="item.image"
							:network="item.network"
							:tags="item.tags"
							:review="item.review"
						/>
						<lazy-room-category-banner v-else :key="index" />
					</template>
				</div>

				<lazy-hydrate when-visible>
					<lazy-pagination
						:query="true"
						:last="last_page"
						:current="parseInt(page) || current_page"
						:prev-url="prev_page_url"
						:next-url="next_page_url"
						:total="total"
						:from="from"
						:to="to"
						:load-more-width="$device.isDesktop ? 215 : false"
						:showPages="false"
						:load-more-text="$t('show_more')"
						:total-text="$t('rooms_entity_label')"
						class="rooms__pagination"
						@next="handlePageNext"
						@prev="handlePagePrev"
						@change="handlePageChange"
						@more="handleShowMore"
					/>
				</lazy-hydrate>

				<div class="rooms__toc">
					<toc-list v-if="pageable.toc">
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

				<page-article class="rooms__article" :title="false" :text="pageable.text">
					<template #footer>
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

						<author v-if="pageable.author" :author="pageable.author" />
					</template>
				</page-article>
			</div>

			<!-- Aside -->
			<aside class="rooms__aside">
				<div
					v-if="filters && !pageable.is_blacklist"
					class="filters__wrapper"
					:class="{ 'filters__wrapper--opened': showFilter }"
					@click.self="handleOutsideClick($event)"
				>
					<lazy-hydrate when-visible>
						<room-category-filters
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
							:geo.sync="geo"
							@update:sort="handleSortChange"
							@update:geo="handleGeoChange"
							@change="handleFilterChange"
							@filterOpen="handleFilterOpen"
						/>
					</lazy-hydrate>
				</div>

				<template v-if="promotions && !pageable.is_blacklist">
					<div class="block-title">{{ $t('promotion_recent') }}</div>
					<lazy-hydrate when-visible>
						<div class="rooms__aside__promotions-list">
							<lazy-promotion-item
								v-for="(item, index) in promotions"
								:key="index"
								:image="item.image"
								:title="item.title"
								:summary="item.summary"
								:page="item.page"
								:author="item.page.author"
								:created="item.created_at"
								:category="item.category"
								:time_left="item.time_left"
								:time_before="item.time_before"
								:prize="item.prize"
								:currency="item.currency ? item.currency.symbol : '$'"
								:exclusive="item.exclusive"
							/>
						</div>
					</lazy-hydrate>
				</template>

				<lazy-hydrate when-visible>
					<topic-list v-if="pageable.topics && pageable.topics.length">
						<lazy-topic-item
							v-for="(item, index) in pageable.topics"
							:key="index"
							:title="item.title"
							:url="item.url"
							:author="item.author"
							:created="item.created_at"
						/>
					</topic-list>
				</lazy-hydrate>

				<lazy-hydrate when-visible>
					<lazy-game-search-banner />
				</lazy-hydrate>
			</aside>
		</div>
		<div class="rooms__page-banners">
			<lazy-hydrate when-visible>
				<lazy-page-banners />
			</lazy-hydrate>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'RoomCategory',

		components: {
			LazyHydrate,
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				rooms: 'rooms/rooms',
				best: 'rooms/best',
				filters: 'rooms/filters',
				promotions: 'promotions/items',
				categories: 'rooms/categories',
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
					cached: this.cached,
					room_category_id: this.pageable.pageable.id,
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
					hud: this.hud,
					kyc: this.kyc,
					selected: this.selected
				}
			},

			items() {
				if (this.rooms) {
					return [
						...this.rooms.slice(0, this.total >= 10 ? 5 : this.rooms.length / 2),
						{ banner: true },
						...this.rooms.slice(this.total >= 10 ? 5 : this.rooms.length / 2, this.rooms.length),
					]
				}

				return []
			},
		},

		data: () => ({
			loading: false,
			per_page: 10,
			page: 1,
			from: 0,
			to: 0,
			sort: 'rating',
			order: 'desc',
			geo: null,
			cached: true,
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
			hud: [],
			kyc: null,
			ids: null,
			data: [],
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
					label: 'sort.rating',
					value: 'rating',
				},
				{
					label: 'sort.created_at',
					value: 'created_at',
				},
			],
			showFilter: false,
		}),

		async fetch() {

			await this.$axios
				.get(`rooms/list`, { params: { ...this.params } })
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOM_CATEGORIES', {
						categories: response.data.categories,
					})
					this.$store.commit('rooms/FETCH_ROOMS', {
						rooms: response.data.data 
					})
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0],
					})
					this.$store.commit('rooms/FETCH_FILTERS', {
						filters: response.data.filters
					})
					this.$store.commit('promotions/FETCH_ITEMS', {
						items: response.data.promotions,
					})
					Object.keys(response.data).forEach(key => {
						if (key !== 'data' && key !== 'filters' && key !== 'promotions') {
							this[key] = response.data[key]
						}
					})
				})
		},

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
			toggleMobileFilter() {
				document.body.classList.toggle('modal-open')
				this.showFilter = !this.showFilter
			},

			handleOutsideClick(event) {
				const filtersElement = document.querySelector('.rooms__aside__filter')
				if (this.showFilter && !filtersElement?.contains(event.target)) {
					this.toggleMobileFilter()
				}
			},

			handleFilterChange(selected) {
				this.cached = null
				this.$nuxt.$loading.start()
				if (this.selected) {
					this.selected = selected.flatten

					Object.keys(selected.values).forEach(key => {
						this[key] = selected.values[key]
					})
				}

				this.$fetch()
			},

			handleGeoChange() {
				this.cached = null
				this.$nuxt.$loading.start()
				this.$fetch()
			},

			handleSortChange() {
				this.cached = null
				this.$nuxt.$loading.start()
				this.$fetch()
			},

			handlePageNext() {
				this.cached = null
				this.$nuxt.$loading.start()
				this.page = parseInt(this.current_page) + 1
				this.$fetch()
			},

			handlePagePrev() {
				this.cached = null
				this.$nuxt.$loading.start()
				this.page = parseInt(this.current_page) - 1
				this.$fetch()
			},

			handlePageChange(number) {
				this.cached = null
				this.$nuxt.$loading.start()
				this.page = parseInt(number)
				this.$fetch()
			},

			handleShowMore() {
				this.cached = null
				this.$nuxt.$loading.start()
				this.per_page = parseInt(this.per_page) + 6
				this.$fetch()
			},

			handleFilterOpen() {},
		},
	}
</script>

<style lang="scss">
	.rooms {
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
		.rooms {
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
		.rooms {
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
				&__promotions-list {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					column-gap: 20px;
				}
			}
			&__page-banners {
				// width: initial;
				// margin-right: -24px;
				// padding-top: 0;
				// padding-left: 0;
			}
		}
	}

	@include mq('tablet') {
		.rooms {
			&-page {
				@include paddings('mobile');
			}
			&__list {
				grid-template-columns: 100%;
			}

			&__aside {
				&__promotions-list {
					display: grid;
					overflow-x: scroll;
					@include hide-scroll();
					margin-right: -20px;
					grid-template-columns: repeat(3, 288px);
					column-gap: 16px;
				}
			}

			.room-item {
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
				// margin-right: -20px;
			}
		}
	}
</style>
