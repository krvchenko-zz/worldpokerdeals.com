<template>
	<div class="front-telegram">
		<div class="front-telegram__wrap">
			<img
				class="front-telegram__icon"
				src="~assets/i/messengers/ico-telegram-big.svg?data"
			/>
			<div class="front-telegram__title" v-html="$t('bumhunters')"></div>
			<div class="front-telegram__info" v-html="$t('bumhunters_text')"></div>
			<a
				class="btn btn-block btn-green front-telegram__subscribe-button"
				rel="nofollow noopener"
				href="https://t.me/worldpokerdealsRU"
				target="_blank"
				>{{ $t('subscribe') }}</a
			>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FrontTelegram',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-telegram-big: url('~assets/i/messengers/ico-telegram-big.svg?data');
	$front-telegram-bg: url('~assets/i/bamhunter-banner.jpg');

	.front-telegram {
		border-radius: 10px;
		min-height: 252px;
		background: $front-telegram-bg no-repeat center top;
		background-size: cover;

		&__wrap {
			padding: 24px 28px 28px 28px;
			display: block;
			top: 0;
			left: 0;
		}

		&__icon {
			grid-area: icon;
			display: block;
			margin: 0 auto 12px;
		}

		&__title {
			grid-area: title;
			margin-bottom: 8px;
			font-family: 'Proxima Nova Sb';
			font-size: 18px;
			line-height: 22px;
			text-align: center;
			letter-spacing: -0.3px;
			color: #ffffff;
			b {
				font-family: 'Proxima Nova Th';
				font-size: 21px;
			}
		}

		&__info {
			grid-area: info;
			margin-bottom: 16px;
			font-family: Proxima Nova;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
			opacity: 0.9;
		}

		&__subscribe-button {
			grid-area: button;
		}
	}

	@include mq('laptop') {
		.post-category {
			.front-telegram {
				min-height: initial;
				&__wrap {
					display: grid;
					padding: 20px 24px;
					grid-template-columns: max-content 1fr 200px;
					grid-template-areas: 'icon title button' 'icon info button';
					column-gap: 20px;
				}
				&__title {
					text-align: left;
				}
				&__info {
					text-align: left;
					margin-bottom: 0;
				}
				&__subscribe-button {
					align-self: center;
				}
			}
		}
	}

	@include mq('tablet') {
		.front-telegram {
			display: flex;
			flex-direction: column;
			&__wrap {
				display: flex;
				flex-direction: column;
			}
			&__subscribe-button {
				width: auto;
				min-width: 177px;
			}
			&__title {
				font-size: 20px;
			}
			&__info {
				font-size: 14px;
			}
		}

		.post-category {
			.front-telegram {
				min-height: initial;
				&__wrap {
					display: block;
					padding: 20px;
				}
				&__title {
					text-align: center;
					font-weight: 600;
					font-size: 24px;
					line-height: 26px;
					margin-bottom: 12px;
				}
				&__info {
					text-align: center;
					font-size: 14px;
					margin-bottom: 16px;
				}
				&__subscribe-button {
					width: 177px;
					margin: 0 auto;
				}
			}
		}
	}
</style>
