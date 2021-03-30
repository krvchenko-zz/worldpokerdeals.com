<template>
  <div :class="['countdown', live && 'countdown_live']">
    <span v-if="label" class="countdown__label">{{ label }}</span>
    <span v-if="days" class="countdown__item">{{ days }} д</span>
    <!-- <span class="countdown__sep">:</span> -->
    <!-- <span class="countdown__item">{{ hours }}ч</span> -->
    <!-- <span class="countdown__sep">:</span> -->
    <!-- <span class="countdown__item">{{ minutes }}м</span> -->
    <span v-if="live" class="countdown__live">Live</span>
  </div>
</template>

<script>

export default {

  name: 'Countdown',

  components: {

  },

  props: {
    days: {
      type: [Number, String],
      default: ''
    },

    hours: {
      type: [Number, String],
      default: ''
    },

    minutes: {
      type: [Number, String],
      default: ''
    },

    label: {
      type: [String, Boolean],
      default: false
    },

    live: {
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
.countdown {
  padding: 4px 10px;
  background: #F1EFEF;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  white-space: nowrap;
  &_live {
    position: relative;
    padding: 4px 72px 4px 12px;
    overflow: hidden;
  }
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__label {
    margin-right: 5px;
    font-family: Proxima Nova;
    font-size: 14px;
    line-height: 16px;
    color: #777777;
  }
  &__item {
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 16px;
    color: #777777;
  }
  &__sep {
    margin: 0 5px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 16px;
    color: #B4B9BE;
  }
  &__live {
    position: absolute;
    right: 0px;
    width: 60px;
    height: 100%;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    padding: 0 24px 0 8px;
    background: #FF0015;
    line-height: 26px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #FFFFFF;
    &:before {
      content: '';
      display: block;
      background: rgba(255, 255, 255, .4);
      width: 12px;
      height: 12px;
      position: absolute;
      top: 6px;
      right: 8px;
      border-radius: 50%;
    }

    &:after {
      content: '';
      display: block;
      background: #FFFFFF;
      width: 8px;
      height: 8px;
      position: absolute;
      top: 8px;
      right: 10px;
      border-radius: 50%;
    }
  }
}
</style>