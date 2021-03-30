<template>
<div :class="['form-textarea']">
  <label v-if="label" :style="{
    color: labelColor
  }" :class="['form-textarea__label', required && 'form-textarea__label_required']">{{ label }}</label>
  <div class="form-textarea__inner">
    <textarea
      autocomplete="false"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      :value="value"
      :class="[
        'form-textarea__value',
        loading && 'form-textarea__value_loading',
        error && 'form-textarea__value_error',
        disabled && 'form-textarea__value_disabled'
      ]"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</div>
</template>

<script>

export default {

  components: {

  },

  name: 'FormTextarea',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: String,
      default: ''
    },

    label: {
      type: [String, Boolean],
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
      default: true
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

  },

	methods: {

	}
}
</script>

<style lang="scss">

.form-textarea {
  &__label {
    position: relative;
    display: block;
    margin-bottom: 8px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 20px;
    color: #222222;

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
  }

  &__inner {
    position: relative;
  }

  &__value {
    padding: 9px;
    min-height: 110px;
    width: 100%;
    display: block;
    background: #FFFFFF;
    mix-blend-mode: normal;
    border: 1px solid #C9C9C9;
    border-radius: 4px;
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 16px;
    color: #555555;
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