<template>
	<client-only>
		<lazy-hydrate when-visible>
			<component
				v-if="!image"
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
			<img 
				v-else
				:src="src"
				:width="width"
				:height="height"
				:alt="icon"
				decoding="async"
				loading="lazy"
				class="svg-icon"
			>
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
			image: {
				type: Boolean,
				default: false,
			}
		},

		data: () => ({
			show: false,
			default: '',
		}),

		asyncComputed: {
			component: {
				get() {
					if (this.image) {
						return null
					}
					return () =>
						import(
							/* webpackChunkName: "icons" */
							/* webpackMode: "lazy-once" */
							`~/assets/icons/${this.prefix}${this.icon}.svg?inline`
						).catch(e => {
						})
				},
				watch: ['icon'],
			},

			// src() {
			// 	if (!this.image) {
			// 		return null
			// 	}

			// 	let src = null

			// 	try {
			// 		src = require(`../assets/icons/${this.prefix}${this.icon}.svg`)
			// 	} catch (e) {
			// 		return null
			// 	}

			// 	return src
			// }
		},

		computed: {
			src() {
				if (!this.image) return null

				return `${process.env.mediaHost}/assets/icons/${this.prefix}${this.icon}.svg`
			}
		},

		mounted() {},

		methods: {},
	}
</script>

<style lang="scss">
	.svg-icon {
		display: inline-flex;
	}
</style>
