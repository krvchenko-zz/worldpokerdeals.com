<template>
	<section class="content content_vip">
		<div class="vip">
			<div class="vip__inner">
				<div class="vip-header">
					<h1 class="vip__title" v-html="$t('vip_service.title')"></h1>
					<div class="vip__brand">{{ $t('vip_service.brand') }}</div>
					<div class="vip__extra">{{ $t('vip_service.extra') }}</div>
					<div class="vip__description" v-html="$t('vip_service.description')"></div>
					<a class="btn btn-lg btn-yellow" href="/register">{{ $t('vip_service.register') }}</a>
				</div>

				<div class="vip-body">
					<div class="vip__list">
						<div v-for="(item, index) in services" :key="index">
							<div class="vip-item">
								<div class="vip-item__wrap">
									<svg-icon
										class="vip-item__icon"
										:icon="item.icon"
										:image="true"
										:width="80"
										:height="72"
									/>
									<span class="vip-item__title" v-html="$t(item.title)"></span>
								</div>
								<span class="vip-item__text">{{ $t(item.text) }}</span>
							</div>
						</div>
					</div>

					<vip-form
						v-if="manager"
						:name="manager.name"
						:position="manager.position"
						:telegram="manager.telegram"
						:skype="manager.skype"
						:whatsapp="manager.whatsapp"
						:email="manager.email"
						:image="manager.image"
					/>
				</div>

				<div class="vip-footer">
					<div class="vip-footer__actions">
						<a class="btn btn-lg btn-yellow" href="/register">{{ $t('vip_service.register') }}</a>
					</div>
					<div class="vip-footer__label">{{ $t('our_numbers') }}</div>
					<div class="vip-features">
						<div
							v-for="(item, index) in features"
							:key="index"
							class="vip-feature"
						>
							<span class="vip-feature__value">{{ item.value }}</span>
							<span class="vip-feature__label" v-html="$t(item.label)"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pageMixin from '~/mixins/pageMixin'

	export default {
		components: {},
		layout: 'basic',

		mixins: [pageMixin],

		props: {},

		data: () => ({
			manager: null,
			services: [
				{
					title: 'vip_service.features.0.title',
					text: 'vip_service.features.0.text',
					icon: 'vip-manager',
				},
				{
					title: 'vip_service.features.1.title',
					text: 'vip_service.features.1.text',
					icon: 'vip-layouts',
				},
				{
					title: 'vip_service.features.2.title',
					text: 'vip_service.features.2.text',
					icon: 'vip-mining',
				},
				{
					title: 'vip_service.features.3.title',
					text: 'vip_service.features.3.text',
					icon: 'vip-races',
				},
				{
					title: 'vip_service.features.4.title',
					text: 'vip_service.features.4.text',
					icon: 'vip-clubs',
				},
				{
					title: 'vip_service.features.5.title',
					text: 'vip_service.features.5.text',
					icon: 'vip-fish',
				},
				{
					title: 'vip_service.features.6.title',
					text: 'vip_service.features.6.text',
					icon: 'vip-premium',
				},
				{
					title: 'vip_service.features.7.title',
					text: 'vip_service.features.7.text',
					icon: 'vip-affiliate',
				},
				{
					title: 'vip_service.features.8.title',
					text: 'vip_service.features.8.text',
					icon: 'vip-consulting',
				},
				{
					title: 'vip_service.features.9.title',
					text: 'vip_service.features.9.text',
					icon: 'vip-transfer',
				},
			],

			features: [
				{
					label: 'our_numbers_years',
					value: '7',
				},
				{
					label: 'our_numbers_rooms',
					value: '150',
				},
				{
					label: 'our_numbers_clubs',
					value: '26',
				},
				{
					label: 'our_numbers_partners',
					value: '70',
				},
				{
					label: 'our_numbers_active',
					value: '10 000',
				},
				{
					label: 'our_numbers_managers',
					value: '10',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: this.locale === 'es' ? 664 : 502,
					},
				})
				.then(response => {
					this.manager = {
						name: response.data.name,
						position: response.data.position,
						telegram: response.data.telegram,
						skype: response.data.skype,
						whatsapp: response.data.whatsapp,
						email: response.data.email,
						fb: response.data.fb,
						vk: response.data.vk,
						instagram: response.data.instagram,
						image: {
							filename: response.data.image.filename,
						},
					}
				})
		},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale' 
			})
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-vip-title: url('~assets/i/ico-vip-title.svg?data');
	$vip-bg: url('~assets/i/vip-bg.jpg');
	.content_vip {
		background: linear-gradient(0deg, #262937, #262937),
			radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3a3e51 0%, #1d1f2c 100%);
		// transform: matrix(-1, 0, 0, 1, 0, 0);
	}

	.vip {
		width: 100%;
		background: $vip-bg no-repeat center top;
		background-size: contain;
		&__inner {
			max-width: 1440px;
			margin: 0 auto;
			padding-left: 144px;
			padding-right: 26px;
		}
		&__list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 28px;
			row-gap: 32px;
		}
		&-header {
			margin: 28px 0 52px 0;
		}
		&__title {
			padding-top: 36px;
			margin: 0;
			position: relative;
			font-family: 'Proxima Nova Th';
			font-size: 90px;
			line-height: 80px;
			letter-spacing: -0.1px;
			color: #e3b44f;
			text-transform: uppercase;
			display: flex;
			align-items: center;
			&:before {
				content: '';
				top: 0;
				left: 60px;
				position: absolute;
				display: block;
				width: 33px;
				height: 36px;
				background: $ico-vip-title no-repeat center;
			}
			span {
				margin: 0 10px;
				width: 18px;
				height: 18px;
				display: block;
				border-radius: 50%;
				background: #e3b44f;
			}
		}

		&__brand {
			text-transform: uppercase;
			margin-bottom: 8px;
			font-family: 'Proxima Nova Th';
			font-size: 44px;
			line-height: 52px;
			color: #ffffff;
		}

		&__extra {
			margin: 0 0 28px -16px;
			display: inline-block;
			padding: 5px 16px;
			margin-bottom: 34px;
			font-family: 'Proxima Nova Sb';
			font-size: 22px;
			line-height: 26px;
			color: rgba(255, 255, 255, 0.8);
			border: 1px solid rgba(87, 90, 106, 0.7);
			border-radius: 100px;
		}

		&__description {
			margin-bottom: 24px;
			font-family: Proxima Nova;
			font-size: 20px;
			line-height: 28px;
			color: #ffffff;
			b {
				font-weight: bold;
				color: #e3b44f;
			}
		}

		&-body {
			display: grid;
			grid-template-columns: 2fr 1fr;
			column-gap: 28px;
			align-items: start;
		}

		&-item {
			min-height: 200px;
			position: relative;
			padding: 28px;
			background: radial-gradient(
				173.62% 345.07% at 75% -13.07%,
				#3a3e51 5.73%,
				#262937 100%
			);
			box-shadow: -10px 20px 50px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			&__wrap {
				margin-bottom: 20px;
				min-height: 64px;
				position: relative;
			}

			&__title {
				padding-right: 90px;
				display: block;
				font-family: 'Proxima Nova Th';
				font-size: 22px;
				line-height: 28px;
				color: #e3b44f;
			}

			&__text {
				display: block;
				font-family: Proxima Nova;
				font-size: 17px;
				line-height: 24px;
				color: #ffffff;
				opacity: 0.7;
			}

			&__icon {
				height: auto;
				right: 0;
				top: -8px;
				position: absolute;
			}
		}

		&-footer {
			&__label {
				margin: 60px 0 24px 0;
				font-family: 'Proxima Nova Sb';
				font-size: 28px;
				line-height: 32px;
				text-align: center;
				letter-spacing: -0.2px;
				color: #cccccc;
			}

			&__actions {
				margin-top: 8px;
				text-align: center;
			}
		}

		&-features {
			display: flex;
			justify-content: center;
			overflow-x: scroll;
			@include hide-scroll();
		}

		&-feature {
			margin-right: 100px;
			position: relative;
			&:last-child {
				margin: 0;
			}
			&__value {
				padding-bottom: 12px;
				margin-bottom: 16px;
				position: relative;
				display: inline-block;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 41px;
				line-height: 50px;
				letter-spacing: -1px;
				font-feature-settings: 'salt' on;
				color: #ffffff;
				&:after {
					content: '';
					left: 0;
					bottom: 0px;
					position: absolute;
					width: 100%;
					height: 4px;
					display: block;
					background: #5f6377;
				}
			}

			&__label {
				display: block;
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 20px;
				color: #90939d;
			}
		}
	}

	@include mq('desktop') {
		.vip {
			&__inner {
				@include paddings('laptop');
			}
		}

		.vip-header {
			padding-left: 16px;
		}
	}

	@include mq('laptop') {
		.vip {
			&__inner {
				@include paddings('tablet');
			}
			&__list {
				row-gap: 24px;
				column-gap: 20px;
				margin-bottom: 40px;
			}
		}
		.vip-header {
			margin-bottom: 42px;
		}

		.vip-body {
			grid-template-columns: 1fr;
		}

		.vip-features {
			justify-content: flex-start;
		}

		.vip-form {
			max-width: 390px;
			margin: 0 auto;
			margin-bottom: 44px;
		}

		.vip-features {
			margin-right: -24px;
		}

		.vip-feature {
			margin-right: 44px;
			&__value {
				white-space: nowrap;
			}
		}
	}

	@include mq('tablet') {
		.vip {
			&__inner {
				@include paddings('mobile');
			}
			&__title {
				font-size: 64px;
				line-height: 60px;
				margin-bottom: 8px;
			}
			&__extra {
				margin-left: 0;
			}
			&__brand {
				white-space: nowrap;
				font-size: 32px;
				line-height: 32px;
				margin-bottom: 12px;
			}
			&__description {
				text-align: center;
				margin-bottom: 32px;
				font-size: 18px;
				line-height: 22px;
			}
			&__list {
				grid-template-columns: 1fr;
				row-gap: 20px;
			}
		}

		.vip-header {
			padding-left: 0;
		}

		.vip-features {
			margin-right: -20px;
		}

		.vip-feature {
			margin-right: 56px;
		}
	}

	@media (max-width: 420px) {
		.vip {
			&__title {
				font-size: 55px;
				line-height: 55px;
			}
			&__brand {
				font-size: 30px;
				line-height: 30px;
			}
			&__extra {
				font-size: 16px;
				line-height: 16px;
			}
		}
	}
</style>
