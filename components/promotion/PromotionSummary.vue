<template>
	<div class="promotion-summary">
		<div class="row">
			<div class="col-4">
				<div class="promotion-summary__label">{{ $t('status') }}</div>
				<div class="promotion-summary__status">
					<template v-if="active">{{ $t('active') }}</template>
					<template v-else>{{ $t('inactive') }}</template>
				</div>
			</div>
			<div class="col-4">
				<div class="promotion-summary__label">{{ $t('type') }}</div>
				<div class="promotion-summary__type">{{ type }}</div>
			</div>
			<div class="col-4">
				<div class="promotion-summary__label">{{ $t('prize_pool') }}</div>
				<div class="promotion-summary__prize">
					{{ currency }}{{ formatMoney(prize) }}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<div class="promotion-summary__label">{{ $t('permanent') }}</div>
				<div
					:class="{
						'promotion-summary__permanent': true,
						'promotion-summary__permanent_yes': permanent,
						'promotion-summary__permanent_no': !permanent,
					}"
				></div>
			</div>
			<div class="col-4">
				<div class="promotion-summary__label">{{ $t('exclusive') }}</div>
				<div
					:class="{
						'promotion-summary__exclusive': true,
						'promotion-summary__exclusive_yes': permanent,
						'promotion-summary__exclusive_no': !permanent,
					}"
				></div>
			</div>
			<div class="col-4">
				<div class="promotion-summary__label">
					<template v-if="time_left">{{ $t('time_left') }}</template>
					<template v-if="time_before">{{ $t('time_before') }}</template>
					<template v-if="regularity">{{ $t('regularity') }}</template>
				</div>
				<div
					v-if="time_left || time_before"
					class="promotion-summary__countdown"
				>
					<countdown
						v-if="time_left"
						:days="time_left.days"
						:hours="time_left.hours"
						:minutes="time_left.minutes"
					/>
					<countdown
						v-if="time_before"
						:days="time_before.days"
						:hours="time_before.hours"
						:minutes="time_before.minutes"
					/>
				</div>

				<div class="promotion-summary__regularity">{{ regularity }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Countdown from '~/components/Countdown'

	export default {
		name: 'PromotionSummary',

		components: {
			Countdown,
		},

		props: {
			active: {
				type: Boolean,
				default: false,
			},

			type: {
				type: String,
				default: '',
			},

			prize: {
				type: [String, Number],
				default: 0,
			},

			currency: {
				type: String,
				default: '',
			},

			time_left: {
				type: [String, Boolean, Object],
				default: false,
			},

			time_before: {
				type: [String, Boolean, Object],
				default: false,
			},

			start: {
				type: String,
				default: '',
			},

			end: {
				type: String,
				default: '',
			},

			permanent: {
				type: Boolean,
				default: false,
			},

			exclusive: {
				type: Boolean,
				default: false,
			},

			regularity: {
				type: String,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},

			formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ' ') {
				try {
					decimalCount = Math.abs(decimalCount)
					decimalCount = isNaN(decimalCount) ? 2 : decimalCount

					const negativeSign = amount < 0 ? '-' : ''

					let i = parseInt(
						(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
					).toString()
					let j = i.length > 3 ? i.length % 3 : 0

					return (
						negativeSign +
						(j ? i.substr(0, j) + thousands : '') +
						i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
						(decimalCount
							? decimal +
							  Math.abs(amount - i)
									.toFixed(decimalCount)
									.slice(2)
							: '')
					)
				} catch (e) {
					console.log(e)
				}
			},
		},
	}
</script>

<style lang="scss">
	$ico-yes: url('~assets/i/ico-yes.svg?data');
	$ico-no: url('~assets/i/ico-no.svg?data');

	.promotion-summary {
		margin: 30px 0 40px 0;
		&__label {
			margin-bottom: 4px;
			font-family: 'Proxima Nova';
			font-size: 15px;
			line-height: 20px;
			color: #555555;
		}

		&__status {
			margin-bottom: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #222222;
		}

		&__type {
			margin-bottom: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #222222;
		}

		&__countdown {
			margin-bottom: 20px;
			display: inline-block;
		}

		&__prize {
			margin-bottom: 20px;
			display: inline-block;
			padding: 4px 12px;
			background: #ffd808;
			border-radius: 4px;
			text-align: center;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			color: #282a36;
		}

		&__start {
			margin-bottom: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #222222;
		}

		&__end {
			margin-bottom: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #222222;
		}

		&__permanent {
			border-radius: 50%;
			width: 20px;
			height: 20px;
			&_yes {
				background: #55bf4f $ico-yes no-repeat center;
			}
			&_no {
				background: #f31112 $ico-no no-repeat center;
			}
		}

		&__exclusive {
			border-radius: 50%;
			width: 20px;
			height: 20px;
			&_yes {
				background: #55bf4f $ico-yes no-repeat center;
			}
			&_no {
				background: #f31112 $ico-no no-repeat center;
			}
		}

		&__regularity {
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #222222;
		}
	}
</style>
