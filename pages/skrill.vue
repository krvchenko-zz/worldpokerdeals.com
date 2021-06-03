<template>
	<section :class="['content']">
		<div class="skrill">
			<div class="skrill-header">
				<div class="skrill-header__wrapper">
					<h1 class="skrill__title">VIP-статус Skrill</h1>

					<div class="skrill__summary">{{ summary }}</div>

					<div class="skrill-header__buttons">
						<payments-button-action
							type="skrill"
							label="Регистрация в Skrill"
							url="https://ntupgrade.vip/wpdeals"
						/>

						<payments-button-action
							:external="false"
							type="default"
							label="Получить VIP"
							@click="handleJoinClick"
						/>
					</div>
				</div>
			</div>

			<div class="skrill-body">
				<div class="skrill-advantages">
					<h2 class="skrill-advantages__title">
						В чем преимущества в получении <br />
						<span class="skrill-advantages__title-highlight"
							>VIP-статуса от Skrill</span
						>
					</h2>

					<svg-icon
						class="skrill-advantages__skrill-icon skrill__logo"
						icon="skrill-logo"
					/>

					<div class="skrill-advantages__list">
						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-advantages"
							/>
							<span class="skrill-advantages__label"
								><b>Льготные преимущества</b> использования Skrill</span
							>
						</div>
						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-support"
							/>
							<span class="skrill-advantages__label"
								><b>Поддержка на русском языке</b> по email, Skype, Telegram и в
								соцсетях</span
							>
						</div>
						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-verify"
							/>
							<span class="skrill-advantages__label"
								><b>Верификация</b> за 24 часа</span
							>
						</div>

						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-rakeback"
							/>
							<span class="skrill-advantages__label"
								><b>1,5% рейкбэка</b> в любом покер-руме на 3 месяца</span
							>
						</div>
						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-limits"
							/>
							<span class="skrill-advantages__label"
								><b>Увеличение лимитов</b></span
							>
						</div>
						<div class="skrill-advantages__list-item">
							<svg-icon
								:width="50"
								:height="50"
								class="skrill-advantages__icon"
								icon="skrill-arbitrage"
							/>
							<span class="skrill-advantages__label"
								>Помощь в решении спорных вопросов за 24 часа</span
							>
						</div>
					</div>
				</div>

				<div class="skrill-info">
					<div class="skrill-card">
						<h3 class="skrill-card__title skrill-card__title_new">
							Хочу открыть счёт. Что получу?
						</h3>
						<div class="skrill-card__info">
							Если вы еще не зарегистрировались в Skrill, то регистрируйтесь с
							нами и получайте эксклюзивные бонусы
						</div>
						<div class="skrill-card__footer">
							<ul class="skrill-card__list">
								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-cards"
									/>
									<span class="skrill-card__item"
										><b>Две карты Skrill Prepaid MasterCard</b> бесплатно (для
										VIP Silver +)</span
									>
								</li>

								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-comission"
									/>
									<span class="skrill-card__item"
										><b>0% комиссия</b> за переводы клиентов внутри системы и
										вывод на банковский счет</span
									>
								</li>

								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-tech-support"
									/>
									<span class="skrill-card__item"
										><b>Техподдержка</b> на русском языке</span
									>
								</li>
							</ul>

							<div class="skrill-card__details">
								<p>
									<span>* </span> Актуально только для пользователей из стран
									SEPA
								</p>
								<p><span>** </span> Вывод на VISA 7,5% для всех статусов</p>
							</div>
							<payments-button-action
								flat
								type="skrill"
								label="Регистрация в Skrill"
								url="https://ntupgrade.vip/wpdeals"
							/>
						</div>
					</div>

					<div class="skrill-card">
						<h3 class="skrill-card__title">
							Уже есть счёт. Чем порадуете?
						</h3>
						<div class="skrill-card__info">
							Если у вас уже есть аккаунт в Skrill, то просто присоединяйтесь к
							нашей программе лояльности и получайте бонусы и условия, которые
							мы предоставляем
						</div>

						<div class="skrill-card__footer">
							<ul class="skrill-card__list">
								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-silver-vip"
									/>
									<span class="skrill-card__item"
										><b>Silver VIP – от 5 000 евро</b> депозитов за
										квартал</span
									>
								</li>

								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-increased-limits"
									/>
									<span class="skrill-card__item"
										><b>Повышенные лимиты</b></span
									>
								</li>

								<li class="skrill-card__list-item">
									<svg-icon
										:width="50"
										:height="50"
										class="skrill-card__icon"
										icon="skrill-vip-tech-support"
									/>
									<span class="skrill-card__item"
										><b>Техподдержка</b> на русском языке</span
									>
								</li>
							</ul>

							<payments-button-action
								:style="{
									background: '#FF4151',
								}"
								flat
								:external="false"
								type="default"
								label="Присоедениться"
								@click="handleJoinClick"
							/>
						</div>
					</div>
				</div>
			</div>

			<div id="skrill-footer" class="skrill-footer">
				<h2 class="skrill-footer__title">
					Заполнить заявку на VIP-статус
				</h2>
				<div class="skrill-footer__info">
					Заполните заявку на подключение к нашей VIP программе для Skrill, и
					получите лучшие условия обслуживания, а так же быстрый саппорт, в
					который вы можете обратиться по любому вопросу.
				</div>

				<payments-form
					class="skrill-footer__payment"
					action="/payments/skrill/getvip"
					type="skrill"
				/>

				<div class="">
					<manager
						v-if="manager"
						:style="{ margin: 0 }"
						:pattern="true"
						:status="false"
						:image="manager.image"
						:name="manager.name"
						:position="manager.position"
						:telegram="manager.telegram"
						:skype="manager.skype"
						:whatsapp="manager.whatsapp"
						:email="manager.email"
						label="Остались вопросы? Напишите нам"
						description="Напиши в любом из мессенджеров нашему менеджеру для получения VIP-статуса Skrill"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import Manager from '~/components/cards/Manager'

	export default {
		components: {
			Manager,
		},
		layout: 'basic',

		metaInfo: {},

		data: () => ({
			summary:
				'Skrill является одним из самых популярных кошельков для игроков в покер. Он удобный и безопасный. А если вы зарегистрируете Skrill с нами, то сможете получить VIP обслуживание, быстрый саппорт и много других полезных функций!',

			manager: null,
		}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				page: 'pages/page',
				topList: 'rooms/topList',
			}),
		},

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: 27,
					},
				})
				.then(response => {
					this.manager = {
						image: response.data.image
							? {
									filename: response.data.image.filename,
							  }
							: null,
						name: response.data.name,
						position: response.data.position,
						telegram: response.data.telegram,
						skype: response.data.skype,
						whatsapp: response.data.whatsapp,
						email: response.data.email,
					}
				})
		},

		watch: {},

		mounted() {},

		methods: {
			handleJoinClick() {
				let el = document.querySelector('#skrill-footer')
				if (el) {
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset
					window.scrollTo({ top: offset, behavior: 'smooth' })
				}
			},
		},
	}
