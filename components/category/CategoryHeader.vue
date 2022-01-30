<template>
	<div
		:style="{
			backgroundImage: `url(${background})`
		}"
		:class="['category-header']
	">
		<slot name="breadcrumbs" />

		<div class="category-header__wrap">
			<div class="category-header__content">
				<svg-icon
					v-if="icon"
					class="category-header__icon"
					:width="90"
					:height="68"
					:image="true"
					:icon="icon"
				/>

				<h1 class="category-header__title">{{ title }}</h1>

				<page-meta
					v-if="meta"
					class="category-header__meta"
					:title="false"
					:author="author"
					:created="created"
					:updated="updated"
				/>

				<common-text-spoiler
					v-if="summary"
					:limit="$device.isMobile || $device.isTablet ? 100 : 600"
					class="category-header__summary"
					:text="summary"
				>
					<template v-slot:button>
						<svg-icon icon="spoiler-sep" width="35" height="16" />
					</template>
				</common-text-spoiler>
			</div>

			<lazy-hydrate when-visible>
				<template>
					<div class="category-header__promotion">
						<slot name="promotion" />
					</div>
				</template>
			</lazy-hydrate>
		</div>
	</div>
</template>

<script>
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'CategoryHeader',

		components: {
			LazyHydrate,
		},

		head() {
			return {
				link: [
					{rel: 'preload', href: require(`~/assets/i/${this.backgroundUrl}`), as: 'image'}
				],
			}
		},

		props: {
			meta: {
				type: [Boolean, Number],
				default: false,
			},
			featured: {
				type: [Boolean, Number],
				default: true,
			},
			icon: {
				type: String,
			},
			title: {
				type: String,
			},
			summary: {
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
			backgroundUrl: {
				type: String,
				default: 'summary-bg.jpg',
			},
		},

		data: () => ({}),

		mounted() {
			// console.log(this.$slots);
		},

		computed: {
			background() {
				return require(`~/assets/i/${this.backgroundUrl}`)
			},
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">

	.category-header {
		display: flex;
		flex-direction: column;
		@include paddings('desktop');
		margin: 0 -26px;
		padding-bottom: 56px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center top;
		&__wrap {
			display: grid;
			grid-template-columns: 1fr minmax(auto, 326px);
			gap: 86px;
			padding: 0 60px;
			position: relative;
			align-items: start;
		}
		&__content {
			display: grid;
			grid-template-columns: min-content 1fr;
			grid-column-gap: 28px;
			grid-template-areas:
				'icon title'
				'icon meta'
				'summary summary';
		}
		&__icon {
			width: auto;
			height: auto;
			grid-area: icon;
			display: inline-flex;
		}
		&__title {
			grid-area: title;
			margin-bottom: 10px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}
		&__meta {
			grid-area: meta;
		}
		&__summary {
			grid-area: summary;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 24px;
			color: #ffffff;
			opacity: 0.8;
		}
		&__promotion {
			min-height: 318px;
		}
	}

	@include mq('desktop') {
		.category-header {
			&__wrap {
				padding: 0;
				column-gap: 48px;
				grid-template-columns: 1fr minmax(auto, 288px);
			}
		}
	}

	@include mq('laptop') {
		.category-header {
			@include paddings('tablet');
			&__wrap {
				padding: 0;
				gap: 12px;
				grid-template-columns: 1fr 288px;
				justify-content: space-between;
			}
			&__promotion {
				align-self: baseline;
			}
			&__icon {
				display: none;
			}
			&__content {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-areas:
					'title'
					'meta'
					'summary';
			}
		}
	}

	@include mq('tablet') {
		.category-header {
			@include paddings('mobile');
			margin: 0 -20px;
			&__wrap {
				grid-template-columns: 100%;
				justify-content: space-between;
			}
			&__promotion {
				display: none;
			}
			&__icon {
				display: inline-block;
			}
			&__title {
				margin-bottom: 0;
			}
			&__meta {
				margin-top: 16px;
			}
			&__content {
				grid-template-columns: min-content 1fr;
				align-items: center;
				grid-column-gap: 24px;
				grid-template-areas:
					'icon title'
					'meta meta'
					'summary summary';
			}
		}
	}
</style>