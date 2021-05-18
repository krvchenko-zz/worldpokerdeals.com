<template>
	<div class="payment-item">
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{
				name: 'index',
				params: { parent: page.parent.slug, child: page.slug },
			}"
		>
			<a :class="['payment-item__wrap']" :href="href" @click="navigate">
				<div v-if="vip" class="payment-item__vip-wrap">
					<span class="payment-item__vip">VIP-статус</span>
				</div>
				<div class="payment-item__icon-wrap">
					<svg-icon
						class="payment-item__icon"
						:icon="icon"
						:width="88"
						:height="88"
					/>
				</div>
				<div class="payment-item__title">{{ title }}</div>
				<div class="payment-item__rooms">
					{{ rooms }}
					{{ declOfNum(rooms, ['покер-рум', 'покер-румов', 'покер-румов']) }}
				</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'NetworkItem',

		components: {},

		props: {
			title: {
				type: String,
			},
			icon: {
				type: String,
			},
			rooms: {
				type: [String, Number],
			},
			page: {
				type: Object,
			},
			vip: {
				type: [Boolean, Number],
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			declOfNum(number, titles) {
				const cases = [2, 0, 1, 1, 1, 2]
				return titles[
					number % 100 > 4 && number % 100 < 20
						? 2
						: cases[number % 10 < 5 ? number % 10 : 5]
				]
			},
		},
	}
</script>

<style lang="scss">
	$ico-network-more: url('~assets/i/ico-network-more.svg?data');
	$label-bg: url('~assets/i/ico-card-label.svg?data');

	.payment-item {
		margin: 24px 0;
		background: #fafafa;
		border: 1px solid #e9e9e9;
		border-radius: 4px;
		&__wrap {
			position: relative;
			display: block;
			padding: 24px 20px 24px 24px;
			&:hover,
			&:active,
			&:visited {
				text-decoration: none;
			}
		}
		&__title {
			padding-right: 100px;
			min-height: 48px;
			margin-bottom: 12px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			color: #222222;
		}
		&__icon {
			&-wrap {
				margin-top: -24px;
				right: 20px;
				top: 0;
				position: absolute;
			}
			border-radius: 50%;
		}
		&__rooms {
			position: relative;
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 16px;
			color: #aaaaaa;
			&:after {
				content: '';
				position: absolute;
				right: 0;
				top: 3px;
				width: 28px;
				height: 12px;
				display: block;
				background: $ico-network-more no-repeat center;
			}
		}

		&__vip {
			margin: 0 -1px;
			padding: 4px 11px;
			display: block;
			background: linear-gradient(0deg, #ffc255, #ffc255), #eac24a;
			&-wrap {
				left: 50%;
				transform: translate3d(-50%, 0, 0);
				bottom: -8px;
				white-space: nowrap;
				padding: 0 20px;
				position: absolute;
				min-height: 24px;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 12px;
				line-height: 16px;
				letter-spacing: 0.5px;
				text-transform: uppercase;
				color: #222222;
				&:before {
					content: '';
					top: 0;
					left: 0;
					position: absolute;
					display: block;
					width: 20px;
					height: 24px;
					background: $label-bg no-repeat center;
					transform: matrix(1, 0, 0, -1, 0, 0);
				}
				&:after {
					content: '';
					top: 0;
					right: 0;
					position: absolute;
					display: block;
					width: 20px;
					height: 24px;
					background: $label-bg no-repeat center;
					transform: matrix(-1, 0, 0, -1, 0, 0);
				}
			}
		}
	}
</style>
