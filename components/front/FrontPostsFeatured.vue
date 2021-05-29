<template>
	<div class="front-posts-featured">
		<div class="container-fluid">
			<h2 class="front-posts-featured__title">{{ $t('important') }}</h2>

			<div class="front-posts-featured__list">
				<client-only>
					<!-- TODO [0, 1] for small screens -->
					<carousel
						class="front-slider"
						:style="{ margin: '0 -14px' }"
						:navigation-enabled="true"
						:per-page-custom="[
							[0, 1],
							[768, 2],
							[1280, 3],
						]"
						:pagination-enabled="true"
						:pagination-padding="0"
						:pagination-size="6"
						pagination-active-color="#CCCCCC"
						navigation-next-label=""
						navigation-prev-label=""
						:navigation-click-target-size="0"
					>
						<slide v-for="(item, index) in items" :key="index">
							<post-featured-item
								:image="item.image"
								:title="item.title"
								:summary="item.summary"
								:slug="item.slug"
								:categories="item.categories"
							/>
						</slide>
					</carousel>
				</client-only>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'FrontPostsFeatured',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				items: 'front/important',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-front-slider-arrow: url('~assets/i/ico-front-slider-arrow.svg?data');
	$ico-front-posts-featured: url('~assets/i/ico-front-posts-featured.svg?data');
	.front-posts-featured {
		width: 100%;
		max-width: 1440px;
		padding-bottom: 28px;
		margin-top: -30px;
		text-align: center;
		&__list {
		}
		&__title {
			margin: -0 0 20px 0;
			position: relative;
			border-radius: 50px;
			padding: 12px 28px 12px 60px;
			font-family: 'Proxima Nova Th';
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.3px;
			display: inline-flex;
			color: #222222;
			background: #ffffff $ico-front-posts-featured no-repeat 28px 15px;
		}
	}

	.front-slider {
		position: relative;
		.VueCarousel {
			&-navigation {
				position: absolute;
				width: 100%;
				height: 32px;
				top: calc(50% - 40px);
			}
			&-pagination {
				margin-top: 32px;
				font-size: 0;
			}
			&-dot {
				margin-right: 8px;
				border: 1px solid #cccccc;
				background-color: #ffffff !important;
				&--active {
					background-color: #cccccc !important;
				}

				&:last-child {
					margin: 0 !important;
				}
			}
			&-navigation-button {
				border-radius: 50%;
				width: 32px;
				height: 32px;
				top: 0 !important;
				transform: none !important;
				border: 1px solid #e9e9e9;
				background: #ffffff !important;
				&:before {
					display: block;
					top: 0;
					left: 0;
					position: absolute;
					content: '';
					width: 32px;
					height: 32px;
					background: $ico-front-slider-arrow no-repeat 11px center;
				}
			}

			&-navigation-prev {
				left: -2px !important;
			}

			&-navigation-next {
				right: -2px !important;
				&:before {
					transform: matrix(-1, 0, 0, 1, 0, 0);
				}
			}
		}
	}
</style>
