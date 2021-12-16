<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		:to="{
			name: 'index',
			params: { parent: 'rakeback-deals', child: review.slug },
		}"
	>
		<a
			v-if="type !== 'front'"
			:class="['top-rooms__item', `top-rooms__item_${type}`]"
			:href="href"
			@click="navigate"
		>
			<div class="top-rooms__item__icon-wrapper">
				<svg-icon
					:class="['top-rooms__item-icon', `top-rooms__item-icon_${type}`]"
					:icon="slug"
					:width="type === 'menu' ? 40 : 44"
					:height="type === 'menu' ? 40 : 44"
					:image="true"
					view-box="0 0 200 200"
				/>
			</div>
			<div
				:class="[
					'top-rooms__item-title',
					'top-rooms__item-title--hover',
					`top-rooms__item-title_${type}`,
				]"
			>
				{{ title }}
			</div>
			<div
				v-if="bonus"
				:class="['top-rooms__item-bonus', `top-rooms__item-bonus_${type}`]"
			>
				{{ bonus.title }}
			</div>
		</a>
		<div v-else :class="['top-rooms__item', `top-rooms__item_${type}`]">
			<div class="top-rooms__item__column">
				<div
					:class="[
						'top-rooms__item__icon-wrapper',
						`top-rooms__item__icon-wrapper_${type}`,
					]"
				>
					<svg-icon
						:class="['top-rooms__item-icon', `top-rooms__item-icon_${type}`]"
						:icon="slug"
						:width="40"
						:height="40"
						:image="true"
						view-box="0 0 200 200"
					/>
				</div>

				<div
					:class="['top-rooms__item-title', `top-rooms__item-title_${type}`]"
				>
					{{ title }}
				</div>
				<div :class="['top-rooms__item-rating']">
					<span :class="['top-rooms__item-rating-label']">{{
						$t('rating')
					}}</span>
					<span :class="['top-rooms__item-rating-val']">{{ rating }}</span>
					<span :class="['top-rooms__item-rating-overall']">/5</span>
				</div>
			</div>

			<div class="top-rooms__item__column">
				<div
					:class="[
						'top-rooms__item-rakeback',
						'top-rooms__item-rakeback--hover',
					]"
				>
					<span :class="['top-rooms__item-rakeback-label']">{{
						$t('rakeback')
					}}</span>
					<span :class="['top-rooms__item-rakeback-val']">{{ rakeback }}</span>
				</div>

				<nuxt-link v-slot="{ href, route, navigate }" :to="{ name: 'front' }">
					<button
						:class="[
							'top-rooms__item-link',
							'top-rooms__item-link_download',
							isDisabled && 'top-rooms__item-link_disabled',
						]"
						:disabled="isDisabled"
						@click="handleDownload"
					>
						{{ $t('access') }}
					</button>
				</nuxt-link>

				<nuxt-link
					v-if="review"
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="['top-rooms__item-link', 'top-rooms__item-link__review']"
						:href="href"
						@click="navigate"
						>{{ $t('review') }}</a
					>
				</nuxt-link>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'RoomTopItem',

		components: {},

		props: {
			title: {
				type: String,
				required: true,
			},

			slug: {
				type: String,
				required: true,
			},

			url: {
				type: [String, Boolean, Number],
			},

			available: {
				type: [Number, Boolean],
			},

			closed: {
				type: [Number, Boolean],
			},

			rakeback: {
				type: String,
			},

			rating: {
				type: [String, Number],
			},

			image: {
				type: Object,
				required: true,
			},

			front: {
				type: Boolean,
				default: false,
			},

			background: {
				type: String,
				default: '#000000',
			},

			bonus: {
				type: [String, Boolean, Object],
				default: false,
			},

			review: {
				type: Object,
			},

			menu: {
				type: Boolean,
			},

			type: {
				type: String,
				default: 'default',
			},
		},

		data: () => ({
			iconHasError: false,
			hovered: false,
		}),

		computed: {
			mediaUrl() {
				return process.env.mediaUrl
			},

			imageUrl() {
				return `${this.mediaUrl}/room-small/${this.image.filename}`
			},

			...mapGetters({
				country: 'location/country',
			}),

			isDisabled() {
				return !this.available || this.closed || !this.url || this.url === ''
			},
		},

		watch: {},

		created() {},

		methods: {
			handleDownload() {
				let route = this.$router.resolve({
					name: 'download',
					params: { slug: this.slug },
				})
				return window.open(route.href, '_blank')
			},
		},
	}
