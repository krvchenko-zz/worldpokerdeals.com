<template>
	<div class="post">
		<breadcrumb-list v-if="pageable" />

		<div class="article-container post__news">
			<toc-list v-if="post.toc" class="article-container__toc post__aside-toc">
				<template #default="{ inline }">
					<toc-item
						v-for="(item, index) in post.toc"
						:key="index"
						:index="index"
						:inline="inline"
						:anchor="item.anchor_id"
						:text="item.text"
					>
					</toc-item>
					<post-subscribe />
				</template>
			</toc-list>

			<div class="poker-rule__wrap article-container__article">
				<!-- Article -->
				<page-article
					:text="post.text"
					:title="post.title"
					:image="post.image"
					:summary="post.summary"
				>
					<template #header>
						<toc-list v-if="post.toc" class="post__header-toc">
							<template #default="{ inline }">
								<toc-item
									v-for="(item, index) in post.toc"
									:key="index"
									:index="index"
									:inline="inline"
									:anchor="item.anchor_id"
									:text="item.text"
								>
								</toc-item>
							</template>
						</toc-list>
					</template>
				</page-article>
				<!-- Faq -->
				<faq-list v-if="post.faq && post.faq.mainEntity.length" :label="$t('faq')">
					<faq-item
						v-for="(item, index) in post.faq.mainEntity"
						:key="index"
						:question="item.name"
						:answer="item.acceptedAnswer.text"
					>
					</faq-item>
				</faq-list>
				<!-- Author -->
				<author v-if="post.user" :author="post.user" />
				<!-- Comments -->
				<!-- <comments commentable_type="App\Post" :commentable_id="post.id" /> -->
			</div>

			<div class="article-container__aside-content">
				<room-top-list />

				<post-list label="Это важно" featured :asRow="$device.isTablet">
					<post-item
						v-for="item in important"
						:key="item.id"
						:medium="false"
						:image="item.image"
						:title="item.title"
						:summary="item.summary"
						:slug="item.slug"
						:author="item.user"
						:created="item.created_at"
						:categories="item.categories"
					/>
				</post-list>

				<post-list v-if="posts" :asRow="$device.isTablet">
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
					></post-item>
				</post-list>
			</div>
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="related"
				label="Похожие статьи"
				:asRow="$device.isDesktopOrTablet"
			>
				<post-item
					v-for="(item, index) in related"
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		components: {
			LazyHydrate,
		},

		data: () => ({
			loading: false,
		}),
		head() {
			return {
				title: this.post.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.post.meta_description },
					{ name: 'keywords', content: this.post.meta_keywords },
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				post: 'posts/post',
				posts: 'posts/posts',
				important: 'posts/important',
				related: 'posts/related',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		async fetch() {
			await this.$axios
				.get(`posts/${this.pageable.slug}`, {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POST', { post: response.data.item })
					this.$store.commit('posts/FETCH_RELATED', {
						related: response.data.related,
					})
				})

			await this.$axios
				.get('posts/list', {
					params: {
						locale: this.locale,
						per_page: 3,
						order: 'created_at',
						sort: 'desc',
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POSTS', { posts: response.data.data })
				})

			await this.$axios
				.get('/posts/list', {
					params: {
						top: 1,
						locale: this.locale,
						sort: 'desc',
						order: 'created_at',
						per_page: 4,
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_IMPORTANT', {
						important: response.data.data,
					})
					this.loading = false
					this.$nuxt.$loading.finish()
				})
				.catch(e => {})
		},

		watch: {},

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
					categories: item.categories,
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
	.post {
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		&__news {
			margin-top: 8px;
		}
		&__header-toc {
			display: none;
		}
	}

	@include mq('laptop') {
		.post {
			@include paddings('tablet');
			&__header-toc {
				display: block;
			}
			&__aside-toc {
				display: none;
			}
		}
	}

	@include mq('tablet') {
		.post {
			@include paddings('mobile');
			&__news {
				margin-top: 0px;
			}
		}
	}
</style>
