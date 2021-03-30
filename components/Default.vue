<template>
<div>
	  <nuxt-link prefetch :to="{name: 'index', params: {}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
      <a :href="href" @click="navigate"></a>
    </nuxt-link>
</div>
</template>

<script>

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

  computed: {

  },

  watch: {

  },

	methods: {

	}
}
</script>

<style scoped lang="scss">	
</style>