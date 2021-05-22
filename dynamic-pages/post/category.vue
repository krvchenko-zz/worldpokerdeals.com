<template>
	<div class="post-category">
		<post-category-header />

		<div class="container-fluid">
			<div class="row">
				<div class="col-9">
					<filter-tab-list>
						<filter-tab-item
							label="Все посты"
							:value="null"
							:active="category_id === null"
							@click="handleFilter"
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
				</div>
			</div>

			<div class="row">
				<div class="col-9">
					<div class="row">
						<div v-for="item in posts" :key="item.id" class="col-4">
							<post-item
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
					</div>

					<!-- Pagination -->
					<pagination
						v-if="posts"
						:last="last_page"
						:current="page"
						:prev-url="prev_page_url"
						:next-url="next_page_url"
						:total="total"
						:from="from"
						:to="to"
						load-more-text="Показать еще новости"
						@next="handlePageNext"
						@prev="handlePagePrev"
						@change="handlePageChange"
						@more="handleShowMore"
					>
					</pagination>
				</div>

				<div v-if="important" class="col-3">
					<post-list label="Это важно" featured>
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
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		// head () {
		//   return {
		//     title: this.post.meta_title,
		//     titleTemplate: '%s',
		//     meta: [
		//       { name: 'description', content: this.post.meta_description },
		//       { name: 'keywords', content: this.post.meta_keywords }
		//     ],
		//   }
		// },

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
						page: this.page,
						per_page: this.per_page,
						post_category_id: this.category_id,
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POSTS', { posts: response.data.data })
					Object.keys(response.data).forEach(key => {
						this[key] = response.data[key]
					})
					this.loading = false
					this.$nuxt.$loading.finish()
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
					this.loading = false
					this.$nuxt.$loading.finish()
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
				this.$router.push({
					path: this.$route.path,
					query: slug ? { category: slug } : {},
				})
				// this.category_id = id
				// this.fetchItems()
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

<style lang="scss"></style>
