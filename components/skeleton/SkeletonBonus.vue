<template>
	<el-skeleton class="skeleton-bonus" animated>
		<template slot="template">
			<div class="skeleton-bonus__content">
				<div class="skeleton-bonus__icon-wrapper">
					<el-skeleton-item
						class="skeleton-bonus__icon"
						variant="image"
						style="width: 42px; height: 42px;"
					/>
				</div>

				<div class="skeleton-bonus__text">

					<el-skeleton-item
						class="skeleton-bonus__category"
						variant="p"
						style="width: 130px; height: 20px;"
					/>

					<el-skeleton-item
						class="skeleton-bonus__title"
						variant="p"
						style="width: 115px; height: 22px;"
					/>
				</div>

				<div class="skeleton-bonus__params">
					<div class="skeleton-bonus__max">
						<el-skeleton-item
							variant="text"
							style="height: 23px;"
						/>
					</div>
					<div class="skeleton-bonus__cashback">
						<el-skeleton-item
							variant="text"
							style="height: 23px;"
						/>
					</div>
					<div class="skeleton-bonus__deposit">
						<el-skeleton-item
							variant="p"
							style="height: 23px;"
						/>
					</div>
				</div>

				<div class="skeleton-bonus__buttons">
					<el-skeleton-item
						class="skeleton-bonus__code"
						variant="p"
					/>

					<el-skeleton-item
						class="skeleton-bonus__get"
						variant="p"
					/>

					<el-skeleton-item
						class="skeleton-bonus__review"
						variant="p"
					/>
				</div>
			</div>

			<div :class="['skeleton-bonus__info']">

				<span :class="['skeleton-bonus__terms']">
					<el-skeleton-item
						class="skeleton-bonus__terms-icon"
						variant="text"
						style="width: 16px;height: 16px;"
					/>

					<el-skeleton-item
						variant="text"
						style="width: 110px;height: 16px;"
					/>
				</span>

				<span :class="['skeleton-bonus__avaliable']">
					<el-skeleton-item
						class="skeleton-bonus__geo-icon"
						variant="text"
						style="width: 16px;height: 16px;"
					/>
					<el-skeleton-item
						class="skeleton-bonus__geo-text"
						variant="text"
						style="width: 150px;height: 15px;"
					/>
				</span>
			</div>

		</template>
	</el-skeleton>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'SkeletonBonus',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		mounted() {},

		computed: {
			...mapGetters({
			}),
		},

		methods: {},
	}
</script>

