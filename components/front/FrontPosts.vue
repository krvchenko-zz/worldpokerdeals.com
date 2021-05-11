<template>
<div class="front-posts">
	<div class="container-fluid">
		<div class="row">
			<div class="col-9">

				<div class="front-posts__wrap">
					<h2 class="front-posts__title">Новости покера</h2>
					<nuxt-link to="/blog" v-slot="{ href, route, navigate, isActive, isExactActive }">
						<a class="btn btn-sm btn-primary" :href="href" @click="navigate">Все новости</a>
					</nuxt-link>
				</div>

				<filter-tab-list>
					<filter-tab-item
						label="Все посты"
						:value="null"
						:active="category_id === null"
						@click="handleFilter"
					/>
					<filter-tab-item v-for="item in categories" :key="item.id"
						:label="item.title"
						:value="item.id"
						:active="item.id === category_id"
						@click="handleFilter"
					/>
				</filter-tab-list>

				<transition-group name="fade" class="row" tag="div">
					<div class="col-4" v-for="item in posts" :key="item.id">
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
				</transition-group>
			</div>
			<div class="col-3">
				<front-welcome />
				<front-telegram />
			</div>
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
		LazyHydrate
	},

	props: {

	},

	created() {

	},

	data: () => ({
		category_id: null
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			geo: 'location/code',
			page: 'pages/page',
			posts: 'front/posts',
			categories: 'front/post_categories'
		}),
	},

	watch: {

	},

	methods: {
		async handleFilter($event) {
			$nuxt.$loading.start()
			this.category_id = $event

			await this.$axios.get('/front/posts', {
			  params: {
				geo: this.country.code,
				locale: this.locale,
				post_category_id: this.category_id
			  }
			}).then(response => {
			  this.$store.commit('front/FETCH_POSTS', { posts: response.data })
			  $nuxt.$loading.finish()
			})
			.catch(e => {
				$nuxt.$loading.finish()
			})
		}
	}
}
</script>

<style lang="scss">
.front-posts {
	position: relative;
	padding-bottom: 44px;
	&:after {
		content: '';
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 44px;
		display: block;
		background: linear-gradient(180deg, rgba(243, 241, 241, 0) 0%, #ECEBEB 100%);
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
}
</style>