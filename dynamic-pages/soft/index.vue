<template>
	<div v-if="pageable" class="soft">
		<breadcrumb-list v-if="pageable" />

		<soft-header v-if="soft" />

		<div class="article-container">
			<div class="article-container__toc">
				<toc-list v-if="pageable.toc && pageable.toc.length">
					<toc-item
						v-for="(item, index) in pageable.toc"
						:key="index"
						:index="index"
						:anchor="item.anchor_id"
						:text="item.text"
					>
					</toc-item>
				</toc-list>
			</div>

			<div class="article-container__article">
				<!-- Article -->
				<page-article :text="pageable.text">
					<template #footer>
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
						<!-- <comments commentable_type="App\Tab" :commentable_id="pageable.id" /> -->
					</template>
				</page-article>
			</div>

			<aside class="article-container__aside-content">
				<room-top-list />

				<post-list>
					<post-item
						v-for="item in recent"
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

				<topic-list v-if="pageable.topics.length">
					<topic-item
						v-for="(item, index) in pageable.topics"
						:key="index"
						:title="item.title"
						:url="item.url"
						:author="item.author"
						:created="item.created_at"
					/>
				</topic-list>

				<game-search-banner />
			</aside>
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts && posts.length"
				:label="$t('news')"
				class="soft__news-wrapper"
			>
				<div class="soft__news">
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
				</div>
			</post-list>
		</lazy-hydrate>

		<lazy-hydrate when-visible>
			<soft-list
				v-if="related && related.length"
				:label="$t('soft_related')"
				class="soft__soft-list-wrapper"
			>
				<div class="soft__similar-soft">
					<soft-item
						v-for="(item, index) in related"
						:key="index"
						:id="item.id"
						:title="item.title"
						:review="item.review"
						:url="item.url"
						:short_description="item.short_description"
						:discount="item.discount"
						:available="item.available"
						:discount_value="item.discount_value"
						:price="item.price"
						:image="item.image"
						:category="item.categories[0].title"
						:currency="item.currency ? item.currency.symbol : ''"
					/>
				</div>
			</soft-list>
		</lazy-hydrate>

		<!-- <page-banners /> -->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'SoftPage',

		components: {
			LazyHydrate,
		},

		data: () => ({
			loading: false,
		}),

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
				soft: 'soft/soft',
				related: 'soft/related',
				posts: 'soft/posts',
				recent: 'soft/recent',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		async fetch() {
			await this.$axios.get(`soft/${this.pageable.slug}`).then(response => {
				this.$store.commit('soft/FETCH_SOFT', { soft: response.data.soft })
				this.$store.commit('soft/FETCH_RELATED', {
					related: response.data.related,
				})
				this.$store.commit('soft/FETCH_POSTS', { posts: response.data.posts })
				this.$store.commit('soft/FETCH_RECENT', {
					recent: response.data.recent,
				})
			})
		},

		watch: {},

		mounted() {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.soft {
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		&__title {
			margin-bottom: 20px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 30px;
			line-height: 36px;
			letter-spacing: -0.3px;
			color: #222222;
		}

		&__wrap {
			padding: 0 30px;
		}
		&__news {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			column-gap: 28px;
		}
		&__similar-soft {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			column-gap: 28px;
			row-gap: 40px;
		}
	}

	@include mq('desktop') {
		.soft {
			&__similar-soft {
				column-gap: 24px;
			}
		}
	}

	@include mq('laptop') {
		.soft {
			@include paddings('tablet');
			&__news {
				grid-template-columns: repeat(3, 1fr);
				column-gap: 20px;
			}
			&__similar-soft {
				grid-template-columns: repeat(2, 1fr);
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.soft {
			@include paddings('mobile');
			&__news {
				grid-template-columns: none;
				grid-auto-columns: 288px;
				grid-auto-flow: column;
				column-gap: 16px;
			}
			&__similar-soft {
				grid-template-columns: none;
				grid-auto-columns: 288px;
				grid-auto-flow: column;
				column-gap: 16px;
			}
			&__news-wrapper {
				overflow-x: scroll;
				@include hide-scroll();
				margin-right: -20px;
			}
			&__soft-list-wrapper {
				overflow-x: scroll;
				@include hide-scroll();
				margin-right: -20px;
			}
		}
	}
</style>
