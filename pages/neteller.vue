<template>
  <section :class="['content']">

    <div class="neteller">
      <div class="neteller-header">
        <div class="neteller-header__wrap">
          <div class="container-fluid">
            <div class="row">
              <div class="col-10 offset-md-1">
                <h1 class="neteller__title">VIP-статус Neteller</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-8 offset-md-2">
                <div class="neteller__summary">{{ summary }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-3 offset-md-3">
                <payments-button-action
                  type="neteller"
                  label="Регистрация в Neteller"
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

      <div class="neteller-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-10 offset-md-1">
              <div class="neteller-advantages">

                <div class="row">
                  <div class="col-9">
                    <h2 class="neteller-advantages__title">В чем преимущества в получении <br> <span class="neteller-advantages__title-highlight">VIP-статуса от Neteller</span></h2>
                  </div>
                  <div class="col-3">
                    <svg-icon class="neteller__logo" icon="neteller-logo" viewBox="0 0 295 50" />
                  </div>
                </div>

                <div class="neteller-advantages__row">
                  <div class="neteller-advantages__col">
                    <svg-icon :width="50" :height="50" class="neteller-advantages__icon" icon="neteller-comission" />
                    <span class="neteller-advantages__label"><b>Сниженные комиссии</b> на транзакции</span>
                  </div>

                  <div class="neteller-advantages__col">
                    <svg-icon :width="50" :height="50" class="neteller-advantages__icon" icon="neteller-verify" />
                    <span class="neteller-advantages__label"><b>Ускоренная верификация счета</b></span>
                  </div>

                  <div class="neteller-advantages__col">
                    <svg-icon :width="50" :height="50" class="neteller-advantages__icon" icon="neteller-limits" />
                    <span class="neteller-advantages__label"><b>Повышенные лимиты</b></span>
                  </div>

                  <div class="neteller-advantages__col">
                    <svg-icon :width="50" :height="50" class="neteller-advantages__icon" icon="neteller-rakeback" />
                    <span class="neteller-advantages__label"><b>Рейкбек +1,5%</b>в любом покер-руме на 3 месяца</span>
                  </div>
                </div>
              </div>

              <div class="neteller-info">
                <div class="row">
                  <div class="col-6">
                    <div class="neteller-card neteller-card_vip">
                      <h3 class="neteller-card__title neteller-card__title_vip">Neteller <br> <span class="neteller-card__title-highlight">+ Worldpokerdeals</span></h3>
                      <ul class="neteller-card__list">
                        <li class="neteller-card__item neteller-card__item_plus">Верификации счета NETELLER <b>за 24 часа</b></li>
                        <li class="neteller-card__item neteller-card__item_plus"><b>Silver VIP</b> – за депозиты на сумму 6 000$ за квартал</li>
                        <li class="neteller-card__item neteller-card__item_plus"><b>Эксклюзивный статус Bronze Pro VIP</b> (после верификации)</li>
                        <li class="neteller-card__item neteller-card__item_plus">Персональная поддержка по всем вопросам в режиме реального времени</li>
                        <li class="neteller-card__item neteller-card__item_plus">Решение нестандартных задач: ввод/вывод больших сумм, переводы в другие платежные системы и т.д.</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="neteller-card">
                      <h3 class="neteller-card__title">Обычный клиент</h3>
                      <ul class="neteller-card__list">
                        <li class="neteller-card__item neteller-card__item_plus">Верификация счета с срок от 3 дней</li>
                        <li class="neteller-card__item neteller-card__item_plus">Silver VIP – за депозиты на сумму 15 000$ за квартал</li>
                        <li style="min-height: 85px;" class="neteller-card__item neteller-card__item_minus">Нет</li>
                        <li style="min-height: 85px;" class="neteller-card__item neteller-card__item_minus">Нет</li>
                        <li style="min-height: 85px;" class="neteller-card__item neteller-card__item_minus">Нет</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="neteller-footer" class="neteller-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-8 offset-md-2">
              <h2 class="neteller-footer__title">Заполнить заявку на VIP-статус</h2>
              <div class="neteller-footer__info">
                Заполните заявку на подключение к нашей VIP программе для Skrill, и получите лучшие условия обслуживания, а так же быстрый саппорт, в который вы можете обратиться по любому вопросу.
              </div>
            </div>
          </div>
          <payments-form action="/payments/neteller/getvip" type="neteller" />

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
    summary: 'Neteller старейший и один из самых популярных у игроков, кошельков для покера. Регистрируете счет в Neteller с WorldPokerDeals сегодня, чтобы получить VIP обслуживание, льготные условия для получения VIP статусов и множество других приятных бонусов.',

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
    await this.$axios.get('/managers', {
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
      let el = document.querySelector('#neteller-footer')
      if (el) {
        let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset;
        window.scrollTo({top: offset, behavior: 'smooth'});
      }
    }
  }
}
</script>

