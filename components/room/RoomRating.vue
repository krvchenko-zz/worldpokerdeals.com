<template>
	<div :class="['room-rating', inactive && 'room-rating_inactive']">
		<div class="room-rating__stars">
			<div class="room-rating__stars-active" :style="style"></div>
		</div>
		<div class="room-rating__wrap">
			<span class="room-rating__value">{{ value }}</span>
			<span class="room-rating__delimeter">{{ delimeter }}</span>
			<span class="room-rating__max">{{ maxVal }}</span>
		</div>
	</div>
</template>

<script>
	export default {
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

			inactive: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {
			style() {
				return {
					width: `${this.value * 26 - 5}px`,
				}
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-rating: url('~assets/i/room/ico-rating.svg');
	.room-rating {
		display: flex;
		align-items: baseline;
		&_inactive {
			filter: grayscale(1) brightness(0.7);
		}

		&__wrap {
			// border: 1px solid #21232D;
			// box-shadow: 0px 15px 50px rgba(34, 37, 48, 0.5);
			// border-radius: 50px;
			// padding: 4px 20px;
			// display: inline-block;
			font-size: 0;
			// background: linear-gradient(0deg, #373B4A, #373B4A), #21232D;
		}

		&__value {
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 24px;
			line-height: 24px;
			letter-spacing: 1px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #feb83c;
		}
		&__delimeter {
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;
			letter-spacing: 1px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: rgba(254, 184, 60, 0.5);
		}
		&__max {
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;
			letter-spacing: 1px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: rgba(254, 184, 60, 0.5);
		}

		&__stars {
			margin-right: 16px;
			width: 120px;
			height: 16px;
			background-image: $ico-rating;
			background-repeat: repeat-x;
			background-position: 0px -16px;
			&-active {
				height: 16px;
				background-image: $ico-rating;
				background-repeat: repeat-x;
				background-position: 0px 0px;
			}
		}
	}
</style>
