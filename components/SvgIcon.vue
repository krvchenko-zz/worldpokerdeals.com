<template>
  <component v-svg="{
    width: width,
    height: height,
    fill: fill,
    opacity: opacity,
    removeClipPath: removeClipPath
  }" class="svg-icon" :is="component"/>
</template>
<script>

export default {
	name: 'SvgIcon',

	props: {
	  icon: {
			type: [String, Boolean],
			// required: true
	  },
	  fill: {
	  	type: [String, Boolean],
	  	default: false
	  },
    opacity: {
      type: [String, Boolean, Number],
      default: false
    },
    growByHeight: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    prefix: {
      type: String,
      default: 'ico-'
    },
    removeClipPath: {
      type: Boolean,
      default: false
    }
	},

	data: () => ({
    show: false,
    default: ''
	}),

  asyncComputed: {
    component: {
      get() {
        return () => import(
          /* webpackChunkName: "icons" */
          /* webpackPrefetch: 0 */
          `~/assets/icons/${this.prefix}${this.icon}.svg?inline`
        ).catch(e => {
          // console.log(e);
        })
      },

      watch: ['icon']
    },
  },

  mounted() {

  },

  watch: {

  },

  methods: {
  }
}
</script>

<style lang="scss">
  .svg-icon {
    display: inline-flex;
  }
</style>