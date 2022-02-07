<template>
	<div class="post-category-header">
		<breadcrumb-list class="post-category-header__breadcrumb" :white="true" />
		<div class="post-category-header__icon">
			<svg-icon
				icon="heart-spade"
				width="68px"
				height="68px"
				:image="true"
			/>
		</div>
		<div>
			<h1 class="post-category__title">{{ $t('poker_news') }}{{ $route.params.page ? $t('page_number', {page: $route.params.page}) : '' }}</h1>
			<div class="post-category__summary" v-html="$t('blog_header')"></div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PostCategoryHeader',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				category: 'post/category',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$post-category-bg: url('~assets/i/post-category-bg.webp');

	.post-category {
		&-header {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
			position: relative;
			margin-bottom: 32px;
			background: $post-category-bg no-repeat center;
			background-size: cover;
			display: grid;
			grid-template-columns: max-content 1fr;
			column-gap: 24px;
			&__breadcrumb {
				grid-column: span 3;
			}
			&__icon {
				width: 68px;
				height: 68px;
			}
		}
		&__title {
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&__summary {
			padding-bottom: 32px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 24px;
			color: #ffffff;
			opacity: 0.8;
		}
	}
</style>
