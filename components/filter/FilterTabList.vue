<template>
<nav class="filter-tabs">
  <ul class="filter-tabs__list">
    <slot />
  </ul>
</nav>
</template>

<script>

export default {

  name: 'FilterTabList',

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

<style lang="scss">
.filter-tabs {
  &__list {
    overflow-x: scroll;
    position: relative;
    margin: 0 0 28px 0;
    padding: 0;
    display: flex;
    list-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &:before {
      content: '';
      bottom: 3px;
      position: absolute;
      height: 1px;
      width: 100%;
      display: block;
      background: #CCCCCC;
    }
  }
}
</style>