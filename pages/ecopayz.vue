<template>
	<section :class="['content', 'content_ecopayz']">
		<div class="ecopayz">
			<div class="ecopayz-header">
				<div class="ecopayz-header__wrap">
					<div class="container-fluid">
						<div class="row">
							<div class="col-10 offset-md-1">
								<h1 class="ecopayz__title">VIP-статус ecoPayz</h1>
							</div>
						</div>
						<div class="row">
							<div class="col-8 offset-md-2">
								<div class="ecopayz__summary">{{ summary }}</div>
							</div>
						</div>

						<div class="row">
							<div class="col-3 offset-md-3">
								<payments-button-action
									type="ecopayz"
									label="Регистрация в ecoPayz"
									url="https://ntupgrade.vip/wpdeals"
								/>
							</div>
							<div class="col-3">
								<payments-button-action
									:external="false"
									type="default"
									label="Получить VIP"
									@click="handleJoinClick"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="ecopayz-body">
				<div class="container-fluid">
					<div class="row">
						<div class="col-10 offset-md-1">
							<div class="ecopayz-advantages">

								<div class="row">
									<div class="col-6">
										<h2 class="ecopayz-advantages__title">В чем преимущества в получении <br> <span class="ecopayz-advantages__title-highlight">VIP-статуса от ecoPayz</span></h2>
									</div>
									<div class="col-6">
										<svg-icon class="ecopayz__logo" icon="ecopayz-logo" viewBox="0 0 305 72" />
									</div>
								</div>

								<div class="ecopayz-advantages__row">
									<div class="ecopayz-advantages__col">
										<svg-icon :width="50" :height="50" class="ecopayz-advantages__icon" icon="ecopayz-gold" />
										<span class="ecopayz-advantages__label"><b>Статус GOLD</b> после верификации</span>
									</div>
									<div class="ecopayz-advantages__col">
										<svg-icon :width="50" :height="50" class="ecopayz-advantages__icon" icon="ecopayz-rakeback" />
										<span class="ecopayz-advantages__label"><b>1,5% рейкбэка</b> в любом покер-руме на 3 месяца</span>
									</div>
								</div>

								<div class="ecopayz-list-wrap">
									<div class="ecopayz-list-wrap__title">
										<b>ecoPayz</b> <span> + Worldpokerdeals</span>
									</div>
									<ul class="ecopayz-list">
										<li class="ecopayz-list__item">Мгновенное оформление статуса Gold за верификацию</li>
										<li class="ecopayz-list__item">VIP статус за пополнение счета на €10 000</li>
										<li class="ecopayz-list__item">Персональная поддержка</li>
										<li class="ecopayz-list__item">Безлимитное количество счетов в 45 валютах</li>
										<li class="ecopayz-list__item">Повышенные лимиты на транзакции</li>
										<li class="ecopayz-list__item">Бесплатное пополнение через банк в России и Украине</li>
										<li class="ecopayz-list__item">Персональная поддержка</li>
										<li class="ecopayz-list__item">Переводы внутри системы — 0%</li>
										<li class="ecopayz-list__item">Пополнение счета банковской картой – от 1,69% до 2,90%</li>
									</ul>
								</div>

								<div class="ecopayz-advantages-footer">
									<figure class="ecopayz-advantages-footer__item">
										<img loading="lazy" decoding="async" src="~assets/i/ecopayz-gold-img.png" alt="Статус GOLD">
										<figcaption>Статус GOLD</figcaption>
									</figure>
									<figure class="ecopayz-advantages-footer__item">
										<img loading="lazy" decoding="async" src="~assets/i/ecopayz-rakeback-img.png" alt="1,5% рейкбэка в любом покер-руме на 3 месяца">
										<figcaption>1,5% рейкбэка в любом покер-руме на 3 месяца</figcaption>
									</figure>
								</div>

							</div>

							<div class="ecopayz-info">

								<div class="ecopayz-info__title">Сравнение условий получения статусов</div>

				<table class="ecopayz-table">
									<thead>
										<tr>
											<th>Статус</th>
											<th>Клиент <br> WorldPokerDeals</th>
											<th>Обычный клиент</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Gold</td>
											<td>Пройти верификацию личности и адреса</td>
											<td>
												<ul class="ecopayz-table-list">
													<li class="ecopayz-table-list__item">Пройти верификацию личности и адреса</li>
													<li class="ecopayz-table-list__item">Верифицировать банковскую карту</li>
													<li class="ecopayz-table-list__item">Внести депозит на €5 000 или €2 500 с кредитной карты</li>
													<li class="ecopayz-table-list__item">Иметь Silver ecoAccount в течение 30 дней</li>
													<li class="ecopayz-table-list__item">Совершить покупки на € 25 000 (или эквивалентную сумму в валюте)</li>
												</ul>
											</td>
										</tr>
										<tr>
											<td>VIP</td>
											<td>Пополнить счет на €10 000</td>
											<td>
												<ul class="ecopayz-table-list">
													<li class="ecopayz-table-list__item">Владеть Platinum статусом в течение 30 дней</li>
													<li class="ecopayz-table-list__item">Совершить покупки (сделать депозиты) на €25 0000</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="ecopayz-footer" class="ecopayz-footer">
				<div class="container-fluid">
					<div class="row">
						<div class="col-8 offset-md-2">
							<h2 class="ecopayz-footer__title">Заполнить заявку на VIP-статус</h2>
							<div class="ecopayz-footer__info">
								Заполните заявку на подключение к нашей VIP программе для ecoPayz, и получите лучшие условия обслуживания, а так же быстрый саппорт, в который вы можете обратиться по любому вопросу.
							</div>
						</div>
					</div>
					<payments-form action="/payments/ecopayz/getvip" type="ecopayz" />

					<div class="row">
						<div class="col-8 offset-md-2">
							<manager
								v-if="manager"
								:style="{margin: 0}"
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
								description="Напиши в любом из мессенджеров нашему менеджеру для получения VIP-статуса ecoPayz"
							/>
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

