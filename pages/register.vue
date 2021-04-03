<template>
<section class="content content_register">
  <div class="register">
  	<div class="container-fluid">
      <div class="row">
        <div class="col-5 offset-md-1">
          <h1 class="register__title">Регистрируйся и получи доступ ко всем закрытым разделам сайта</h1>
          <ul class="register-list">
            <li
              v-for="(item, index) in features" :key="index"
              class="register-list__item"
            >
              <svg-icon class="register-list__icon" :icon="item.icon" />
              <span class="register-list__title">{{ item.title }}</span>
            </li>
          </ul>

          <div class="register__info">Ваша личная информация является строго конфиденциальной и никогда не будет передана кому-либо. Гарантируем.</div>

          <div class="register-info">
            <p>Сложности с регистрацией? Остались вопросы? Напишите нашему менеджеру</p>
            <div class="register-info__buttons">
              <button-contact size="md" type="chat" :style="{
                padding: '0 40px'
              }">Начать чат</button-contact>
              <button-contact icon size="md" type="telegram" :href="manager.telegram" />
              <button-contact icon size="md" type="skype" :href="manager.skype" />
              <button-contact icon size="md" type="whatsapp" :href="manager.whatsapp" />
              <button-contact icon size="md" type="email" :href="manager.email" />
            </div>  
          </div>
        </div>

        <div class="col-4 offset-md-1">
          <register-form />
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  middleware: 'guest',

  layout: 'basic',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({

    manager: null,

    features: [
      {
        icon: 'register-access',
        title: 'Доступ в закрытые азиатские клубы, статистику рейка, бесплатные хендхистори и приватные офферы'
      },{
        icon: 'register-news',
        title: 'Еженедельная рассылка с секретными предложениями только для зарегистрированных игроков'
      },{
        icon: 'register-other',
        title: 'А также другие ништяки ерименят пость срачнос тродактигает водгото ваютно струменицы! Мени, вать кния.'
      }
    ]

	}),

  async fetch() {
    await axios.get('/managers', {
      params: {
        id: 27
      }
    }).then(response => {
      this.manager = {
        name: response.data.name,
        position: response.data.position,
        telegram: response.data.telegram,
        skype: response.data.skype,
        whatsapp: response.data.whatsapp,
        email: response.data.email,
        fb: response.data.fb,
        vk: response.data.vk,
        instagram: response.data.instagram
      }
    })
  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      geo: 'location/code',
      page: 'pages/page'
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
$register-bg: url('~assets/i/register-bg.jpg');
.content_register {
  background: $register-bg no-repeat center;
  background-size: cover;
}

.register {
  padding-top: 40px;
  &__title {
    margin-bottom: 40px;
    font-family: 'Proxima Nova Sb';
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &-list {
    margin: 0 0 32px;
    padding: 0;
    list-style: none;
    &__item {
      margin-bottom: 24px;
      display: flex;
      &:last-child {
        margin: 0;
      }
    }

    &__icon {
      margin-right: 28px;
      flex: 0 0 60px;
    }

    &__title {
      font-family: Proxima Nova;
      font-size: 16px;
      line-height: 22px;
      color: #E5E5E5;
    }
  }

  &-info {
    margin-top: 36px;
    padding: 24px 28px;
    background: linear-gradient(0deg, #2E3141, #2E3141);
    border-radius: 10px;
    p {
      margin-bottom: 24px;
      font-family: Proxima Nova;
      font-size: 16px;
      line-height: 20px;
      color: #E5E5E5;
    }

    &__buttons {
      display: flex;
      .btn-contact {
        margin-right: 16px;
      }
    }
  }

  &__info {
    padding-left: 21px;
    position: relative;
    font-family: Proxima Nova;
    font-size: 15px;
    line-height: 18px;
    color: #777777;
    &:before {
      font-size: 25px;
      width: 9px;
      height: 9px;
      left: 0;
      top: 4px;
      position: absolute;
      content: '*';
      display: block;
    }
  }
}
</style>