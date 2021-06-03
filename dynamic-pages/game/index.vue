<template>
	<div class="game">
		<breadcrumb-list v-if="pageable" class="game__breadcrumbs" />
		<game-header class="game__header" />

		<div v-if="tab.show_rooms" class="game-rooms">
			<div class="game-filters">
				<div v-if="data.length" class="game-filters__info">
					Показано {{ total }} из {{ overall }} покер-румов
				</div>
				<div v-if="data.length" class="game-filters__geo">
					<geo-switcher
						:value="country.code"
						:geo.sync="geo"
						@change="fetchItems"
					/>
				</div>
			</div>

			<div class="game-rooms__list">
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

		<div class="game__toc">
			<toc-list v-if="tab.toc">
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

		<div class="game__article">
			<!-- Article -->
			<page-article :text="tab.text">
				<template #footer>
					<!-- Faq -->
					<faq-list v-if="tab.faq && tab.faq.mainEntity.length" label="FAQ">
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
					<comments commentable_type="App\Tab" :commentable_id="tab.id" />
				</template>
			</page-article>
		</div>

		<div class="game__aside">
			<game-filters
				v-if="tab.show_rooms && filters"
				:geo="geo"
				:kycs="filters.kycs"
				:platforms="filters.platforms"
				:tags="filters.tags"
				:payments="filters.payments"
				:types="filters.types"
				:licenses="filters.licenses"
				@change="handleFilterChange"
			/>

			<room-top-list />
			<!-- <room-top-list v-sticky="{topSpacing: 100}" /> -->

			<topic-list v-if="tab.topics">
				<topic-item
					v-for="(item, index) in tab.topics"
					:key="index"
					:title="item.title"
					:url="item.url"
					:author="item.author"
					:created="item.created_at"
				/>
			</topic-list>
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts.length"
				class="game__news"
				:label="`Новости ${game.title}`"
			>
				<div class="game__news__list">
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
				</div>
			</post-list>
		</lazy-hydrate>

		<lazy-hydrate when-visible>
			<div v-if="games.length" class="game__games-list games-list">
				<div class="block-title">Другие покерные игры</div>
				<div class="game__games-list__list">
					<game-item
						v-for="item in games"
						:key="item.slug"
						:center="true"
						:title="item.title"
						:icon="item.icon"
						:rooms="item.rooms_count"
						:page="item.page"
					>
					</game-item>
				</div>
			</div>
		</lazy-hydrate>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'GamePage',

		components: {
			LazyHydrate,
		},

		data: () => ({
			// loading: true,
			loading: false,
			per_page: 5,
			page: 1,
			sort: 'rating',
			order: 'desc',
			geo: null,
			game_id: null,
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
		}),

		head() {
			return {
				title: this.game.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.game.meta_description },
					{ name: 'keywords', content: this.game.meta_keywords },
				],

				script: [{ type: 'application/ld+json', json: this.tab.faq }],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				game: 'games/game',
				games: 'games/games',
				tab: 'games/tab',
				rooms: 'rooms/rooms',
				best: 'rooms/best',
				posts: 'posts/posts',
				filters: 'games/filters',
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
					game_id: this.game.id,
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
			await this.$axios.get(`games/${this.pageable.slug}`).then(response => {
				this.$store.commit('games/FETCH_GAME', { game: response.data.game })
				this.$store.commit('games/FETCH_TAB', { tab: response.data.tab })
				this.$store.commit('posts/FETCH_POSTS', { posts: response.data.posts })
				this.$store.commit('games/FETCH_GAMES', {
					games: response.data.related,
				})
			})

			await this.$axios
				.get('rooms/list', {
					params: {
						geo: this.country.code,
						per_page: this.per_page,
						sort: 'rating',
						order: 'desc',
						game_id: this.game.id,
					},
				})
				.then(response => {
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
					this.$store.commit('rooms/FETCH_ROOMS', {
						rooms: response.data.data,
					})
					this.$store.commit('rooms/FETCH_BEST', {
						best: response.data.data[0],
					})
				})
				.catch(e => {})

			await this.$axios
				.get(`/games/filters/list`, {
					params: {
						geo: this.country.code,
						game_id: this.game.id,
						ids: this.tab.list,
					},
				})
				.then(response => {
					this.$store.commit('games/FETCH_FILTERS', {
						filters: response.data,
					})
				})
		},

		watch: {},

		created() {
			this.geo = this.country.code
		},

		methods: {
			async fetchItems() {
				this.$nuxt.$loading.start()

				await this.$axios
					.get(`/games/filters/list`, {
						params: {
							geo: this.geo,
							game_id: this.game.id,
							ids: this.tab.list,
						},
					})
					.then(response => {
						this.$store.commit('games/FETCH_FILTERS', {
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

			handleSortChange(order) {
				this.sort = order
				this.fetchItems()
			},

			handleFilterChange(selected) {
				Object.keys(selected).forEach(key => {
					this[key] = selected[key]
				})
				this.fetchItems()
			},
		},
	}
</script>

<style lang="scss">
	.game {
		width: 100%;
		max-width: 1440px;
		@include paddings('desktop');
		display: grid;
		grid-template-columns: 2fr minmax(0, 7fr) 3fr;
		grid-template-areas:
			'breadcrumbs breadcrumbs breadcrumbs'
			'header header header' 'game-rooms game-rooms aside'
			'toc article aside'
			'news news news'
			'games-list games-list games-list';
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
			&__list {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				column-gap: 28px;
			}
		}
		&__games-list {
			grid-area: games-list;
			&__list {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				column-gap: 20px;
			}
		}
	}

	.game-filters {
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

	.game-rooms {
		grid-area: game-rooms;
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
		.game {
			@include paddings('tablet');
			grid-template-columns: 100%;
			grid-template-areas:
				'breadcrumbs'
				'header'
				'game-rooms'
				'toc'
				'article'
				'aside'
				'news'
				'games-list';
			&__games-list {
				&__list {
					grid-template-columns: repeat(2, 1fr);
				}
			}
		}
	}

	@include mq('tablet') {
		.game {
			@include paddings('mobile');
			&__news {
				margin-right: -20px;
				&__list {
					overflow-x: scroll;
					scrollbar-width: none;
					grid-template-columns: none;
					grid-auto-columns: 288px;
					grid-auto-flow: column;
					column-gap: 16px;
				}
			}
			&__games-list {
				margin-right: -20px;
				&__list {
					overflow-x: scroll;
					scrollbar-width: none;
					grid-template-columns: none;
					grid-auto-columns: 288px;
					grid-auto-flow: column;
					column-gap: 16px;
				}
			}
		}

		.game-rooms__list {
			margin-right: -20px;
			margin-left: -21px;
		}
	}
</style>
