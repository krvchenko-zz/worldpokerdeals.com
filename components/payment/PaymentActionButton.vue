<template>
  <nuxt-link :to="to" v-slot="{ href, route, navigate }">
    <button :style="{ background: background }" :class="[
      'btn', 'btn-payment-action',
      `btn-payment-action_${type}`
    ]" :href="href" v-on="shouldRegister ? { click: handleRegister } : { click: navigate }">{{ label }}</button>
  </nuxt-link>
</template>

<script>

export default {

  name: 'PaymentActionButton',

  components: {

  },

  props: {
    type: {
      type: String
    },

    label: {
      type: String,
      default: ''
    },

    url: {
      type: String,
      default: ''
    },

    vipUrl: {
      type: String,
      default: ''
    },

    background: {
      type: String,
      default: ''
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    to() {
      return this.vipUrl
    },

    shouldRegister() {
      return this.type === 'register' ? true : false
    }
  },

  watch: {

  },

	methods: {
    handleRegister() {
      window.open(this.url, '_blank')
    }
	}
}
</script>

<style lang="scss">
.btn-payment-action {
  margin-right: 28px;
  padding: 11px 12px 10px 12px;
  color: #FFFFFF;
  &:hover,
  &:active,
  &:focus {
    color: #FFFFFF;
  }
}
</style>