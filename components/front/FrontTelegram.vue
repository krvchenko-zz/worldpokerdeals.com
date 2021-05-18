<template>
	<div class="front-telegram">
		<div class="front-telegram__wrap">
			<div class="front-telegram__title">
				Telegram-канал<br /><b>«Вестник Бамхантера»</b>
			</div>
			<div class="front-telegram__info">
				Подпольное издание для тех, кто ценит свое время и выбирает лучшую игру
			</div>
			<a
				class="btn btn-block btn-green front-telegram__subscribe-button"
				rel="nofollow"
				href="https://t.me/worldpokerdealsRU"
				target="_blank"
				>Подписаться</a
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

		&__title {
			padding-top: 60px;
			margin-bottom: 8px;
			font-family: 'Proxima Nova Sb';
			font-size: 18px;
			line-height: 22px;
			text-align: center;
			letter-spacing: -0.3px;
			color: #ffffff;
			background: $ico-telegram-big no-repeat center top;
			b {
				font-family: 'Proxima Nova Th';
				font-size: 21px;
			}
		}

		&__info {
			margin-bottom: 16px;
			font-family: Proxima Nova;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
			opacity: 0.9;
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
	}
</style>
