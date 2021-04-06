<template>
<div>
  <nuxt-link prefetch :to="{name: 'index', params: {}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <a :href="href" @click="navigate"></a>
  </nuxt-link>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'Default',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({

	}),

  async fetch() {

  },

  computed: {
    ...mapGetters({
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
</style>