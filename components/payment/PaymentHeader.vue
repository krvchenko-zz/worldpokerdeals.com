<template>
  <div class="payment-header">
    <div class="container-fluid">

      <div class="payment-header__wrap">
        <div class="row">
          <div class="col-2">
            <div class="payment-header__logo">
              <svg-icon :icon="payment.icon" :width="136" :height="136" viewBox="0 0 88 88" />
            </div>
          </div>
          <div class="col-6">
            <h1 class="payment__title">{{ tab.title }}</h1>
            <page-meta
              :author="tab.author.full_name"
              :created="tab.created_at"
              :updated="tab.updated_at"
              :dark="true"
            >
            </page-meta>

            <div v-if="payment.vip_status" class="payment__actions">
              <payment-action-button
                :style="{ flex: '0 0 180px' }"
                label="Открыть счет"
                type="register"
                :url="payment.partner_url"
                :background="payment.btn_color"
              />
              <payment-action-button
                :style="{ flex: '0 0 180px' }"
                label="Чат с менеджером"
                type="default"
                background="#70AC30"
              />
              <payment-action-button
                :style="{ flex: '0 0 180px' }"
                label="VIP-статус"
                type="internal"
                :vip-url="payment.vip_url"
                background="#F5A200"
              />
            </div>

            <div class="payment__summary" v-html="tab.summary"></div>
          </div>
          <div class="col-4">
            <top-room v-if="topList"
              :style="{margin: 0}"
              :id="topList[0].id"
              :title="topList[0].title"
              :slug="topList[0].slug"
              :restricted="topList[0].restricted"
              :country="country"
              :rating="topList[0].rating"
              :bonus="topList[0].bonus"
              :review="topList[0].review"
              :bonus_category_label="topList[0].bonus_category_label"
              :bonus_category="topList[0].bonus_category"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <tab-list>
              <tab-item v-for="(item, index) in payment.tabs" :key="index"
                :params="{
                  parent: 'pokernye-platezhnye-sistemy',
                  child: item.slug
                }"
                :name="item.name">
              </tab-item>
            </tab-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {

  name: 'PaymentHeader',

  components: {
  },

  props: {

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      payment: 'payments/payment',
      pageable: 'pages/page',
      topList: 'rooms/topList',
      country: 'location/country',
      payment: 'payments/payment',
      tab: 'payments/tab'
    }),
  },

  watch: {

  },

	methods: {
    dateFormat(timestamp) {
      let date = new Date(timestamp),
          d = date.getDate(),
          m = date.getMonth() + 1,
          y = date.getFullYear()

      return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
    },
	}
}
</script>

<style lang="scss">

$payment-bg: url('~assets/i/summary-bg.jpg?data');
.payment-header {
  overflow: hidden;
  position: relative;
  margin-bottom: 32px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:before {
    opacity: .5;
    left: 0;
    top: 0;
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: $payment-bg no-repeat center;
    background-size: cover;
  }
}

.payment {

  &-header {
    &__wrap {
      padding: 30px 30px 0 30px;
      position: relative;
    }

    &__logo {
      text-align: right;
    }
  }

  &__title {
    margin-bottom: 16px;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 32px;
    line-height: 36px;
    color: #222222;
  }

  &__summary {
    padding-bottom: 40px;
    font-family: 'Proxima Nova';
    font-size: 17px;
    line-height: 22px;
    color: #222222;
    opacity: 0.8;
  }

  &__actions {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
  }
}
</style>