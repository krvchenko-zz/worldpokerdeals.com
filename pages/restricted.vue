<template>
<section class="content content_restricted">
  <div class="container-fluid">
  	<div class="restricted">
      <div class="row">

        <div class="col-2">
          <img decoding="async" loading="lazy" class="restricted__logo" src="~assets/i/restricted-logo.png" alt="Доступ в рум запрещён в вашем регионе по решению Роскомнадзора">
        </div>

        <div class="col-5">
          <h1 class="restricted__title">Доступ в рум запрещён в вашем регионе по решению Роскомнадзора</h1>
          <div class="restricted__ip">
            <svg-icon :width="20" :height="20" :icon="country.code" prefix="flags/" />
            <span>{{ country.remote_addr }}</span>
          </div>
          <div class="restricted__info">
            <p>Вам ограничен доступ к данной странице, потому как указанный выше IP находится на территории Российской Федерации.</p>
            <p>Согласно федеральному закону «О лотереях» от 07.03.2018 и федеральному закону «О государственном регулировании деятельности по организации и проведению азартных игр и о внесении изменений в некоторые законодательные акты Российской Федерации» от 27.11.2017 N 358-ФЗ интернет-провайдеры должны блокировать доступ в онлайн покер-румы на территории РФ.</p>
            <p><b>Запрашиваемый покер-рум недоступен для просмотра и скачивания в России.</b></p>
          </div>
          <!-- <contacts-form /> -->
        </div>
        <div class="col-4">
          <div v-if="manager" class="restricted-box">
            <div class="restricted-box__wrap">

              <div class="restricted-box__header">
                <div class="restricted-box__icon">
                  <svg-icon icon="get-access" />
                </div>
                <h2 class="restricted-box__title">Нужен доступ?</h2>
                <div class="restricted-box__info">Есть решение – оставь свою электронную почту и получи доступ к руму через 1 минуту</div>
              </div>

              <div class="restricted-box__body">
                <restricted-form />
                <div class="restricted-box__messengers">Или свяжитесь с нашим менеджером прямо сейчас в чате или мессенджерах</div>
                <div class="restricted-box__buttons">
                  <button-contact style="padding: 0 32px;" size="md" type="chat">Начать чат</button-contact>
                  <button-contact icon size="md" type="telegram" :href="manager.telegram" />
                  <button-contact icon size="md" type="skype" :href="manager.skype" />
                  <button-contact icon size="md" type="whatsapp" :href="manager.whatsapp"  />
                  <button-contact icon size="md" type="fb" :href="manager.fb" />
                </div>                
              </div>

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
    manager: null,
    remote_addr: '114.34.89.92',
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
    async submit () {
      this.form.post('/contacts').then((response) => {
        this.$emit('submit')
        this.form.reset()
      })
      .catch(e => {
      })
    }
  }
}
</script>

<style lang="scss">
$restricted-bg: url('~assets/i/restricted-bg.svg?data');
$envelop-front: url('~assets/i/envelop-front.svg?data');
$envelop-back: url('~assets/i/envelop-back.svg?data');
$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');

.content_restricted {
  padding-top: 56px;
  position: relative;
  background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3A3E51 0%, #1D1F2C 100%);
}

.restricted {
  position: relative;
  background: $restricted-bg no-repeat left 12px;
  &__title {
    margin: 34px 0 28px 0;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &__logo {
    float: right;
    max-width: 100%;
    height: auto;
    display: block;
  }

  &__info {
    font-family: Proxima Nova;
    font-size: 17px;
    line-height: 21px;
    color: #CCCCCC;
    p {
      margin-bottom: 16px;
    }
    b {
      font-family: 'Proxima Nova Sb';
    }
  }

  &__ip {
    margin-bottom: 20px;
    padding: 8px 12px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 20px;
    color: #FAFAFA;
    display: inline-flex;
    align-items: center;
    background: #1F222E;
    border-radius: 50px;
    span {
      padding-left: 12px;
    }
  }

  &-box {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
    &__header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 28px;
      background: radial-gradient(81.5% 101.54% at 50.15% 20.26%, #267DBD 0%, #008BE2 100%), #2E87C8;
    }
    &__body {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 28px;
      background: #FAFAFA;
    }
    &__title {
      margin-bottom: 12px;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      letter-spacing: -0.2px;
      color: #FFFFFF;
    }
    &__icon {
      margin-top: -54px;
      margin-bottom: 24px;
      text-align: center;
    }
    &__info {
      font-family: 'Proxima Nova Sb';
      font-style: normal;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #FFFFFF;
    }
    &__messengers {
      margin-bottom: 16px;
      font-family: Proxima Nova;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #555555;
    }
    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.btn-contact_fb {
  &:before {
    background-size: 13px auto;
  }
}
.btn-contact_vk {
  &:before {
    background-size: 28px auto;
  }
}
.btn-contact_instagram {
  &:before {
    background-size: 30px auto;
  }
}

</style>