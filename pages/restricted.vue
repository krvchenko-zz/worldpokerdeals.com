<template>
	<section class="content content_restricted">
		<div class="restricted">
			<div class="restricted__logo">
				<img
					decoding="async"
					loading="lazy"
					class="restricted__logo"
					src="~assets/i/restricted-logo.png"
					:alt="$t('restricted.title')"
				/>
			</div>

			<h1 class="restricted__title">{{ $t('restricted.title') }}</h1>
			<div class="restricted__ip">
				<svg-icon
					:width="20"
					:height="20"
					:icon="country.code"
					prefix="flags/"
				/>
				<span>{{ country.remote_addr }}</span>
			</div>
			<div class="restricted__info" v-html="$t('restricted.description')"></div>

			<div class="restricted__manager">
				<div v-if="manager" class="restricted-box">
					<div class="restricted-box__wrap">
						<div class="restricted-box__header">
							<div class="restricted-box__icon">
								<svg-icon icon="get-access" />
							</div>
							<h2 class="restricted-box__title">{{ $t('restricted.form_title') }}</h2>
							<div class="restricted-box__info">{{ $t('restricted.form_text') }}</div>
						</div>

						<div class="restricted-box__body">
							<restricted-form />
							<div class="restricted-box__messengers">{{ $t('restricted.form_contacts') }}</div>
							<div class="restricted-box__buttons">
								<button-contact
									style="padding: 0 32px;"
									size="md"
									type="chat"
								>
									{{ $t('start_chat') }}
								</button-contact>
								<button-contact
									icon
									size="md"
									type="telegram"
									rel="nofollow noopener"
									:href="manager.telegram"
								/>
								<button-contact
									icon
									size="md"
									type="skype"
									rel="nofollow noopener"
									:href="manager.skype"
								/>
								<button-contact
									icon
									size="md"
									type="whatsapp"
									rel="nofollow noopener"
									:href="manager.whatsapp"
								/>
								<button-contact
									icon
									size="md"
									type="fb"
									rel="nofollow noopener"
									:href="manager.fb"
								/>
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
	import pageMixin from '~/mixins/pageMixin'

	export default {
		components: {},
		layout: 'basic',

		mixins: [pageMixin],

		props: {},

		data: () => ({
			manager: null,
			remote_addr: '114.34.89.92',
		}),

		async fetch() {
			await this.$axios
				.get(`/rooms/url/${this.$route.params.slug}`)
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOM', { room: response.data })
				})

			await this.$axios
				.get('/managers', {
					params: {
						id: 502,
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
						fb: response.data.facebook,
						vk: response.data.vk,
						instagram: response.data.instagram,
					}
				})
		},

		created() {},

		computed: {
			...mapGetters({
				room: 'rooms/room',
			})
		},

		watch: {},

		methods: {
			async submit() {
				this.form
					.post('/contacts')
					.then(response => {
						this.$emit('submit')
						this.form.reset()
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	$restricted-bg: url('~assets/i/restricted-bg.svg?data');
	$envelop-front: url('~assets/i/envelop-front.svg?data');
	$envelop-back: url('~assets/i/envelop-back.svg?data');
	$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');

	.content_restricted {
		padding-top: 56px;
		position: relative;
		background: radial-gradient(
			96.88% 66.11% at 57.43% 2.13%,
			#3a3e51 0%,
			#1d1f2c 100%
		);
	}

	.restricted {
		display: grid;
		grid-template-columns: 1fr 5fr 4fr;
		width: 100%;
		max-width: 1440px;
		padding-left: 118px;
		padding-right: 118px;
		grid-template-areas:
			'logo title manager'
			'logo ip manager'
			'logo info manager';
		column-gap: 28px;
		position: relative;
		background: $restricted-bg no-repeat left 12px;
		&__manager {
			grid-area: manager;
		}
		&__title {
			grid-area: title;
			margin: 34px 0 28px 0;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&__logo {
			grid-area: logo;
			float: right;
			max-width: 100%;
			height: auto;
			display: block;
		}

		&__info {
			grid-area: info;
			font-family: Proxima Nova;
			font-size: 17px;
			line-height: 21px;
			color: #cccccc;
			p {
				margin-bottom: 16px;
			}
			b {
				font-family: 'Proxima Nova Sb';
			}
		}

		&__ip {
			grid-area: ip;
			justify-self: baseline;
			margin-bottom: 20px;
			padding: 8px 12px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #fafafa;
			display: inline-flex;
			align-items: center;
			background: #1f222e;
			border-radius: 50px;
			span {
				padding-left: 12px;
			}
		}

		&-box {
			box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
			&__header {
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				padding: 28px;
				background: radial-gradient(
						81.5% 101.54% at 50.15% 20.26%,
						#267dbd 0%,
						#008be2 100%
					),
					#2e87c8;
			}
			&__body {
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				padding: 28px;
				background: #fafafa;
			}
			&__title {
				margin-bottom: 12px;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 24px;
				line-height: 28px;
				text-align: center;
				letter-spacing: -0.2px;
				color: #ffffff;
			}
			&__icon {
				margin-top: -54px;
				margin-bottom: 24px;
				text-align: center;
			}
			&__info {
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 16px;
				line-height: 20px;
				text-align: center;
				color: #ffffff;
			}
			&__messengers {
				margin-bottom: 16px;
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 16px;
				text-align: center;
				color: #555555;
			}
			&__buttons {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}

	.btn-contact_fb {
		&:before {
			background-size: 13px auto;
		}
	}
	.btn-contact_vk {
		&:before {
			background-size: 28px auto;
		}
	}
	.btn-contact_instagram {
		&:before {
			background-size: 30px auto;
		}
	}

	@include mq('desktop') {
		.restricted {
			grid-column: 24px;
			padding-left: 104px;
			padding-right: 104px;
		}
	}

	@include mq('laptop') {
		.restricted {
			grid-template-columns: 104px 20px 8fr 2fr;
			column-gap: 0px;
			@include paddings('tablet');
			grid-template-areas:
				'logo . title .'
				'logo . ip .'
				'logo . info .'
				'. . manager .';
			&__manager {
				margin-top: 94px;
			}
		}

		.content_restricted {
			padding-top: 44px;
		}
	}

	@include mq('tablet') {
		.restricted {
			grid-template-columns: 60px 1fr;
			@include paddings('mobile');
			grid-template-areas:
				'logo title'
				'ip ip'
				'info info'
				'manager manager';

			&__title {
				padding-left: 16px;
				margin-top: 20px;
				font-size: 28px;
				line-height: 32px;
			}

			&-box {
				&__buttons {
					flex-wrap: wrap;
					justify-content: center;
					gap: 20px;

					.btn-contact:first-child {
						width: 100%;
					}
				}
			}
		}
	}
</style>
