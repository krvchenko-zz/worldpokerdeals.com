<template>
	<el-skeleton
		animated
		:class="[
			'skeleton-post',
			medium && 'skeleton-post_m',
			asCard && 'skeleton-post_card',
		]">
		<template slot="template">
			<el-skeleton-item
				:class="[
					'skeleton-post__img',
					medium && 'skeleton-post__img_m',
					!medium && 'skeleton-post__img_s',
				]"
				variant="image"
			/>

			<div v-if="medium" class="skeleton-post__meta">
				<el-skeleton-item variant="text" style="width: 80px; height: 14px;" />
				<el-skeleton-item variant="text" style="width: 160px; height: 14px;" />
			</div>

			<div
				:class="[
					'skeleton-post__link',
					medium && 'skeleton-post__link_size_m'
				]"
			>
				<el-skeleton-item
					variant="text"
					:style="{
						width: '100%',
						height: medium ? '18px' : '16px',
					}"
				/>
				<el-skeleton-item
					variant="text"
					:style="{
						width: '70%',
						height: medium ? '18px' : '16px',
					}"
				/>
				<el-skeleton-item
					v-if="!medium && !isTablet"
					variant="text"
					:style="{
						width: '40%',
						height: medium ? '18px' : '16px',
					}"
				/>
			</div>

			<div v-if="medium" class="skeleton-post__summary">
				<el-skeleton-item
					v-if="medium"
					variant="text"
					style="width: 100%; height: 14px;
				"/>
				<el-skeleton-item
					v-if="medium"
					variant="text"
					style="width: 100%; height: 14px;
				"/>
				<el-skeleton-item
					v-if="medium"
					variant="text"
					style="width: 40%; height: 14px;
				"/>
			</div>

			<div :class="[
				'skeleton-post__author',
				medium && 'skeleton-post__author_m'
			]">
				<el-skeleton-item
					:style="{
						width: '24px',
						height: '24px',
						marginRight: '10px',
					}"
					class="skeleton-post__author-pic"
					variant="image"
				/>
				<el-skeleton-item
					v-if="!medium"
					variant="text"
					:style="{
						width: '50px',
						height: '15px',
						marginRight: '10px',
					}"
				/>
				<el-skeleton-item
					v-if="!medium"
					variant="text"
					:style="{
						width: '60px',
						height: '15px',
					}"
				/>
			</div>
		</template>
	</el-skeleton>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'SkeletonPost',

		components: {},

		props: {
			medium: {
				type: Boolean,
				default: false,
			},

			asCard: {
				type: Boolean,
				default: false,
			},
		},

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
	.skeleton-post {
		margin-bottom: 20px;
		overflow: hidden;
		&_m {
			margin-bottom: 25px;
			max-width: 326px;
		}
		&:last-child {
			margin-bottom: 0;
		}
		&__img {
			border-radius: 4px;
			max-width: 100%;
			width: 327px;
			height: 181px; 
			&_m {
				border-radius: 4px;
				float: none;
				clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
			}
			&_s {
				float: left;
				width: 80px;
				height: 80px;
			}
		}
		&__link {
			padding-left: 100px;
			margin-bottom: 10px;
			font-size: 16px;
			line-height: 20px;
			&_size_m {
				padding: 0;
				line-height: 24px;
				font-size: 20px;
			}
		}

		&__summary {
			margin-bottom: 1rem;
			font-size: 14px;
			line-height: 17px;
		}

		&__meta {
			margin: 5px 0;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
		}

		&__category {
			font-size: 12px;
			line-height: 16px;
		}

		&__author {
			padding-left: 20px;
			display: flex;
			align-items: center;;
			&_m {
				padding: 0;
			}
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

	@include mq('laptop') {
		.skeleton-post {
			&__meta {
				flex-wrap: nowrap;
			}
			&__date {
				margin-right: 24px;
			}
			&__category {
				text-align: right;
			}
		}
	}

	@include mq('tablet') {
		.skeleton-post {
			&--card {
				display: grid;
				grid-template-columns: [image] 1fr [content] 2fr;
				grid-column-gap: 16px;
				grid-row-gap: 8px;
				grid-template-rows: repeat(4, minmax(fit-content, 1fr));
			}
			&__img-wrapper {
				grid-column: image;
				grid-row: span 3;
			}
			&__meta {
				margin-top: 8px;
				margin-bottom: 12px;
			}
			&__link,
			&__summary {
				margin-bottom: 8px;
			}
			&--card &__img {
				width: 136px;
				min-width: 136px;
				height: auto;
				clip-path: none;
			}
			&--card &__meta,
			&--card &__link,
			&--card &__summary,
			&--card &__author {
				grid-column: content;
				margin: 0;
			}
		}
	}
</style>
