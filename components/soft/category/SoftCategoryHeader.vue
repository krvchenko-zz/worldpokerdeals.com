<template>
	<div class="soft-category-header">
		<breadcrumb-list v-if="pageable" :white="true" />

		<div class="soft-category-header__wrap">
			<i v-if="category.icon" class="soft-category-header__icon">
				<svg-icon
					:icon="category.icon"
					:width="68"
					:height="68"
					:image="true"
				/>
			</i>
			<div class="soft-category-header__text-wrapper">
				<h1 class="soft-category__title">{{ pageable.title }}</h1>
				<common-text-spoiler
					class="soft-category__summary"
					:limit="$device.isMobileOrTablet ? 100 : 600"
					:text="pageable.summary"
				>
					<template v-slot:button>
						<svg-icon icon="spoiler-sep" width="35" height="16" />
					</template>
				</common-text-spoiler>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'SoftCategoryHeader',
		components: {},
		props: {},
		data: () => ({}),
		created() {},
		computed: {
			...mapGetters({
				category: 'soft/category',
				pageable: 'pages/page',
				categories: 'soft/categories',
			}),
		},
		watch: {},
		methods: {},
	}
</script>

<style lang="scss">
	$category-bg: url('~assets/i/soft-category-bg.jpg');
	.soft-category {
		&-header {
			width: calc(100% + 2 * 26px);
			@include paddings('desktop');
			margin-left: -26px;
			margin-right: -26px;
			// background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #6E43A5 0%, #2B0759 100%);
			background: $category-bg no-repeat center;
			background-size: cover;
			grid-area: header;
			min-height: 180px;
			&__wrap {
				display: flex;
				padding: 0;
				position: relative;
			}
			&__text-wrapper {
				display: flex;
				flex-direction: column;
				max-width: 960px;
			}
			&__icon {
				margin-right: 28px;
				display: inline-block;
				vertical-align: top;
			}
			&__nav {
				margin-bottom: -26px;
			}
		}
		&__title {
			margin-bottom: 10px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}
		&__summary {
			padding-bottom: 40px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 17px;
			line-height: 22px;
			color: #ffffff;
			opacity: 0.8;
		}
	}
	@include mq('laptop') {
		.soft-category-header {
			width: calc(100% + 2 * 24px);
			margin-left: -24px;
			margin-right: -24px;
			@include paddings('tablet');
			// &__nav {
			//  margin-bottom: 0;
			// }
		}
	}
	@include mq('tablet') {
		.soft-category-header {
			width: calc(100% + 2 * 20px);
			margin-left: -20px;
			margin-right: -20px;
			@include paddings('mobile');
		}
		.soft-category__summary {
			padding-bottom: 24px;
		}
	}
</style>