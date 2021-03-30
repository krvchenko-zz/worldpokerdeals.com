<template>
  <div class="select" :tabindex="tabindex" @blur="open = false">

    <div class="select-selected">
      <input 
        type="text"
        readonly="readonly"
        autocomplete="off"
        placeholder="Select"
        class="select__input"
        :value="label"
        @click="open = !open"
      />
      <span :class="['select__arrow', !open ? 'select__arrow_down' : 'select__arrow_up']"></span>
    </div>
      
    <div :class="['select-dropdown', open && 'select-dropdown_opened']">
      <transition name="slide">
        <div class="select-dropdown__list" v-show="open">
          <div
            class="select-dropdown__item"
            v-for="option in options"
            :key="option.value"
            @click="handleClick(option.value)"
          >{{ option.label }}</div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0].label
        : null,
      open: false,
    };
  },

  computed: {
    label() {
      return this.options.find(option => option.value === this.selected).label
    }
  },

  mounted() {

  },

  methods: {
    handleClick(option) {
      this.selected = option;
      this.open = false;
      this.$emit('input', option);
    },
  }
};
</script>

<style scoped lang="scss">
  
$ico-arrow-down: url('~assets/i/ico-arrow-down.svg?data');

.select {
  width: 100%;
  position: relative;

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }

  &-selected {
    position: relative;
  }

  &__input {
    width: 100%;
    cursor: pointer;
    padding: 11px 36px 11px 16px;
    background: #FAFAFA;
    border: 1px solid #E9E9E9;
    box-sizing: border-box;
    border-radius: 2px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #555555;

    &:active,
    &:focus,
    &:hover {
      outline: none;
    }
  }

  &__arrow {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 16px;
    background: $ico-arrow-down no-repeat center;
    &_up {
      transform: rotate(-180deg);
    }
    &_down {
      transform: rotate(0deg);
    }
  }

  &-dropdown {
    width: 100%;
    position: absolute;
    top: 40px;
    z-index: 100;
    margin: 5px 0;

    &__list {
      border: solid 1px #E4E7ED;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      box-sizing: border-box;
      margin: 5px 0;
      // &:before {
      //   content: '';
      //   top: -7px;
      //   margin-left: 44px;
      //   border-top-width: 0;
      //   border-bottom-color: #fff;
      //   border-top-color: transparent;
      //   border-left-color: transparent;
      //   border-right-color: transparent;
      //   border-width: 6px;
      //   position: absolute;
      //   display: block;
      //   width: 0;
      //   height: 0;
      //   border-style: solid;
      //   z-index: 100;
      //   box-shadow: 0px 1px 0px 0px #ffffff;
      // }
    }

    &__item {
      cursor: pointer;
      padding: 0 16px;
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 34px;
      color: #555555;

      &:hover {
        background: #FAFAFA;
      }
    }
  }
}
</style>