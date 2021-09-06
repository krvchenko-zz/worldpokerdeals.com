<template>
	<div class="network">
		<breadcrumb-list v-if="pageable" class="network__breadcrumbs" />

		<network-header class="network__header" />

		<h2
			v-if="data.length"
			:id="urlLit(`Все покер-румы сети ${network.title}`)"
			class="network__rooms-title network-rooms__title"
		>
			Все покер-румы сети {{ network.title }}
		</h2>

		<div v-if="data.length" class="network__rooms network-rooms">
			<div class="network-filters">
				<div v-if="data.length" class="network-filters__info">
					Показано {{ total }} из {{ overall }} покер-румов
				</div>

				<mobile-filter-button v-if="isTouch" :selected="selected.length || 0" />

				<div v-if="data.length && !isTouch" class="network-filters__geo">
					<geo-switcher
						:value="country.code"
						:geo.sync="geo"
						@change:geo="fetchItems"
					/>
				</div>
			</div>

			<filter-selected-list
				v-if="selected.length && !isTouch"
				class="network__selected-filters"
			>
				<filter-selected
					v-for="item in selected"
					:key="item.value"
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

			<div class="network__rooms__item">
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
					:network="item.network"
					:tags="item.tags"
					:review="item.review"
				/>
			</div>

			<pagination
				v-if="rooms.length"
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

		<div class="network__toc">
			<toc-list v-if="network.toc && network.toc.length">
				<template #default="{ inline }">
					<toc-item
						:inline="inline"
						:anchor="urlLit(`Все покер-румы сети ${network.title}`)"
						:text="`Все покер-румы сети ${network.title}`"
					>
					</toc-item>
					<toc-item
						v-for="(item, index) in network.toc"
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
		<page-article :text="network.text" class="network__article">
			<template #footer>
				<!-- Faq -->
				<faq-list
					v-if="network.faq && network.faq.mainEntity.length"
					label="FAQ"
				>
					<faq-item
						v-for="(item, index) in network.faq.mainEntity"
						:key="index"
						:question="item.name"
						:answer="item.acceptedAnswer.text"
					>
					</faq-item>
				</faq-list>
				<!-- Author -->
				<author v-if="network.user" :author="network.user" />
				<!-- Comments -->
				<comments commentable_type="App\Network" :commentable_id="network.id" />
			</template>
		</page-article>

		<div class="network__aside">
			<div
				v-if="filters"
				class="filters__wrapper"
				:class="{ 'filters__wrapper--opened': showFilter }"
				@click.self="handleOutsideClick($event)"
			>
				<network-filters
					:geo.sync="geo"
					:kycs="filters.kycs"
					:platforms="filters.platforms"
					:tags="filters.tags"
					:payments="filters.payments"
					:types="filters.types"
					:networks="filters.networks"
					:licenses="filters.licenses"
					:showGeo="data.length"
					@change="handleFilterChange"
					@change:geo="fetchItems"
				/>
			</div>

			<topic-list v-if="network.topics.length" class="network__topics">
				<topic-item
					v-for="(item, index) in network.topics"
					:key="index"
					:title="item.title"
					:url="item.url"
					:author="item.author"
					:created="item.created_at"
				/>
			</topic-list>

			<game-search-banner />
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts && posts.length"
				:label="`Новости ${network.title}`"
				class="network__posts"
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
			<network-list
				v-if="related"
				label="Другие покерные сети"
				class="network__network-list"
			>
				<div class="network__network-list__list">
					<network-item
						v-for="(item, index) in related"
						:key="index"
						:title="item.title"
						:url="item.url"
						:rooms="item.rooms_count"
						:vip="item.vip_status"
						:page="item.page"
					>
					</network-item>
				</div>
			</network-list>
		</lazy-hydrate>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'NetworkPage',

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
			network_id: null,
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
			selected: [],
			showFilter: false,
		}),

		head() {
			return {
				title: this.network.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.network.meta_description },
					{ name: 'keywords', content: this.network.meta_keywords },
				],
			}
		},

		mounted() {
			eventBus.$on('filter:toggle', () => {
				this.toggleMobileFilter()
			})
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				network: 'networks/network',
				rooms: 'rooms/rooms',
				filters: 'networks/filters',
				related: 'networks/related',
				posts: 'networks/posts',
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
					network_id: this.network.id,
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
			await this.$axios
				.get(`network/${this.pageable.slug}`, {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.loading = false
					this.$store.commit('networks/FETCH_NETWORK', {
						network: response.data.item,
					})
					this.$store.commit('networks/FETCH_POSTS', {
						posts: response.data.posts,
					})
					this.$store.commit('networks/FETCH_RELATED', {
						related: response.data.related,
					})
				})
				.catch(e => {})

			await this.$axios
				.get('rooms/list', {
					params: {
						geo: this.geo,
						per_page: this.per_page,
						network_id: this.network.id,
					},
				})
				.then(response => {
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
					this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
				})
				.catch(e => {})

			await this.$axios
				.get(`/network/filters/list`, {
					params: {
						geo: this.geo,
						network_id: this.network.id,
					},
				})
				.then(response => {
					this.$store.commit('networks/FETCH_FILTERS', {
						filters: response.data,
					})
				})
		},

		watch: {},

		created() {
			// this.geo = null
		},

		methods: {
			async fetchItems() {
				this.$nuxt.$loading.start()

				await this.$axios
					.get(`/network/filters/list`, {
						params: {
							geo: this.geo,
							network_id: this.network.id,
						},
					})
					.then(response => {
						this.$store.commit('networks/FETCH_FILTERS', {
							filters: response.data,
						})
					})

				await this.$axios
					.get(`rooms/list`, { params: this.params })
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
				// history.replaceState({}, null, `${this.$route.path}/page/${number}`)
			},

			handleShowMore() {
				this.per_page = parseInt(this.per_page) + 6
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

			urlLit(w, v) {
				let tr = 'a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(
					' '
				)
				let ww = ''
				w = w.toLowerCase()
				for (let i = 0; i < w.length; ++i) {
					let cc = w.charCodeAt(i)
					var ch = cc >= 1072 ? tr[cc - 1072] : w[i]
					if (ch && ch.length < 3) ww += ch
					else if (ch) ww += eval(ch)[v]
				}
				return ww
					.replace(/[^a-zA-Z0-9\-]/g, '-')
					.replace(/[-]{2,}/gim, '-')
					.replace(/^\-+/g, '')
					.replace(/\-+$/g, '')
			},
		},
	}
