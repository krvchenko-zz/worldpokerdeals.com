<template>
	<div class="games">
		<div class="games-header">
			<breadcrumb-list :white="true" />
			<h1 class="games__title">{{ category.title }}</h1>
			<div class="games__summary" v-html="category.summary"></div>
		</div>

		<div class="games-list">
			<platform-item
				v-for="item in platforms"
				:key="item.slug"
				:title="item.title"
				:icon="`${item.icon}-large`"
				:rooms="item.rooms"
				:page="item.page"
			>
			</platform-item>
		</div>

		<div class="article-container">
			<div class="article-container__toc">
				<toc-list v-if="category.toc">
					<template #default="{ inline }">
						<toc-item
							v-for="(item, index) in category.toc"
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

			<div class="article-container__article">
				<page-article :text="category.text">
					<template #footer>
						<!-- Faq -->
						<faq-list
							v-if="category.faq && category.faq.mainEntity.length"
							label="FAQ"
						>
							<faq-item
								v-for="(item, index) in category.faq.mainEntity"
								:key="index"
								:question="item.name"
								:answer="item.acceptedAnswer.text"
							>
							</faq-item>
						</faq-list>
						<!-- Author -->
						<author v-if="category.author" :author="category.author" />
						<!-- Comments -->
						<comments
							commentable_type="App\PlatfofmCategory"
							:commentable_id="category.id"
						/>
					</template>
				</page-article>
			</div>

			<div class="article-container__aside-content">
				<room-top-list />
				<topic-list v-if="category.topics && category.topics.length">
					<topic-item
						v-for="(item, index) in category.topics"
						:key="index"
						:title="item.title"
						:url="item.url"
						:author="item.author"
						:created="item.created_at"
					/>
				</topic-list>
				<post-list v-if="posts">
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
					></post-item>
				</post-list>
				<game-search-banner />
			</div>
		</div>

		<page-banners />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PlatformCategory',

		components: {},

		head() {
			return {
				title: this.category.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category.meta_description },
					{ name: 'keywords', content: this.category.meta_keywords },
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				category: 'platforms/category',
				platforms: 'platforms/platforms',
				posts: 'posts/posts',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {
			await this.$axios
				.get(`platforms/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('platforms/FETCH_CATEGORY', {
						category: {
							id: response.data.id,
							title: response.data.title,
							summary: response.data.summary,
							toc: response.data.toc,
							faq: response.data.faq,
							text: response.data.text,
							topics: response.data.topics.map(this.mapTopics),
							meta_title: response.data.meta_title,
							meta_description: response.data.meta_description,
							meta_keywords: response.data.meta_keywords,
							author: response.data.author
								? {
										username: response.data.author.username,
										full_name: response.data.author.full_name,
										image: response.data.author.image
											? {
													filename: response.data.author.image.filename,
											  }
											: null,
								  }
								: null,
						},
					})
				})
				.then()

			await this.$axios.get('platforms/list').then(response => {
				this.$store.commit('platforms/FETCH_PLATFORMS', {
					platforms: response.data.map(item => ({
						title: item.heading,
						icon: item.icon,
						page: {
							slug: item.page.slug,
							parent: item.page.parent
								? {
										slug: item.page.parent.slug,
								  }
								: null,
						},
						rooms: item.rooms_count,
					})),
				})
			})

			await this.$axios
				.get('posts/list', {
					params: {
						locale: this.locale,
						per_page: 5,
						order: 'created_at',
						sort: 'desc',
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POSTS', {
						posts: response.data.data.map(this.mapPosts),
					})
				})
		},

		watch: {},

		mounted() {},

		created() {},

		methods: {
			mapPosts(item) {
				return {
					image: {
						filename: item.image.filename,
						alt: item.image.alt,
					},
					title: item.title,
					summary: item.summary,
					slug: item.slug,
					user: {
						image: {
							filename: item.image.filename,
							alt: item.image.alt,
						},
						full_name: item.user.full_name,
					},
					created_at: item.created_at,
				}
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
		},
	}
</script>

<style lang="scss">
	$games-bg: url('~assets/i/mobile-poker-bg.jpg');

	.games-header {
		display: flex;
		flex-direction: column;
		margin-left: -26px;
		margin-right: -26px;
		@include paddings('desktop');
		margin-bottom: 32px;
		padding-bottom: 32px;
		// background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #BA2B2B 0%, #5A0101 100%);
		background: $games-bg no-repeat center;
		background-size: cover;
	}

	.games-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 28px;
		margin-bottom: 20px;
	}

	.games {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
	}
	.games__title {
		text-align: center;
		margin: 0 0 16px 0;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 32px;
		line-height: 36px;
		color: #ffffff;
	}

	.games__summary {
		font-family: Proxima Nova;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		color: #ffffff;
		opacity: 0.8;
	}

	@include mq('laptop') {
		.games {
			@include paddings('tablet');
		}

		.games-header {
			margin-left: -24px;
			margin-right: -24px;
			@include paddings('tablet');
		}

		.games-list {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 20px;
		}
	}

	@include mq('tablet') {
		.games {
			@include paddings('mobile');
		}

		.games-header {
			margin-left: -20px;
			margin-right: -20px;
			@include paddings('mobile');
		}

		.games-list {
			grid-template-columns: 1fr;
		}
	}
</style>
