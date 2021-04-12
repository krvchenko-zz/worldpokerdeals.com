<template>
<div class="help-banner">
  <div class="help-banner__col">
    <div class="help-banner__title">Помощь в выборе <br> покер-рума!</div>
  </div>
  <div class="help-banner__col">
    <div class="help-banner__text">
      <img class="help-banner__img" decoding="async" loading="lazy" src="~assets/i/room-category-banner.svg" alt="Помощь в выборе покер-рума">
      <p>Появился вопрос по настройке софта или проблема с покер-румом? Не знаешь где искать помощи? Даем советы и помогаем решить любые покерные вопросы.</p>
    </div>
  </div>
  <div class="help-banner__col">
    <div class="help-banner__actions">
      <button-contact block size="md" type="chat">Начать чат</button-contact>
      <div class="help-banner__messengers">
        <button-contact class="help-banner__btn" icon size="sm" type="telegram" :href="telegram"></button-contact>
        <button-contact class="help-banner__btn" icon size="sm" type="skype" :href="skype"></button-contact>
        <button-contact class="help-banner__btn" icon size="sm" type="whatsapp" :href="whatsapp"></button-contact>
        <button-contact class="help-banner__btn" icon size="sm" type="email" :href="email"></button-contact>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'RoomCategoryBanner',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({
    telegram: '',
    skype: '',
    whatsapp: '',
    email: '',
	}),

  async fetch() {

  },

  computed: {
    ...mapGetters({
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">

.help-banner {
  position: relative;
  margin: 20px 0;
  padding: 24px 20px 20px 40px;
  display: flex;
  background: linear-gradient(90deg, #135382 29.17%, #243238 100%),
              linear-gradient(0deg, #222222, #222222), #222222;
  border-radius: 10px;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    width: 364px;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, #135382 0%, #3191D7 60.94%),
                linear-gradient(0deg, #135382, #135382), #222222;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  &__col {
    position: relative;
    z-index: 2;
    margin-right: 28px;
    &:last-child {
      margin: 0;
    }
  }

  &__title {
    margin-top: 12px;
    white-space: nowrap;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    min-width: 237px;
  }

  &__text {
    position: relative;
    p {
      padding-left: 175px;
      margin: 0;
      font-family: Proxima Nova;
      font-size: 14px;
      line-height: 20px;
      color: #FFFFFF;
    }
  }

  &__img {
    left: 0;
    position: absolute;
    top: -26px;
    display: block;
  }

  &__actions {
    max-width: 188px;
  }

  &__messengers {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }

  &__btn {
    margin-right: 16px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>