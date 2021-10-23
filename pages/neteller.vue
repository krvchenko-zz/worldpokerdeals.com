<template>
	<section :class="['content']">
		<div class="neteller">
			<vip-payments-header
				title="VIP-статус Neteller"
				type="neteller"
				:summary="summary"
			>
				<template #buttons>
					<payments-button-action
						type="neteller"
						label="Регистрация в Neteller"
						target="_blank"
						url="https://ntupgrade.vip/wpdeals"
					/>

					<payments-button-action
						:external="false"
						type="default"
						label="Получить VIP"
						@click="handleJoinClick"
					/>
				</template>
			</vip-payments-header>

			<div class="neteller-body">
				<div class="vip-payments-advantages vip-payments-advantages--neteller">
					<h2 class="vip-payments-advantages__title">
						В чем преимущества получения
						<span class="vip-payments-advantages__title--highlight"
							>VIP&#8209;статуса от Neteller</span
						>
					</h2>

					<svg-icon
						class="vip-payments-advantages__logo neteller__logo"
						icon="neteller-logo"
						view-box="0 0 295 50"
					/>

					<div
						class="vip-payments-advantages__list vip-payments-advantages__list--neteller"
					>
						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								class="vip-payments-advantages__icon"
								icon="neteller-comission"
							/>
							<span
								class="vip-payments-advantages__label vip-payments-advantages__label--neteller"
								><b>Сниженные комиссии</b> на транзакции</span
							>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								class="vip-payments-advantages__icon"
								icon="neteller-verify"
							/>
							<span
								class="vip-payments-advantages__label vip-payments-advantages__label--neteller"
								><b>Ускоренная верификация счета</b></span
							>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								class="vip-payments-advantages__icon"
								icon="neteller-limits"
							/>
							<span
								class="vip-payments-advantages__label vip-payments-advantages__label--neteller"
								><b>Повышенные лимиты</b></span
							>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								class="vip-payments-advantages__icon"
								icon="neteller-rakeback"
							/>
							<span
								class="vip-payments-advantages__label vip-payments-advantages__label--neteller"
								><b>Рейкбек +1,5%</b>в любом покер-руме на 3 месяца</span
							>
						</div>
					</div>
				</div>

				<div class="neteller-info">
					<div class="neteller-card neteller-card_vip">
						<h3 class="neteller-card__title neteller-card__title_vip">
							Neteller <br />
							<span class="neteller-card__title-highlight"
								>+ Worldpokerdeals</span
							>
						</h3>
						<ul class="neteller-card__list">
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<div>Верификации счета NETELLER <b>за 24 часа</b></div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<div>
									<b>Silver VIP</b> – за депозиты на сумму 6 000$ за квартал <br>
									<span class="neteller-notice"><span>* </span> Статус даётся один раз при выполнении условий</span>
								</div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<div>
									<b>Эксклюзивный статус Bronze Pro VIP</b> (после верификации)
								</div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								Персональная поддержка по всем вопросам в режиме реального
								времени
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								Решение нестандартных задач: ввод/вывод больших сумм, переводы в
								другие платежные системы и т.д.
							</li>
						</ul>
					</div>

					<div class="neteller-card">
						<h3 class="neteller-card__title">Обычный клиент</h3>
						<ul class="neteller-card__list">
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								Верификация счета с срок от 3 дней
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								Silver VIP – за депозиты на сумму 15 000$ за квартал
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								Нет
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								Нет
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								Нет
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div id="neteller-footer" class="neteller-footer">
				<h2 class="neteller-footer__title">
					Заполнить заявку на VIP-статус
				</h2>
				<div class="neteller-footer__info">
					Заполните заявку на подключение к нашей VIP программе для Skrill, и
					получите лучшие условия обслуживания, а так же быстрый саппорт, в
					который вы можете обратиться по любому вопросу.
				</div>

				<payments-form
					class="neteller-footer__payment"
					action="/payments/neteller/getvip"
					type="neteller"
				/>

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

		async middleware({ store, redirect, params, $axios }) {
			await $axios
				.get('pages/vip-neteller')
				.then(response => {
					store.commit('pages/FETCH_PAGE', { page: response.data })
				})
				.catch(error => {})
		},

		head() {
			return {
				title: this.page.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.page.meta_description },
					{ name: 'keywords', content: this.page.meta_keywords },
				],
			}
		},

		metaInfo: {},

		data: () => ({
			summary:
				'Neteller - старейший и один из самых популярных у игроков, кошельков для покера. Регистрируете счет в Neteller с Worldpokerdeals сегодня, чтобы получить VIP-обслуживание, льготные условия для получения VIP-статусов и множество других приятных бонусов.',

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
						id: 502,
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
				let el = document.querySelector('#neteller-footer')
				if (el) {
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset
					window.scrollTo({ top: offset, behavior: 'smooth' })
				}
			},
		},
	}
