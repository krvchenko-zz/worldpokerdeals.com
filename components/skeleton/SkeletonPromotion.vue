<template>
	<el-skeleton
		animated
		:class="['skeleton-promotion']">
		<template slot="template">
			<el-skeleton-item
				:class="['skeleton-promotion__img']"
				variant="image"
			/>

			<div class="skeleton-promotion__meta">
				<el-skeleton-item variant="text" style="width: 80px; height: 14px;" />
				<el-skeleton-item variant="text" style="width: 160px; height: 14px;" />
			</div>

			<div :class="['skeleton-promotion__link']">
				<el-skeleton-item
					variant="text"
					:style="{
						width: '100%',
						height: '18px',
					}"
				/>
				<el-skeleton-item
					variant="text"
					:style="{
						width: '70%',
						height: '18px',
					}"
				/>
			</div>

			<div :class="['skeleton-promotion__author']">
				<el-skeleton-item
					:style="{
						width: '24px',
						height: '24px',
						marginRight: '10px',
					}"
					class="skeleton-promotion__author-pic"
					variant="image"
				/>
			</div>
		</template>
	</el-skeleton>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'SkeletonPromotion',

		components: {},

		props: {},

		data: () => ({}),

		computed: {
			...mapGetters({
				isTablet: 'ui/isTablet',
				isMobile: 'ui/isMobile',
			}),
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.skeleton-promotion {
		overflow: hidden;
		margin-bottom: 28px;
		max-width: 326px;
		&:last-child {
			margin-bottom: 0;
		}
		&__img {
			border-radius: 4px;
			max-width: 100%;
			width: 327px;
			height: 181px;
			clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
		}
		&__link {
			margin-bottom: 9px;
			font-size: 20px;
			line-height: 24px;
		}

		&__meta {
			margin: 15px 0 12px 0;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
		}

		&__category {
			font-size: 12px;
			line-height: 16px;
		}

		&__author {
			display: flex;
			align-items: center;
			&-pic {
				margin-right: 6px;
				border-radius: 50%;
			}

			&-name {
				font-size: 12px;
				line-height: 16px;
			}
		}
	}

	// @include mq('laptop') {
	// 	.skeleton-promotion {
	// 		&__meta {
	// 			flex-wrap: nowrap;
	// 		}
	// 		&__date {
	// 			margin-right: 24px;
	// 		}
	// 		&__category {
	// 			text-align: right;
	// 		}
	// 	}
	// }

	// @include mq('tablet') {
	// 	.skeleton-promotion {
	// 		&__img-wrapper {
	// 			grid-column: image;
	// 			grid-row: span 3;
	// 		}
	// 		&__meta {
	// 			margin-top: 8px;
	// 			margin-bottom: 12px;
	// 		}
	// 		&__link,
	// 		&__summary {
	// 			margin-bottom: 8px;
	// 		}
	// 	}
	// }
</style>