<style lang="scss">
$neteller-bg: url('~assets/i/neteller-bg.jpg');
$ico-neteller-form: url('~assets/i/ico-neteller-form.svg?data');
$ico-neteller-plus: url('~assets/i/ico-neteller-plus.svg?data');
$ico-neteller-minus: url('~assets/i/ico-neteller-minus.svg?data');

.neteller {

  &-header {
    position: relative;
    min-height: 658px;
    background: $neteller-bg no-repeat center;
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
      background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #84A94C 0%, #4A7B25 100%);
      mix-blend-mode: normal;
      opacity: 0.7;
      box-shadow: 0px 15px 30px rgba(106, 148, 59, 0.3);
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

  &__logo {
    max-width: 100%;
  }

  &-body {
    margin-top: -360px;
    background: linear-gradient(180deg, rgba(236, 235, 235, 0) 0%, #F3F1F1 100%);
  }

  &-advantages {
    margin-bottom: 70px;
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
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      color: #FFFFFF;
    }

    &__icon {
      margin-bottom: 20px;
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
      flex-flow: column;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-card {
    position: relative;
    z-index: 1;
    margin-left: -14px;
    margin-bottom: 60px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: linear-gradient(0deg, #E5E5E5, #E5E5E5), radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
    &_vip {
      z-index: 2;
      margin-right: -14px;
      box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.15);
      background: linear-gradient(0deg, #F8F8F8, #F8F8F8),
                radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
    }
    &__title {
      margin-bottom: 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 28px 40px;
      color: #F8F8F8;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #F8F8F8;
      background: linear-gradient(0deg, #6B6D7C, #6B6D7C),
                  radial-gradient(61.16% 100% at 61.16% 0%, #9D2777 0%, #731A56 61.46%);
      &_vip {
        margin-top: -32px;
        font-family: 'Proxima Nova Th';
        font-size: 32px;
        line-height: 32px;
        background: linear-gradient(0deg, #6C963C, #6C963C), radial-gradient(363.3% 931.9% at 73.15% -35.54%, #3A3E51 0%, #1D1F2C 100%);
      }
      &-highlight {
        display: block;
        font-family: Proxima Nova;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #F8F8F8;
        opacity: 0.8;
      }
    }

    &__list {
      min-height: 208px;
      margin: 0 0 32px 0;
      padding: 0;
    }

    &__item {
      padding: 20px 40px 20px 76px;
      list-style: none;
      font-family: Proxima Nova;
      font-size: 18px;
      line-height: 22px;
      color: #555555;
      border-bottom: 1px solid #D5D5D5;
      &:last-child {
        border-bottom: 0;
      }
      &_plus {
        background: $ico-neteller-plus no-repeat 40px 20px;
      }

      &_minus {
        background: $ico-neteller-minus no-repeat 40px 20px;
      }
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
      background: $ico-neteller-form no-repeat center top;
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