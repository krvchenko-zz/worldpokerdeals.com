<template>
<div :class="['form-select', prefix && 'form-select_prefix']">
  <label v-if="label" :style="{
    color: labelColor
  }" :class="[
    'form-select__label',
    required && 'form-select__label_required',
    labelPosition && `form-select__label_${labelPosition}`
  ]">{{ label }}</label>
  <div class="form-select__inner">
    <select
      autocomplete="false"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      :value="value"
      :class="[
        'form-select__value',
        loading && 'form-select__value_loading',
        error && 'form-select__value_error',
        disabled && 'form-select__value_disabled'
      ]"
      @change="$emit('change', $event.target.value)"
    >
      <!-- <option :value="null" disabled selected>{{ placeholder }}</option> -->
      <option class="form-select__option" v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >{{ item.label }}</option>
    </select>
  </div>
</div>
</template>

<script>

export default {

  components: {

  },

  name: 'FormSelect',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    options: {
      type: Array,
      required: true
    },

    label: {
      type: [String, Boolean],
      default: false
    },

    labelPosition: {
      type: String
    },

    prefix: {
      type: [Boolean],
      default: false
    },

    placeholder: {
      type: [String],
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    error:  {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    labelColor: {
      type: String,
      default: '#222222'
    },

    required: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {

  },

  watch: {
    options: {
      immediate: true,
      deep: true,
      handler(options) {
        // if (!this.value &&) {
        //   this.$emit('change', options[0].value)
        // }
      }
    }
  },

	methods: {

	}
}
</script>

<style lang="scss">

$ico-select-arrow: url('~assets/i/ico-select-arrow.svg?data');

.form-select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &__label {
    position: relative;
    display: block;
    margin-bottom: 8px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 20px;
    color: #222222;
    flex: 0 0 100%;
    &_required {
      display: flex;
      align-items: center;
      &:after {
        margin-left: 8px;
        content: '';
        width: 5px;
        height: 5px;
        display: block;
        line-height: 20px;
        border-radius: 50%;
        background: #FF4151;
      }
    }

    &_left {
      margin-right: 20px;
      flex: none;
      margin-bottom: 0;
    }
  }

  &__inner {
    position: relative;
  }

  &__value {
    appearance: none;
    -webkit-appearance: none;
    padding: 11px 42px 11px 9px;
    width: 100%;
    background: #FFFFFF;
    mix-blend-mode: normal;
    border: 1px solid #C9C9C9;
    border-radius: 4px;
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 16px;
    color: #555555;
    background: #FAFAFA $ico-select-arrow no-repeat calc(100% - 16px) center;
    &:focus,
    &:active {
      outline: none;
      border: 1px solid #008BE2;
      box-shadow: 0px 0px 20px rgba(0, 139, 226, 0.2);
      border-radius: 4px;
    }

    &:-webkit-autofill {
      font-family: Proxima Nova;
      font-size: 16px;
      line-height: 16px;
      color: #555555;
      -webkit-text-fill-color: #555555 !important;
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }

    &-webkit-autofill {
      font-family: Proxima Nova;
      font-size: 16px;
      line-height: 16px;
      color: #555555;
      -webkit-text-fill-color: #555555 !important;
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }

    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active {
      box-shadow: 0px 0px 20px rgba(0, 139, 226, 0.2);
    }

    &_error {
      border-color: #FF4151;
    }

    &_loading {
      background: #E9E9E9;
      border: 1px solid #E9E9E9;
    }

    &_disabled {
      border-color: #E9E9E9;
      cursor: not-allowed;
      background: #FAFAFA;
    }
  }

}

.invalid-feedback {
  margin-top: 8px;
  font-family: 'Proxima Nova Sb';
  font-size: 12px;
  line-height: 16px;
  color: #FF4151;
}
</style>