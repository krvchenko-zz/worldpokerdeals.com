<template>
	<div class="platform-item">
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
			<a :class="['platform-item__wrap']" :href="href" @click="navigate">
				<div class="platform-item__icon-wrap">
					<svg-icon
						class="platform-item__icon"
						:icon="icon"
						:width="88"
						:height="88"
						:image="true"
						view-box="0 0 88 88"
					/>
				</div>
				<div class="platform-item__title">{{ title }}</div>
				<div class="platform-item__rooms">{{ $tc('rooms_count', rooms) }}</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'PlatformItem',

		components: {},

		props: {
			title: {
				type: String,
			},
			icon: {
				type: String,
			},
			page: {
				type: [Object, Number],
			},
			rooms: {
				type: [Number, String],
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
	.platform-item {
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
		}
		&__icon {
			&-wrap {
				margin-top: -24px;
				right: 20px;
				top: 0;
				position: absolute;
			}
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
		.platform-item {
			margin-top: 0;
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
			&__icon-wrap {
				margin-top: 0;
				top: 50%;
				transform: translateY(-50%);
			}
			&__rooms {
				width: min-content;
				white-space: nowrap;
				&::after {
					left: calc(100% + 28px);
				}
			}
		}
	}
</style>
