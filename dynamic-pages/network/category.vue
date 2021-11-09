<template>
	<div v-if="category" class="networks">
		<div class="networks-header">
			<div class="container-fluid">
				<breadcrumb-list :white="true" />
				<h1 class="networks__title">{{ category.title }}</h1>
			</div>
		</div>
		<div class="networks__list">
			<network-item
				v-for="(item, index) in networks"
				:key="index"
				:title="item.title"
				:url="item.url"
				:rooms="item.rooms"
				:page="item.page"
			>
			</network-item>
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
				title: this.category ? this.category.meta_title : '',
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category ? this.category.meta_description : '' },
					{ name: 'keywords', content: this.category ? this.category.meta_keywords : '' },
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
	$networks-bg: url('~assets/i/networks-bg.jpg');

	.networks {
		width: 100%;
		max-width: 1440px;
		&__list {
			@include paddings('desktop');
			display: grid;
			column-gap: 28px;
			row-gap: 24px;
			grid-template-columns: repeat(4, 1fr);
		}
		&__title {
			text-align: center;
			margin: 0;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}
	}

	.networks-header {
		margin-bottom: 32px;
		padding: 0 0 32px 0;
		background: $networks-bg no-repeat center;
	}

	@include mq('laptop') {
		.networks {
			&__list {
				@include paddings('tablet');
				column-gap: 20px;
				grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			}
		}
	}

	@include mq('tablet') {
		.networks {
			&__list {
				@include paddings('mobile');
				column-gap: 20px;
				grid-template-columns: 1fr;
			}
		}
	}
</style>