<style lang="scss">

	.skeleton-bonus {
		display: flex;
		flex-direction: column;
		&__content {
			border-top: 1px solid #e9e9e9;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			display: grid;
			padding: 20px;
			grid-template-columns: 58px 276px 1fr 352px;
			grid-template-areas: 'icon text params buttons';
		}
		&__icon-wrapper {
			grid-area: icon;
			margin-right: 16px;
		}
		&__icon {
			border-radius: 4px;
			width: 42px;
			margin-bottom: auto;
		}
		&__text {
			grid-area: text;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			margin-right: 20px;
		}
		&__params {
			grid-area: params;
			display: flex;
			&__title {
				display: none;
				width: 100%;
				font-size: 12px;
				line-height: 16px;
				margin-bottom: 4px;
			}
		}
		&__buttons {
			grid-area: buttons;
			height: 46px;
			display: flex;
		}

		&__geo {
			&-icon {
				border-radius: 50%;
			}
			&-text {
				margin-left: 8px;
			}
		}

		&__action {
			padding-left: 0;
			&:last-child {
				border-right: 1px solid #e9e9e9;
			}
		}

		&__info {
			padding: 8px 20px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			font-size: 0;
			&--expanded {
				border-bottom: none;
			}
		}

		&__cashback,
		&__deposit,
		&__max {
			display: flex;
			align-items: center;
			position: relative;
			padding-left: 12px;
			padding-right: 20px;
			height: 100%;
			border-left: 1px solid #e9e9e9;
		}

		&__cashback {
			grid-area: cashback;
			width: 84px;
			grid-area: cashback;
		}

		&__deposit {
			grid-area: deposit;
			width: 106px;
		}

		&__max {
			grid-area: max;
			width: 116px;
		}

		&__terms-text {
			border: 1px solid #e9e9e9;
			border-top: none;
			background: #fafafa;
			padding: 4px 20px 20px 20px;
		}

		&__title {
			white-space: nowrap;
			display: block;
		}

		&__category {
			white-space: nowrap;
			margin-bottom: 4px;
			padding: 4px 8px 3px 8px;
			display: inline-block;
			border-radius: 100px;
		}

		&__terms {
			margin-right: 40px;
			padding-left: 26px;
			white-space: nowrap;
			position: relative;
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
			&-icon {
				border-radius: 50%;
				left: 0;
				top: 0;
				position: absolute;
				width: 16px;
				height: 16px;
				display: block;
			}
		}

		&__avaliable {
			display: inline-block;
			vertical-align: middle;
		}

		&__code {
			margin-right: 20px;
			min-width: 130px;
			width: 130px;
			height: 46px;
		}

		&__get {
			width: 120px;
			height: 46px;
		}

		&__review {
			width: 44px;
			height: 46px;
			margin-left: 20px;
		}
	}

	@include mq('desktop') {
		.skeleton-bonus {
			&__content {
				padding: 20px;
				grid-template-columns: 58px 200px 1fr 352px;
				grid-template-areas: 'icon text params buttons';
			}
			&__category {
				white-space: break-spaces;
			}
			&__max {
				width: 92px;
			}
			&__cashback {
				width: 79px;
			}
			&__deposit {
				width: 106px;
			}
		}
	}

	@include mq('laptop') {
		.skeleton-bonus {
			&__content {
				grid-template-columns: 58px 1fr 184px;
				grid-template-areas:
					'icon text buttons'
					'icon params buttons';
			}
			&__text {
				margin-right: 0;
				margin-bottom: 16px;
			}
			&__buttons {
				height: 100%;
				flex-wrap: wrap;
			}
			&__get-button {
				height: 42px;
				flex-grow: 1;
			}
			&__max,
			&__cashback,
			&__deposit {
				flex-wrap: wrap;
				padding-left: 16px;
				padding-right: 16px;
			}
			&__max {
				padding-left: 0;
				border-left: none;
				width: 126px;
			}
			&__cashback {
				width: 122px;
			}
			&__deposit {
				width: auto;
				min-width: 122px;
			}
			&__params {
				&__title {
					display: inline-block;
				}
			}
			&__review {
				&__button {
					height: 42px;
				}
			}

			&__code {
		    width: 100%;
				margin-right: 0;
				margin-bottom: 20px;
			}
		}
	}

	@include mq('tablet') {
		.skeleton-bonus {
			&__content {
				grid-template-columns: 58px 1fr;
				grid-template-areas:
					'icon text'
					'icon params'
					'icon buttons';
			}
			&__text {
				margin-bottom: 12px;
			}
			&__params {
				margin-bottom: 20px;
			}
			&__buttons {
				display: grid;
				grid-template-columns: minmax(152px, 1fr) minmax(148px, 1fr) 40px;
				column-gap: 16px;
				align-items: center;
				height: 40px;
				margin-left: 0;
			}
			&__get-button {
				min-width: 148px;
				height: 40px;
			}
			&__review {
				margin-left: 0px;
				&__button {
					height: 40px;
					width: 40px;
				}
			}

			&__code {
				margin-bottom: 0;
				height: 42px;
			}

			&__get {
				width: auto;
				height: 42px;
			}

			&__review {
				height: 42px;
			}
		}
	}

	@include mq('mobile') {
		.skeleton-bonus {
			&__content {
				grid-template-columns: 58px 1fr;
				grid-template-areas:
					'icon text'
					'params params'
					'buttons buttons';
			}
			&__buttons {
				grid-template-columns: minmax(140px, 1fr) minmax(120px, 1fr) 40px;
			}
			&__get-button {
				min-width: 120px;
			}
			&__info {
				display: flex;
			}
			&__terms {
				margin-right: 16px;
			}
			&__available {
				display: flex;
			}
			// &__get {
			// 	width: auto;
			// }
		}
	}
</style>
