<template>
	<div class="network">
		<breadcrumb-list class="network__breadcrumbs" />

		<page-internal-header
			class="network__header"
			:title="pageable.title"
			:summary="pageable.summary"
			:author="pageable.author ? pageable.author.full_name : ''"
			:created="pageable.created_at"
			:updated="pageable.updated_at"
			:icon="network.url"
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

		<h2
			v-if="data.length"
			:id="urlLit($t('network_rooms', {title: network.title}))"
			class="network-rooms__title"
		>
			{{ $t('network_rooms', {title: network.title}) }}
		</h2>

		<div v-if="data.length" class="network__rooms network-rooms">
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

			<div v-if="$fetchState.pending" class="network-rooms__list">
				<lazy-skeleton-room v-for="(item, index) in parseInt(per_page)" :key="index" />
			</div>
			<div v-else class="network-rooms__list">
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

		<div class="network__toc">
			<toc-list v-if="pageable.toc && pageable.toc.length">
				<template #default="{ inline }">
					<toc-item
						:inline="inline"
						:anchor="urlLit($t('network_rooms', {title: pageable.title}))"
						:text="$t('network_rooms', {title: pageable.title})"
					>
					</toc-item>
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
		<page-article :text="pageable.text" class="network__article">
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
				<author v-if="pageable.user" :author="pageable.user" />
			</template>
		</page-article>

		<aside class="network__aside">
			<client-only>
				<div
					v-if="filters"
					class="network__filter-wrapper"
					:class="{ 'network__filter-wrapper--opened': showFilter }"
					@click.self="handleOutsideClick($event)"
				>
					<lazy-hydrate when-visible>
						<room-filters
							v-if="filters"
							class="network__filter"
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
			</client-only>

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
				:label="$t('entity_news', {entity: pageable.title})"
				class="network__posts"
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
			<div
				v-if="related"
				class="network-related"
			>
				<div class="block-title">{{ $t('other_networks') }}</div>
				<div class="network-related__list">
					<nav-box-item
						v-for="(item, index) in related"
						:key="index"
						:title="item.title"
						:icon="item.url"
						:rooms="item.rooms_count"
						:page="item.page"
					>
					</nav-box-item>
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
		name: 'NetworkPage',

		components: {
			LazyHydrate,
		},

		head() {
			return {
				meta: [
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
			cached: true,
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
				best: 'rooms/best',
				filters: 'rooms/filters',
				related: 'networks/related',
				posts: 'networks/posts',
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
					network_id: this.network.id,
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
				.get('rooms/list', { params: { ...this.params } })
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOMS', {
						rooms: response.data.data 
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
				})
				.catch(e => {})
		},

		watch: {},

		created() {
			this.geo = this.country.code
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
			background: radial-gradient(96.88% 66.11% at 57.43% 2.13%,#ccc 0,#f1f1f1 100%);
			&:before {
				display: none;
			}
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
			margin-top: 0!important;
			grid-area: posts;
		}
		&-related {
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
	}

	.network-rooms {
		margin-bottom: 40px;
		&__title {
			margin-bottom: 20px;
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #222222;
			grid-area: rooms-title;
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

			&-related {
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

		.network-rooms {
			margin-bottom: 12px;
		}
	}

	@include mq('tablet') {
		.network {
			@include paddings('mobile');
			&-rooms {
				&__list {
					margin-left: -20px;
					margin-right: -20px;
				}
			}
			&-related {
				margin-right: -20px;
				&__list {
					grid-auto-columns: 288px;
					gap: 16px;
				}
			}
		}
	}
</style>
