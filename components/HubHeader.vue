<template>
	<div class="hub-header" :style="{
		background: `url(${require('~/assets/i/' + background)}) no-repeat 50%`,
		backgroundSize: 'cover',
	}">
		<div class="hub-header__wrap">
			<breadcrumb-list :white="true" />
			<h1 class="hub-header__title">{{ title }}</h1>
			<common-text-spoiler
				:limit="isMobile || isTablet ? 100 : 600"
				class="hub-header__summary"
				:text="summary"
			>
				<template v-slot:button>
					<svg-icon icon="spoiler-sep" :width="35" :height="16" />
				</template>
			</common-text-spoiler>
			<slot name="bottom" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'HubHeader',

		components: {},

		head() {
			return {
				link: [
					{rel: 'preload', href: require(`~/assets/i/${this.background}`), as: 'image'}
				],
			}
		},

		props: {
			title: {
				type: String,
			},
			summary: {
				type: String,
			},
			background: {
				type: String,
			},
		},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				isMobile: 'ui/isMobile',
				isTablet: 'ui/isTablet',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.hub-header {
		margin: 0 -26px 32px -26px;
		padding: 0 26px 32px 26px;

		&__title {
			text-align: center;
			margin: 0 0 16px 0;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}
		&__summary {
			font-family: Proxima Nova;
			font-size: 18px;
			line-height: 24px;
			text-align: center;
			color: #ffffff;
			opacity: 0.8;
		}
	}

	@include mq('laptop') {
		.hub-header {
			@include paddings('laptop');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('tablet') {
		.hub-header {
			@include paddings('tablet');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('mobile') {
		.hub-header {
			@include paddings('mobile');
			margin: 0 -20px 24px -20px;
		}
	}
</style>
