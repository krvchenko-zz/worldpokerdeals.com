<template>
  <button v-show="active" class="page-top" @click.prevent="handleClick"></button>
</template>

<script>

  export default {
    name: 'PageTop',

    components: {},

    props: {},

    data: () => ({
      active: false
    }),

    async fetch() {},

    created() {
      process.browser && window.addEventListener('scroll', this.handleScroll)
    },

    computed: {
    },

    watch: {},

    methods: {
      handleScroll() {
        window.pageYOffset > 500 ? this.active = true : this.active = false
      },
      handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },
  }
</script>

<style lang="scss">
  $ico-page-top: url('~assets/i/ico-page-top.svg?data');
  .page-top {
    width: 65px;
    height: 65px;
    box-shadow: 0 19px 38px 0 rgba(34, 36, 43, 30%);
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 0 20px 105px 0;
    z-index: 100;
    border-radius: 50%;
    background: #2B88C9 $ico-page-top no-repeat center;
    outline: none;
    border: 0;
  }
</style>
