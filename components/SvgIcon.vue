<template>
	<client-only>
		<lazy-hydrate when-visible>
			<component
				:is="component"
				v-svg="{
					width: width,
					height: height,
					fill: fill,
					opacity: opacity,
					removeClipPath: removeClipPath,
					viewBox: viewBox,
				}"
				class="svg-icon"
			/>
		</lazy-hydrate>
	</client-only>
</template>
<script>
	import LazyHydrate from 'vue-lazy-hydration'
	export default {
		name: 'SvgIcon',

		components: {
			LazyHydrate,
		},

		props: {
			icon: {
				type: [String, Boolean],
				// required: true
			},
			fill: {
				type: [String, Boolean],
				default: false,
			},
			opacity: {
				type: [String, Boolean, Number],
				default: false,
			},
			growByHeight: {
				type: Boolean,
				default: false,
			},
			width: {
				type: [Number, String],
			},
			height: {
				type: [Number, String],
			},
			prefix: {
				type: String,
				default: 'ico-',
			},
			removeClipPath: {
				type: Boolean,
				default: false,
			},
			viewBox: {
				type: String,
			},
		},

		data: () => ({
			show: false,
			default: '',
		}),

		asyncComputed: {
			component: {
				get() {
					return () =>
						import(
							/* webpackChunkName: "icons" */
							/* webpackPrefetch: 0 */
							`~/assets/icons/${this.prefix}${this.icon}.svg?inline`
						).catch(e => {
						})
				},
				watch: ['icon'],
			},
		},

		watch: {},

		mounted() {},

		methods: {},
	}
</script>

<style lang="scss">
	.svg-icon {
		display: inline-flex;
	}
</style>
