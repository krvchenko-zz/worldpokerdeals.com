<template>
<li :class="['filter-tabs__item', active && 'filter-tabs__item_active']" @click="handleClick">
  <span :class="['filter-tabs__label', active && 'filter-tabs__label_active']">{{ label }}</span>
</li>
</template>
<script>

export default {

  name: 'FilterTabItem',

  components: {

  },

  props: {

    active: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      required: true
    },

    value: {
      type: [String, Boolean, Number],
    },
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
    handleClick() {
      this.$emit('click', this.value)
    }
	}
}
</script>

<style lang="scss">
.filter-tabs {
  &__item {
    position: relative;
    cursor: pointer;
    padding-right: 28px;
    text-transform: uppercase;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #555555;
    opacity: 0.8;
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

  &__label {
    z-index: 2;
    position: relative;
    display: block;
    white-space: nowrap;
    &_active,
    &:hover {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom: 4px solid #008BE2;
      padding-bottom: 4px;
    }
  }
}
</style>