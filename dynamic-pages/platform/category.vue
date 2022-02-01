<template>
	<div class="platforms-page">
		<div class="platforms">
			<hub-header
				class="platforms-header"
				:title="pageable.title"
				:summary="pageable.summary"
				background="mobile-poker-bg.jpg"
			/>

			<div class="platforms-list">
				<nav-box-item
					v-for="(item, index) in platforms"
					:key="index"
					:title="item.title"
					:icon="`${item.icon}-large`"
					:rooms="item.rooms_count"
					:page="item.page"
				/>
			</div>

			<div class="article-container">
				<div class="article-container__toc">
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

				<div class="article-container__article">
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
						</template>
					</page-article>
				</div>

				<div class="article-container__aside-content">
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
					<post-list v-if="posts">
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
						></post-item>
					</post-list>
					<game-search-banner />
				</div>
			</div>

			<page-banners />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PlatformCategory',

		components: {},

		head() {
			return {
				meta: [
				],

				link: [
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				platforms: 'platforms/platforms',
				posts: 'posts/posts',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {
			await this.$axios.get('platforms/list').then(response => {
				this.$store.commit('platforms/FETCH_PLATFORMS', {
					platforms: response.data,
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
						posts: response.data.data,
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

	.platforms {
		&-page {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
		}
	}

	.platforms-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 28px;
		margin-bottom: 20px;
	}

	@include mq('laptop') {
		.platforms-page {
			@include paddings('laptop');
		}
		.platforms-list {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 20px;
		}
	}

	@include mq('tablet') {
		.platforms-page {
			@include paddings('tablet');
		}
		.platforms-list {
			grid-template-columns: 1fr;
			margin-bottom: 8px;
		}
	}

	@include mq('mobile') {
		.platforms-page {
			@include paddings('mobile');
		}
	}
</style>
