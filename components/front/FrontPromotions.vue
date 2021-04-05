<template>
<div class="front-promotions">
  <div class="container-fluid">

    <div class="front-promotions__wrap">
      <h2 class="front-promotions__title">Текущие акции</h2>
      <nuxt-link to="/promotions" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <a class="btn btn-sm btn-primary" :href="href" @click="navigate">Все акции</a>
      </nuxt-link>
    </div>

    <div class="row">
      <div class="col-9">
        <text-spoiler
          class="text-spoiler_front"
          :text="text"
          :limit="300"
        />
      </div>

      <div class="col-12">
        <div class="promotion-features">
          <div class="promotion-features__item" v-for="(item, index) in features" :key="index">
            <svg-icon :icon="item.icon" />
            <div class="promotion-features__wrap">
              <div class="promotion-features__value">{{ item.value }}</div>
              <div class="promotion-features__label">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <filter-tab-list>
      <filter-tab-item
        label="Все"
        :value="null"
        :active="category_id === null"
        @click="handleFilter"
      />
      <filter-tab-item v-for="item in categories" :key="item.id"
        :label="item.title"
        :value="item.id"
        :active="item.id === category_id"
        @click="handleFilter"
      />
    </filter-tab-list>

    <div class="front-promotions__list">
      <div class="row">
        <div class="col-3" v-for="(item, index) in items" :key="index">
          <promotion-item
            :image="item.image"
            :title="item.title"
            :summary="item.summary"
            :page="item.page"
            :author="item.author"
            :created="item.created_at"
            :category="item.category"
            :time_left="item.time_left"
            :time_before="item.time_before"
            :regularity="item.regularity"
            :prize="item.prize"
            :currency="item.currency ? item.currency.symbol : ''"
            :exclusive="item.exclusive"
          ></promotion-item>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'FrontPromotions',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({
    features: [{
      value: '67',
      label: 'Румов трекаем',
      icon: 'promotions-front-rooms'
    },{
      value: '27',
      label: 'Активных акций',
      icon: 'promotions-front-active'
    },{
      value: '$24,300,200',
      label: 'Разыгрывается сейчас',
      icon: 'promotions-front-prize'
    },{
      value: '187',
      label: 'Бонусов в покер-румах',
      icon: 'promotions-front-bonuses'
    }],
    category_id: null,
    text: '<b>Интному интерок умериме ненитель</b>. их элемы нение ствия рабсоль которче неримени <b>продактивам та файлойна добна</b> докумет еницы. Ши примените и венять <b>ругиейсу интные вое будосло</b> строгот орчень оглавледмете эффекты на дохногл авлегда дейстровки позмощный вышает публицы. Игу, вывать вышаетн оструемые руктиро'
	}),

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      geo: 'location/code',
      items: 'front/promotions',
      categories: 'front/promotion_categories'
    }),
  },

  watch: {

  },

  methods: {
    async handleFilter($event) {
      $nuxt.$loading.start()
      this.category_id = $event

      await axios.get('/front/promotions', {
        params: {
          geo: this.country.code,
          locale: this.locale,
          promotion_category_id: this.category_id
        }
      }).then(response => {
        this.$store.commit('front/FETCH_PROMOTIONS', { promotions: response.data })
        $nuxt.$loading.finish()
      })
      .catch(e => {
        $nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style lang="scss">
.front-promotions {
  &__wrap {
    padding: 28px 0 20px 0;
    display: flex;
    justify-content: space-between;
  }
  &__title {
    margin: 0;
    font-family: 'Proxima Nova Th';
    font-size: 28px;
    line-height: 32px;
    letter-spacing: -0.3px;
    color: #222222;
  }
}

.promotion-features {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  &__item {
    margin-right: 28px;
    padding: 16px 24px;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%), #FAFAFA;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
  }
  &__wrap {
    margin-left: 24px;
  }
  &__value {
    margin: 5px 0 2px 0;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 30px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #555555;
  }
  &__label {
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 20px;
    color: #777777;
  }
}
</style>