<template>
	<el-skeleton class="skeleton-top-room" animated>
		<template slot="template">
				<div class="skeleton-top-room__label">
					<div class="skeleton-top-room__label-wrap">{{ label }}</div>
				</div>

				<div class="skeleton-top-room__header">
					<el-skeleton-item
						class="skeleton-top-room__icon"
						variant="image"
						style="width: 88px; height: 88px;"
					/>
					<div class="skeleton-top-room__info">
						<el-skeleton-item variant="p" style="width: 50%; height: 15px; margin-bottom: 8px;" />
						<el-skeleton-item variant="p" style="width: 100%; height: 22px; margin-bottom: 12px;" />
						<el-skeleton-item variant="p" style="width: 50%; height: 24px;" />
					</div>
				</div>
				<div class="skeleton-top-room__footer">
					<div class="skeleton-top-room-bonus">
						<el-skeleton-item class="skeleton-top-room-bonus__icon" variant="p" style="width: 40px; height: 40px;" />
						<el-skeleton-item variant="p" style="width: 50%; height: 20px; margin-bottom: 12px; border-radius: 20px;" />
						<el-skeleton-item variant="p" style="width: 80%; height: 24px; margin-bottom: 12px;" />
					</div>
					<el-skeleton-item variant="p" style="width: 100%; height: 40px; border-radius: 4px;" />
					<el-skeleton-item variant="p" style="width: 80%; height: 16px; margin-top: 10px;" />
				</div>
		</template>
	</el-skeleton>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'SkeletonTopRoom',

		components: {},

		props: {
			label: {
				type: String,
				default: 'Лучший покер-рум',
			},
		},

		data: () => ({}),

		computed: {
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style scoped lang="scss">
	$label-bg: url('~assets/i/ico-card-label.svg?data');

	.skeleton-top-room {
		max-width: 326px;
		width: 100%;
		position: relative;
		&__header {
			z-index: 1;
			position: relative;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			display: flex;
			padding: 28px;
			max-height: 140px;
			background: linear-gradient(
					180deg,
					#ffffff 0%,
					rgba(255, 255, 255, 0) 100%
				),
				#e9e9e9;
		}
		&__footer {
			font-size: 0;
			text-align: center;
		}
		&__icon {
			flex: 0 0 88px;
			border-radius: 50%;
		}
		&__info {
			z-index: 2;
			position: relative;
			padding-left: 24px;
			flex-grow: 1;
			font-size: 0;
		}

		&__label {
			z-index: 2;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			top: -8px;
			white-space: nowrap;
			padding: 0 20px;
			position: absolute;
			min-height: 24px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #222222;
			&:before {
				content: '';
				top: 0;
				left: 0;
				position: absolute;
				display: block;
				width: 20px;
				height: 24px;
				background: $label-bg no-repeat center;
			}
			&:after {
				content: '';
				top: 0;
				right: 0;
				position: absolute;
				display: block;
				width: 20px;
				height: 24px;
				background: $label-bg no-repeat center;
				transform: matrix(-1, 0, 0, 1, 0, 0);
			}
			&-wrap {
				margin: 0 -1px;
				padding: 4px 11px;
				background: linear-gradient(0deg, #ffc255, #ffc255), #eac24a;
			}
		}

		&__footer {
			z-index: 2;
			position: relative;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 28px 28px 16px 28px;
			background: #ffffff;
		}

		&-bonus {
			text-align: center;
			font-size: 0;

			&__icon {
				top: -20px;
				left: 50%;
				transform: translateX(-50%);
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				border-radius: 50%;
				background: #ffffff;
			}
		}
	}

	// @include mq('desktop') {
	// 	.skeleton-top-room {
	// 		&__header {
	// 			padding: 28px 20px 36px;
	// 		}
	// 		&__icon {
	// 			left: 20px;
	// 		}
	// 		&__info {
	// 			padding-left: 104px;
	// 		}
	// 		&__footer {
	// 			padding-left: 20px;
	// 			padding-right: 20px;
	// 		}
	// 	}
	// }

	// @include mq('laptop') {
	// 	.skeleton-top-room {
	// 		&__header {
	// 			padding: 28px 20px;
	// 		}
	// 	}
	// }
</style>
