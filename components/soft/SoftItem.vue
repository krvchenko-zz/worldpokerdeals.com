<template>
	<div
		:class="['soft-item', hover && 'soft-item_hover']"
		@mouseleave="hover = false"
		@mouseover="handleMouseOver"
	>
		<div :class="['soft-item__wrap', hover && 'soft-item__wrap_hover']">
			<div class="soft-item__top">
				<div
					v-if="discount && discount_value && available"
					class="soft-item-discount"
				>
					<span class="soft-item-discount__wrap">
						<span class="soft-item-discount__val">{{ discount_value }}</span>
						<span class="soft-item-discount__percent">%</span>
					</span>
					<span class="soft-item-discount__label">Скидка</span>
				</div>
				<span v-if="!available" class="soft-item__unavailable"></span>
				<div class="soft-item__title-wrap">
					<span class="soft-item__category">{{ category }}</span>
					<span
						:class="['soft-item__title', hover && 'soft-item__title_hover']"
						>{{ title }}</span
					>
				</div>
				<div :class="['soft-item__img-wrap']">
					<img
						:class="['soft-item__img']"
						decoding="async"
						loading="lazy"
						:src="img"
						:alt="image.alt || `${title} logo`"
					/>
				</div>
			</div>

			<div
				:class="['soft-item__info', hover && 'soft-item__info_hover']"
				v-html="short_description"
			></div>
			<div class="soft-item__price">{{ currency }}{{ price }}</div>

			<div class="soft-item__actions">
				<soft-action-button
					:class="['soft-item__link', 'soft-item__link_download']"
					label="Скачать"
					type="download"
				/>
				<nuxt-link
					v-if="review"
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: {
							parent: review.page.parent.slug,
							child: review.page.slug,
						},
					}"
				>
					<a
						:class="[
							'btn',
							'soft-item__link',
							!available && 'soft-item__link_disabled',
							'btn-default',
							'soft-item__link_review',
						]"
						:href="href"
						@click="navigate"
						>Детали</a
					>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SoftItem',

		components: {},

		props: {
			id: {
				type: [Number, String],
				required: true,
			},

			title: {
				type: String,
				required: true,
				default: '',
			},

			review: {
				type: Object,
			},

			url: {
				type: String,
			},

			short_description: {
				type: String,
			},

			discount: {
				type: [Boolean, Number],
				default: false,
			},

			available: {
				type: [Boolean, Number],
				default: true,
			},

			discount_value: {
				type: [String, Number],
			},

			price: {
				type: [String, Number],
				required: true,
			},

			image: {
				type: [String, Object],
				required: true,
			},

			category: {
				type: [String, Object],
				required: true,
			},

			currency: {
				type: String,
				required: true,
			},
		},

		data: () => ({
			hover: false,
		}),

		computed: {
			img() {
				return `${this.mediaUrl}/soft-card/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		created() {},

		methods: {
			handleMouseOver(evt) {
				this.hover = true
			},
		},
	}
</script>

<style lang="scss">
	@import '~assets/fonts/Discount/styles.css';

	$ico-discount: url('~assets/i/ico-discount.svg?data');
	$ico-soft-unavailable: url('~assets/i/ico-soft-unavailable.svg?data');

	.soft-item {
		position: relative;
		min-height: 281px;
		&__wrap {
			z-index: 3;
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 20px 28px 24px 28px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			border-radius: 4px;
			transition: box-shadow 0.3s ease-out, background 0.3s ease-out;

			&_hover {
				// top: 0;
				// left: 0;
				// position: absolute;
				background: #fff;
				box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
			}
		}

		&__top {
			position: relative;
			display: flex;
		}

		&__category {
			display: block;
			margin-bottom: 12px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #999999;
			opacity: 0.8;
		}

		&__title {
			overflow: hidden;
			min-height: 48px;
			max-height: 48px;
			display: block;
			margin-bottom: 20px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			letter-spacing: -0.1px;
			color: #222222;
			&-wrap {
				// flex-grow: 1;
			}
			&_hover {
				// max-height: none;
			}
		}

		&__info {
			z-index: 2;
			margin-bottom: 16px;
			max-height: 51px;
			min-height: 51px;
			position: relative;
			overflow: hidden;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 17px;
			color: #555555;
			position: relative;
			&::after {
				content: '';
				width: 100%;
				height: 21px;
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				background: linear-gradient(
					180deg,
					rgba(250, 250, 250, 0.0001) 0.16%,
					#fafafa 100%
				);
			}
			&_hover {
				// max-height: none;
				&::after {
					display: none;
				}
			}
		}

		&__price {
			margin-bottom: 8px;
			margin-top: auto;
			font-family: 'Proxima Nova Sb';
			font-size: 22px;
			line-height: 24px;
			color: #ff5e38;
			font-feature-settings: 'tnum' on, 'lnum' on;
		}

		&__img {
			&-wrap {
				margin: -43px -28px 0 auto;
			}
		}

		&__actions {
			display: flex;
			justify-content: space-between;
		}

		&__link {
			flex-grow: 1;
			flex-basis: 50%;
			&_review {
				margin-left: 10px;
			}

			&_download {
				margin-right: 10px;
			}

			&_disabled {
				opacity: 0.5;
				pointer-events: none;
				cursor: not-allowed;
			}
		}

		&__unavailable {
			z-index: 1;
			display: block;
			right: -17px;
			top: -48px;
			position: absolute;
			width: 44px;
			height: 44px;
			background: $ico-soft-unavailable no-repeat center;
			background-size: cover;
		}

		&-discount {
			z-index: 1;
			display: block;
			// right: -2px;
			// top: -66px;
			right: -17px;
			top: -48px;
			position: absolute;
			width: 44px;
			height: 44px;
			color: #fff;
			background: $ico-discount no-repeat center;
			background-size: cover;
			font-family: 'Discount';

			&__wrap {
				text-align: center;
			}

			&__val {
				font-size: 20px;
				line-height: 0px;
				padding: 18px 0 0 10px;
				display: block;
				float: left;
			}

			&__percent {
				font-size: 12px;
				line-height: 0px;
				padding: 18px 0 0 19px;
				display: block;
			}

			&__label {
				font-size: 8px;
				line-height: 0px;
				padding: 13px 0 0 9px;
				display: block;
			}
		}
	}
</style>