</script>

<style lang="scss">
	$ico-neteller-form: url('~assets/i/ico-neteller-form.svg?data');

	.neteller {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1440px;
		&__logo {
			max-width: 100%;
		}

		&-notice {
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 18px;
			color: #999999;

			span {
				font-size: 14px;
		    font-weight: bold;
		    vertical-align: middle;
		    height: 18px;
		    display: inline-block;
			}
		}

		&-body {
			width: 100%;
			margin-top: -336px;
			background: linear-gradient(
				180deg,
				rgba(236, 235, 235, 0) 0%,
				#f3f1f1 100%
			);
		}

		&-card {
			position: relative;
			max-width: 586px;
			z-index: 1;
			border-bottom-right-radius: 10px;
			flex-grow: 1;
			margin-left: -10px;
			background: linear-gradient(0deg, #e5e5e5, #e5e5e5),
				radial-gradient(61.16% 100% at 61.16% 0%, #9d2777 0%, #731a56 61.46%);
			&_vip {
				max-width: 578px;
				border-bottom-left-radius: 10px;
				z-index: 2;
				margin-left: 0px;
				box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.15);
				background: linear-gradient(0deg, #f8f8f8, #f8f8f8),
					radial-gradient(61.16% 100% at 61.16% 0%, #9d2777 0%, #731a56 61.46%);
			}
			&__title {
				margin-bottom: 0;
				border-top-right-radius: 10px;
				padding: 28px 40px 28px 50px;
				color: #f8f8f8;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 24px;
				line-height: 24px;
				color: #f8f8f8;
				background: linear-gradient(0deg, #6b6d7c, #6b6d7c),
					radial-gradient(61.16% 100% at 61.16% 0%, #9d2777 0%, #731a56 61.46%);
				&_vip {
					border-top-left-radius: 10px;
					margin-top: -32px;
					padding: 28px 40px;
					font-family: 'Proxima Nova Th';
					font-size: 32px;
					line-height: 32px;
					background: linear-gradient(0deg, #6c963c, #6c963c),
						radial-gradient(
							363.3% 931.9% at 73.15% -35.54%,
							#3a3e51 0%,
							#1d1f2c 100%
						);
				}
				&-highlight {
					display: block;
					font-family: Proxima Nova;
					font-weight: bold;
					font-size: 24px;
					line-height: 24px;
					color: #f8f8f8;
					opacity: 0.8;
				}
			}

			&__list {
				min-height: 208px;
				margin: 0 0 8px 0;
				padding: 0;
			}

			&__item {
				display: flex;
				gap: 16px;
				padding: 20px 40px;
				min-height: 85px;
				list-style: none;
				font-family: Proxima Nova;
				font-size: 18px;
				line-height: 22px;
				color: #555555;
				border-bottom: 1px solid #d5d5d5;
				&--common-user {
					padding-left: 50px;
				}
				&:last-child {
					border-bottom: 0;
				}
				&__icon {
					flex-shrink: 0;
				}
			}
		}

		&-footer {
			width: 807px;
			display: flex;
			flex-direction: column;
			align-items: center;
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
				background: $ico-neteller-form no-repeat center top;
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

	.neteller-info {
		display: flex;
		margin: 0 auto;
		padding-bottom: 60px;
		padding-top: 36px;
		justify-content: center;
		max-width: 1152px;
	}

	.ptn-payments-form {
		padding: 10px 45px;
	}

	@include mq('laptop') {
		.neteller-info {
			max-width: 1016px;
		}
	}

	@include mq('laptop') {
		.neteller-body {
			width: 100%;
			@include paddings('tablet');
		}

		.neteller-card {
			max-width: 50%;
			&__item {
				padding: 20px 24px;
				&--common-user {
					padding-left: 34px;
				}
				&:nth-child(4) {
					min-height: 107px;
				}
			}
			&__title {
				padding: 28px 24px;
				padding-left: 34px;
				&_vip {
					padding-left: 24px;
				}
			}
		}

		.neteller-footer {
			width: 100%;
			@include paddings('tablet');
			&__payment {
				width: 100%;
			}
		}
	}

	@include mq('tablet') {
		.neteller-body {
			margin-top: -276px;
			@include paddings('mobile');
		}
		.neteller-card {
			min-width: 304px;
			&_vip {
				box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.15);
			}
			&__item {
				padding: 20px;
				min-height: 106px;
				&--common-user {
					padding-left: 30px;
				}
				&:nth-child(4) {
					min-height: 129px;
				}
			}
		}
		.neteller-info {
			overflow-x: scroll;
			@include hide-scroll();
			justify-content: flex-start;
			margin-left: -20px;
			padding-left: 20px;
			margin-right: -20px;
		}

		.neteller-footer {
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
