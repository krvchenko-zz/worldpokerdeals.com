<template>
<div class="geo-switcher">
  <span class="geo-switcher__label">Показать предложения для</span>
  <div class="geo-switcher__wrap">
    <label :class="['geo-switcher-btn', result && 'geo-switcher-btn_active']">
      <input type="radio" class="geo-switcher__input" v-model="result" :value="value" @change="updateValue">
      <svg-icon class="geo-switcher-btn__icon" prefix="flags/" :icon="country.code" :width="24" :height="24"/>
      <span class="geo-switcher-btn__label">{{ country.from }}</span>
    </label>
    <label :class="['geo-switcher-btn', !result && 'geo-switcher-btn_active']">
      <input type="radio" class="geo-switcher__input" v-model="result" :value="null" @change="updateValue">
      <span class="geo-switcher-btn__label">Всех стран</span>
    </label>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'GeoSwitcher',

  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
  },

	created() {

	},

	data: () => ({
    result: null
	}),

  computed: {
    ...mapGetters({
      country: 'location/country',
      geo: 'location/code'
    })
  },

  watch: {
    value: {
      immediate:  true,
      handler(val) {
        this.result = val
      }
    }
  },

	methods: {
    updateValue(event) {
      this.$emit('update:geo', this.result);
      this.$emit('change', this.result);
    },
	}
}
</script>

<style lang="scss">

.geo-switcher {
  margin: 0;
  position: relative;
  display: flex;
  &__input {
    display: none;
  }

  &__wrap {
    display: flex;
  }

  &-btn {
    margin: 0;
    cursor: pointer;
    padding: 7px 20px;
    display: flex;
    align-items: center;
    background: #FAFAFA;
    border: 1px solid #E9E9E9;
    box-sizing: border-box;
    color: #222222;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &__label {
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      font-feature-settings: 'tnum' on, 'lnum' on;
    }

    &__icon {
      margin-right: 12px;
    }

    &_active {
      color: #fff;
      background: #1E88E5;
      border: 1px solid #2378B7;
    }

    .flag-icon {
      margin-right: 8px;
    }
  }

  &__label {
    margin-right: 20px;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 20px;
    color: #555555;
    align-self: center;
  } 
}
</style>