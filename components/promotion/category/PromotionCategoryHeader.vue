<template>
	<div class="promotions-header">
		<breadcrumb-list
			class="promotions-header__breadcrumbs"
			v-if="pageable"
			:white="true"
		/>

		<div class="promotions-header__wrap">
			<div class="promotions-header__content">
				<svg-icon
					v-if="category.entity === 'promotion'"
					class="promotions-header__icon"
					icon="promotion-category"
				/>

				<svg-icon
					v-else
					class="promotions-header__icon"
					icon="bonus-category"
				/>

				<h1 class="promotions__title">{{ category.title }}</h1>
				<page-meta
					:author="category.author ? category.author.full_name : null"
					:created="category.created_at"
					:updated="category.updated_at"
					class="promotions-header__meta"
				/>

				<div class="promotions__summary" v-html="category.summary"></div>
			</div>
			<div class="promotions-header__promotion">
				<promotion-item
					v-if="best && category.entity === 'promotion'"
					:image="best.image"
					:title="best.title"
					:summary="best.summary"
					:page="best.page"
					:author="best.author"
					:created="best.created_at"
					:category="best.category"
					:time_left="best.time_left"
					:time_before="best.time_before"
					:regularity="best.regularity"
					:prize="best.prize"
					:currency="best.currency ? best.currency.symbol : ''"
					:exclusive="best.exclusive"
					:active="best.active"
					:featured="true"
				/>

				<room-top
					v-if="best && category.entity === 'bonus'"
					:id="best.room.id"
					:title="best.room.title"
					:slug="best.room.slug"
					:restricted="best.room.restricted"
					:country="country"
					:rating="best.room.rating"
					:bonus="best"
					:review="best.room.review"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'PromotionCategoryHeader',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				category: 'promotions/category',
				pageable: 'pages/page',
				categories: 'promotions/categories',
				best: 'promotions/best',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$promotions-bg: url('~assets/i/promotions-bg.jpg');

	.promotions-header {
		display: flex;
		flex-direction: column;
		@include paddings('desktop');
		margin: 0 -26px;
		padding-bottom: 46px;
		background: $promotions-bg no-repeat center top;
		background-size: cover;
		&__wrap {
			display: grid;
			grid-template-columns: 1fr max-content;
			gap: 86px;
			padding: 0 60px;
			position: relative;
			align-items: center;
		}
		&__nav {
			width: 100%;
		}
		&__content {
			display: grid;
			grid-template-columns: min-content 1fr;
			grid-column-gap: 24px;
			grid-template-areas:
				'icon title'
				'icon meta'
				'summary summary';
		}
	}

	.promotions {
		&-header {
			&__meta {
				grid-area: meta;
			}

			&__icon {
				grid-area: icon;
				display: inline-flex;
			}
		}

		&__title {
			grid-area: title;
			margin-bottom: 10px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&__summary {
			grid-area: summary;
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
		.promotions-header {
			@include paddings('tablet');
			&__wrap {
				padding: 0;
				gap: 12px;
				grid-template-columns: 1fr 288px;
				justify-content: space-between;
			}
			& &__icon {
				display: none;
			}
			&__content {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-areas:
					'title'
					'meta'
					'summary';
			}
		}
	}

	@include mq('tablet') {
		.promotions-header {
			@include paddings('mobile');
			&__wrap {
				grid-template-columns: 100%;
				justify-content: space-between;
			}
			&__promotion {
				display: none;
			}
			& &__icon {
				display: inline-block;
			}
			&__meta {
				margin-top: 16px;
			}
			&__content {
				grid-template-columns: min-content 1fr;
				align-items: center;
				grid-column-gap: 24px;
				grid-template-areas:
					'icon title'
					'meta meta'
					'summary summary';
			}
		}
		.promotions {
			&__title {
				margin-bottom: 0;
			}
		}
	}
</style>
