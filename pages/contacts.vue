<template>
	<section class="content content_contacts">
		<div class="contacts">
			<div class="contacts__form">
				<h1 class="contacts__title">
					Свяжись с нами, чтобы узнать о закрытых сделках и секретных румах.
					Отвечаем сразу!
				</h1>
				<contacts-form />
			</div>

			<div class="contacts__social">
				<div v-if="manager" class="contacts-box">
					<div class="contacts-box__wrap">
						<h2 class="contacts-box__title">
							Наши месседжеры и социальные сети
						</h2>
						<div class="contacts-box__buttons">
							<button-contact
								icon
								size="md"
								type="skype"
								:href="manager.skype"
							/>
							<button-contact
								icon
								size="md"
								type="telegram"
								:href="manager.telegram"
							/>
							<button-contact
								icon
								size="md"
								type="whatsapp"
								:href="manager.whatsapp"
							/>
							<button-contact icon size="md" type="fb" :href="manager.fb" />
							<button-contact icon size="md" type="vk" :href="manager.vk" />
							<button-contact
								icon
								size="md"
								type="instagram"
								:href="manager.instagram"
							/>
						</div>
						<div class="contacts-box__email">
							<p>Электронная почта</p>
							<a :href="`mailto:${manager.email}`">{{ manager.email }}</a>
						</div>
					</div>
					<div class="contacts-box__chat">
						<button-contact
							:style="{
								borderRadius: '100px',
								padding: '0 52px',
							}"
							size="md"
							type="chat"
							>Начать чат</button-contact
						>
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
	$contact-us-bg: url('~assets/i/contact-us-bg.jpg');
	$envelop-front: url('~assets/i/envelop-front.svg?data');
	$envelop-back: url('~assets/i/envelop-back.svg?data');
	$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');
	.content_contacts {
		background: $contact-us-bg no-repeat center;
		background-size: cover;
	}
	.contacts {
		display: flex;
		width: 100%;
		max-width: 1440px;
		gap: 146px;
		justify-content: center;
		&__form {
			max-width: 562px;
		}
		&__social {
			max-width: 444px;
		}
		&__title {
			margin: 40px 0;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&-box {
			position: relative;
			margin-top: 28px;
			&:before {
				z-index: 3;
				content: '';
				bottom: -1px;
				left: 0;
				position: absolute;
				display: block;
				width: 100%;
				height: 225px;
				background-size: cover;
				background: $envelop-front no-repeat center;
			}
			&:after {
				z-index: 1;
				content: '';
				bottom: 105px;
				left: 0;
				position: absolute;
				display: block;
				width: 100%;
				height: 240px;
				background-size: cover;
				background: $envelop-back no-repeat center;
			}
			&__wrap {
				z-index: 2;
				position: relative;
				width: 388px;
				height: 430px;
				padding: 32px 34px;
				margin: 0 28px;
				background: #ffffff $contact-us-logo no-repeat center 240px;
				box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.5);
				border-radius: 10px;
				clip-path: polygon(342px 0, 100% 45px, 100% 100%, 0% 100%, 0 0);
				&:before {
					content: '';
					top: 0;
					right: 0;
					position: absolute;
					display: block;
					width: 45px;
					height: 45px;
					border-bottom-left-radius: 10px;
					background: #cccccc;
				}
			}
			&__title {
				margin-bottom: 24px;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 22px;
				line-height: 26px;
				text-align: center;
				color: #222222;
			}
			&__buttons {
				margin-bottom: 28px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&__email {
				text-align: center;
				position: relative;
				p {
					font-family: Proxima Nova;
					font-size: 14px;
					line-height: 16px;
					color: #555555;
					margin-bottom: 5px;
				}
				a {
					font-family: 'Proxima Nova Sb';
					font-size: 16px;
					line-height: 16px;
					text-decoration-line: underline;
					color: #008be2;
				}
			}

			&__chat {
				z-index: 3;
				position: absolute;
				bottom: -20px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}

	@include mq('desktop') {
		.contacts {
			gap: 38px;
		}
	}

	@include mq('laptop') {
		.contacts {
			flex-direction: column;
			gap: 72px;
			align-items: center;
			padding-bottom: 15px;
			&__form {
				max-width: 596px;
			}
			&__social {
				max-width: 474px;
			}

			.contacts-form {
				margin-bottom: 0;
			}
		}

		.contacts-box {
			margin-top: 0;
		}
	}

	@include mq('tablet') {
		.contacts {
			@include paddings('mobile');
			gap: 40px;
			&__form {
				max-width: 596px;
			}
			&__social {
				max-width: 474px;
				width: 100%;
			}
		}

		.contacts-box {
			width: 100%;
			&__wrap {
				width: calc(100% - 2 * 20px);
				padding: 32px 26px;
				margin-left: 0;
				margin-right: 0;
				margin: 0 auto;
				max-width: 100%;
				clip-path: polygon(88% 0, 100% 12%, 100% 100%, 0% 100%, 0 0);
				&::before {
					width: 12%;
					height: 12%;
				}
			}
		}
	}

	@media (max-width: 415px) {
		.contacts-box {
			&::after {
				bottom: 66px;
			}
		}
	}

	@media (max-width: 376px) {
		.contacts-box {
			&::after {
				bottom: 44px;
			}
			&__wrap {
				padding: 32px 20px;
			}
		}
	}
</style>