import Manager from '~/components/cards/Manager'

export default {
	layout: 'basic',

	metaInfo: {

	},

	components: {
		Manager
	},

	data: () => ({
		summary: 'ecoPayz является одним из самых популярных кошельков для игроков в покер.  Он удобный и безопасный. А если вы зарегистрируете ecoPayz с нами, то сможете получить VIP обслуживание, быстрый саппорт и много других полезных функций!',

		manager: null
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			geo: 'location/code',
			page: 'pages/page',
			topList: 'rooms/topList'
		}),
	},

	async fetch() {
		await axios.get('/managers', {
			params: {
				id: 27
			}
		}).then(response => {
			this.manager = {
				image: response.data.image ? {
					filename: response.data.image.filename
				}: null,
				name: response.data.name,
				position: response.data.position,
				telegram: response.data.telegram,
				skype: response.data.skype,
				whatsapp: response.data.whatsapp,
				email: response.data.email,
			}
		})
	},

	mounted () {

	},

	watch: {

	},

	methods: {
		handleJoinClick() {
			let el = document.querySelector('#ecopayz-footer')
			if (el) {
				let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset;
				window.scrollTo({top: offset, behavior: 'smooth'});
			}
		}
	}
}
</script>

<style lang="scss">
$ecopayz-bg: url('~assets/i/ecopayz-bg.jpg');
$ico-ecopayz-form: url('~assets/i/ico-ecopayz-form.svg?data');
$ico-ecopayz-plus: url('~assets/i/ico-ecopayz-plus.svg?data');
$ico-ecopayz-list: url('~assets/i/ico-ecopayz-list.svg?data');

