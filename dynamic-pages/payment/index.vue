<template>
	<div class="payment">
		<breadcrumb-list v-if="pageable" />

		<payment-header />

		<div class="payment-content">
			<div v-if="tab.show_rooms" class="payment-content__rooms payment-rooms">

				<client-only>
					<filter-header
						class="payment__filter-header"
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
						class="payment__filter-selected"
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
					:available="item.available"
					:closed="item.closed"
					:network="item.network"
					:tags="item.tags"
					:review="item.review"
				/>

				<pagination
					v-if="data.length && next_page_url"
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

			<div class="payment-content__toc">
				<toc-list v-if="tab.toc && tab.toc.length">
					<template #default="{ inline }">
						<toc-item
							v-for="(item, index) in tab.toc"
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

			<page-article :text="tab.text" class="payment-content__article">
				<template #footer>
					<!-- Faq -->
					<faq-list v-if="tab.faq && tab.faq.mainEntity.length" :label="$t('faq')">
						<faq-item
							v-for="(item, index) in tab.faq.mainEntity"
							:key="index"
							:question="item.name"
							:answer="item.acceptedAnswer.text"
						>
						</faq-item>
					</faq-list>
					<!-- Author -->
					<author v-if="tab.author" :author="tab.author" />
					<!-- Comments -->
					<!-- <comments commentable_type="App\Tab" :commentable_id="tab.id" /> -->
				</template>
			</page-article>

			<div class="payment-content__aside">
				<client-only>
					<div
						v-if="tab.show_rooms && filters"
						class="filters__wrapper"
						:class="{ 'filters__wrapper--opened': showFilter }"
						@click.self="handleOutsideClick($event)"
					>
						<lazy-hydrate>
							<payment-filters
								:geo="geo"
								:kycs="filters.kycs"
								:platforms="filters.platforms"
								:tags="filters.tags"
								:payments="filters.payments"
								:types="filters.types"
								:licenses="filters.licenses"
								:geo.sync="geo"
								@update:sort="fetchItems"
								@update:geo="fetchItems"
								@change="handleFilterChange"
							/>
						</lazy-hydrate>
					</div>
				</client-only>

				<room-top-list />

				<topic-list v-if="tab.topics && tab.topics.length">
					<topic-item
						v-for="(item, index) in tab.topics"
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

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts && posts.length"
				:label="$t('entity_news', {entity: payment.title})"
				class="payment__posts"
				asRow
			>
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

		<lazy-hydrate when-visible>
			<payment-list v-if="related" :label="$t('other_payments')">
				<payment-item
					v-for="(item, index) in related"
					:key="index"
					:title="item.title"
					:icon="item.icon"
					:rooms="item.rooms_count"
					:vip="item.vip_status"
					:page="item.page"
				>
				</payment-item>
			</payment-list>
		</lazy-hydrate>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'PaymentMethodPage',

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
			// loading: true,
			loading: false,
			per_page: 5,
			page: 1,
			sort: 'rating',
			order: 'desc',
			geo: null,
			payment_id: null,
			kyc: [],
			platforms: [],
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
			showFilter: false,
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
		}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				payment: 'payments/payment',
				tab: 'payments/tab',
				rooms: 'rooms/rooms',
				filters: 'rooms/filters',
				posts: 'payments/posts',
				related: 'payments/related',
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
					payment_method_id: this.payment.id,
					geo: this.geo,
					kyc: this.kyc,
					platforms: this.platforms,
					tags: this.tags,
					payments: this.payments,
					types: this.types,
					licenses: this.licenses,
				}
			},
		},

		async fetch() {
			await this.$axios.get(`payments/${this.pageable.slug}`).then(response => {
				this.$store.commit('payments/FETCH_PAYMENT', {
					payment: response.data.payment,
				})
				this.$store.commit('payments/FETCH_TAB', { tab: response.data.tab })
				this.$store.commit('payments/FETCH_POSTS', {
					posts: response.data.posts,
				})
				this.$store.commit('payments/FETCH_RELATED', {
					related: response.data.related,
				})
			})

			if (this.tab.show_rooms) {
				await this.$axios
					.get(`rooms/list`, { params: this.params })
					.then(response => {
						this.$store.commit('rooms/FETCH_ROOMS', {
							rooms: response.data.data 
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
			}
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
					.get(`rooms/list`, { params: this.params })
					.then(response => {
						this.$store.commit('rooms/FETCH_ROOMS', {
							rooms: response.data.data 
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
		},
	}
</script>

<style lang="scss">
	.payment {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
	}
	.payment-content {
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		grid-template-areas:
			'rooms rooms aside'
			'toc article aside';
		column-gap: 28px;
		&__rooms {
			grid-area: rooms;
		}
		&__toc {
			grid-area: toc;
		}
		&__aside {
			grid-area: aside;
		}
		&__article {
			grid-area: article;
		}
		@include mq('laptop') {
			grid-template-columns: 100%;
			grid-template-areas:
				'rooms'
				'toc'
				'article'
				'aside';
		}
	}

	.payment-filters {
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

	.payment-rooms {
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
		.payment {
			@include paddings('tablet');
			&__posts {
				margin-bottom: 0;
				margin-right: -24px;
			}
			.block-title {
				margin-top: 0;
			}
		}
	}

	@include mq('tablet') {
		.payment {
			@include paddings('mobile');
			&__posts {
				margin-right: -20px;
			}
		}
	}
</style>
