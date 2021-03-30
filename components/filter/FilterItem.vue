<template>
<div class="filter-item">
  <slot />
  <span class="filter-item__count">{{ count }}</span>
  <slot name="icon" />
</div>
</template>

<script>

export default {

  name: 'FilterItem',

  components: {

  },

  props: {
    icon: {
      type: [Boolean, String],
      default: false,
    },

    count: {
      type: Number,
      default: 0,
    }
  },

  mounted() {

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
.filter-item {
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__count {
    margin-left: auto;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #999999;
  }

  &__icon {
    border-radius: 2px;
    margin-left: 12px;
  }
}
</style>