<template>
	<section class="content content_vip">
		<div class="vip">
			<div class="container-fluid">
				<div class="row">
					<div class="col-10 offset-md-1">
						<div class="vip-header">
							<h1 class="vip__title">VIP<span></span>Сервис</h1>
							<div class="vip__brand">От Worldpokerdeals</div>
							<div class="vip__extra">+EV решения для игроков с 2015 года</div>
							<div class="vip__description">
								Хочешь стать нашим игроком или партнёром? Начинай играть <br />
								в покер-румах с нами и получи доступ к нашим <b>VIP-услугам</b>
							</div>
							<button class="btn btn-lg btn-yellow">Зарегистрироваться</button>
						</div>

						<div class="vip-body">
							<div class="row">
								<div class="col-8">
									<div class="vip__list">
										<div class="row">
											<div
												v-for="(item, index) in services"
												:key="index"
												class="col-6"
											>
												<div class="vip-item">
													<div class="vip-item__wrap">
														<svg-icon
															class="vip-item__icon"
															:icon="item.icon"
														/>
														<span
															class="vip-item__title"
															v-html="item.title"
														></span>
													</div>
													<span class="vip-item__text">{{ item.text }}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-4">
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
							</div>
						</div>

						<div class="vip-footer">
							<div class="vip-footer__actions">
								<button class="btn btn-lg btn-yellow">
									Зарегистрироваться
								</button>
							</div>
							<div class="vip-footer__label">Мы в цифрах</div>
							<div class="vip-features">
								<div
									v-for="(item, index) in features"
									:key="index"
									class="vip-feature"
								>
									<span class="vip-feature__value">{{ item.value }}</span>
									<span class="vip-feature__label" v-html="item.label"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({
			manager: null,
			services: [
				{
					title: 'Личный <br> менеджер',
					text: 'Решение вопросов с покер-румами напрямую',
					icon: 'vip-manager',
				},
				{
					title: 'Обмены Skrill, <br> Neteller и крипты',
					text: 'Без комиссии и P2P между нашими игроками',
					icon: 'vip-payments',
				},
				{
					title: 'Бесплатные <br> HUD-ы и лейауты',
					text: 'Экономия до 500$ в год',
					icon: 'vip-layouts',
				},
				{
					title: 'Бесплатные <br> истории рук',
					text: 'Все лимиты во всех сетях до NL/PL 600$',
					icon: 'vip-mining',
				},
				{
					title: 'Приватные <br> рейк-гонки',
					text: '30K+ в месяц только для наших игроков',
					icon: 'vip-races',
				},
				{
					title: 'Доступ в закрытые <br> клубы',
					text: 'Самые выгодные клубы в PokerBros, PPPoker вне паблика',
					icon: 'vip-clubs',
				},
				{
					title: 'Комнаты <br> из Америки, <br> Израиля и Италии',
					text: 'Безопасный доступ в самые рыбные игры',
					icon: 'vip-fish',
				},
				{
					title: 'Премиум-статусы <br> в платежках',
					text: 'Моментальные вип-уровни, кешбек и поддержка',
					icon: 'vip-premium',
				},
				{
					title: 'Партнерка <br> и саб-аффилиат',
					text: 'Приводи друзей, получай пожизненный процент',
					icon: 'vip-affiliate',
				},
				{
					title: 'Консалтинг по <br> налогам и крипте',
					text: 'Безопасные финансовые решения для игроков',
					icon: 'vip-consulting',
				},
				{
					title: 'Помощь <br> с переездом на <br> зимовку',
					text:
						'Таиланд, Бали, Турция. Рейкбек в Тайских Батах и помощь с визами',
					icon: 'vip-transfer',
				},
			],

			features: [
				{
					label: 'Лет на <br> рынке',
					value: '7',
				},
				{
					label: 'Покерныx <br> румов',
					value: '150',
				},
				{
					label: 'Клубов',
					value: '26',
				},
				{
					label: 'Партнеров',
					value: '70',
				},
				{
					label: 'Активныx <br> игроков',
					value: '10 000',
				},
				{
					label: 'Аффилейт-менеджеров <br> в команде',
					value: '10',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: 27,
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
	$ico-vip-title: url('~assets/i/ico-vip-title.svg?data');
	$vip-bg: url('~assets/i/vip-bg.jpg');
	.content_vip {
		background: linear-gradient(0deg, #262937, #262937),
			radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3a3e51 0%, #1d1f2c 100%);
		// transform: matrix(-1, 0, 0, 1, 0, 0);
	}

	.vip {
		background: $vip-bg no-repeat center top;
		background-size: contain;
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
		}

		&-item {
			min-height: 200px;
			position: relative;
			margin-bottom: 32px;
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
</style>
