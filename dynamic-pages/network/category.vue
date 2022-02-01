<template>
	<div class="networks-page">
		<div class="networks">
			<hub-header
				class="networks-header"
				:title="pageable.title"
				:summary="pageable.summary"
				background="networks-bg.jpg"
			/>
			<div class="networks__list">
				<nav-box-item
					v-for="(item, index) in networks"
					:key="index"
					:title="item.title"
					:icon="item.url"
					:rooms="item.rooms_count"
					:page="item.page"
				/>
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
						rooms_count: item.rooms_count,
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
		&__list {
			display: grid;
			column-gap: 28px;
			row-gap: 24px;
			grid-template-columns: repeat(4, 1fr);
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
	}

	@include mq('mobile') {
		.networks-page {
			@include paddings('mobile');
		}
	}
</style>
