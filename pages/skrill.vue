<template>
  <section :class="['content']">

    <div class="skrill">
      <div class="skrill-header">
        <div class="skrill-header__wrap">
          <div class="container-fluid">
            <div class="row">
              <div class="col-10 offset-md-1">
                <h1 class="skrill__title">VIP-статус Skrill</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-8 offset-md-2">
                <div class="skrill__summary">{{ summary }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-3 offset-md-3">
                <payments-button-action
                  type="skrill"
                  label="Регистрация в Skrill"
                  url="https://ntupgrade.vip/wpdeals"
                />
              </div>
              <div class="col-3">
                <payments-button-action
                  :external="false"
                  type="default"
                  label="Получить VIP"
                  @click="handleJoinClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="skrill-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-10 offset-md-1">
              <div class="skrill-advantages">

                <div class="row">
                  <div class="col-9">
                    <h2 class="skrill-advantages__title">В чем преимущества в получении <br> <span class="skrill-advantages__title-highlight">VIP-статуса от Skrill</span></h2>
                  </div>
                  <div class="col-3">
                    <svg-icon class="skrill__logo" icon="skrill-logo" />
                  </div>
                </div>

                <div class="skrill-advantages__row">
                  <div class="skrill-advantages__col">
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-advantages" />
                    <span class="skrill-advantages__label"><b>Льготные преимущества</b> использования Skrill</span>
                  </div>
                  <div class="skrill-advantages__col">
                    
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-support" />
                    <span class="skrill-advantages__label"><b>Поддержка на русском языке</b> по email, Skype, Telegram и в соцсетях</span>
                  </div>
                  <div class="skrill-advantages__col">
                    
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-verify" />
                    <span class="skrill-advantages__label"><b>Верификация</b> за 24 часа</span>
                  </div>
                </div>

                <div class="skrill-advantages__row">
                  <div class="skrill-advantages__col">
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-rakeback" />
                    <span class="skrill-advantages__label"><b>1,5% рейкбэка</b> в любом покер-руме на 3 месяца</span>
                  </div>
                  <div class="skrill-advantages__col">
                    
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-limits" />
                    <span class="skrill-advantages__label"><b>Увеличение лимитов</b></span>
                  </div>
                  <div class="skrill-advantages__col">
                    
                    <svg-icon :width="50" :height="50" class="skrill-advantages__icon" icon="skrill-arbitrage" />
                    <span class="skrill-advantages__label">Помощь в решении спорных вопросов за 24 часа</span>
                  </div>
                </div>

              </div>

              <div class="skrill-info">
                <div class="row">
                  <div class="col-6">
                    <div class="skrill-card">
                      <h3 class="skrill-card__title skrill-card__title_new">Хочу открыть счёт. Что получу?</h3>
                      <div class="skrill-card__info">Если вы еще не зарегистрировались в Skrill, то регистрируйтесь с нами и получайте эксклюзивные бонусы</div>
                      <ul class="skrill-card__list">
                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-cards" />
                          <span class="skrill-card__item"><b>Две карты Skrill Prepaid MasterCard</b> бесплатно (для VIP Silver +)</span>
                        </li>

                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-comission" />
                          <span class="skrill-card__item"><b>0% комиссия</b> за переводы клиентов внутри системы и вывод на банковский счет</span>
                        </li>

                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-tech-support" />
                          <span class="skrill-card__item"><b>Техподдержка</b> на русском языке</span>
                        </li>
                      </ul>

                      <div class="skrill-card__footer">
                        <div class="skrill-card__details">
                          <p><span>* </span> Актуально только для пользователей из стран SEPA</p>
                          <p><span>** </span> Вывод на VISA 7,5% для всех статусов</p>
                        </div>
                        <payments-button-action
                          flat
                          type="skrill"
                          label="Регистрация в Skrill"
                          url="https://ntupgrade.vip/wpdeals"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="skrill-card">
                      <h3 class="skrill-card__title">Уже есть счёт. Чем порадуете?</h3>
                      <div class="skrill-card__info">Если у вас уже есть аккаунт в Skrill, то просто присоединяйтесь к нашей программе лояльности и получайте бонусы и условия, которые мы предоставляем</div>
                      <ul class="skrill-card__list">
                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-silver-vip" />
                          <span class="skrill-card__item"><b>Silver VIP – от 5 000 евро</b> депозитов за квартал</span>
                        </li>

                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-increased-limits" />
                          <span class="skrill-card__item"><b>Повышенные лимиты</b></span>
                        </li>

                        <li class="skrill-card__list-item">
                          <svg-icon :width="50" :height="50" class="skrill-card__icon" icon="skrill-vip-tech-support" />
                          <span class="skrill-card__item"><b>Техподдержка</b> на русском языке</span>
                        </li>
                      </ul>

                      <div class="skrill-card__footer">
                        <payments-button-action
                          :style="{
                            background: '#FF4151'
                          }"
                          flat
                          :external="false"
                          type="default"
                          label="Присоедениться"
                          @click="handleJoinClick"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="skrill-footer" class="skrill-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-8 offset-md-2">
              <h2 class="skrill-footer__title">Заполнить заявку на VIP-статус</h2>
              <div class="skrill-footer__info">
                Заполните заявку на подключение к нашей VIP программе для Skrill, и получите лучшие условия обслуживания, а так же быстрый саппорт, в который вы можете обратиться по любому вопросу.
              </div>
            </div>
          </div>
          <payments-form action="/payments/skrill/getvip" type="skrill" />

          <div class="row">
            <div class="col-8 offset-md-2">
              <manager
                v-if="manager"
                :style="{margin: 0}"
                :pattern="true"
                :status="false"
                :image="manager.image"
                :name="manager.name"
                :position="manager.position"
                :telegram="manager.telegram"
                :skype="manager.skype"
                :whatsapp="manager.whatsapp"
                :email="manager.email"
                label="Остались вопросы? Напишите нам"
                description="Напиши в любом из мессенджеров нашему менеджеру для получения VIP-статуса Skrill"
              />
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