.ecopayz {

	&-header {
		position: relative;
		min-height: 658px;
		background: $ecopayz-bg no-repeat center;
		background-size: cover;
		clip-path: polygon(0 0, 100% 0%, 100% calc(450/658 * 100%), 0 98%);
		&:before {
			content: '';
			left: 0;
			top: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			display: block;
			background: radial-gradient(100% 100% at 100% 0%, #10579B 0%, #033564 61.46%);
			opacity: 0.7;
			transform: matrix(-1, 0, 0, 1, 0, 0);
		}
		&__wrap {
			z-index: 1;
			position: relative;
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
		color: #FFFFFF;
	}

	&__summary {
		margin-bottom: 40px;
		font-family: Proxima Nova;
		font-size: 20px;
		line-height: 24px;
		text-align: center;
		color: #FFFFFF;
	}

	&__logo {
		float: right;
		max-width: 100%;
	}

	&-body {
		margin-top: -360px;
		background: linear-gradient(180deg, rgba(236, 235, 235, 0) 0%, #F3F1F1 100%);
	}

	&-advantages {
		padding: 40px 40px 44px 40px;
		background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3A3E51 0%, #1D1F2C 100%);
		border-radius: 10px;

		&__title {
			margin-bottom: 44px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #FFFFFF;
			&-highlight {
				font-family: 'Proxima Nova Th';
				color: #F6A519;
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
			color: #FFFFFF;
		}

		&__icon {
			margin-bottom: 20px;
			flex: 0 0 50px;
		}

		&__row {
			display: flex;
		}

		&__col {
			margin-bottom: 28px;
			margin-right: 28px;
			display: flex;
			width: calc(100% / 2);
			&:last-child {
				margin-right: 0;
			}
		}

		&-footer {
			margin-top: -70px;
			display: flex;
			justify-content: center;
			&__item{
				flex: 0 0 250px;
				figure {
					margin: 0;
				}

				img {
					margin: 0 auto;
					display: block;
					max-width: 100%;
					height: auto;
				}

				figcaption {
					margin-top: 16px;
					text-align: center;
					font-family: Proxima Nova;
					font-weight: bold;
					font-size: 18px;
					line-height: 22px;
					color: #FFFFFF;
				}
			}
		}
	}

	&-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		margin: 0;
		&-wrap {
			padding: 28px 68px 102px 68px;
			margin: 0 -68px;
			background: linear-gradient(0deg, #373A4A, #373A4A), radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3A3E51 0%, #1D1F2C 100%);
			border-radius: 10px;
			&__title {
				margin-bottom: 28px;
				b {
					font-family: 'Proxima Nova Th';
					font-size: 32px;
					line-height: 32px;
					color: #F8F8F8;
				}
				span {
					font-family: Proxima Nova;
					font-weight: bold;
					font-size: 24px;
					line-height: 32px;
					color: #F8F8F8;
					opacity: 0.8;
				}
			}
		}
		&__item {
			list-style: none;
			padding-left: 36px;
			margin-bottom: 16px;
			margin-right: 40px;
			width: calc(100% / 3 - 40px);
			font-family: Proxima Nova;
			font-size: 18px;
			line-height: 22px;
			color: #E5E5E5;
			background: $ico-ecopayz-list no-repeat 0 0;
		}
	}

	&-info {
		&__title {
			margin: 40px 0 77px 0;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			text-align: center;
			color: #222222;
		}
	}

	&-table {
		width: 100%;
		margin-bottom: 60px;
		thead {
			tr {
				th {
					padding: 28px;
					font-family: 'Proxima Nova Sb';
					font-style: normal;
					font-size: 24px;
					line-height: 24px;
					&:nth-child(1) {
						border-right: 1px solid #E5E5E5;
						border-top-left-radius: 10px;
						color: #8F8F8F;
						background: linear-gradient(0deg, #E5E5E5, #E5E5E5),
												radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
					}

					&:nth-child(2) {
						border-top-left-radius: 10px;
						border-top-right-radius: 10px;
						display: block;
					margin-top: -40px;
						font-family: Proxima Nova;
						font-style: normal;
						font-weight: bold;
						font-size: 32px;
						line-height: 32px;
						color: #F8F8F8;
						background: linear-gradient(0deg, #3C9BE0, #3C9BE0),
												radial-gradient(363.3% 931.9% at 73.15% -35.54%, #3A3E51 0%, #1D1F2C 100%);
					}

					&:nth-child(3) {
						border-top-right-radius: 10px;
						color: #E5E5E5;
						background: linear-gradient(0deg, #6C6E7D, #6C6E7D),
												radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
					}
				}
			}
		}

		tbody {
			tr {

				td {
					padding: 28px;
					border: 1px solid #E5E5E5;
					&:first-child {
						border-left: 0;
					}
					&:last-child {
						border-right: 0;
					}
					&:nth-child(1) {
						background: linear-gradient(0deg, #C1A161, #C1A161),
												radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
					}
					&:nth-child(2) {
						background: linear-gradient(0deg, #2E87C8, #2E87C8),
												radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
						box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.15);
					}
					&:nth-child(3) {
						background: linear-gradient(0deg, #E5E5E5, #E5E5E5), radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
					}
				}

				&:nth-child(1) {
					td {
						border-top: 0;
					}
				}

				&:nth-child(1),
				&:nth-child(2) {
					td {
						&:nth-child(1) {
							font-family: Proxima Nova;
							font-weight: bold;
							font-size: 30px;
							line-height: 30px;
							color: #F8F8F8;
						}
					}

					td {
						&:nth-child(2) {
							font-family: Proxima Nova;
							font-weight: bold;
							font-size: 24px;
							line-height: 28px;
							color: #FFFFFF;
						}
					}

					td {
						&:nth-child(3) {
							border-bottom-color: #D5D5D5;
						}
					}
				}

				&:nth-child(2) {
					td {
						&:nth-child(1) {
							border-bottom-left-radius: 10px;
							background: linear-gradient(0deg, #E38B3A, #E38B3A),
													radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
						}

						&:nth-child(2) {
							border-bottom-right-radius: 10px;
						}

						&:nth-child(3) {
							border-bottom-right-radius: 10px;
						}
					}
				}

				&:last-child {
					td {
						border-bottom: 0;
					}
				}
			}
		}

		&-list {
			padding: 0;
			margin: 0;
			&__item {
				margin-bottom: 12px;
				padding-left: 36px;
				list-style: none;
				font-family: Proxima Nova;
				font-size: 18px;
				line-height: 22px;
				color: #555555;
				background: $ico-ecopayz-plus no-repeat 0 0;
				&:last-child {
					margin: 0;
				}
			}
		}
	}

	&-footer {
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
			background: $ico-ecopayz-form no-repeat center top;
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

.ptn-payments-form {
	padding: 10px 45px;
}
</style>