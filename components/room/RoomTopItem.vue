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
			@mouseleave="hovered = false"
			@mouseover="hovered = true"
		>
			<svg-icon
				:class="['top-rooms__item-icon', `top-rooms__item-icon_${type}`]"
				:icon="slug"
				:width="type === 'menu' ? 40 : 44"
				:height="type === 'menu' ? 40 : 44"
				view-box="0 0 200 200"
			/>
			<div
				:class="[
					'top-rooms__item-title',
					hovered && 'top-rooms__item-title_hover',
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
		<div
			v-else
			:class="['top-rooms__item', `top-rooms__item_${type}`]"
			@mouseleave="hovered = false"
			@mouseover="hovered = true"
		>
			<svg-icon
				:class="['top-rooms__item-icon', `top-rooms__item-icon_${type}`]"
				:icon="slug"
				:width="40"
				:height="40"
				view-box="0 0 200 200"
			/>
			<div
				:class="[
					'top-rooms__item-title',
					'top-rooms__item-cell',
					`top-rooms__item-title_${type}`,
				]"
			>
				{{ title }}
			</div>
			<div :class="['top-rooms__item-rating', 'top-rooms__item-cell']">
				<span :class="['top-rooms__item-rating-label']">{{
					$t('rating')
				}}</span>
				<span :class="['top-rooms__item-rating-val']">{{ rating }}</span>
				<span :class="['top-rooms__item-rating-overall']">/5</span>
			</div>

			<div
				v-if="!hovered"
				:class="['top-rooms__item-rakeback', 'top-rooms__item-cell']"
			>
				<span :class="['top-rooms__item-rakeback-label']">{{
					$t('rakeback')
				}}</span>
				<span :class="['top-rooms__item-rakeback-val']">{{ rakeback }}</span>
			</div>

			<div v-else :class="['top-rooms__item-cell']">
				<nuxt-link v-slot="{ href, route, navigate }" :to="{ name: 'front' }">
					<button
						:class="['top-rooms__item-link', 'top-rooms__item-link_download']"
						@click="handleDownload"
					>
						{{ $t('access') }}
					</button>
				</nuxt-link>
			</div>

			<div :class="['top-rooms__item-cell']">
				<nuxt-link
					v-if="review"
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="[
							'top-rooms__item-link',
							hovered && 'top-rooms__item-link_active',
						]"
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
		padding: 14px 50px 12px 80px;
		position: relative;
		background: #fafafa;
		display: block;
		min-height: 44px;
		box-sizing: content-box;
		border-bottom: 1px solid #e9e9e9;
		text-decoration: none;
		&:hover,
		&:active,
		&:visited {
			text-decoration: none;
		}
		&:last-child {
			padding-bottom: 30px;
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

		&_front {
			padding: 9px 20px 9px 72px;
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

			&:last-child {
				padding: 9px 20px 9px 72px;
			}
		}

		&_menu {
			margin: 0;
			padding: 8px 20px 8px 72px;
			background: #353847;
			border: 0;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:last-child {
				padding: 8px 20px 8px 72px;
			}
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

		&-cell {
			width: 100%;
			margin-right: 8px;
			&:last-child {
				margin: 0;
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
				margin: 0 0 4px 0;
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 20px;
				color: #ffffff;
			}
			&_hover {
				color: #cccccc;
			}
		}
		&-bonus {
			padding-left: 20px;
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
			top: 14px;
			left: 20px;
			position: absolute;
			&_front {
				top: 50%;
				transform: translateY(-50%);
			}
			&_menu {
				left: 24px;
				top: 8px;
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
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 18px;
				color: #ffffff;
			}
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
			&:hover,
			&:active,
			&:focus,
			&_active {
				text-decoration: none;
				color: #222222;
				border-color: #ffffff;
				background: #ffffff;
			}

			&_download {
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
		}
	}
</style>
