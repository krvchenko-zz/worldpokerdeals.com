<template>
	<div class="soft">
		<breadcrumb-list v-if="pageable" />

		<soft-header />

		<div class="article-container">
			<div class="article-container__toc">
				<toc-list v-if="tab.toc">
					<toc-item
						v-for="(item, index) in tab.toc"
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

			<div class="article-container__aside-content">
				<room-top-list />

				<post-list>
					<post-item
						v-for="item in recent"
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

				<topic-list v-if="tab.topics.length">
					<topic-item
						v-for="(item, index) in tab.topics"
						:key="index"
						:title="item.title"
						:url="item.url"
						:author="item.author"
						:created="item.created_at"
					/>
				</topic-list>

				<game-search-banner />
			</div>
		</div>

		<lazy-hydrate when-visible>
			<post-list
				v-if="posts && posts.length"
				:label="`Новости`"
				class="soft__news-wrapper"
			>
				<div class="soft__news">
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
			<soft-list
				v-if="related && related.length"
				label="Похожий софт"
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
				title: this.tab.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.tab.meta_description },
					{ name: 'keywords', content: this.tab.meta_keywords },
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
				soft: 'soft/soft',
				tab: 'soft/tab',
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
				this.$store.commit('soft/FETCH_TAB', { tab: response.data.tab })
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
