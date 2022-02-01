<template>
	<div class="networks-page">
		<div class="networks">
			<div class="networks-header" :style="{
				background: `url(${require('~/assets/i/networks-bg.jpg')}) no-repeat center top`
			}">
				<div class="networks-header__wrap">
					<breadcrumb-list :white="true" />
					<h1 class="networks__title">{{ pageable.title }}</h1>
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'NetworkCategory',

		components: {},

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
				networks: 'networks/networks',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {
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
	.networks {
		&-page {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
		}
		&-header {
			margin: 0 -26px 32px -26px;
			margin-bottom: 32px;
			padding: 0 26px 32px 26px;
		}
		&__list {
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

	@include mq('laptop') {
		.networks {
			&__list {
				column-gap: 20px;
				grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			}
		}

		.networks-page {
			@include paddings('laptop');
		}
		.networks-header {
			@include paddings('laptop');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('tablet') {
		.networks {
			&__list {
				column-gap: 20px;
				grid-template-columns: 1fr;
			}
		}
		.networks-page {
			@include paddings('tablet');
		}
		.networks-header {
			@include paddings('tablet');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('mobile') {
		.networks-page {
			@include paddings('mobile');
		}
		.networks-header {
			@include paddings('mobile');
			margin: 0 -20px 24px -20px;
		}
	}
</style>
