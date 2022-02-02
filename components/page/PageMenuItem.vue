<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		:to="{
			name: page.name ? page.name : 'index',
			params: {
				child: page.parent ? page.slug : null,
				parent: page.parent ? page.parent.slug : page.slug,
			},
			query: page.query ? { category: page.query } : null,
		}"
	>
		<li :class="['page-menu__item', isExactActive && 'page-menu__item_active']">
			<a
				:class="['page-menu__link', isExactActive && 'page-menu__link_active']"
				:href="href"
				@click="navigate"
			>
				<svg-icon
					v-if="icon"
					:class="[
						'page-menu__icon',
						isExactActive && 'page-menu__icon_active',
					]"
					:icon="icon"
					:width="20"
					:height="20"
					:image="icon === 'menu-vip' ? true : false"
					:opacity="isExactActive ? 1 : 0.7"
				/>
				<span
					:class="[
						'page-menu__label',
						isExactActive && 'page-menu__label_active',
					]"
					>{{ label }}</span
				>
				<span
					:class="[
						'page-menu__text',
						isExactActive && 'page-menu__text_active',
					]"
					>{{ text }}</span
				>
			</a>
		</li>
	</nuxt-link>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'PageMenuItem',

		components: {},

		props: {
			label: {
				type: String,
			},
			text: {
				type: String,
			},
			icon: {
				type: String,
			},
			page: {
				type: Object,
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				country: 'location/country',
				topList: 'rooms/topList',
				menuItems: 'menu/items',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.page-menu {
		&__item {
			// flex: 0 0 100%;

			display: block;
		}

		&__link {
			display: block;
			position: relative;
			padding: 12px 24px 12px 60px;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:hover,
			&:active,
			&:focus {
				text-decoration: none;
				background: linear-gradient(0deg, #353847, #353847);
			}
			&_active {
				box-shadow: inset 4px 0px 0px #2988c9;
			}
		}

		&__label {
			display: block;
			margin-bottom: 4px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #ffffff;
			&_active {
				color: #cccccc;
			}
		}

		&__text {
			display: block;
			font-family: Proxima Nova;
			font-size: 12px;
			line-height: 14px;
			color: #cccccc;
			opacity: 0.8;
		}

		&__icon {
			top: 12px;
			left: 24px;
			position: absolute;
			fill: #999999;
			&_active {
				fill: #2988c9;
			}
		}
	}

	@include mq('laptop') {
		.page-menu {
			&__text {
				font-size: 14px;
			}
			&__link {
				&:active,
				&:hover,
				&_active {
					box-shadow: inset 8px 0px 0px #2988c9;
					text-decoration: none;
					background: linear-gradient(0deg, #353847, #353847);
				}
			}
		}
	}
</style>
