<template>
	<div class="payment-menu">
		<div class="payment-menu__label">{{ $t('vip_statuses') }}</div>
		<ul class="payment-menu__list">
			<nuxt-link
				v-for="(item, index) in items"
				:key="index"
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				prefetch
				:to="{ name: item.slug }"
			>
				<li class="payment-menu__item">
					<a
						:class="[
							'payment-menu__link',
							item.hovered && 'payment-menu__link_hover',
						]"
						:href="href"
						@click="navigate"
						@mouseleave="item.hovered = false"
						@mouseover="item.hovered = true"
					>
						<svg-icon
							class="payment-menu__icon"
							:icon="`${item.icon}-color`"
							:width="32"
							:height="32"
							:image="true"
							view-box="0 0 30 30"
						/>
						<span
							:class="[
								'payment-menu__title',
								item.hovered && 'payment-menu__title_hover',
							]"
							>{{ $t('vip_status_in', {title: item.title}) }}</span
						>
					</a>
				</li>
			</nuxt-link>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'PaymentMenu',

		components: {},

		props: {},

		data: () => ({
			items: [
				{
					title: 'Skrill',
					icon: 'skrill',
					slug: 'skrill',
					hovered: false,
				},
				{
					title: 'Neteller',
					icon: 'neteller',
					slug: 'neteller',
					hovered: false,
				},
				{
					title: 'ecoPayz',
					icon: 'ecopayz',
					slug: 'ecopayz',
					hovered: false,
				},
			],
		}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.payment-menu {
		background: #353847;
		box-shadow: -10px 0px 30px rgba(0, 0, 0, 0.1);
		&__label {
			padding: 24px 24px 4px 24px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 12px;
			line-height: 20px;
			letter-spacing: 1px;
			text-transform: uppercase;
			color: #999999;
			background: #353847;
		}

		&__list {
			padding: 0 0 20px 0;
			margin: 0;
		}

		&__item {
			list-style: none;
		}

		&__link {
			display: block;
			position: relative;
			padding: 8px 24px 8px 72px;
			background: #353847;
			text-decoration: none;
			&:hover {
				text-decoration: none;
			}
		}

		&__icon {
			position: absolute;
			top: 8px;
			left: 24px;
		}

		&__title {
			padding-top: 6px;
			min-height: 32px;
			display: block;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #ffffff;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&_hover {
				color: #cccccc;
			}
		}
	}
</style>
