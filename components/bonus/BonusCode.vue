<template>
	<span
		:class="[
			'bonus-code',
			small && 'bonus-code_small',
			big && 'bonus-code_big',
			(hover && !isDisabled) && 'bonus-code_hover',
			isDisabled && 'bonus-code_disabled',
		]"
		@mouseover="hover = true"
		@mouseleave="hover = false"
		@click="copy"
	>
		<span
			:class="[
				'bonus-code__label',
				big && 'bonus-code__label_big',
				hover && 'bonus-code__label bonus-code__label_hover',
			]"
			>{{ $t('bonus_code') }}</span
		>
		<span
			:class="[
				'bonus-code__value',
				big && 'bonus-code__value_big',
			]"
			ref="code">{{!code || code === '' ? 'Не нужен' : code }}</span
		>
		<transition name="fade">
			<span class="bonus-code-tooltip" v-if="copied">
				<span class="bonus-code-tooltip__text">Copied to the clipboard!</span>
				<span class="bonus-code-tooltip__arrow"></span>
			</span>
		</transition>
	</span>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'BonusCode',

		components: {},

		props: {
			code: {
				type: String,
				default: 'Не нужен',
			},
			small: {
				type: Boolean,
				default: false,
			},
			big: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			hover: false,
			copied: false,
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
			isDisabled() {
				return !this.code || this.code === ''
			},
		},

		watch: {},

		methods: {
			copy() {
				if (this.isDisabled) return
				navigator.clipboard.writeText(this.code)
				this.showTooltip()
			},

			showTooltip() {
				this.copied = true
				setTimeout(() => {
					this.copied = false
				}, 600)
			}

		},
	}
</script>

<style lang="scss">
	$ico-scissors: url('~assets/i/promotion/ico-scissors.svg?data');

	.bonus-code {
		width: 128px;
		margin-right: 20px;
		position: relative;
		cursor: pointer;
		display: block;
		min-width: 130px;
		padding: 8px 0 4px 0;
		background: #fafafa;
		border: 1px dashed rgba(119, 119, 119, 0.5);
		border-radius: 4px;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&_small {
			width: 100%;
			margin: 0;
		}
		&_big {
			padding: 11px 20px;
			margin: 0;
			min-width: 130px;
			width: auto;
			border-radius: 8px;
			background: linear-gradient(0deg, #f6f6f6, #f6f6f6),
									radial-gradient(179.3% 742.81% at 97.16% 5.47%, #f7f7f7 20.31%, #cccccc 100%);
		}
		&_hover {
			border-color: #008be2;
			&:before {
				content: '';
				top: -12px;
				left: 50%;
				margin-left: -9px;
				position: absolute;
				width: 18px;
				height: 12px;
				display: block;
				background: $ico-scissors no-repeat center;
			}
		}

		&_disabled {
			cursor: not-allowed;
		}

		&__label {
			display: block;
			text-align: center;
			font-family: 'Proxima Nova Sb';
			font-size: 10px;
			line-height: 12px;
			letter-spacing: 0.3px;
			text-transform: uppercase;
			color: #777777;
			transition: background 0.1s ease, border-color 0.1s ease,
				color 0.1s ease;
			&__hover {
				color: #008be2;
			}
			&_big {
				margin-bottom: 4px;
				font-size: 12px;
				line-height: 14px;
				letter-spacing: 0.5px;
			}
		}

		&__value {
			display: block;
			text-align: center;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 16px;
			line-height: 20px;
			letter-spacing: 0.3px;
			color: #555555;
			text-transform: uppercase;
			&_big {
				font-size: 18px;
				line-height: 20px;
				letter-spacing: 0.5px;
				color: #777777;
				font-family: 'Proxima Nova Th';
			}
		}

		&-tooltip {
			display: block;
			position: absolute;
			will-change: transform;
			top: -46px;
			left: 50%;
			background-color: rgba(0, 0, 0, .7);
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			max-width: 320px;
			padding: 6px 10px;
			border-radius: 3px;
			z-index: 100;
			-webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
			box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
			transform: translateX(-50%);
			&__text {
				display: block;
				color: #fff;
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 12px;
				text-align: center;
				white-space: nowrap;
			}
			&__arrow {
				left: 50%;
				transform: translateX(-50%);
				content: "";
				width: 0;
				height: 0;
				border-style: solid;
				position: absolute;
				border-width: 5px 5px 0 5px;
				border-top-color: rgba(0, 0, 0, .7);
				border-bottom-color: transparent!important;
				border-left-color: transparent!important;
				border-right-color: transparent!important;
				bottom: -5px;
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		@include mq('laptop') {
			width: 100%;
			margin-right: 0;
			margin-bottom: 20px;
		}

		@include mq('tablet') {
			min-width: 152px;
			margin-right: 0px;
			margin-bottom: 0;
			padding-bottom: 4px;
			padding-top: 4px;
			height: 40px;
			&_small {
				width: auto;
				min-width: 132px;
				margin-bottom: 0;
				margin-right: auto;
				height: 40px;
				padding-top: 4px;
			}
			&_big {
				padding: 11px 20px;
				min-width: auto;
				height: auto;
			}
		}

		@include mq('mobile') {
			min-width: 140px;
		}
	}
</style>
