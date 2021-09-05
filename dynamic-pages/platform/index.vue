<template>
	<div class="platform">
		<breadcrumb-list v-if="pageable" class="platform__breadcrumbs" />
		<platform-header class="platform__header" />

		<div class="platform-rooms">
			<div class="platform-filters">
				<div v-if="data.length" class="platform-filters__info">
					Показано {{ total }} из {{ overall }} покер-румов
				</div>

				<mobile-filter-button
					v-if="isTouch"
					:selected="selected.length || 0"
					class="platform__filter-button"
				/>

				<div v-if="data.length && !isTouch" class="platform-filters__geo">
					<geo-switcher
						:value="country.code"
						:geo.sync="geo"
						@change:geo="fetchItems"
					/>
				</div>
			</div>

			<div class="platform__rooms-list">
				<room
					v-for="(item, index) in data"
					v-if="data.length"
					:id="item.id"
					:key="index"
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
				@next="handlePageNext"
				@prev="handlePagePrev"
				@change="handlePageChange"
				@more="handleShowMore"
			>
			</pagination>
		</div>

		<div class="platform__toc">
			<toc-list v-if="platform.toc">
				<template #default="{ inline }">
					<toc-item
						v-for="(item, index) in platform.toc"
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
			<page-article :text="platform.text">
				<template #footer>
					<!-- Faq -->
					<faq-list
						v-if="platform.faq && platform.faq.mainEntity.length"
						label="FAQ"
					>
						<faq-item
							v-for="(item, index) in platform.faq.mainEntity"
							:key="index"
							:question="item.name"
							:answer="item.acceptedAnswer.text"
						>
						</faq-item>
					</faq-list>
					<!-- Author -->
					<author v-if="platform.author" :author="platform.author" />
					<!-- Comments -->
					<comments
						commentable_type="App\PlatformTranslation"
						:commentable_id="pageable.pageable_id"
					/>
				</template>
			</page-article>
		</div>

		<div class="platform__aside">
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

			<topic-list v-if="platform.topics && platform.topics.length">
				<topic-item
					v-for="(item, index) in platform.topics"
					:key="index"
					:title="item.title"
					:url="item.url"
					:author="item.author"
					:created="item.created_at"
				/>
			</topic-list>
		</div>

		<lazy-hydrate when-visible>
			<post-list v-if="posts" label="Похожие статьи">
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
					:asCard="$device.isMobile"
				/>
			</post-list>
		</lazy-hydrate>

		<page-banners />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'PlatformPage',

		components: {},

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
		}),

		head() {
			return {
				title: this.platform.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.platform.meta_description },
					{ name: 'keywords', content: this.platform.meta_keywords },
				],

				script: [{ type: 'application/ld+json', json: this.platform.faq }],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				platform: 'platforms/platform',
				rooms: 'rooms/rooms',
				best: 'rooms/best',
				filters: 'platforms/filters',
				posts: 'platforms/posts',
				isTouch: 'ui/isTouch',
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
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
					this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0],
					})
				})
				.catch(e => {})

			await this.$axios
				.get(`/platforms/filters/list`, {
					params: {
						geo: this.country.code,
						platform_id: this.platform.id,
					},
				})
				.then(response => {
					this.$store.commit('platforms/FETCH_FILTERS', {
						filters: response.data,
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

				await this.$axios
					.get(`/platforms/filters/list`, {
						params: this.params,
					})
					.then(response => {
						this.$store.commit('platforms/FETCH_FILTERS', {
							filters: response.data,
						})
					})

				await this.$axios
					.get('rooms/list', { params: this.params })
					.then(response => {
						this.$store.commit('rooms/FETCH_ROOMS', {
							rooms: response.data.data,
						})
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
			'toc article aside';
		column-gap: 24px;
		&__toc {
			grid-area: toc;
		}
		&__article {
			grid-area: article;
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
				'aside';
		}
	}

	@include mq('tablet') {
		.platform {
			@include paddings('mobile');
			&__rooms-list {
				margin-right: -20px;
				margin-left: -21px;
			}
		}
	}
</style>
