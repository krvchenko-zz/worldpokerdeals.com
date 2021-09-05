<template>
	<div class="game-item">
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
			<a :class="['game-item__wrap']" :href="href" @click="navigate">
				<div
					:class="[
						'game-item__icon-wrap',
						center && 'game-item__icon-wrap_center',
					]"
				>
					<svg-icon
						class="game-item__icon"
						:icon="icon"
						:width="88"
						:height="88"
						view-box="0 0 200 200"
					/>
				</div>
				<div :class="['game-item__title', center && 'game-item__title_center']">
					{{ title }}
				</div>
				<div class="game-item__rooms">{{ $tc('rooms_count', rooms) }}</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'GameItem',

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
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-network-more: url('~assets/i/ico-network-more.svg?data');
	.game-item {
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
				background: $ico-network-more no-repeat center;
			}
		}
	}

	@include mq('tablet') {
		.game-item {
			margin: 0 0 20px 0;
			&:last-child {
				margin: 0;
			}
			&__rooms {
				white-space: nowrap;
				width: min-content;
				&:after {
					left: calc(100% + 28px);
				}
			}
			&__icon-wrap {
				margin-top: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>
