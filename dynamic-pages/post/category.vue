<template>
	<div class="post-category">
		<post-category-header class="post-category__header" />

		<filter-tab-list class="post-category__filter">
			<filter-tab-item
				:label="$t('all_posts')"
				:value="null"
				:active="category_id === null"
				@click="handleFilter(null)"
			/>
			<filter-tab-item
				v-for="item in categories"
				:key="item.id"
				:label="item.title"
				:value="item.id"
				:active="item.id === category_id"
				@click="handleFilter(item.id, item.slug)"
			/>
		</filter-tab-list>

		<div class="post-category__news">
			<post-item
				v-for="item in posts"
				:key="item.id"
				:medium="true"
				:style="{ marginBottom: '28px' }"
				:image="item.image"
				:title="item.title"
				:summary="item.summary"
				:slug="item.slug"
				:author="item.user"
				:created="item.created_at"
				:categories="item.categories"
			/>
		</div>

		<pagination
			v-if="posts"
			:last="last_page"
			:current="current_page || page"
			:prev-url="prev_page_url"
			:next-url="next_page_url"
			:total="total"
			:from="from"
			:to="to"
			:url="true"
			:show-load-more="false"
			:load-more-text="$t('show_more')"
			@next="handlePageNext"
			@prev="handlePagePrev"
			@change="handlePageChange"
			@more="handleShowMore"
			class="post-category__pagination"
		>
		</pagination>

		<div v-if="important" class="post-category__aside aside">
			<div class="blog-subscribe">
				<div class="blog-subscribe__title">{{ $t('blog_banner.title') }}</div>
				<div class="blog-subscribe__text">{{ $t('blog_banner.text') }}</div>
				<div class="blog-subscribe__contacts">
					<button-contact
						icon type="telegram"
						target="_blank"
						rel="nofollow noopener"
						href="worldpokerdealsRU" />
					<button-contact
						icon
						type="instagram"
						target="_blank"
						rel="nofollow noopener"
						href="https://instagram.com/worldpokerdeals"
					/>
					<button-contact
						icon
						type="fb"
						target="_blank"
						rel="nofollow noopener"
						href="https://www.facebook.com/worldpokerdealsRu"
					/>
					<button-contact
						icon
						type="vk"
						target="_blank"
						rel="nofollow noopener"
						href="https://vk.com/worldpokerdeals"
					/>
				</div>
			</div>
			<post-list :label="$t('blog_important')" featured>
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

			<front-telegram />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		head () {
			return {
				title: this.$route.params.page ? `${this.pageable.meta_title} | Page ${this.$route.params.page}` : this.pageable.meta_title,
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: this.$route.params.page ? `${this.pageable.meta_description} | Page ${this.$route.params.page}` : this.pageable.meta_description
					},
				],
			}
		},

		components: {},

		props: {},

		data: () => ({
			loading: false,
			per_page: 12,
			page: 1,
			sort: 'desc',
			order: 'created_at',
			category_id: null,
			// data: [],
			from: 0,
			to: 0,
			next_page_url: null,
			prev_page_url: null,
			current_page: null,
			last_page: null,
			total: 0,
		}),

		created() {},

		// fetchOnServer: false,

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				category: 'post/category',
				categories: 'posts/categories',
				posts: 'posts/posts',
				important: 'posts/important',
			}),
		},

		async fetch() {

			await this.$axios
				.get('/posts/categories/list', { params: {} })
				.then(response => {
					this.$store.commit('posts/FETCH_CATEGORIES', {
						categories: response.data,
					})
				})
				.catch(e => {})

			this.category_id = this.$route.query.category
				? this.categories.filter(item => {
						return item.slug === this.$route.query.category
					})[0].id
				: null

			await this.$axios
				.get('/posts/list', {
					params: {
						geo: this.country.code,
						locale: this.locale,
						sort: this.sort,
						order: this.order,
						page: this.$route.params &&  this.$route.params.page ? this.$route.params.page : this.page,
						per_page: this.per_page,
						post_category_id: this.category_id,
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POSTS', { posts: response.data.data })
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
				})
				.catch(e => {})

			await this.$axios
				.get('/posts/list', {
					params: {
						top: 1,
						locale: this.locale,
						sort: this.sort,
						order: this.order,
						per_page: 5,
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_IMPORTANT', {
						important: response.data.data,
					})
				})
				.catch(e => {})
		},

		watch: {
			'$route.query': 'fetchItems',
		},

		methods: {
			async fetchItems(query) {
				this.category_id =
					query && query.category
						? this.categories.filter(item => {
								return item.slug === query.category
							})[0].id
						: this.category_id

				$nuxt.$loading.start()
				await this.$axios
					.get('/posts/list', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							sort: this.sort,
							order: this.order,
							page: this.page,
							per_page: this.per_page,
							post_category_id: this.category_id,
						},
					})
					.then(response => {
						this.$store.commit('posts/FETCH_POSTS', {
							posts: response.data.data,
						})
						Object.keys(response.data).forEach(key => {
							this[key] = response.data[key]
						})
						this.loading = false
						this.$nuxt.$loading.finish()
					})
					.catch(e => {})
			},

			handleFilter(id, slug) {

				if (slug) {
					return this.$router.push({
						path: '/blog',
						query: slug ? { category: slug } : {},
					})
				}

				this.category_id = null

				this.$router.push({
					path: '/blog',
					query: null,
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
			},

			handleShowMore() {
				this.per_page = parseInt(this.per_page) + 6
				this.fetchItems()
			},

			handleSortChange(order) {
				this.sort = order
				this.fetchItems()
			},

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
		},
	}
