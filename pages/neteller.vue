<template>
	<section :class="['content']">
		<div class="neteller">
			<vip-payments-header
				:title="$t('vip_neteller.title')"
				type="neteller"
				:summary="$t('vip_neteller.description')"
			>
				<template #buttons>
					<payments-button-action
						type="neteller"
						:label="$t('vip_neteller.register')"
						target="_blank"
						url="https://ntupgrade.vip/wpdeals"
					/>

					<payments-button-action
						:external="false"
						type="default"
						:label="$t('vip_neteller.vip')"
						@click="handleJoinClick"
					/>
				</template>
			</vip-payments-header>

			<div class="neteller-body">
				<div class="vip-payments-advantages vip-payments-advantages--neteller">
					<h2 class="vip-payments-advantages__title" v-html="$t('vip_neteller.advantages_title')"></h2>

					<svg-icon
						class="vip-payments-advantages__logo neteller__logo"
						icon="neteller-logo"
						:image="true"
						:width="295"
						:height="50"
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
								:image="true"
								class="vip-payments-advantages__icon"
								icon="neteller-comission"
							/>
							<span class="vip-payments-advantages__label vip-payments-advantages__label--neteller" v-html="$t('vip_neteller.advantages')[0]"></span>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								:image="true"
								class="vip-payments-advantages__icon"
								icon="neteller-verify"
							/>
							<span class="vip-payments-advantages__label vip-payments-advantages__label--neteller" v-html="$t('vip_neteller.advantages')[1]"></span>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								:image="true"
								class="vip-payments-advantages__icon"
								icon="neteller-limits"
							/>
							<span class="vip-payments-advantages__label vip-payments-advantages__label--neteller" v-html="$t('vip_neteller.advantages')[2]"></span>
						</div>

						<div
							class="vip-payments-advantages__list-item vip-payments-advantages__list-item--neteller"
						>
							<svg-icon
								:width="50"
								:height="50"
								:image="true"
								class="vip-payments-advantages__icon"
								icon="neteller-rakeback"
							/>
							<span class="vip-payments-advantages__label vip-payments-advantages__label--neteller" v-html="$t('vip_neteller.advantages')[3]"></span>
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
									:image="true"
									class="neteller-card__item__icon"
								/>
								<div v-html="$t('vip_neteller.features')[0]['items'][0]"></div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<div>
									<span v-html="$t('vip_neteller.features')[0]['items'][1]"></span>  <br>
									<span class="neteller-notice"><span>* </span> {{ $t('vip_neteller.features')[0]['info']}}</span>
								</div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<div v-html="$t('vip_neteller.features')[0]['items'][2]"></div>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[0]['items'][3]"></span>
							</li>
							<li class="neteller-card__item">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[0]['items'][4]"></span>
							</li>
						</ul>
					</div>

					<div class="neteller-card">
						<h3 class="neteller-card__title">{{ $t('vip_neteller.features')[1]['title'] }}</h3>
						<ul class="neteller-card__list">
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[1]['items'][0]"></span>
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-plus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[1]['items'][1]"></span>
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[1]['items'][2]"></span>
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[1]['items'][3]"></span>
							</li>
							<li class="neteller-card__item neteller-card__item--common-user">
								<svg-icon
									icon="neteller-minus"
									class="neteller-card__item__icon"
								/>
								<span v-html="$t('vip_neteller.features')[1]['items'][4]"></span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div id="neteller-footer" class="neteller-footer">
				<h2 class="neteller-footer__title">{{ $t('vip_neteller.form_title') }}</h2>
				<div class="neteller-footer__info">{{ $t('vip_neteller.form_text') }}</div>

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
					:label="$t('vip_neteller.manager_title')"
					:description="$t('vip_neteller.manager_info')"
				/>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pageMixin from '~/mixins/pageMixin'
	import Manager from '~/components/cards/Manager'

	export default {
		components: {
			Manager,
		},
		layout: 'basic',

		metaInfo: {},

		mixins: [pageMixin],

		data: () => ({
			manager: null,
		}),

		computed: {
			...mapGetters({
				topList: 'rooms/topList',
				locale: 'lang/locale',
			}),
		},

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: this.locale === 'es' ? 664 : 502,
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