import Manager from '~/components/cards/Manager'

export default {
  layout: 'basic',

  metaInfo: {

  },

  components: {
    Manager
  },

	data: () => ({
    summary: 'Skrill является одним из самых популярных кошельков для игроков в покер. Он удобный и безопасный. А если вы зарегистрируете Skrill с нами, то сможете получить VIP обслуживание, быстрый саппорт и много других полезных функций!',

    manager: null
	}),

  computed: {
		...mapGetters({
		  locale: 'lang/locale',
		  country: 'location/country',
		  geo: 'location/code',
		  page: 'pages/page',
      topList: 'rooms/topList'
		}),
  },

  async fetch() {
    await axios.get('/managers', {
      params: {
        id: 27
      }
    }).then(response => {
      this.manager = {
        image: response.data.image ? {
          filename: response.data.image.filename
        }: null,
        name: response.data.name,
        position: response.data.position,
        telegram: response.data.telegram,
        skype: response.data.skype,
        whatsapp: response.data.whatsapp,
        email: response.data.email,
      }
    })
  },

  mounted () {

  },

  watch: {

  },

  methods: {
    handleJoinClick() {
      let el = document.querySelector('#skrill-footer')
      if (el) {
        let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset;
        window.scrollTo({top: offset, behavior: 'smooth'});
      }
    }
  }
}
</script>

<style lang="scss">
$skrill-bg: url('~assets/i/skrill-bg.jpg');
$ico-skrill-form: url('~assets/i/ico-skrill-form.svg?data');
.skrill {

  &-header {
    position: relative;
    min-height: 658px;
    background: $skrill-bg no-repeat center;
    background-size: cover;
    clip-path: polygon(0 0, 100% 0%, 100% calc(450/658 * 100%), 0 98%);
    &:before {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      background: radial-gradient(100% 100% at 100% 0%, #9D2777 0%, #731A56 61.46%);
      opacity: 0.7;
      box-shadow: 0px 15px 30px rgba(115, 27, 86, 0.3);
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    &__wrap {
      z-index: 1;
      position: relative;
    }
  }

  &__title {
    margin-top: 24px;
    margin-bottom: 20px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 44px;
    text-align: center;
    color: #FFFFFF;
  }

  &__summary {
    margin-bottom: 40px;
    font-family: Proxima Nova;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
  }

  &-body {
    margin-top: -360px;
    background: linear-gradient(180deg, rgba(236, 235, 235, 0) 0%, #F3F1F1 100%);
  }

  &-advantages {
    margin-bottom: 40px;
    padding: 40px 40px 44px 40px;
    background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3A3E51 0%, #1D1F2C 100%);
    border-radius: 10px;

    &__title {
      margin-bottom: 44px;
      font-family: 'Proxima Nova Sb';
      font-style: normal;
      font-size: 32px;
      line-height: 36px;
      color: #FFFFFF;
      &-highlight {
        font-family: 'Proxima Nova Th';
        color: #F6A519;
      }
    }

    &__label {
      padding-top: 15px;
      padding-left: 20px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      color: #FFFFFF;
    }

    &__icon {
      flex: 0 0 50px;
    }

    &__row {
      display: flex;
    }

    &__col {
      margin-bottom: 28px;
      margin-right: 28px;
      display: flex;
      width: calc(100% / 3);
      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-card {
    margin-bottom: 60px;
    padding: 40px 60px 40px 60px;
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
    opacity: 0.99;
    box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &__title {
      font-family: 'Proxima Nova Th';
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 20px;
      color: #FF4151;
      &_new {
        color: #B4338A;
      }
    }

    &__info {
      min-height: 96px;
      margin-bottom: 40px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      color: #000000;
    }

    &__list {
      min-height: 208px;
      margin: 0 0 32px 0;
      padding: 0;
      &-item {
        list-style: none;
        margin-bottom: 20px;
        font-family: Proxima Nova;
        font-style: normal;
        font-size: 18px;
        line-height: 22px;
        color: #3D3D3D;
        display: flex;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__icon {
      flex: 0 0 50px;
    }

    &__item {
      padding-top: 15px;
      padding-left: 20px;
    }

    &__details {
      margin-bottom: 28px;
      p {
        margin-bottom: 12px;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        color: #999999;
        span {
          font-size: 22px;
          font-weight: bold;
          vertical-align: middle;
          height: 18px;
          display: inline-block;
        }
        &:last-child {
          margin: 0;
        }
      }
    }

    &__footer {
      min-height: 128px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }
  }

  &-footer {
    &__title {
      padding-top: 112px;
      margin-top: 44px;
      margin-bottom: 20px;
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 32px;
      line-height: 36px;
      text-align: center;
      color: #222222;
      background: $ico-skrill-form no-repeat center top;
    }

    &__info {
      margin-bottom: 32px;
      font-family: Proxima Nova;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #555555;
    }
  }
}

.ptn-payments-form {
  padding: 10px 45px;
}
</style>