<template>
	<div class="platform">
		<breadcrumb-list class="platform__breadcrumbs" />

		<page-internal-header
			class="platform__header"
			:title="pageable.title"
			:summary="pageable.summary"
			:author="pageable.author ? pageable.author.full_name : ''"
			:created="pageable.created_at"
			:updated="pageable.updated_at"
			:icon="`${platform.icon}-large`"
			:promotion="true"
		>
			<template #promotion>
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
					:label="$t('room_best')"
				/>
				<skeleton-top-room
					v-else
					:label="$t('room_best')"
				/>
			</template>
		</page-internal-header>

		<div class="platform-rooms">
			<client-only>
				<filter-header
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

			<div v-if="$fetchState.pending" class="platform-rooms__list">
				<lazy-skeleton-room v-for="(item, index) in parseInt(per_page)" :key="index" />
			</div>
			<div v-else class="platform-rooms__list">
				<room
					v-for="(item, index) in data"
					v-if="data.length"
					:id="item.id"
					:key="index"
					:title="item.title"
					:slug="item.slug"
					:url="item.url"
					:rating="item.rating"
					:rakeback="item.rakeback"
					:bonus="item.bonus"
					:background="item.background"
					:image="item.image"
					:restricted="item.restricted"
					:closed="item.closed"
					:available="item.available"
					:network="item.network"
					:tags="item.tags"
					:review="item.review"
				/>
			</div>

			<lazy-hydrate when-visible>
				<lazy-pagination
					v-if="data.length"
					:last="last_page"
					:current="parseInt(page) || current_page"
					:prev-url="prev_page_url"
					:next-url="next_page_url"
					:total="total"
					:from="from"
					:to="to"
					:load-more-width="$device.isMobile ? null : 215"
					:showPages="false"
					:load-more-text="$t('show_more')"
					:total-text="$t('rooms_entity_label')"
					@next="handlePageNext"
					@prev="handlePagePrev"
					@change="handlePageChange"
					@more="handleShowMore"
				/>
			</lazy-hydrate>
		</div>

		<div class="platform__toc">
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

		<div class="platform__article">
			<!-- Article -->
			<page-article :text="pageable.text">
				<template #footer>
					<!-- Faq -->
					<lazy-hydrate when-visible>
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
					</lazy-hydrate>
					<!-- Author -->
					<lazy-hydrate when-visible>
						<author v-if="pageable.author" :author="pageable.author" />
					</lazy-hydrate>
				</template>
			</page-article>
		</div>

		<aside class="platform__aside">
			<div
				class="platform__filter-wrapper"
				:class="{ 'platform__filter-wrapper--opened': showFilter }"
				@click.self="handleOutsideClick($event)"
			>
				<lazy-hydrate when-visible>
					<room-filters
						v-if="filters"
						class="platform__filter"
						:geo.sync="geo"
						:kycs="filters.kycs"
						:platforms="filters.platforms"
						:tags="filters.tags"
						:payments="filters.payments"
						:types="filters.types"
						:licenses="filters.licenses"
						@update:sort="handleSortChange"
						@update:geo="handleGeoChange"
						@change="handleFilterChange"
						@filterOpen="handleFilterOpen"
					/>
				</lazy-hydrate>
			</div>

			<lazy-hydrate when-visible>
				<room-top-list />
			</lazy-hydrate>

			<lazy-hydrate when-visible>
				<topic-list v-if="pageable.topics && pageable.topics.length">
					<topic-item
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
				<game-search-banner />
			</lazy-hydrate>
		</aside>

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts.length"
				class="platform__news"
				:label="`Новости ${pageable.pageable.title}`"
				asRow
			>
				<post-item
					v-for="(item, index) in posts"
					:key="index"
					:image="item.image"
					:title="item.page.title"
					:summary="item.page.summary"
					:slug="item.page.slug"
					:author="item.page.author"
					:created="item.page.created_at"
					:categories="item.categories"
					:medium="true"
				/>
			</post-list>
		</lazy-hydrate>
		<lazy-hydrate when-visible>
			<page-banners class="platform__banners" />
		</lazy-hydrate>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'PlatformPage',

		components: {
			LazyHydrate,
		},

		data: () => ({
			loading: false,
			per_page: 5,
			page: 1,
			sort: 'rating',
			order: 'desc',
			geo: null,
			cached: true,
			platform_id: null,
			kyc: [],
			tags: [],
			payments: [],
			types: [],
			licenses: [],
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
		}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				platform: 'platforms/platform',
				rooms: 'rooms/rooms',
				best: 'rooms/best',
				filters: 'rooms/filters',
				posts: 'platforms/posts',
				isTablet: 'ui/isTablet',
				isMobile: 'ui/isMobile',
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
					cached: this.cached,
					kyc: this.kyc,
					tags: this.tags,
					payments: this.payments,
					types: this.types,
					licenses: this.licenses,
				}
			},
		},

		async fetch() {
			await this.$axios
				.get(`platforms/${this.pageable.slug}`, {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('platforms/FETCH_PLATFORM', {
						platform: response.data.platform,
					})
					this.$store.commit('platforms/FETCH_POSTS', {
						posts: response.data.posts,
					})
				})

			await this.$axios
				.get('rooms/list', { params: { ...this.params } })
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0],
					})
					this.$store.commit('rooms/FETCH_FILTERS', {
						filters: response.data.filters
					})
					Object.keys(response.data).forEach(key => {
						if (key !== 'filters') {
							this[key] = response.data[key]
						}
					})
				})
				.catch(e => {})
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
			toggleMobileFilter() {
				document.body.classList.toggle('modal-open')
				this.showFilter = !this.showFilter
			},

			handleOutsideClick(event) {
				if (this.showFilter) {
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
	.platform {
		width: 100%;
		max-width: 1440px;
		@include paddings('desktop');
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		grid-template-areas:
			'breadcrumbs breadcrumbs breadcrumbs'
			'header header header'
			'platform-rooms platform-rooms aside'
			'toc article aside'
			'news news news'
			'banners banners banners';
		column-gap: 28px;
		&__breadcrumbs {
			grid-area: breadcrumbs;
		}
		&__header {
			grid-area: header;
		}
		&__toc {
			grid-area: toc;
		}
		&__article {
			grid-area: article;
		}
		&__aside {
			grid-area: aside;
		}
		&__news {
			grid-area: news;
			.block-title {
				margin-top: 0;
			}
		}
		&__banners {
			padding: 0;
			grid-area: banners;
		}
		.platform__banners {
			padding: 0;
		}
	}

	.platform-rooms {
		grid-area: platform-rooms;
		margin-bottom: 40px;
		&__title {
			margin-bottom: 20px;
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #222222;
		}
	}

	@include mq('laptop') {
		.platform {
			@include paddings('tablet');
			grid-template-columns: 100%;
			grid-template-areas:
				'breadcrumbs'
				'header'
				'platform-rooms'
				'toc'
				'article'
				'aside'
				'news'
				'banners';
			&__title {
				text-align: center;
			}
			&__news {
				margin-right: -24px;
				margin-bottom: 24px;
			}

			&__filter {
				margin-bottom: 0;
				margin-left: auto;
				max-width: 436px;
				height: 100%;
				overflow-y: scroll;
				@include hide-scroll();
			}

			&__filter-wrapper {
				display: none;
				position: fixed;
				right: 0;
				top: 0;
				bottom: 0;
				left: 0;
				z-index: 999;
				&--opened {
					display: block;
				}
			}
		}
	}

	@include mq('tablet') {
		.platform {
			@include paddings('mobile');
			&__news {
				margin-right: -20px;
				margin-bottom: 36px;
			}
		}

		.platform-rooms__list {
			margin-right: -20px;
			margin-left: -20px;
		}
	}
</style>
