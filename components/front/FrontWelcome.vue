<template>
<div class="front-welcome">
	<img width="326px" height="180px" decoding="async" loading="lazy" src="~assets/i/welcome-banner.jpg" alt="Всем привет!" class="front-welcome__img">
  <div class="front-welcome__wrap">
    <h3>Всем привет!</h3>
    <p>Меня зовут Родион Лонга. Вы могли читать мои посты на Покерофф и Gipsyteam.</p>
    <p>Уже 5 лет я живу в Азии и занимаюсь комплексной организацией игры покерных профессионалов.</p>
    <p>На этом сайте <a href="/our-team">наша команда</a> собирает лучшие предложения в самых рыбных сетях интернета и предоставляет комплексный сервис по сопровождению онлайн-игры.</p>

    <div class="front-welcome__contacts">
      <button-contact icon type="fb" href="https://www.facebook.com/worldpokerdealsRu" />
      <button-contact icon type="telegram" href="https://t.me/worldpokerdealsRU" />
      <button-contact icon type="instagram" href="instagram.com/worldpokerdeals" />
      <button-contact icon type="vk" href="https://vk.com/worldpokerdeals" />
    </div>

    <a href="/our-team" class="btn btn-block btn-border btn-welcome-banner">Подробнее о нас</a>

  </div>
</div>
</template>

<script>

export default {

  name: 'FrontWelcome',

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
.front-welcome {
  margin-bottom: 32px;
  &__img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    max-width: 100%;
    height: auto;
  }

  &__wrap {
    border-top: 0;
    border: 1px solid #E9E9E9;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 20px 28px 28px 28px;
    background: #FAFAFA;
    h3 {
      margin-bottom: 16px;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
      color: #222222;
    }

    p {
      margin-bottom: 10px;
      font-family: Proxima Nova;
      font-size: 14px;
      line-height: 17px;
      color: #555555;
    }

    a {
      color: #008BE2;
    }
  }

  &__contacts {
    display: flex;
    margin: 28px 0;
    .btn-contact {
      margin-right: 12px;
      padding: 16px;

      &_fb {
        &:before {
          background-size: 10px auto;
        }
      }

      &_vk {
        &:before {
          background-size: 22px auto;
        }
      }

      &_telegram {
        &:before {
          background-size: 20px auto;
        }
      }

      &_instagram {
        &:before {
          background-size: 24px auto;
        }
      }
    }
  }
}
.btn-welcome-banner {
  padding: 10px 24px 9px 24px;
  border: 1px solid #2E87C8;
  &:focus,
  &:active,
  &:hover {
    color: #FFFFFF;
    background: #2E87C8;
  }
}
</style>