<template>
	<div class="post">
		<breadcrumb-list />

		<div class="article-container post__news">
			<toc-list v-if="pageable.toc" class="article-container__toc post__aside-toc">
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
					<post-subscribe />
				</template>
			</toc-list>

			<div class="poker-rule__wrap article-container__article">
				<!-- Article -->
				<page-article
					:text="pageable.text"
					:title="pageable.title"
					:image="post.image"
					:author="pageable.author.full_name"
					:summary="pageable.summary"
					:created="pageable.created_at"
					:updated="pageable.updated_at"
					:meta="true"
					:loading="$fetchState.pending"
				>
					<template #header>
						<toc-list v-if="pageable.toc" class="post__header-toc">
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
					</template>
				</page-article>
				<!-- Faq -->
				<faq-list v-if="pageable.faq && pageable.faq.mainEntity.length" :label="$t('faq')">
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
			</div>

			<aside class="article-container__aside-content">
				<room-top-list />

				<lazy-hydrate when-visible>
					<post-list :label="$t('blog_important')" featured>
						<post-item
							v-for="item in important"
							:key="item.id"
							:medium="false"
							:image="item.image"
							:title="item.page.title"
							:summary="item.page.summary"
							:slug="item.page.slug"
							:author="item.page.author"
							:created="item.page.created_at"
							:categories="item.categories"
						/>
					</post-list>
				</lazy-hydrate>

				<lazy-hydrate when-visible>
					<post-list v-if="recent" :asRow="$device.isTablet || isTablet || isMobile" class="posts_recent">
						<post-item
							v-for="(item, index) in recent"
							:key="index"
							:image="item.image"
							:title="item.page.title"
							:summary="item.page.summary"
							:slug="item.page.slug"
							:author="item.page.author"
							:created="item.page.created_at"
							:categories="item.categories"
							:medium="true"
							:asCard="$device.isMobile"
						></post-item>
					</post-list>
				</lazy-hydrate>
			</aside>
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="related"
				class="posts_related"
				:label="$t('posts_related')"
				:asRow="$device.isDesktop || $device.isTablet"
			>
				<post-item
					v-for="(item, index) in related"
					:key="index"
					:image="item.image"
					:title="item.page.title"
					:summary="item.page.summary"
					:slug="item.page.slug"
					:author="item.page.author"
					:created="item.page.created_at"
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
				meta: [
					{ hid: 'og:image', name: 'og:image', content: this.post ? this.ogImage : '' },
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
				recent: 'posts/recent',
				isTablet: 'ui/isTablet',
				isMobile: 'ui/isMobile',
				isDesktop: 'ui/isDesktop',
				isReady: 'ui/isReady',
			}),

			ogImage() {
				return `${process.env.mediaUrl}/article-large/${this.post.image.filename}`
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
					this.$store.commit('posts/FETCH_POST', {
						post: response.data.item
					})
					this.$store.commit('posts/FETCH_RELATED', {
						related: response.data.related,
					})
					this.$store.commit('posts/FETCH_RECENT', {
						recent: response.data.recent
					})
					this.$store.commit('posts/FETCH_IMPORTANT', {
						important: response.data.important,
					})
				})
		},

		watch: {},

		created() {},

		methods: {},
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
