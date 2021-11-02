<template>
	<div
		:class="[
			'room-score',
			small && 'room-score_size_s',
			`room-score_type_${id}`,
		]"
	>
		<div class="room-score__inner">
			<span
				:class="['room-score__label', small && 'room-score__label_size_s']"
				>{{ label }}</span
			>
			<span
				:class="['room-score__sep', small && 'room-score__sep_size_s']"
			></span>
			<span
				:class="[
					'room-score__value',
					small && 'room-score__value_size_s',
					inactive && 'room-score__value_inactive',
				]"
			>
				<span>{{ value }}</span>
				<span>/5</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ScoreItem',

		components: {},

		props: {
			id: {
				type: Number,
				required: true,
			},

			value: {
				type: [Number, String],
				default: 0,
			},

			label: {
				type: String,
			},

			small: {
				type: Boolean,
				default: false,
			},

			inactive: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-score-2: url('~assets/i/room/ico-score-2.svg?data');
	$ico-score-3: url('~assets/i/room/ico-score-3.svg?data');
	$ico-score-5: url('~assets/i/room/ico-score-5.svg?data');
	$ico-score-6: url('~assets/i/room/ico-score-6.svg?data');
	$ico-score-11: url('~assets/i/room/ico-score-11.svg?data');
	$ico-score-13: url('~assets/i/room/ico-score-13.svg?data');

	.room-score {
		margin-bottom: 16px;
		padding-left: 36px;
		min-height: 20px;
		position: relative;
		&:last-child {
			margin: 0;
		}
		&:before {
			display: block;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			width: 20px;
			height: 20px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}

		&_size_s {
			margin-bottom: 12px;
			min-height: 16px;
			padding-left: 28px;
			&:before {
				width: 16px;
				height: 16px;
			}
		}

		&__inner {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__label {
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #ffffff;

			&_size_s {
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 15px;
				line-height: 16px;
				color: #555555;
			}
		}

		&__sep {
			height: 1px;
			background-image: linear-gradient(
				to right,
				#555555 40%,
				rgba(255, 255, 255, 0) 20%
			);
			background-position: center;
			background-size: 3px 1px;
			background-repeat: repeat-x;
			flex-grow: 1;
			align-self: center;
			margin: 0 12px 0 16px;

			&_size_s {
				background-image: linear-gradient(
					to right,
					#aaaaaa 40%,
					rgba(255, 255, 255, 0) 20%
				);
			}
		}

		&__value {
			height: 20px;
			font-size: 0;
			white-space: nowrap;
			span {
				&:first-child {
					font-family: 'Proxima Nova';
					font-weight: bold;
					font-size: 20px;
					line-height: 20px;
					letter-spacing: 1px;
					color: #008be2;
				}
				&:last-child {
					font-family: Proxima Nova;
					font-size: 12px;
					line-height: 20px;
					letter-spacing: 1px;
					color: #777777;
				}
			}

			&_size_s {
				height: 16px;
				span {
					&:first-child {
						font-size: 18px;
						line-height: 16px;
					}
					&:last-child {
						font-size: 12px;
						line-height: 16px;
					}
				}
			}

			&_inactive {
				filter: grayscale(1) brightness(1.3);
			}
		}

		&_type_2 {
			&:before {
				background-image: $ico-score-2;
			}
		}

		&_type_3 {
			&:before {
				background-image: $ico-score-3;
			}
		}

		&_type_5 {
			&:before {
				background-image: $ico-score-5;
			}
		}

		&_type_6 {
			&:before {
				background-image: $ico-score-6;
			}
		}

		&_type_11 {
			&:before {
				background-image: $ico-score-11;
			}
		}

		&_type_13 {
			&:before {
				background-image: $ico-score-13;
			}
		}
	}
</style>
