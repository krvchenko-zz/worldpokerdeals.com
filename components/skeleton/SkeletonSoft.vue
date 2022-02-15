<template>
	<el-skeleton class="skeleton-soft" animated>
		<template slot="template">
			<div :class="['skeleton-soft__wrap']">
				<div :class="['skeleton-soft__top']">
					<div class="skeleton-soft__title-wrap">
						<el-skeleton-item
							class="skeleton-soft__category"
							variant="p"
							style="width: 80px; height: 16px;"
						/>
						<el-skeleton-item
							class="skeleton-soft__title"
							variant="text"
							style="width: 105px; height: 24px;"
						/>
					</div>
					<!--
					<div class="skeleton-soft__title-wrap">
						<div :class="['skeleton-soft__img-wrap']">
							<el-skeleton-item
								class="skeleton-soft__img"
								variant="image"
								style="width: 150px; height: 130px;"
							/>
						</div>
					</div>
					-->
				</div>
				<div :class="['skeleton-soft__info']">
					<el-skeleton-item
						variant="text"
						style="width: 90%;height: 17px;"
					/>
					<el-skeleton-item
						variant="text"
						style="width: 80%;height: 17px;"
					/>
					<el-skeleton-item
						variant="text"
						style="width: 100%;height: 17px;"
					/>
				</div>

				<el-skeleton-item
					class="skeleton-soft__price"
					variant="p"
					style="width: 50px;height: 24px;"
				/>

				<div :class="['skeleton-soft__actions']">
					<el-skeleton-item
						:class="[
							'skeleton-soft__price',
							'skeleton-soft__link_download'
						]"
						variant="p"
						style="height: 40px;"
					/>
					<el-skeleton-item
						:class="[
							'skeleton-soft__link',
							'skeleton-soft__link_review'
						]"
						variant="p"
						style="height: 40px;"
					/>
				</div>
			</div>
		</template>
	</el-skeleton>
</template>

<script>
	export default {
		name: 'SkeletonSoft',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
		},
	}
</script>

<style scoped lang="scss">

	.skeleton-soft {
		position: relative;
		min-height: 281px;
		&__wrap {
			z-index: 3;
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 20px 28px 24px 28px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			border-radius: 4px;
			transition: box-shadow 0.3s ease-out, background 0.3s ease-out;
		}

		&__top {
			position: relative;
			display: flex;
		}

		&__category {
			margin-bottom: 12px;
		}

		&__title {
			margin-bottom: 20px;
			&-wrap {
				display: flex;
				flex-flow: column;
				flex-grow: 1;
			}
		}

		&__summary {
		}

		&__info {
			z-index: 2;
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 17px;
		}

		&__price {
			margin-bottom: 8px;
			margin-top: auto;
		}

		&__img {
			&-wrap {
				margin: -43px -28px 0 auto;
			}
		}

		&__actions {
			display: flex;
			justify-content: space-between;
			&_actions {
				display: block;
			}
		}

		&__link {
			flex-grow: 1;
			flex-basis: 50%;
			&_review {
				width: 50%;
				margin-bottom: 0;
				margin-left: 10px;
			}

			&_download {
				width: 50%;
				margin-bottom: 0;
				margin-right: 10px;
			}
		}
	}
</style>
