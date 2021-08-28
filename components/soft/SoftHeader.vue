<template>
	<div class="soft-header">
		<div class="soft-header__logo">
			<img
				:class="['soft-item__img']"
				decoding="async"
				loading="lazy"
				:src="img"
				:alt="soft.image.alt || `${soft.title} logo`"
			/>
		</div>

		<div class="soft-header__header">
			<div v-if="soft.category" class="soft-header__category">
				{{ soft.category.title }}
			</div>
			<h1 class="soft__title">{{ tab.title }}</h1>
			<page-meta
				:author="tab.author ? tab.author.full_name : ''"
				:created="tab.created_at"
				:updated="tab.updated_at"
				:dark="true"
			>
			</page-meta>

			<div class="soft-actions">
				<soft-action-button
					v-if="soft.url"
					label="Скачать"
					type="download"
					:slug="soft.slug"
					:icon="true"
				/>
				<div class="soft-price">
					<span class="soft-price__label">Стоимость</span>
					<span class="soft-price__value">
						<template v-if="soft.currency">{{ soft.currency.symbol }}</template
						>{{ soft.price }}
					</span>
				</div>
			</div>
		</div>

		<div class="soft__summary" v-html="tab.summary"></div>

		<div v-if="soft.images.length" class="soft-screenshots">
			<carousel
				:navigation-enabled="true"
				:pagination-enabled="true"
				:per-page="1"
				:pagination-padding="5"
				:pagination-size="8"
				pagination-color="#ffffff"
				pagination-active-color="#CCCCCC"
				navigation-next-label=""
				navigation-prev-label=""
			>
				<slide v-for="(item, index) in soft.images" :key="index">
					<a
						:href="`${mediaUrl}/gallery-large/${item.filename}`"
						class="soft-screenshots__item lightbox"
					>
						<img
							class="soft-screenshots__img"
							:src="`${mediaUrl}/room-screenshot-medium/${item.filename}`"
							:alt="item.alt"
						/>
					</a>
				</slide>
			</carousel>
		</div>

		<div
			v-if="soft.tabs.length && soft.tabs.length > 1"
			class="soft-header__nav"
		>
			<tab-list>
				<tab-item
					v-for="(item, index) in soft.tabs"
					:key="index"
					:params="{
						parent: 'soft',
						child: item.slug,
					}"
					:name="item.name"
				>
				</tab-item>
			</tab-list>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'SoftHeader',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		mounted() {},

		computed: {
			...mapGetters({
				pageable: 'pages/page',
				soft: 'soft/soft',
				tab: 'soft/tab',
			}),

			img() {
				return `${this.mediaUrl}/soft-card/${this.soft.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$soft-bg: url('~assets/i/summary-bg.jpg');
	$ico-front-slider-arrow: url('~assets/i/ico-front-slider-arrow.svg?data');
	.soft-header {
		overflow: hidden;
		position: relative;
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		&:before {
			z-index: -1;
			opacity: 0.5;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $soft-bg no-repeat center;
			background-size: cover;
		}
	}

	.soft {
		&-header {
			padding: 28px 28px 0;
			position: relative;
			display: grid;
			grid-template-columns: 180px minmax(0, 1fr) 300px;
			grid-template-areas:
				'logo header slider'
				'logo summary slider'
				'nav nav nav';
			column-gap: 56px;

			&__logo {
				grid-area: logo;
				text-align: right;
			}
			&__header {
				grid-area: header;
			}
			&__nav {
				grid-area: nav;
				flex-basis: 100%;
			}
		}

		&-actions {
			margin-bottom: 32px;
			font-size: 0;
		}
		&__category {
			margin-bottom: 8px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 14px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #555555;
		}
		&-price {
			display: inline-block;
			vertical-align: top;
			margin-left: 28px;
			&__label {
				display: block;
				margin-bottom: 2px;
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 14px;
				color: #222222;
				opacity: 0.8;
			}
			&__value {
				display: block;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 22px;
				line-height: 24px;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #ff5e38;
			}
		}
		&-screenshots {
			grid-area: slider;
			width: 300px;
			&__img {
				width: 300px;
				height: auto;
			}

			.VueCarousel {
				&-navigation {
					position: absolute;
					width: 100%;
					height: 32px;
					top: calc(50% - 28px);
				}
				&-pagination {
					font-size: 0;
				}
				&-wrapper {
					border-radius: 4px;
				}
				&-dot-container {
					margin: 0 !important;
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

				&-navigation--disabled {
					display: none;
				}

				&-navigation-prev {
					left: -16px !important;
				}

				&-navigation-next {
					right: -16px !important;
					&:before {
						transform: matrix(-1, 0, 0, 1, 0, 0);
					}
				}
			}
		}

		&__title {
			margin-bottom: 16px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #222222;
		}

		&__summary {
			grid-area: summary;
			padding-bottom: 40px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}
	}

	@include mq('desktop') {
		.soft-header {
			padding-left: 24px;
			padding-right: 24px;
			grid-template-columns: 180px minmax(0, 1fr) 312px;
			column-gap: 24px;
		}

		.soft-screenshots {
			width: 288px;
			padding-left: 24px;
			&__img {
				width: 288px;
			}
		}
	}

	@include mq('laptop') {
		.soft-header {
			@include paddings('tablet');
			padding-left: 0;
			grid-template-columns: 24px 180px 42px 1fr;
			grid-template-areas:
				'. logo . header'
				'. summary summary summary'
				'. slider slider .'
				'nav nav nav nav';
			column-gap: 0;
		}

		.soft {
			&__summary {
				padding-bottom: 0;
				margin-bottom: 32px;
			}
		}
		.soft-screenshots {
			display: block;
			padding-left: 0;
			width: 300px;
			align-self: start;
			margin-bottom: 32px;
		}
	}

	@include mq('tablet') {
		.soft-header {
			@include paddings('mobile');
			margin-left: -20px;
			margin-right: -20px;
			grid-template-columns: 20px 1fr 20px;
			grid-template-areas:
				'. logo .'
				'. header .'
				'. summary .'
				'. slider .'
				'nav nav nav';
			justify-content: center;
			&__logo {
				text-align: center;
				margin-bottom: 20px;
			}
			&__header {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}

		.soft-actions {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		.soft-price {
			display: flex;
			column-gap: 16px;
			align-items: center;
			justify-content: center;
			margin-left: 0;
		}
		.soft-screenshots {
			margin: 0 auto 28px;
		}
	}
</style>
