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
					v-if="category.promotion && category.entity === 'promotion'"
					:image="category.promotion.image"
					:title="category.promotion.title"
					:summary="category.promotion.summary"
					:page="category.promotion.page"
					:author="category.promotion.author"
					:created="category.promotion.created_at"
					:category="category.promotion.category"
					:time_left="category.promotion.time_left"
					:time_before="category.promotion.time_before"
					:regularity="category.promotion.regularity"
					:prize="category.promotion.prize"
					:currency="
						category.promotion.currency
							? category.promotion.currency.symbol
							: ''
					"
					:exclusive="category.promotion.exclusive"
					:active="category.promotion.active"
					:featured="true"
				/>

				<room-top
					v-if="category.promotion && category.entity === 'bonus'"
					:id="category.promotion.room.id"
					:title="category.promotion.room.title"
					:slug="category.promotion.room.slug"
					:restricted="category.promotion.room.restricted"
					:country="country"
					:rating="category.promotion.room.rating"
					:bonus="category.promotion.room.top_bonus"
					:review="category.promotion.room.review"
					label="Лучший бонус"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

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
			&__promotion {
				align-self: baseline;
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
			margin: 0 -20px;
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
