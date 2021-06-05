<template>
	<div class="vip-payments-header" :class="classObject">
		<div class="vip-payments-header__inner">
			<h1 class="vip-payments-header__title">{{ title }}</h1>
			<div class="vip-payments-header__summary">{{ summary }}</div>
			<div class="vip-payments-header__buttons">
				<slot name="buttons"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'VipPaymentsHeader',
		props: ['title', 'summary', 'type'],
		computed: {
			classObject() {
				return {
					'vip-payments-header--skrill': this.type === 'skrill',
					'vip-payments-header--neteller': this.type === 'neteller',
					'vip-payments-header--ecopayz': this.type === 'ecopayz',
				}
			},
		},
	}
</script>

<style lang="scss">
	$skrill-bg: url('~assets/i/skrill-bg.jpg');
	$ecopayz-bg: url('~assets/i/ecopayz-bg.jpg');
	$neteller-bg: url('~assets/i/neteller-bg.jpg');
	.vip-payments-header {
		position: relative;
		width: 100%;
		min-height: 658px;
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
			opacity: 0.7;
			transform: matrix(-1, 0, 0, 1, 0, 0);
		}
		&--skrill {
			background: $skrill-bg no-repeat center;
			&:before {
				background: radial-gradient(
					100% 100% at 100% 0%,
					#9d2777 0%,
					#731a56 61.46%
				);
				box-shadow: 0px 15px 30px rgba(115, 27, 86, 0.3);
			}
		}
		&--neteller {
			background: $neteller-bg no-repeat center;
			&:before {
				background: radial-gradient(
					96.88% 66.11% at 57.43% 2.13%,
					#84a94c 0%,
					#4a7b25 100%
				);
				box-shadow: 0px 15px 30px rgba(106, 148, 59, 0.3);
			}
		}
		&--ecopayz {
			background: $ecopayz-bg no-repeat center;
			&:before {
				background: radial-gradient(
					100% 100% at 100% 0%,
					#10579b 0%,
					#033564 61.46%
				);
			}
		}
		&__inner {
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
		.btn-payments_plain {
			margin-top: auto;
		}
		.ptn-payments-form {
			padding: 10px 45px;
		}
	}

	@include mq('desktop') {
		.vip-payments-header {
			&__wrapper {
				max-width: 808px;
			}
			&__buttons {
				justify-content: center;
			}
			.btn-payments {
				max-width: 288px;
			}

			.btn-payments_skrill {
				max-width: 290px;
			}
			.btn-payments_default {
				max-width: 284px;
			}
		}
	}

	@include mq('laptop') {
		.vip-payments-header {
			@include paddings('tablet');
			&__wrapper {
				width: 100%;
			}
			&__buttons {
				gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.vip-payments-header {
			@include paddings('mobile');
			&__buttons {
				width: 100%;
				gap: 16px;
				.btn {
					height: 44px;
				}
			}
			.btn-payments {
				max-width: 50%;
			}
		}
	}
</style>
