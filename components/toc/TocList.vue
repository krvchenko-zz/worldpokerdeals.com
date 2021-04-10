<template>
<nav :class="['toc', inline && 'toc_inline', white && 'toc_white']">
  <div v-if="!inline" class="toc__label">Содержание</div>
	<ul :class="['toc-list', inline && 'toc-list_inline', white && 'toc-list_white']">
    <slot :inline="inline" :white="white"/>
  </ul>
</nav>
</template>

<script>

export default {

  name: 'TocList',

  components: {

  },

  props: {
    inline: {
      type: Boolean,
      default: false
    },

    white: {
      type: Boolean,
      default: true
    }
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
  .toc {
    padding-top: 0;
    position: sticky;
    top: 100px;
    width: 208px;
    &_inline {
      top: 0;
      position: relative;
      padding: 0;
      margin-bottom: 24px;
    }
  }
  .toc__label {
    margin-bottom: 16px;
    color: #243238;
    font-style: normal;
    font-weight: bold;
    line-height: 36px;
    font-size: 16px;
    font-family: 'Proxima Nova';
  }
  .toc-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>