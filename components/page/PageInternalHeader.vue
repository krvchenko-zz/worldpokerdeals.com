<template>
	<div class="page-internal-header">
		<div class="page-internal-header__logo">
			<svg-icon
				v-if="icon"
				:icon="icon"
				:image="true"
				width="136px"
				height="136px"
			/>
		</div>

		<div class="page-internal-header__content">
			<h1 class="page-internal-header__title">{{ title }}</h1>
			<page-meta
				:author="author ? author : ''"
				:created="created"
				:updated="updated"
				:dark="true"
			>
			</page-meta>

			<slot name="body" />

			<common-text-spoiler
				v-if="summary"
				:limit="isMobile || isTablet ? 100 : 600"
				class="page-internal-header__summary"
				:text="summary"
			>
				<template v-slot:button>
					<svg-icon icon="spoiler-sep" :width="35" :height="16" />
				</template>
			</common-text-spoiler>
		</div>

		<lazy-hydrate v-if="promotion" when-visible>
			<template>
				<div class="page-internal-header__promotion">
					<slot name="promotion" />
				</div>
			</template>
		</lazy-hydrate>

		<div class="page-internal-header__nav">
			<slot name="nav" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'PageInternalHeader',

		components: {
			LazyHydrate,
		},

		props: {
			title: {
				type: String,
			},
			author: {
				type: String,
			},
			created: {
				type: String,
			},
			updated: {
				type: String,
			},
			summary: {
				type: String,
			},
			icon: {
				type: String,
			},
			background: {
				type: String,
				default: 'radial-gradient(96.88% 66.11% at 57.43% 2.13%,#ccc 0,#f1f1f1 100%)',
			},
			backgroundUrl: {
				type: String,
				default: 'summary-bg.jpg',
			},
			promotion: {
				type: Boolean,
				default: true,
			},
		},

		data: () => ({}),

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
	$page-internal-bg: url('~assets/i/summary-bg.jpg?data');
	.page-internal-header {
		display: grid;
		grid-template-columns: 172px 1fr 326px;
		grid-template-areas:
			'logo content room-top'
			'nav nav nav';
		column-gap: 56px;
		overflow: hidden;
		position: relative;
		padding-top: 28px;
		@include paddings('desktop');
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		&:before {
			opacity: 0.5;
			left: 0;
			top: 0;
			z-index: -1;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $page-internal-bg no-repeat center;
			background-size: cover;
		}

		&__content {
			grid-area: content;
		}

		&__promotion {
			grid-area: room-top;
		}

		&__nav {
			grid-area: nav;
		}

		&__wrap {
			padding: 30px 30px 0 30px;
			position: relative;
		}

		&__logo {
			grid-area: logo;
			text-align: right;
		}

		&__title {
			margin-bottom: 16px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #222222;
		}

		&__summary {
			padding-bottom: 26px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}
	}

	@include mq('laptop') {
		.page-internal-header {
			grid-template-columns: 24px 157px 66px 1fr 24px;
			grid-template-areas:
				'. logo . content .'
				'nav nav nav nav nav';
			column-gap: 0;
			padding-left: 0;
			padding-right: 0;
			&__promotion {
				display: none;
			}
		}
	}

	@include mq('tablet') {
		.page-internal-header {
			margin-left: -20px;
			margin-right: -20px;
			grid-template-columns: 20px 1fr 20px;
			grid-template-areas:
				'. logo .'
				'. content .'
				'nav nav nav';
			&__logo {
				text-align: center;
				margin-bottom: 20px;
			}
			&__summary {
				padding-bottom: 20px;
			}
			&__nav {
				width: 100%;
			}
			&__title {
				text-align: center;
			}
		}
	}
</style>
