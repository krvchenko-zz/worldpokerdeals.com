<template>
<div class="front-promotions">
  <div class="container-fluid">

    <div class="front-promotions__wrap">
      <h2 class="front-promotions__title">Текущие акции</h2>
      <nuxt-link to="/rakeback-deals" v-slot="{ href, route, navigate, isActive, isExactActive }">
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
    </div>

    <front-tabs>
      <front-tabs-item
        label="Все"
        :value="null"
        :active="category_id === null"
        @click="handleFilter"
      />
      <front-tabs-item v-for="item in categories" :key="item.id"
        :label="item.title"
        :value="item.id"
        :active="item.id === category_id"
        @click="handleFilter"
      />
    </front-tabs>

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
</style>