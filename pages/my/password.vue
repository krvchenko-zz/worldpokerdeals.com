<template>
  <my-password-form />
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    layout: 'basic',

    props: {},

    data: () => ({
      manager: null,
    }),

    async fetch() { 
    },

    created() {},

    computed: {

    },

    watch: {},

    methods: {},
  }
</script>

<style lang="scss">
  // $contact-us-bg: url('~assets/i/contact-us-bg.jpg');

  @include mq('desktop') {

  }

  @include mq('laptop') {

  }

  @include mq('tablet') {

  }

  @media (max-width: 415px) {

  }

  @media (max-width: 376px) {

  }
</style>
