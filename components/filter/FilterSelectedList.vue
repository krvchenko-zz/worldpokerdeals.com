<template>
<div class="filters-selected">
  <slot />
</div>
</template>

<script>

export default {

  name: 'FilterSelectedList',

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

  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.filters-selected {
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
}
</style>