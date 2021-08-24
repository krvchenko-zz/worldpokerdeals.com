<template>
	<div class="game-search-banner">
		<img
			width="262px"
			height="433px"
			decoding="async"
			loading="lazy"
			src="~assets/i/game-search-banner.jpg"
			alt="Вестник Бамхантера"
			class="game-search-banner__img"
		/>
		<div class="game-search-banner__wrap">
			<div class="game-search-banner__title">Ищешь лучшую игру?</div>
			<div class="game-search-banner__info">
				Индивидуально <b>подберем рум</b> под лимиты и тип игры из
				<b>50+ комнат и 30+ приватных клубов</b>
			</div>
			<div class="game-search-banner__actions">
				<button-contact block size="md" type="chat">Начать чат</button-contact>
				<div class="game-search-banner__messengers">
					<button-contact
						class="game-search-banner__btn"
						icon
						target="_blank"
						size="md"
						type="telegram"
						:href="telegram"
					></button-contact>
					<button-contact
						class="game-search-banner__btn"
						icon
						size="md"
						type="skype"
						:href="skype"
					></button-contact>
					<button-contact
						class="game-search-banner__btn"
						icon
						size="md"
						type="whatsapp"
						:href="whatsapp"
					></button-contact>
					<button-contact
						class="game-search-banner__btn"
						icon
						size="md"
						type="email"
						:href="email"
					></button-contact>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GameSearchBanner',

		components: {},

		props: {},

		data: () => ({
			telegram: 'worldpokerdealsRU',
			skype: 'anton.wpd',
			whatsapp: '+66956396293',
			email: 'antonio@worldpokerdeals.com',
		}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');

	.game-search-banner {
		margin: 40px 0 0 0;
		width: 100%;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
		&__img {
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 2;
		}

		&__wrap {
			padding: 40px 28px 28px 28px;
			display: block;
			height: 100%;
			width: 100%;
			position: relative;
			z-index: 2;
		}

		&__title {
			grid-area: title;
			margin-bottom: 20px;
			padding-top: 68px;
			padding-bottom: 18px;
			position: relative;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 28px;
			line-height: 28px;
			text-align: center;
			letter-spacing: -0.3px;
			color: #ffffff;
			background: $contact-us-logo no-repeat center top;
			background-size: 45px;
			&:after {
				content: '';
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				display: block;
				position: absolute;
				height: 2px;
				width: 40px;
				background: #dfe4e6;
			}
		}

		&__info {
			grid-area: info;
			margin-bottom: 36px;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 21px;
			text-align: center;
			color: #ffffff;
		}

		&__actions {
			grid-area: actions;
		}

		&__messengers {
			margin-top: 20px;
			display: flex;
			justify-content: center;
		}

		&__btn {
			margin-right: 20px;
			&:last-child {
				margin: 0;
			}
		}
	}

	@include mq('laptop') {
		.game-search-banner {
			&__wrap {
				display: grid;
				padding: 28px;
				grid-template-columns: 5.5fr 4.2fr;
				column-gap: 52px;
				grid-template-areas:
					'title actions'
					'info actions';
			}
			&__title {
				padding-left: 70px;
				padding-top: 0;
				background-position: left top;
				text-align: left;
				padding-bottom: 0;
				margin-bottom: 14px;
				&:after {
					display: none;
				}
			}
			&__info {
				margin-bottom: 0;
				padding-left: 70px;
				text-align: left;
			}
			&__messengers {
				justify-content: flex-start;
			}
		}
	}

	@include mq('tablet') {
		.game-search-banner {
			&__wrap {
				grid-template-columns: 100%;
				grid-template-areas:
					'title'
					'info'
					'actions';
			}
			&__title {
				padding-top: 60px;
				padding-left: 0;
				padding-bottom: 16px;
				background-position: center top;
				text-align: center;
				margin-bottom: 16px;
				&:after {
					display: block;
				}
			}
			&__info {
				text-align: center;
				padding-left: 0;
				margin-bottom: 20px;
			}
			&__messengers {
				justify-content: center;
			}
		}
	}
</style>
