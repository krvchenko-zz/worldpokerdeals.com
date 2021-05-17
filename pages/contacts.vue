<template>
<section class="content content_contacts">
  <div class="contacts">
  	<div class="container-fluid">
      <div class="row">
        <div class="col-5 offset-md-1">
          <h1 class="contacts__title">Свяжись с нами, чтобы узнать о закрытых сделках и секретных румах. Отвечаем сразу!</h1>
          <contacts-form />
        </div>
        <div class="col-md-auto offset-md-1">
          <div v-if="manager" class="contacts-box">
            <div class="contacts-box__wrap">
              <h2 class="contacts-box__title">Наши месседжеры и социальные сети</h2>
              <div class="contacts-box__buttons">
                <button-contact icon size="md" type="skype" :href="manager.skype" />
                <button-contact icon size="md" type="telegram" :href="manager.telegram" />
                <button-contact icon size="md" type="whatsapp" :href="manager.whatsapp"  />
                <button-contact icon size="md" type="fb" :href="manager.fb" />
                <button-contact icon size="md" type="vk" :href="manager.vk" />
                <button-contact icon size="md" type="instagram" :href="manager.instagram" />
              </div>
              <div class="contacts-box__email">
                <p>Электронная почта</p>
                <a :href="`mailto:${manager.email}`">{{ manager.email }}</a>
              </div>
            </div>
            <div class="contacts-box__chat">
              <button-contact :style="{
                borderRadius: '100px',
                padding: '0 52px'
              }" size="md" type="chat">Начать чат</button-contact>
            </div>
          </div>
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

  layout: 'basic',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({
    manager: null
	}),

  async fetch() {
    await this.$axios.get('/managers', {
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
$contact-us-bg: url('~assets/i/contact-us-bg.jpg');
$envelop-front: url('~assets/i/envelop-front.svg?data');
$envelop-back: url('~assets/i/envelop-back.svg?data');
$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');
.content_contacts {
  background: $contact-us-bg no-repeat center;
  background-size: cover;
}
.contacts {
  &__title {
    margin: 40px 0;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &-box {
    position: relative;
    margin-top: 28px;
    &:before {
      z-index: 3;
      content: '';
      bottom: -1px;
      left: 0;
      position: absolute;
      display: block;
      width: 100%;
      height: 225px;
      background-size: cover;
      background: $envelop-front no-repeat center;
    }
    &:after {
      z-index: 1;
      content: '';
      bottom: 105px;
      left: 0;
      position: absolute;
      display: block;
      width: 100%;
      height: 240px;
      background-size: cover;
      background: $envelop-back no-repeat center;
    }
    &__wrap {
      z-index: 2;
      position: relative;
      width: 388px;
      height: 430px;
      padding: 32px 34px;
      margin: 0 28px;
      background: #FFFFFF $contact-us-logo no-repeat center 240px;
      box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      clip-path: polygon(342px 0, 100% 45px, 100% 100%, 0% 100%, 0 0);
      &:before {
        content: '';
        top: 0;
        right: 0;
        position: absolute;
        display: block;
        width: 45px;
        height: 45px;
        border-bottom-left-radius: 10px;
        background: #CCCCCC;
      }
    }
    &__title {
      margin-bottom: 24px;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
      text-align: center;
      color: #222222;
    }
    &__buttons {
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__email {
      text-align: center;
      position: relative;
      p {
        font-family: Proxima Nova;
        font-size: 14px;
        line-height: 16px;
        color: #555555;
        margin-bottom: 5px;
      }
      a {
        font-family: 'Proxima Nova Sb';
        font-size: 16px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #008BE2;
      }
    }

    &__chat {
      z-index: 3;
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

</style>