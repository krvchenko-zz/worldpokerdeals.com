<template>
  <div class="rooms-header">
    <div class="container-fluid">
      
      <breadcrumb-list v-if="pageable" :white="true" />

      <div class="rooms-header__wrap">
        <div class="row">
          <div class="col-8">
            <i class="rooms-header__icon"></i>
            <div class="rooms-meta__wrap">
              <h1 class="rooms__title">{{ category.title }}</h1>
              <page-meta
                :title="false"
                :author="category.author.full_name"
                :created="category.created_at"
                :updated="category.updated_at"
              >
              </page-meta>
            </div>
            <div class="rooms__summary" v-html="category.summary"></div>

          </div>
          <div class="col-4">
            <top-room v-if="best"
              :id="best.id"
              :title="best.title"
              :slug="best.slug"
              :restricted="best.restricted"
              :country="country"
              :rating="best.rating"
              :bonus="best.bonus"
              :review="best.review"
              :bonus_category_label="best.bonus_category_label"
              :bonus_category="best.bonus_category"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- Navigation -->
      <div class="row">
        <div class="col-12">
          <nav-list>
            <nav-item v-for="(item, index) in categories" :key="index" 
              :name="item.label"
              :page="item.page"
              :icon="item.icon_small"
            />
          </nav-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

import TopRoom from '~/components/cards/TopRoom'


export default {

  components: {
    TopRoom
  },

  props: {

  },

	mounted() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      pageable: 'pages/page',
      topList: 'rooms/topList',
      country: 'location/country',
      category: 'rooms/category',
      categories: 'rooms/categories',
      best: 'rooms/best',
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
$ico-category: url('~assets/i/ico-room-category.svg?data');
$bg: url('~assets/i/rooms/bg.jpg?data');

.rooms {
  &-header {
    margin-bottom: 55px;
    // background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #3A3E51 0%, #1D1F2C 100%);
    background: $bg no-repeat center;
    background-size: cover;
    &__wrap {
      padding: 0 60px;
      position: relative;
    }

    &__icon {
      margin-right: 28px;
      width: 68px;
      height: 68px;
      display: inline-block;
      vertical-align: top;
      background: $ico-category no-repeat center;
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

  //  Meta
  &-meta {
    display: flex;
    &__wrap {
      display: inline-block;
    }

  }

  &__summary {
    padding-bottom: 40px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
    opacity: 0.8;
  }
}
</style>