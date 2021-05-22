<template>
	<div class="post-category-header">
		<breadcrumb-list class="post-category-header__breadcrumb" :white="true" />
		<svg-icon
			class="post-category-header__icon"
			icon="heart-spade"
			:width="68"
			:height="68"
		/>
		<div>
			<h1 class="post-category__title">Новости покера</h1>
			<div class="post-category__summary">
				Инсайды индустрии без поп-корна и еще какую-то небольшую <br />
				подводку чтобы было в 2 строки
			</div>
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
	$bg: url('~assets/i/post-category-bg.jpg');

	.post-category {
		&-header {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
			position: relative;
			margin-bottom: 32px;
			background: $bg no-repeat center;
			background-size: cover;
			display: grid;
			grid-template-columns: max-content 1fr;
			column-gap: 24px;
			&__breadcrumb {
				grid-column: span 3;
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
