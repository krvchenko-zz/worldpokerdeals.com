<template>
<div class="front-telegram">
	<img width="326px" height="252px" decoding="async" loading="lazy" src="~assets/i/bamhunter-banner.jpg" alt="Вестник Бамхантера" class="front-telegram__img">
  <div class="front-telegram__wrap">
    <div class="front-telegram__title">Telegram-канал<br><b>«Вестник Бамхантера»</b></div>
    <div class="front-telegram__info">Подпольное издание для тех, кто ценит свое время и выбирает лучшую игру</div>
    <a class="btn btn-block btn-green" rel="nofollow" href="https://t.me/worldpokerdealsRU" target="_blank">Подписаться</a>
  </div>
</div>
</template>

<script>

export default {

  name: 'FrontTelegram',

  components: {

  },

  props: {

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
$ico-telegram-big: url('~assets/i/messengers/ico-telegram-big.svg?data');
.front-telegram {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &__img {
    display: block;
    min-height: 252px;
    width: auto;
  }

  &__wrap {
    padding: 24px 28px 28px 28px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__title {
    padding-top: 60px;
    margin-bottom: 8px;
    font-family: 'Proxima Nova Sb';
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #FFFFFF;
    background: $ico-telegram-big no-repeat center top;
    // background-size: auto 48px;
    b {
      font-family: 'Proxima Nova Th';
      font-size: 21px;
    }
  }

  &__info {
    margin-bottom: 16px;
    font-family: Proxima Nova;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
    opacity: 0.9;
  }
}
</style>