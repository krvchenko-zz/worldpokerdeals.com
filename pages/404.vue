<template>
	<section class="content content_404">
		<div class="not-found">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<h1 class="not-found__title">Страница не найдена.</h1>

						<nuxt-link
							v-slot="{ href, route, navigate, isActive, isExactActive }"
							prefetch
							:to="{ name: 'front', params: {} }"
						>
							<a class="btn btn-primary" :href="href" @click="navigate"
								>На главную</a
							>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				page: 'pages/page',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$not-found-bg: url('~assets/i/404-bg.svg');
	.content_404 {
		background: linear-gradient(0deg, #262937, #262937),
			radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3a3e51 0%, #1d1f2c 100%);
		// transform: matrix(-1, 0, 0, 1, 0, 0);
	}

	.not-found {
		padding-top: 40px;
		min-height: 347px;
		text-align: center;
		background: $not-found-bg no-repeat center 40px;
		&-header {
			margin: 28px 0 52px 0;
		}
		&__title {
			padding-top: 377px;
			text-align: center;
			margin: 0 0 40px 0;
			position: relative;
			font-family: 'Proxima Nova Sb';
			font-size: 28px;
			line-height: 36px;
			letter-spacing: -0.1px;
			color: #ffffff;
		}
	}
</style>
