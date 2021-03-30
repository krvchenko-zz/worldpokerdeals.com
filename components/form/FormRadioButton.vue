<template>
  <label :class="[
    'form-radio-button',
    shouldBeChecked && 'form-radio-button_active',
    disabled && 'form-radio-button_disabled'
  ]">
    <input
      :disabled="disabled"
      type="radio"
      :name="name"
      :value="value"
      :checked="shouldBeChecked"
      :class="['form-radio-button__input']"
      @change="updateInput"
    />
    <span :class="[
      'form-radio-button__label',
      shouldBeChecked && 'form-radio-button__label_active'
    ]">{{ label }}</span>
  </label>
</template>

<script>

export default {

  name: 'FormRadioButton',

  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object],
    },
    modelValue: {
      default: ""
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value
    }
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss">
.form-radio-button {
  margin: 0;
  cursor: pointer;
  background: #FAFAFA;
  border: 1px solid #E9E9E9;
  &_active {
    background: #1E88E5;
    border: 1px solid #2378B7;
    &.form-radio-button_disabled {
      border-color: #C9C9C9;
      background: #C9C9C9;
    }
  }

  &_disabled {
    cursor: not-allowed;
  }
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &__input {
    display: none;
  }

  &__label {
    display: block;
    padding: 12px 40px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #243238;
    &_active {
      color: #fff;
    }
  }
}
</style>