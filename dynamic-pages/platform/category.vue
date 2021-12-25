<template>
	<div v-if="category" class="platforms">
		<div class="platforms-header">
			<breadcrumb-list :white="true" />
			<h1 class="platforms__title">{{ pageable.title }}</h1>
			<common-text-spoiler
				:limit="$device.isMobile || $device.isTablet ? 100 : 600"
				class="platforms__summary"
				:text="pageable.summary"
			>
				<template v-slot:button>
					<svg-icon icon="spoiler-sep" width="35" height="16" />
				</template>
			</common-text-spoiler>
		</div>

		<div class="platforms-list">
			<platform-item
				v-for="item in platforms"
				:key="item.slug"
				:title="item.title"
				:icon="`${item.icon}-large`"
				:rooms="item.rooms_count"
				:page="item.page"
			>
			</platform-item>
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
						<!-- Comments -->
<!-- 						<comments
							commentable_type="App\PlatfofmCategory"
							:commentable_id="category.id"
						/> -->
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
						category: response.data.category,
					})

					this.$store.commit('platforms/FETCH_PLATFORMS', {
						platforms: response.data.platforms
					})
				})
				.catch(e => {

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
	$platforms-bg: url('~assets/i/mobile-poker-bg.jpg');

	.platforms-header {
		display: flex;
		flex-direction: column;
		margin-left: -26px;
		margin-right: -26px;
		@include paddings('desktop');
		margin-bottom: 32px;
		padding-bottom: 32px;
		// background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #BA2B2B 0%, #5A0101 100%);
		background: $platforms-bg no-repeat center;
		background-size: cover;
	}

	.platforms-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 28px;
		margin-bottom: 20px;
	}

	.platforms {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
	}
	.platforms__title {
		text-align: center;
		margin: 0 0 16px 0;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 32px;
		line-height: 36px;
		color: #ffffff;
	}

	.platforms__summary {
		font-family: Proxima Nova;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		color: #ffffff;
		opacity: 0.8;
	}

	@include mq('laptop') {
		.platforms {
			@include paddings('tablet');
		}

		.platforms-header {
			margin-left: -24px;
			margin-right: -24px;
			@include paddings('tablet');
		}

		.platforms-list {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 20px;
		}
	}

	@include mq('tablet') {
		.platforms {
			@include paddings('mobile');
		}

		.platforms-header {
			margin-left: -20px;
			margin-right: -20px;
			@include paddings('mobile');
			margin-bottom: 24px;
		}

		.platforms-list {
			grid-template-columns: 1fr;
			margin-bottom: 8px;
		}
	}
</style>
