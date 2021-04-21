<template>
  <a :class="{
      'btn': true,
      'btn-block': block,
      'btn-contact': true,
      'btn-contact_icon': icon,
      'btn-contact_dark': dark,
      [`btn-contact_${size}`]: true,
      [`btn-contact_${type}`]: true
    }"
    :href="target"
  >
    <slot />
  </a>
</template>

<script>

export default {

  name: 'ButtonContact',

  props: {
    type: {
      type: String
    },

    href: {
      type: String
    },

    size: {
      type: String,
      default: 'sm'
    },

    icon: {
      type: Boolean,
      default: false
    },

    dark: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    }

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    target() {
      return (
        this.type === 'chat'     && `#` ||
        this.type === 'skype'    && `skype:${this.href}?chat` ||
        this.type === 'email'    && `mailto:${this.href}` ||
        this.type === 'telegram' && `https://telegram.me/${this.href}` ||
        this.type === 'fb'       && `${this.href}` ||
        this.type === 'vk'       && `${this.href}` ||
        this.type === 'whatsapp' && `whatsapp://tel:${this.href}` ||
        this.type === 'instagram'&& `${this.href}`
      )
    }
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
</style>