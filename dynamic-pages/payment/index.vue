<template>
	<div class="payment">
		<breadcrumb-list class="payment__breadcrumbs" />

		<page-internal-header
			class="payment__header"
			:title="pageable.title"
			:summary="pageable.summary"
			:author="pageable.author ? pageable.author.full_name : ''"
			:created="pageable.created_at"
			:updated="pageable.updated_at"
			:icon="pageable.pageable.icon"
			:promotion="true"
		>
			<template v-if="payment.vip_status" #body>
				<div class="payment-actions">
					<payment-action-button
						class="payment-actions__button"
						:label="$t('open_acconut')"
						type="register"
						:url="payment.partner_url"
						:background="payment.btn_color"
					/>
					<payment-action-button
						class="payment-actions__button"
						:label="$t('manager_chat')"
						type="default"
						background="#70AC30"
					/>
					<payment-action-button
						class="payment-actions__button"
						:label="$t('vip_status')"
						type="internal"
						:vip-url="payment.vip_url"
						background="#F5A200"
					/>
				</div>
			</template>

			<template #nav
				v-if="payment.tabs && payment.tabs.length > 1"
				class="payment-header__nav"
			>
				<tab-list>
					<tab-item
						v-for="(item, index) in payment.tabs"
						:key="index"
						:params="{
							parent: item.parent ? item.parent.slug : item.slug,
							child: item.parent ? item.slug : null,
						}"
						:name="item.name"
					>
					</tab-item>
				</tab-list>
			</template>
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

		<div v-if="pageable.show_rooms" class="payment-rooms">
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

			<div v-if="$fetchState.pending" class="payment-rooms__list">
				<lazy-skeleton-room v-for="(item, index) in parseInt(per_page)" :key="index" />
			</div>
			<div v-else class="payment-rooms__list">
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
					:load-more-width="isMobile ? null : 215"
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

		<div class="payment__toc">
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

		<div class="payment__article">
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

		<aside class="payment__aside">
			<div
				class="payment__filter-wrapper"
				:class="{ 'payment__filter-wrapper--opened': showFilter }"
				@click.self="handleOutsideClick($event)"
			>
				<lazy-hydrate when-visible>
					<room-filters
						v-if="pageable.show_rooms && filters"
						class="payment__filter"
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
				v-if="posts && posts.length"
				class="payment__news"
				:label="$t('entity_news', {entity: payment.title})"
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
			<div class="payment__payments-list" v-if="related && related.length">
				<div class="block-title">{{ $t('other_payments') }}</div>
				<div class="payment__payments-list__list">
					<nav-box-item
						v-for="(item, index) in related"
						:key="index"
						:title="item.title"
						:icon="item.icon"
						:rooms="item.rooms_count"
						:bage="item.vip_status ? $t('vip_status') : false"
						:page="item.review"
					/>
				</div>
			</div>
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

		data: () => ({
			loading: false,
			per_page: 5,
			page: 1,
			sort: 'rating',
			order: 'desc',
			geo: null,
			cached: true,
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
				rooms: 'rooms/rooms',
				best: 'rooms/best',
				filters: 'rooms/filters',
				posts: 'payments/posts',
				related: 'payments/related',
				isMobile: 'ui/isMobile',
				isTablet: 'ui/isTablet',
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
					cached: this.cached,
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
				this.$store.commit('payments/FETCH_POSTS', {
					posts: response.data.posts,
				})
				this.$store.commit('payments/FETCH_RELATED', {
					related: response.data.related,
				})
			})

			await this.$axios
				.get(`rooms/list`, { params: { ...this.params } })
				.then(response => {
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0],
					})
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
	.payment {
		width: 100%;
		max-width: 1440px;
		@include paddings('desktop');
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		grid-template-areas:
			'breadcrumbs breadcrumbs breadcrumbs'
			'header header header' 'payment-rooms payment-rooms aside'
			'toc article aside'
			'news news news'
			'payments-list payments-list payments-list';
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
		&__payments-list {
			grid-area: payments-list;
			&__list {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				column-gap: 20px;
			}

			.block-title {
				margin-top: 0;
			}
		}

		&-actions {
			margin-bottom: 32px;
			display: flex;
			align-items: center;
			&__button {
				flex: 0 0 180px;
			}
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
		grid-area: payment-rooms;
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
			grid-template-columns: 100%;
			grid-template-areas:
				'breadcrumbs'
				'header'
				'payment-rooms'
				'toc'
				'article'
				'aside'
				'news'
				'payments-list';
			&__title {
				text-align: center;
			}
			&__news {
				margin-right: -24px;
				margin-bottom: 24px;
			}
			&__payments-list {
				margin-right: -24px;
				margin-bottom: -6px;

				&__list {
					overflow-x: scroll;
					@include hide-scroll();
					grid-template-columns: none;
					grid-auto-columns: 350px;
					grid-auto-flow: column;
					gap: 20px;
				}

				.payment-item {
					margin-bottom: 0;
				}
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

			&-actions {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 20px 16px;

				.btn-payment-action {
					margin: 0;
				}
			}
		}
	}

	@include mq('tablet') {
		.payment {
			@include paddings('mobile');
			&__news {
				margin-right: -20px;
				margin-bottom: 36px;
			}
			&__payments-list {
				margin-right: -20px;
				margin-bottom: 4px;
				&__list {
					grid-auto-columns: 288px;
					gap: 16px;
				}
			}

			&-actions {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 16px 20px;

				.btn-payment-action {
					margin: 0;
					white-space: nowrap;
					&:first-child {
						grid-column: span 2;
					}
				}
			}
		}

		.payment-rooms__list {
			margin-right: -20px;
			margin-left: -21px;
		}
	}
</style>
