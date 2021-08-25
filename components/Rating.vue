<template>
	<div class="rating">
		<div class="rating__stars">
			<div :style="style"></div>
		</div>
		<div class="rating__digit">
			<span class="rating__value">{{ value }}</span>
			<span class="rating__delimeter">{{ delimeter }}</span>
			<span class="rating__max">{{ maxVal }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Rating',

		props: {
			value: {
				type: [String, Number],
				default: 0,
			},

			maxVal: {
				type: Number,
				default: 5,
			},

			delimeter: {
				type: String,
				default: '/',
			},

			disabled: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {
			style() {
				return {
					width: `${this.value * 16 - 4}px`,
				}
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-rating: url('~assets/i/ico-rating-small.svg?data');
	.rating {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		// flex-flow: wrap;
		flex-flow: nowrap;
		font-size: 0;
		&__value {
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 12px;
			letter-spacing: 1px;
			color: #feb83c;
		}
		&__delimeter {
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 12px;
			letter-spacing: 1px;
			color: #bebebe;
		}
		&__max {
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 12px;
			letter-spacing: 1px;
			color: #bebebe;
		}

		&__stars {
			margin-right: 12px;
			height: 12px;
			flex: 0 0 76px;
			background-image: $ico-rating;
			background-repeat: repeat-x;
			background-position: 0px -12px;
			div {
				width: 0px;
				height: 12px;
				background-image: $ico-rating;
				background-repeat: repeat-x;
				background-position: 0px 0px;
			}
		}

		&__digit {
			white-space: nowrap;
		}
	}
</style>
