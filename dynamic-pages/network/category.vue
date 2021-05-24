<template>
	<div class="networks">
		<div class="networks-header">
			<div class="container-fluid">
				<breadcrumb-list :white="true" />
				<h1 class="networks__title">{{ category.title }}</h1>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div v-for="(item, index) in networks" :key="index" class="col-3">
					<network-item
						:title="item.title"
						:url="item.url"
						:rooms="item.rooms"
						:page="item.page"
					>
					</network-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'NetworkCategory',

		components: {},

		head() {
			return {
				title: this.category.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category.meta_description },
					{ name: 'keywords', content: this.category.meta_keywords },
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				category: 'networks/category',
				networks: 'networks/networks',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {
			await this.$axios
				.get(`network/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('networks/FETCH_CATEGORY', {
						category: response.data,
					})
				})

			await this.$axios.get('network/list').then(response => {
				this.$store.commit('networks/FETCH_NETWORKS', {
					networks: response.data.map(item => ({
						title: item.title,
						url: item.url,
						slug: item.slug,
						rooms: item.rooms_count,
						page: item.page,
					})),
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
	.networks__title {
		text-align: center;
		margin: 0;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 32px;
		line-height: 36px;
		color: #ffffff;
	}
	.networks-header {
		margin-bottom: 32px;
		padding: 0 0 32px 0;
		background: radial-gradient(
			96.88% 66.11% at 57.43% 2.13%,
			#364cb1 0%,
			#081759 100%
		);
	}
</style>
