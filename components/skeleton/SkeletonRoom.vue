<template>
	<el-skeleton animated>
		<template slot="template">
			<div class="skeleton-room-item">
				<el-skeleton-item
					class="skeleton-room-item__img-wrap skeleton-room-item__img"
					variant="image"
					style="width: 100%; height: 100%;"
				/>

				<div :class="['skeleton-room-item__wrap']">
					<div :class="['skeleton-room-item__top']">
						<el-skeleton-item variant="p" style="width: 50%; height: 24px; margin-right: 5px;" />
						<el-skeleton-item class="skeleton-room-item__network" variant="p" style="width: 40%; height: 24px; border-radius: 50px;" />
					</div>

					<div class="skeleton-room-item__geo">
						<el-skeleton-item variant="p" style="width: 80%; height: 16px;" />
					</div>

					<div :class="['skeleton-room-item__tags-list']">
						<el-skeleton-item
							v-for="(item, index) in 3"
							:key="index"
							variant="p"
							:style="{
								width: `${getRandomInt(80, 140)}px`,
								height: '20px',
								borderRadius: '2px',
								margin: '0 5px 5px 0'
							}"
						/>
					</div>

					<div :class="['skeleton-room-item__rating']">
						<div class="rating">
							<el-skeleton-item variant="p" style="width: 76px; height: 12px;" />
							<el-skeleton-item variant="p" style="width: 20%; height: 14px;" />
						</div>
					</div>

					<dl class="skeleton-room-item__details">
						<dt class="skeleton-room-item__dt">
							<el-skeleton-item variant="p" style="width: 60%; height: 16px;" />
						</dt>
						<dd class="skeleton-room-item__dd">
							<el-skeleton-item variant="p" style="width: 40%; height: 16px;" />
						</dd>
						<dt class="skeleton-room-item__dt" style="margin-bottom: 0;">
							<el-skeleton-item variant="p" style="width: 60%; height: 16px;" />
						</dt>
						<dd class="skeleton-room-item__dd" style="margin-bottom: 0;">
							<el-skeleton-item variant="p" style="width: 40%; height: 16px;" />
						</dd>
					</dl>

					<div class="skeleton-room-item__actions">
						<el-skeleton-item class="skeleton-room-item__review" variant="p" style="width: 100%; height: 40px;" />
						<el-skeleton-item class="skeleton-room-item__download" variant="p" style="width: 100%; height: 40px;" />
					</div>
				</div>
			</div>
		</template>
	</el-skeleton>
</template>

<script>
	export default {
		name: 'SkeletonRoom',
		components: {},
		props: {},
		data: () => ({}),
		created() {},
		computed: {},
		watch: {},
		methods: {
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
			}
		},
	}
</script>

<style scoped lang="scss">
	.skeleton-room-item {
		margin: 20px 0;
		display: grid;
		grid-template-columns: 2fr 7fr;
		column-gap: 28px;
		row-gap: 8px;
		min-height: 148px;
		border-radius: 4px;
		padding-right: 28px;
		border: 1px solid #e9e9e9;
		background: #fafafa;
		transition: all 0.5s ease;
		overflow: hidden;
		&:first-child {
			margin-top: 0;
		}
		&__wrap {
			width: 100%;
			display: grid;
			align-items: center;
			padding: 20px 0;
			grid-template-columns: 3fr 2fr 1.86fr;
			column-gap: 28px;
			grid-template-areas:
				'title rating buttons'
				'geo bonus buttons'
				'tags bonus buttons';
		}
		&__img {
			&-wrap {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		&__info {
			padding: 0 30px;
			width: 100%;
			display: flex;
			flex-grow: 1;
			&_s {
				padding: 0 20px 0 16px;
			}
		}
		&__actions {
			grid-area: buttons;
			justify-content: stretch;
			&_s {
				padding-right: 20px;
			}
		}

		&__review {
			margin-bottom: 10px;
		}
		&__top {
			grid-area: title;
			display: flex;
			flex-flow: wrap;
			align-items: center;
			justify-content: space-between;
			font-size: 0;
		}
		&__geo {
			grid-area: geo;
			display: flex;
		}
		&__tags-list {
			grid-area: tags;
			font-size: 0;
			&_s {
				margin-top: 12px;
			}
		}
		&__details {
			grid-area: bonus;
			margin: 0;
			font-size: 0;
		}
		&__dt {
			margin-bottom: 16px;
			width: 50%;
			display: inline-block;
			vertical-align: middle;
			font-size: 0;
			line-height: 0;
		}
		&__dd {
			margin-bottom: 16px;
			width: 50%;
			display: inline-block;
			vertical-align: middle;
			text-align: right;
		}
		&__rating {
			grid-area: rating;
		}
	}

	@media (max-width: 1000px) {
		.skeleton-room-item {
			grid-template-columns: 1fr minmax(0, 3fr);
			column-gap: 20px;
			&__wrap {
				grid-template-columns: minmax(0, 4.5fr) minmax(0, 3.5fr);
				column-gap: 20px;
				grid-template-areas:
					'title rating'
					'geo bonus'
					'tags  bonus'
					'buttons buttons';
			}
			&__top {
				margin-bottom: 8px;
			}
			&__geo {
				margin-bottom: 16px;
			}
			&__info {
				padding: 0;
			}
			&__actions {
				display: flex;
				flex: 0;
				align-items: center;
				padding-top: 20px;
				padding-right: 0;
				width: 100%;
			}
			&__review {
				margin-right: 20px;
				margin-bottom: 0;
				max-width: 267px;
			}
			&__download {
				max-width: 207px;
			}
		}
	}
	@include mq('tablet') {
		.skeleton-room-item {
			column-gap: 16px;
			padding-right: 20px;
			grid-template-columns: minmax(0, 1fr) 2fr;
			&__wrap {
				row-gap: 12px;
				grid-template-areas:
					'title rating'
					'tags tags'
					'bonus bonus'
					'geo geo'
					'buttons buttons';
			}
			&__top {
				flex-direction: column-reverse;
				align-items: flex-start;
			}
			&__network {
				margin-bottom: 8px;
			}
			&__actions {
				padding-top: 0;
			}
			&__geo {
				margin-bottom: 0;
			}
			&.rating {
				display: grid;
				grid-template-columns: 1fr;
				row-gap: 12px;
				justify-content: center;
				align-items: baseline;
				height: 100%;
			}
		}
	}
</style>
