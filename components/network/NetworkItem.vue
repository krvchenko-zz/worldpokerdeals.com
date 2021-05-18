<template>
	<div class="network-item">
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{
				name: 'index',
				params: { parent: page.parent.slug, child: page.slug },
			}"
		>
			<a :class="['network-item__wrap']" :href="href" @click="navigate">
				<div class="network-item__icon-wrap">
					<svg-icon
						class="network-item__icon"
						:icon="url"
						:width="88"
						:height="88"
						view-box="0 0 200 200"
					/>
				</div>
				<div class="network-item__title">{{ title }}</div>
				<div class="network-item__rooms">{{ rooms }} покер-румов</div>
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
			url: {
				type: String,
			},
			rooms: {
				type: [String, Number],
			},
			page: {
				type: Object,
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
	.network-item {
		margin-top: 24px;
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
	}
</style>