</script>

<style lang="scss">
	.network {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		column-gap: 28px;
		grid-template-areas:
			'breadcrumbs breadcrumbs breadcrumbs'
			'header header header'
			'rooms-title rooms-title .'
			'rooms rooms aside'
			'toc article aside'
			'posts posts posts'
			'network-list network-list network-list';
		&__breadcrumbs {
			grid-area: breadcrumbs;
		}
		&__aside {
			grid-area: aside;
		}
		&__header {
			grid-area: header;
		}
		&__rooms-title {
			grid-area: rooms-title;
		}
		&__rooms {
			grid-area: rooms;
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
		&__topics {
			grid-area: topics;
		}
		&__posts {
			grid-area: posts;
			margin-bottom: 0;
		}
		&__network-list {
			grid-area: network-list;
			&__list {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				column-gap: 28px;
				row-gap: 24px;
			}

			.block-title {
				margin-top: 0;
			}
		}

		.pagination {
			margin-bottom: 0;
		}
	}

	.network-filters {
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

	.network-rooms {
		margin-bottom: 40px;
		&__title {
			margin-bottom: 20px;
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #222222;
		}
	}

	@include mq('desktop') {
		.network {
			column-gap: 24px;
			grid-template-columns: 2fr minmax(704px, 7fr) minmax(288px, 3fr);
			&__toc {
				padding-right: 0px;
			}
			&__article {
				padding-left: 0px;
				padding-right: 0px;
			}
		}
	}

	@include mq('laptop') {
		.network {
			@include paddings('tablet');
			grid-template-columns: 100%;
			grid-template-areas:
				'breadcrumbs'
				'header'
				'rooms-title'
				'rooms'
				'toc'
				'article'
				'aside'
				'posts'
				'network-list';

			&__network-list {
				margin-right: -24px;
				&__list {
					overflow-x: scroll;
					@include hide-scroll();
					grid-template-columns: none;
					grid-auto-columns: 350px;
					grid-auto-flow: column;
					gap: 20px;
				}
			}
		}

		.network-rooms {
			margin-bottom: 12px;
		}
	}

	@include mq('tablet') {
		.network {
			@include paddings('mobile');
			&__rooms {
				&__item {
					margin-left: -21px;
					margin-right: -20px;
				}
			}
			&__network-list {
				margin-right: -20px;
				&__list {
					grid-auto-columns: 288px;
					gap: 16px;
				}
			}
		}
	}
</style>