</script>

<style lang="scss">
	$skrill-bg: url('~assets/i/skrill-bg.jpg');
	$ico-skrill-form: url('~assets/i/ico-skrill-form.svg?data');
	.skrill {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1440px;
		&-header {
			position: relative;
			width: 100%;
			min-height: 658px;
			background: $skrill-bg no-repeat center;
			background-size: cover;
			clip-path: polygon(0 0, 100% 0%, 100% calc(450 / 658 * 100%), 0 98%);
			&:before {
				content: '';
				left: 0;
				top: 0;
				z-index: -1;
				position: absolute;
				width: 100%;
				height: 100%;
				display: block;
				background: radial-gradient(
					100% 100% at 100% 0%,
					#9d2777 0%,
					#731a56 61.46%
				);
				opacity: 0.7;
				box-shadow: 0px 15px 30px rgba(115, 27, 86, 0.3);
				transform: matrix(-1, 0, 0, 1, 0, 0);
			}
			&__wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				max-width: 818px;
				margin: 0 auto;
			}
			&__buttons {
				display: flex;
				width: 680px;
				gap: 28px;
				height: 50px;
			}
		}

		&__title {
			margin-top: 24px;
			margin-bottom: 20px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 40px;
			line-height: 44px;
			text-align: center;
			color: #ffffff;
		}

		&__summary {
			margin-bottom: 40px;
			font-family: Proxima Nova;
			font-size: 20px;
			line-height: 24px;
			text-align: center;
			color: #ffffff;
		}

		&-body {
			margin-top: -318px;
			background: linear-gradient(
				180deg,
				rgba(236, 235, 235, 0) 0%,
				#f3f1f1 100%
			);
		}

		&-advantages {
			display: grid;
			grid-template-columns: 3fr 2fr;
			grid-template-areas:
				'title logo'
				'list list';
			row-gap: 44px;
			position: relative;
			margin-bottom: 40px;
			padding: 40px 60px 44px 32px;
			max-width: 1016px;
			margin-left: auto;
			margin-right: auto;
			background: radial-gradient(
				96.88% 66.11% at 57.43% 2.13%,
				#3a3e51 0%,
				#1d1f2c 100%
			);
			border-radius: 10px;

			&__skrill-icon {
				grid-area: logo;
				justify-self: end;
				align-self: center;
			}

			&__title {
				grid-area: title;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 32px;
				line-height: 36px;
				color: #ffffff;
				&-highlight {
					font-family: 'Proxima Nova Th';
					color: #f6a519;
				}
			}

			&__label {
				padding-top: 15px;
				padding-left: 20px;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 24px;
				color: #ffffff;
			}

			&__icon {
				flex: 0 0 50px;
			}
			&__list {
				grid-area: list;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				column-gap: 24px;
				row-gap: 28px;
			}

			&__list-item {
				display: flex;
			}
		}

		&-info {
			display: flex;
			gap: 24px;
			margin: 0 auto 60px;
			justify-content: center;
		}
		&-card {
			display: flex;
			flex-direction: column;
			width: 496px;
			padding: 40px 60px 40px 60px;
			background: linear-gradient(0deg, #ffffff, #ffffff),
				radial-gradient(61.16% 100% at 61.16% 0%, #9d2777 0%, #731a56 61.46%);
			opacity: 0.99;
			box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.1);
			border-radius: 10px;

			&__title {
				font-family: 'Proxima Nova Th';
				font-size: 32px;
				line-height: 36px;
				margin-bottom: 20px;
				color: #ff4151;
				&_new {
					color: #b4338a;
				}
			}

			&__info {
				min-height: 96px;
				padding-bottom: 40px;
				margin-bottom: auto;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 24px;
				color: #000000;
			}

			&__list {
				min-height: 208px;
				margin: 0 0 32px 0;
				padding: 0;
				&-item {
					list-style: none;
					margin-bottom: 20px;
					font-family: Proxima Nova;
					font-style: normal;
					font-size: 18px;
					line-height: 22px;
					color: #3d3d3d;
					display: flex;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}

			&__icon {
				flex: 0 0 50px;
			}

			&__item {
				padding-top: 15px;
				padding-left: 20px;
			}

			&__details {
				margin-bottom: 28px;
				p {
					margin-bottom: 12px;
					font-family: Proxima Nova;
					font-style: normal;
					font-weight: normal;
					font-size: 15px;
					line-height: 18px;
					color: #999999;
					span {
						font-size: 22px;
						font-weight: bold;
						vertical-align: middle;
						height: 18px;
						display: inline-block;
					}
					&:last-child {
						margin: 0;
					}
				}
			}

			&__footer {
				display: flex;
				flex-direction: column;
				min-height: 376px;
			}
		}

		&-footer {
			width: 807px;
			display: flex;
			flex-direction: column;
			align-items: center;
			&__payment {
				width: 100%;
			}
			&__title {
				padding-top: 112px;
				margin-top: 44px;
				margin-bottom: 20px;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 32px;
				line-height: 36px;
				text-align: center;
				color: #222222;
				background: $ico-skrill-form no-repeat center top;
			}

			&__info {
				margin-bottom: 32px;
				font-family: Proxima Nova;
				font-size: 20px;
				line-height: 24px;
				text-align: center;
				color: #555555;
			}
		}
	}

	.btn-payments_plain {
		margin-top: auto;
	}
	.ptn-payments-form {
		padding: 10px 45px;
	}

	@include mq('desktop') {
		.skrill {
		}
		.skrill-header {
			&__wrapper {
				max-width: 808px;
			}
			&__buttons {
				justify-content: center;
			}
		}

		.btn-payments_skrill {
			max-width: 290px;
		}
		.btn-payments_default {
			max-width: 284px;
		}
	}

	@include mq('laptop') {
		.skrill-header {
			@include paddings('tablet');
			&__wrapper {
				width: 100%;
			}
			&__buttons {
				gap: 20px;
			}
		}

		.skrill-body {
			width: 100%;
			@include paddings('tablet');
		}

		.skrill-advantages {
			padding: 28px 24px 32px;
			grid-template-columns: 1fr 1fr;
			&__list {
				grid-template-columns: 1fr 1fr;
				column-gap: 20px;
			}
			&__skrill-icon {
				margin: 0 auto;
			}
		}

		.btn-payments_skrill {
			max-width: 288px;
		}
		.btn-payments_default {
			max-width: 288px;
		}

		.skrill-card {
			padding: 28px 24px;
			&__footer {
				min-height: 438px;
			}
			&__info {
				padding-bottom: 28px;
			}

			.btn-payments_skrill {
				max-width: 100%;
			}
			.btn-payments_default {
				max-width: 100%;
			}
		}

		.skrill-footer {
			width: 100%;
			@include paddings('tablet');
		}

		.skrill-info {
			gap: 20px;
		}
	}

	@include mq('tablet') {
		.skrill-header {
			@include paddings('mobile');
			&__buttons {
				width: 100%;
				gap: 16px;
				.btn {
					height: 44px;
				}
			}
		}

		.skrill-body {
			@include paddings('mobile');
			margin-top: -307px;
		}

		.skrill-advantages {
			grid-template-columns: 1fr;
			align-items: center;
			grid-template-areas:
				'logo'
				'title'
				'list';
			row-gap: 24px;
			&__title {
				font-size: 24px;
				text-align: center;
			}
			&__list {
				grid-template-columns: 1fr;
				row-gap: 20px;
			}
		}

		.skrill-info {
			flex-direction: column;
			margin-bottom: 32px;
		}

		.skrill-card {
			width: 100%;
			&__footer {
				min-height: auto;
			}
		}

		.skrill-footer {
			&__title {
				font-size: 28px;
				padding-top: 0;
				padding-left: 88px;
				background-position: center left;
				background-size: 64px 64px;
				text-align: left;
			}
			&__info {
				text-align: left;
			}
		}
	}
</style>