</script>

<style lang="scss">
	$ico-arrow: url('~assets/i/ico-room-top-arrow.svg?data');
	$ico-bonus: url('~assets/i/ico-room-top-bonus.svg?data');

	.top-rooms__item {
		padding: 12px 80px 12px 20px;
		grid-template-columns: 60px 1fr;
		justify-content: start;
		position: relative;
		background: #fafafa;
		display: block;
		display: grid;
		grid-template-areas:
			'icon-menu title-menu'
			'icon-menu bonus-menu';
		min-height: 44px;
		box-sizing: content-box;
		align-items: start;
		border-bottom: 1px solid #e9e9e9;
		text-decoration: none;
		&:hover,
		&:active,
		&:visited {
			text-decoration: none;
		}
		&:after {
			content: '';
			width: 20px;
			height: 40px;
			position: absolute;
			right: 16px;
			top: 14px;
			background: $ico-arrow no-repeat center;
		}

		&__column {
			width: 50%;
			display: flex;
			align-items: center;
		}

		&_front {
			padding: 10px 20px;
			border-bottom: 1px solid rgba(204, 204, 204, 0.1);
			display: flex;
			align-items: center;
			background: #292c38;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:hover {
				background: rgba(204, 204, 204, 0.1);
				border-bottom: 1px solid transparent;
			}
			&:after {
				display: none;
			}
		}

		&_menu {
			display: grid;
			grid-template-areas:
				'icon-menu title-menu'
				'icon-menu bonus-menu';
			margin: 0;
			padding: 8px 20px 8px 24px;
			background: #353847;
			border: 0;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:after {
				top: 20px;
				width: 10px;
				height: 20px;
				background-size: contain;
				opacity: 0.1;
			}
			&:hover {
				&:after {
					opacity: 0.5;
				}
			}
		}

		&-title {
			margin-bottom: 4px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 18px;
			line-height: 20px;
			color: #222222;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&_front {
				margin: 0 10px 0 0;
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 20px;
				color: #ffffff;
				flex: 0 0 94px;
			}
			&_menu {
				grid-area: title-menu;
				margin: 0 0 4px 0;
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 20px;
				color: #ffffff;
			}
		}
		&:hover &-title--hover {
			color: #cccccc;
		}

		&-bonus {
			padding-left: 20px;
			grid-area: bonus-menu;
			position: relative;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 16px;
			color: #777777;
			&:before {
				content: '';
				width: 12px;
				height: 12px;
				position: absolute;
				left: 0;
				top: 1px;
				background: $ico-bonus no-repeat center;
			}
			&_menu {
				padding: 0;
				&:before {
					display: none;
				}
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 16px;
				color: #cccccc;
				opacity: 0.6;
			}
		}
		&-icon {
			border-radius: 4px;
			flex-shrink: 0;
			&_menu {
				margin-right: 16px;
			}
		}
		&__icon-wrapper {
			grid-area: icon-menu;
			display: block;
			width: 44px;
			height: 44px;
			margin-right: 16px;
			&_front {
				width: 40px;
				height: 40px;
				margin-right: 12px;
			}
		}
		&-img {
			&-wrap {
				top: 14px;
				left: 20px;
				position: absolute;
				width: 44px;
				height: 44px;
				border-radius: 6px;
				text-align: center;
				font-size: 0;
				line-height: 44px;
			}
			max-width: 80%;
			max-height: 80%;
		}

		&-rating {
			font-size: 0;
			white-space: nowrap;
			&-label {
				margin-bottom: 2px;
				display: block;
				font-family: Proxima Nova;
				font-size: 12px;
				line-height: 12px;
				color: #cccccc;
				opacity: 0.7;
			}

			&-val {
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 18px;
				line-height: 18px;
				letter-spacing: 1px;
				font-feature-settings: 'pnum' on, 'lnum' on;
				color: #feb83c;
			}

			&-overall {
				font-family: Proxima Nova;
				font-weight: normal;
				font-size: 16px;
				line-height: 18px;
				letter-spacing: 1px;
				font-feature-settings: 'pnum' on, 'lnum' on;
				color: rgba(254, 184, 60, 0.7);
			}
		}

		&-rakeback {
			display: block;
			font-size: 0;
			white-space: nowrap;
			padding-left: 32px;
			margin-right: auto;
			&-label {
				margin-bottom: 2px;
				display: block;
				font-family: Proxima Nova;
				font-size: 12px;
				line-height: 12px;
				color: #cccccc;
				opacity: 0.7;
			}

			&-val {
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 18px;
				color: #ffffff;
			}
		}

		&:hover &-rakeback--hover {
			display: none;
		}

		&-link {
			border: 1px solid rgba(204, 204, 204, 0.5);
			border-radius: 4px;
			padding: 8px 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 14px;
			color: #ffffff;
			display: inline-block;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;

			&_download {
				display: none;
				min-width: 96px;
				margin-left: auto;
				margin-right: 8px;
				box-sizing: border-box;
				border-color: #ff4151;
				background: #ff4151;
				color: #ffffff;
				&:hover,
				&:focus,
				&:after {
					outline: none;
					color: #ffffff;
					border-color: #ee3c4b;
					background: #ee3c4b;
				}
			}

			&_disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}

		&:hover &-link_download {
			display: block;
		}

		&:hover &-link__review,
		&:active &-link__review,
		&:focus &-link__review {
			text-decoration: none;
			color: #222222;
			border-color: #ffffff;
			background: #ffffff;
		}
	}

	@include mq('laptop') {
		.top-rooms__item {
			&-rating {
				text-align: center;
				margin-left: auto;
				margin-right: 68px;
			}

			&-rakeback {
				padding-left: 0;
			}
			&:hover &-rakeback--hover {
				display: block;
			}

			&-link {
				&_download {
					display: block;
					margin-right: 24px;
					margin-left: auto;
				}
			}
		}
	}

	@include mq('tablet') {
		.top-rooms__item {
			padding-left: 16px;
			padding-right: 8px;
			&-link {
				box-sizing: border-box;
			}
			&-link_download {
				border-color: #ff4151;
				background: #ff4151;
				color: #ffffff;
				margin-right: 8px;
				padding-left: 16px;
				padding-right: 16px;
			}
			&-link__review {
				border: 1px solid rgba(204, 204, 204, 0.5);
				background: #e9e9e9;
				color: #777777;
				padding-left: 12px;
				padding-right: 12px;
				min-width: 75px;
			}
			&:hover &-link_download {
				// display: none;
			}
			&:hover &-link_download,
			&:active &-link_download,
			&:focus &-link_download {
				border-color: #ff4151;
				background: #ff4151;
				color: #ffffff;
			}

			&:hover,
			&:focus,
			&:active {
				background: #fafafa;
				border-bottom: 1px solid transparent;
			}
			&:hover &-link__review,
			&:active &-link__review,
			&:focus &-link__review {
				border: 1px solid rgba(204, 204, 204, 0.5);
				background: #e9e9e9;
				color: #777777;
			}

			&-rating {
				display: none;
				margin-right: 0;
			}

			&-rakeback {
				display: none;
				// margin-left: auto;
				// margin-right: auto;
			}

			&:hover &-rakeback--hover {
				display: none;
			}
		}
	}

	@media screen and (max-width: 413px) {
		.top-rooms__item {
			&-link_download {
				margin-right: 4px;
				min-width: 80px;
			}
		}
	}
</style>
