<template>
	<div class="front-posts__container">
		<div class="front-posts">
			<div class="front-posts__news">
				<div class="front-posts__wrap">
					<h2 class="front-posts__title">Новости покера</h2>
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						to="/blog"
					>
						<a class="btn btn-sm btn-primary" :href="href" @click="navigate"
							>Все новости</a
						>
					</nuxt-link>
				</div>

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
						@click="handleFilter"
					/>
				</filter-tab-list>

				<transition-group name="fade" class="front-posts__list" tag="div">
					<div
						v-for="item in posts"
						:key="item.id"
						class="front-posts__list-item"
					>
						<post-item
							:medium="true"
							:image="item.image"
							:title="item.title"
							:summary="item.summary"
							:slug="item.slug"
							:author="item.user"
							:created="item.created_at"
							:categories="item.categories"
							:asCard="$device.isMobile"
						/>
					</div>
				</transition-group>
			</div>

			<div class="front-posts__about-us">
				<front-welcome />
				<front-telegram />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'FrontPosts',

		components: {
			LazyHydrate,
		},

		props: {},

		data: () => ({
			category_id: null,
		}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				page: 'pages/page',
				posts: 'front/posts',
				categories: 'front/post_categories',
			}),
		},

		watch: {},

		methods: {
			async handleFilter($event) {
				$nuxt.$loading.start()
				this.category_id = $event

				await this.$axios
					.get('/front/posts', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							post_category_id: this.category_id,
						},
					})
					.then(response => {
						this.$store.commit('front/FETCH_POSTS', { posts: response.data })
						$nuxt.$loading.finish()
					})
					.catch(e => {
						$nuxt.$loading.finish()
					})
			},
		},
	}
</script>

<style lang="scss">
	.front-posts {
		max-width: 1440px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 326px;
		grid-column-gap: 28px;
		@include paddings('desktop');
		position: relative;
		padding-bottom: 44px;
		&__container {
			display: flex;
			justify-content: center;
			width: 100%;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				bottom: 0px;
				width: 100%;
				height: 44px;
				display: block;
				background: linear-gradient(
					180deg,
					rgba(243, 241, 241, 0) 0%,
					#ecebeb 100%
				);
			}
		}
		&__wrap {
			margin-bottom: 20px;
			display: flex;
			justify-content: space-between;
		}

		&__title {
			margin: 0;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.3px;
			color: #222222;
		}

		&__list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-column-gap: 28px;
			grid-row-gap: 28px;
		}
	}

	@include mq('laptop') {
		.front-posts {
			@include paddings('laptop');
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
			&__list {
				grid-template-columns: 1fr 1fr;
				grid-column-gap: 20px;
				grid-row-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.front-posts {
			grid-template-columns: 100%;
			grid-column-gap: 0;
			padding: 0 16px 64px;
			&__list {
				grid-template-columns: 1fr;
				grid-column-gap: 0px;
				grid-row-gap: 22px;
			}
		}
	}

	@include mq('mobile') {
		.front-posts {
			@include paddings('mobile');
		}
	}
</style>
