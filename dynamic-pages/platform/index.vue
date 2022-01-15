<template>
	<div v-if="platform" class="platform">
		<breadcrumb-list v-if="pageable" class="platform__breadcrumbs" />
		<platform-header class="platform__header" />

		<div class="platform-rooms">
			<client-only>
				<filter-header
					class="platform__filter-header"
					:geo.sync="geo"
					:sort.sync="sort"
					:total.sync="total"
					:overall.sync="overall"
					:sort-options="sortOptions"
					:selected="selected.length"
					:entity-label="$t('rooms_entity_label')"
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
						:label="$t('clear_filters')"
						:clear="true"
						:value="null"
					/>
				</filter-selected-list>
			</client-only>

			<div class="platform__rooms-list">
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
				:load-more-width="$device.isDesktop ? 215 : false"
				:showPages="false"
				:load-more-text="$t('show_more')"
				:total-text="$t('rooms_entity_label')"
				@next="handlePageNext"
				@prev="handlePagePrev"
				@change="handlePageChange"
				@more="handleShowMore"
			>
			</pagination>
		</div>

		<div class="platform__toc">
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

		<div class="platform__article">
			<!-- Article -->
			<page-article :text="pageable.text">
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
					<!-- <comments commentable_type="App\PlatformTranslation" :commentable_id="pageable.pageable_id" /> -->
				</template>
			</page-article>
		</div>

		<aside class="platform__aside">
			<div
				v-if="filters"
				class="filters__wrapper"
				:class="{ 'filters__wrapper--opened': showFilter }"
				@click.self="handleOutsideClick($event)"
			>
				<platform-filters
					:geo.sync="geo"
					:kycs="filters.kycs"
					:tags="filters.tags"
					:payments="filters.payments"
					:types="filters.types"
					:licenses="filters.licenses"
					:showGeo="!!data.length"
					@change="handleFilterChange"
					@change:geo="fetchItems"
				/>
			</div>

			<room-top-list />

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
		</aside>

		<div class="platform__posts">
			<lazy-hydrate when-visible>
				<post-list v-if="posts" :label="$t('entity_news', {entity: platform.title})" asRow>
					<post-item
						v-for="(item, index) in posts"
						:key="index"
						:image="item.image"
						:title="item.title"
						:summary="item.summary"
						:slug="item.slug"
						:author="item.user"
						:created="item.created_at"
						:categories="item.categories"
						:medium="true"
					/>
				</post-list>
			</lazy-hydrate>
		</div>

		<page-banners class="platform__banners" />
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

		head() {
			return {
				meta: [
				],

				link: [
				],
			}
		},

		data: () => ({
			loading: false,
			per_page: 5,
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
				isTouch: 'ui/isTouch',
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
				.get('rooms/list', {
					params: {
						geo: this.country.code,
						per_page: this.per_page,
						sort: 'rating',
						order: 'desc',
						platform_id: this.platform.id,
					},
				})
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
			async fetchItems() {
				this.$nuxt.$loading.start()

				await this.$axios
					.get('rooms/list', { params: this.params })
					.then(response => {
						this.$store.commit('rooms/FETCH_ROOMS', {
							rooms: response.data.data,
						})
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
				this.selected = selected.flatten

				Object.keys(selected.values).forEach(key => {
					this[key] = selected.values[key]
				})
				this.fetchItems()
			},

			mapTopics(item) {
				return {
					title: item.title,
					url: item.url,
					created_at: item.created_at,
					author: {
						username: item.author.username,
						full_name: item.author.full_name,
						image: item.author.image
							? {
									filename: item.author.image.filename,
							  }
							: null,
					},
				}
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
			'posts posts posts'
			'banners banners banners';
		column-gap: 24px;
		&__toc {
			grid-area: toc;
			padding-right: 14px;
		}
		&__article {
			grid-area: article;
			padding-left: 14px;
			padding-right: 28px;
		}
		&__header {
			grid-area: header;
		}
		&__breadcrumbs {
			grid-area: breadcrumbs;
		}
		&__aside {
			grid-area: aside;
		}
		&__posts {
			grid-area: posts;
		}
		&__banners {
			grid-area: banners;
		}
		.page-banners {
			padding-top: 0;
		}
	}

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
		grid-area: platform-rooms;
		margin-bottom: 48px;
		.pagination {
			margin-bottom: 0;
		}
		&__title {
			margin-bottom: 20px;
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #222222;
		}
	}

	@include mq('desktop') {
		.platform {
			&__toc {
				padding-right: 0px;
			}
			&__article {
				padding-left: 0px;
				padding-right: 0px;
			}
		}
		.platform-rooms {
			margin-bottom: 40px;
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
				'posts'
				'banners';

			.page-banners {
				padding-top: 20px;
			}

			.toc {
				margin-top: 0;
			}
		}

		.platform-rooms {
			margin-bottom: 28px;
		}
	}

	@include mq('tablet') {
		.platform {
			@include paddings('mobile');
			&__rooms-list {
				margin-right: -20px;
				margin-left: -21px;
			}
			.page-banners {
				padding-top: 0px;
			}
		}
	}
</style>
