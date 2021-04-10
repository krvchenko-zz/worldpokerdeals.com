<template>
  <div class="promotions-header">
    <div class="container-fluid">
      
      <breadcrumb-list v-if="pageable" :white="true" />

      <div class="promotions-header__wrap">
        <div class="row">
          <div class="col-8">

            <svg-icon v-if="category.entity === 'promotion'" class="promotions-header__icon" icon="promotion-category"/>

            <svg-icon v-else class="promotions-header__icon" icon="bonus-category"/>

            <div class="promotions-header__meta">
              <h1 class="promotions__title">{{ category.title }}</h1>
              <page-meta
                :author="category.author ? category.author.full_name : null"
                :created="category.created_at"
                :updated="category.updated_at"
              />
            </div>

            <div class="promotions__summary" v-html="category.summary"></div>

          </div>
          <div class="col-4">
            <promotion-item
              v-if="best && category.entity === 'promotion'"
              :image="best.image"
              :title="best.title"
              :summary="best.summary"
              :page="best.page"
              :author="best.author"
              :created="best.created_at"
              :category="best.category"
              :time_left="best.time_left"
              :time_before="best.time_before"
              :regularity="best.regularity"
              :prize="best.prize"
              :currency="best.currency ? best.currency.symbol : ''"
              :exclusive="best.exclusive"
              :active="best.active"
              :featured="true"
            />

            <room-top
              v-if="best && category.entity === 'bonus'"
              :id="best.room.id"
              :title="best.room.title"
              :slug="best.room.slug"
              :restricted="best.room.restricted"
              :country="country"
              :rating="best.room.rating"
              :bonus="best"
              :review="best.room.review"
            />
          </div>
          <div class="col-12">
            <nav-list>
              <nav-item v-for="(item, index) in categories" :key="index" 
                :name="item.label"
                :page="item.page"
                :icon="item.icon"
              />
            </nav-list>
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

  name: 'PromotionCategoryHeader',

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
      locale: 'lang/locale',
      country: 'location/country',
      category: 'promotions/category',
      pageable: 'pages/page',
      categories: 'promotions/categories',
      best: 'promotions/best'
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">

$promotions-bg: url('~assets/i/promotions-bg.jpg');

.promotions-header {
  margin-bottom: 55px;
  background: $promotions-bg no-repeat center top;
  background-size: auto 420px;
}

.promotions {

  &-header {
    &__wrap {
      padding: 0 60px;
      position: relative;
    }
    &__meta {
      display: inline-flex;
      flex-flow: column;
      flex-grow: 1;
    }

    &__icon {
      margin-right: 28px;
      display: inline-flex;
    }
  }

  &__title {
    margin-bottom: 10px;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-style: normal;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &__summary {
    padding-bottom: 40px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    color: #FFFFFF;
    opacity: 0.8;
  }
}
</style>