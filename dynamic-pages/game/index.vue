<template>
	<div class="game">
		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" />
			<game-header />
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="col-9">
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

					<div class="row">
						<div class="col-auto">
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

						<div class="col col-article">
							<!-- Article -->
							<page-article :text="tab.text">
								<template #footer>
									<!-- Faq -->
									<faq-list
										v-if="tab.faq && tab.faq.mainEntity.length"
										label="FAQ"
									>
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
									<comments
										commentable_type="App\Tab"
										:commentable_id="tab.id"
									/>
								</template>
							</page-article>
						</div>
					</div>
				</div>

				<div class="col-3">
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
			</div>

			<lazy-hydrate when-visible>
				<post-list v-if="posts.length" :label="`Новости ${game.title}`">
					<div class="row">
						<div v-for="(item, index) in posts" :key="index" class="col-3">
							<post-item
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
					</div>
				</post-list>
			</lazy-hydrate>

			<lazy-hydrate when-visible>
				<div v-if="games.length" class="games-list">
					<div class="block-title">Другие покерные игры</div>
					<div class="row">
						<div v-for="item in games" :key="item.slug" class="col">
							<game-item
								:center="true"
								:title="item.title"
								:icon="item.icon"
								:rooms="item.rooms_count"
								:page="item.page"
							>
							</game-item>
						</div>
					</div>
				</div>
			</lazy-hydrate>
		</div>
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
			per_page: 10,
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
						per_page: 10,
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
		margin-bottom: 40px;
		&__title {
			margin-bottom: 20px;
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #222222;
		}
	}
</style>