</script>

<style lang="scss">
	.post-category {
		display: grid;
		width: 100%;
		max-width: 1440px;
		grid-template-columns: 28px 3fr 28px 1fr 28px;
		grid-template-areas:
			'header header header header header'
			'. filter . . .'
			'. news . aside .'
			'. pagination . aside .';
		&__header {
			grid-area: header;
		}
		&__filter {
			grid-area: filter;
			overflow: hidden;
		}
		&__news {
			grid-area: news;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 28px;
		}
		&__pagination {
			grid-area: pagination;
		}
		&__aside {
			grid-area: aside;
		}
	}

	.blog-subscribe {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: 'title' 'text' 'contacts';
		align-content: center;
		position: relative;
		min-height: 190px;
		border-radius: 12px;
		background: radial-gradient(
			163.35% 694.34% at 92.87% -12.37%,
			#47962c 0%,
			#194e06 100%
		);
		&__title {
			grid-area: title;
			margin-bottom: 4px;
			text-align: center;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 18px;
			line-height: 20px;
			text-align: center;
			color: #ffffff;
		}
		&__text {
			grid-area: text;
			margin-bottom: 16px;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			text-align: center;
			color: #ffffff;
		}
		&__contacts {
			grid-area: contacts;
			display: flex;
			justify-content: center;
			.btn-contact {
				margin-right: 12px;
			}
		}
	}

	@include mq('laptop') {
		.post-category {
			grid-template-columns: 24px 1fr 24px;
			grid-template-areas:
				'header header header'
				'. filter .'
				'. news .'
				'. pagination .'
				'. aside .';
			&__filter {
				margin-right: -24px;
			}
			&__news {
				column-gap: 20px;
				row-gap: 0;
			}
		}

		.blog-subscribe {
			align-items: center;
			justify-items: start;
			grid-template-columns: 1fr max-content;
			grid-template-areas: 'title contacts' 'text contacts';
			min-height: initial;
			padding: 20px 24px;
			&__title {
				text-align: left;
			}
			&__text {
				margin-bottom: 0;
				text-align: left;
			}
			&__contacts {
				margin-left: auto;
			}
		}
	}

	@include mq('tablet') {
		.post-category {
			grid-template-columns: 20px 1fr 20px;
			&__news {
				grid-template-columns: 100%;
				gap: 0;
			}
			&__pagination {
				flex-direction: column;
			}
			&__filter {
				margin-right: -20px;
			}
		}
		.blog-subscribe {
			grid-template-columns: 100%;
			grid-template-areas: 'title' 'text' 'contacts';
			justify-items: center;
			&__title {
				text-align: center;
				margin-bottom: 4px;
			}
			&__text {
				text-align: center;
				margin-bottom: 16px;
			}
			&__contacts {
				margin-right: auto;
			}
		}
	}

	@include mq('tablet') {
		.blog-subscribe {
			margin-top: 40px;
		}
	}

</style>
