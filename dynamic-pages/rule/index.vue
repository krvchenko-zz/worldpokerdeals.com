<template>
	<div v-if="rule" class="rule">
		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" />
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="col-auto">
					<toc-list v-if="rule.toc">
						<template #default="{ inline }">
							<toc-item
								v-for="(item, index) in rule.toc"
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
					<page-article :text="rule.text" :title="rule.heading">
						<template #footer>
							<!-- Faq -->
							<faq-list
								v-if="rule.faq && rule.faq.mainEntity.length"
								:label="$t('faq')"
							>
								<faq-item
									v-for="(item, index) in rule.faq.mainEntity"
									:key="index"
									:question="item.name"
									:answer="item.acceptedAnswer.text"
								>
								</faq-item>
							</faq-list>
							<!-- Author -->
							<author v-if="rule.author" :author="rule.author" />
							<!-- Comments -->
<!-- 							<comments
								commentable_type="App\PokerRule"
								:commentable_id="rule.id"
							/> -->
						</template>
					</page-article>
				</div>

				<div class="col-3">
					<room-top-list />

					<topic-list v-if="rule.topics">
						<topic-item
							v-for="(item, index) in rule.topics"
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import Pagination from '~/components/pagination/Pagination'
	import Comments from '~/components/comments/Comments'
	import Room from '~/components/room/Room'

	export default {
		name: 'RulePage',

		components: {
			Pagination,
			Comments,
			Room,
		},

		data: () => ({
			loading: false,
		}),

		head() {
			return {
				title: this.rule ? this.rule.meta_title : '',
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.rule ? this.rule.meta_description : '' },
					{ name: 'keywords', content: this.rule ? this.rule.meta_keywords : '' },
				],

				script: [{ type: 'application/ld+json', json: this.rule ? this.rule.faq : '' }],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				rule: 'rules/rule',
				posts: 'posts/posts',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		async fetch() {
			await this.$axios.get(`rules/${this.pageable.slug}`).then(response => {
				this.$store.commit('rules/FETCH_RULE', {
					rule: {
						id: response.data.id,
						title: response.data.title,
						heading: response.data.heading,
						toc: response.data.toc,
						text: response.data.text,
						topics: response.data.topics.map(this.mapTopics),
						meta_title: response.data.meta_title,
						meta_description: response.data.meta_description,
						meta_keywords: response.data.meta_keywords,
						author: {
							username: response.data.author.username,
							full_name: response.data.author.full_name,
							image: response.data.author.image
								? {
										filename: response.data.author.image.filename,
								  }
								: null,
						},
					},
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

<style lang="scss"></style>
