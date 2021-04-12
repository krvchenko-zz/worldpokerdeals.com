<template>
<div class="telegram-subscribe">
	<div class="telegram-subscribe__wrap">
    <div class="telegram-subscribe__label">{{ label }}</div>
    <div class="telegram-subscribe__description">{{ description }}</div>
    <a class="telegram-subscribe__btn" :href="url" rel="nofollow" target="_blank">{{ btnLabel }}</a>
  </div>
  <div class="telegram-subscribe__img">
    <img width="300px" height="165px" decoding="async" loading="lazy" src="/telegram-subscribe-bg.png" alt="Telegram widjet">
  </div>
</div>
</template>

<script>

export default {

  name: 'TelegramSubscribe',

  props: {
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    btnLabel: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: '#'
    }
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
$ico-telegram: url('~assets/i/messengers/ico-telegram.svg?data');

.telegram-subscribe {
  margin: 40px 0;
  padding: 24px 300px 24px 24px;
  min-height: 165px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;
    background: linear-gradient(91.12deg, #5789FC 11.23%, #172D89 91.12%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
  &__wrap {
    position: relative;
    z-index: 2;
  }
  &__label {
    margin-bottom: 4px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
  }
  &__description {
    margin-bottom: 16px;
    font-family: Proxima Nova;
    font-size: 15px;
    line-height: 19px;
    color: #FFFFFF;
  }
  &__img {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  &__btn {
    border-radius: 3px;
    position: relative;
    padding: 11px 24px 11px 56px;
    display: inline-block;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #FFFFFF;
    background: #6386DA $ico-telegram no-repeat 24px center;
    background-size: 20px 16px;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      color: #FFFFFF;
      text-decoration: none;
    }
  }
}
</style>