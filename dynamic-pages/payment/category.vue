<template>
  <div class="payments">
    <div class="payments-header">
      <div class="container-fluid">
        <breadcrumb-list :white="true"/>
        <h1 class="payments__title">{{ category.title }}</h1>
        <div class="payments__summary" v-html="category.summary"></div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3" v-for="(item, index) in payments" :key="index">
          <payment-item
            :title="item.title"
            :icon="item.icon"
            :rooms="item.rooms"
            :vip="item.vip_status"
            :page="item.page"
          >
          </payment-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'PaymentCategory',

  head () {
    return { 
      title: this.category.meta_title,
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: this.category.meta_description },
        { name: 'keywords', content: this.category.meta_keywords }
      ],
    }
  },

  components: {
  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'payments/category',
      payments: 'payments/payments'
    }),

  },

  data: () => ({
    loading: false,
  }),

  async fetch() {
    await axios.get(`payments/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('payments/FETCH_CATEGORY', { category: response.data })
    })

    await axios.get('payments/list').then((response) => {
      this.$store.commit('payments/FETCH_PAYMENTS', { payments: response.data.map(item => ({
        title: item.title,
        icon: item.icon,
        vip_status: item.vip_status,
        rooms: item.rooms_count,
        page: item.page,
      })) })
    })
  },

  mounted() {
    
  },

  created () {

  },

  watch: {

  },

  methods: {
  }
}
</script>

<style lang="scss">

$payments-bg: url('~assets/i/payments-bg.jpg');
.payments {
  &-header {
    margin-bottom: 32px;
    padding: 0 0 32px 0;
    background: $payments-bg no-repeat center;
  }
  &__title {
    text-align: center;
    margin: 8px 0 16px 0;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }
  &__summary {
    font-family: Proxima Nova;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
    opacity: 0.8;
  }
}
</style>