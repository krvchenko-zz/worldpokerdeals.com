<template>
  <transition name="fade">
    <li v-show="show || more" :class="['payment-item', more && 'payment-item_more']" :title="title">
      <svg-icon v-if="icon" class="payment-item__icon" :icon="`${icon}-white`" @ready="show = true"/>
    </li>
  </transition>
</template>

<script>

export default {

  name: 'PaymentItem',

  components: {

  },

  props: {
    title: {
      type: String,
      default: ''
    },

    icon: {
      type: [String, Boolean],
      default: false
    },

    more: {
      type: Boolean,
      default: false
    },
  },

  created() {

  },

  data: () => ({
    show: false
  }),

  computed: {

  },

  watch: {

  },

  methods: {

  }
}
</script>

<style lang="scss">
.payment-item {
  height: 16px;
  opacity: 0.8;
  margin-bottom: 5px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: top;

  &_more {
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
    vertical-align: bottom;
    span {
      height: 16px;
      cursor: pointer;
      border: 1px solid #999999;
      border-radius: 10px;
      padding: 0 5px;
      display: block;
      font-size: 11px;
      color: #999999;
      font-family: 'Proxima Nova Sb';
    }
  }
}
</style>