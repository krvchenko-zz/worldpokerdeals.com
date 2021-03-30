<template>
<div :class="['filter-dropdown', collapsed && 'filter-dropdown_collapsed']">
  <div 
    :class="['filter-dropdown__header', collapsed && 'filter-dropdown__header_collapsed']"
    @click="handleToggle"
  >
    <svg-icon class="filter-dropdown__icon" v-if="icon" :icon="icon"/>
    <span class="filter-dropdown__label">{{ label }}</span>
  </div>

  <transition name="slide">
    <div v-show="!collapsed" class="filter-dropdown-list">
      <slot/>
    </div>
  </transition>

</div>
</template>

<script>

export default {

  name: 'FilterDropdown',

  components: {

  },

  props: {

    label: {
      type: String,
      required: true,
    },

    icon: {
      type: [String, Boolean],
      default: false,
    },
  },

	created() {

	},

	data: () => ({
    collapsed: true
	}),

  computed: {

  },

  watch: {

  },

	methods: {
    handleToggle() {
      this.collapsed = !this.collapsed

      if (this.collapsed) {
        this.$emit('close', this.collapsed)
      } else {
        this.$emit('open', this.collapsed)
      }
    }
	}
}
</script>

<style lang="scss">

$ico-arrow-down: url('~assets/i/ico-arrow-down.svg?data');

.filter-dropdown {
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-bottom: 0;

  &_collapsed {
    background: #FAFAFA;
  }

  &:last-child {
    border-bottom: 1px solid #E9E9E9;
  }

  &__header {
    position: relative;
    cursor: pointer;
    padding: 20px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #243238;
    display: flex;
    &:after {
      position: absolute;
      top: 25px;
      right: 20px;
      content: '';
      display: block;
      width: 10px;
      height: 6px;
      transform: rotate(-180deg);
      background: $ico-arrow-down no-repeat center;
      transition: transform ease .3s;
    }

    &_collapsed {
      &:after {
        transform: rotate(0deg);
      }
    }
  }

  &__label {
    padding-left: 12px;
  }

  &__icon {

  }

  &-list {
    padding: 0 20px;
  }
}
</style>