<template>
<div class="front-promotions">
    <div class="front-promotions__wrap">
      <h2 class="front-promotions__title">Текущие акции</h2>
      <nuxt-link to="/promotions" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <a class="btn btn-sm btn-primary front-promotiones__button" :href="href" @click="navigate">Все акции</a>
      </nuxt-link>
    </div>

    <div class="front-promotions__details-wrapper">
        <text-spoiler
          class="text-spoiler_front front-promotions__details"
          :text="text"
          :limit="300"
        />

        <div class="promotion-features front-promotions__features">
          <div class="promotion-features__item" v-for="(item, index) in features" :key="index">
            <svg-icon :icon="item.icon" />
            <div class="promotion-features__wrap">
              <div class="promotion-features__value">{{ item.value }}</div>
              <div class="promotion-features__label">{{ item.label }}</div>
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
        <div class="front-promotions__item" v-for="(item, index) in items" :key="index">
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
  width: 100%;
  max-width: 1440px;
  padding: 0 26px;
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
    white-space: nowrap;
  }
  &__button {
    white-space: nowrap;
  }
  &__details-wrapper {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto auto;
  }
  &__details {
    grid-column: 1;
    grid-row: 1;
  }
  &__features {
    grid-column: span 2;
    grid-row: 2;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 28px;
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

@include mq('laptop') {
  .front-promotions {
    @include paddings('laptop');
    & &__details {
      margin-bottom: 0;
    }
    &__features {
      overflow-x: scroll;
      scrollbar-width: none;
      white-space: nowrap;
      padding-bottom: 32px;
      padding-top: 20px;
      margin-bottom: 0;
      @include paddings('laptop');
      margin-right: -24px;
      margin-left: -24px;
    }
    &__list {
      grid-template-columns: repeat(auto-fill, minmax(227px, 1fr));
      grid-template-rows: 1fr;
      overflow-x: scroll;
      scrollbar-width: none;
    }
    &__item {
       grid-row: 1;
    }
  }
}

@include mq('mobile') {
  .front-promotions {
     padding: 0;
     @include paddings('mobile');
     &__details-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
     }
     &__details {
      margin-bottom: 0;
     }
     &__list {
       grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
     }
     &__item {
       width: 284px;
     }
  }

  .promotion-features {
    padding-top: 20px;
    margin-bottom: 0;
    &__label {
      white-space: nowrap;
    }
    &__item {
      align-items: center;
      height: 80px;
    }
  }
}
</style>
