<template>
	<div class="nav-box-item">
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{
				name: 'index',
				params: {
					parent: page.parent ? page.parent.slug : page.slug,
					child: page.parent ? page.slug : null,
				},
			}"
		>
			<a :class="['nav-box-item__wrap']" :href="href" @click="navigate">
				<div v-if="bage" class="nav-box-item__bage-wrap">
					<span class="nav-box-item__bage">{{ bage }}</span>
				</div>
				<div
					:class="[
						'nav-box-item__icon-wrap',
						center && 'nav-box-item__icon-wrap_center',
					]"
				>
					<svg-icon
						class="nav-box-item__icon"
						:icon="icon"
						width="88px"
						height="88px"
						:image="true"
						view-box="0 0 200 200"
					/>
				</div>
				<div :class="['nav-box-item__title', center && 'nav-box-item__title_center']">
					{{ title }}
				</div>
				<div class="nav-box-item__rooms">{{ $tc('rooms_count', rooms) }}</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'NavBoxItem',

		components: {},

		props: {
			title: {
				type: String,
			},
			center: {
				type: Boolean,
				default: false,
			},
			icon: {
				type: String,
			},
			page: {
				type: Object,
			},
			rooms: {
				type: [String, Number],
			},
			bage: {
				type: [String, Boolean],
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-nav-box-more: url('~assets/i/ico-network-more.svg?data');
	$label-bg: url('~assets/i/ico-card-label.svg?data');
	.nav-box-item {
		margin: 20px 0;
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
			&_center {
				text-align: center;
				padding: 60px 0 0 0;
			}
		}
		&__bage {
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
		&__icon {
			&-wrap {
				margin-top: -24px;
				right: 20px;
				top: 0;
				position: absolute;
				&_center {
					right: auto;
					left: 50%;
					transform: translateX(-50%);
				}
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
				background: $ico-nav-box-more no-repeat center;
			}
		}
	}

	@include mq('tablet') {
		.nav-box-item {
			margin-bottom: 20px;
			&__icon-wrap {
				margin-top: -20px;
			}
			&__rooms {
				white-space: nowrap;
				width: min-content;
				&:after {
					left: calc(100% + 28px);
				}
			}
		}
	}
</style>
