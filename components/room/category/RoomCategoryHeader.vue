<template>
  <div class="rooms-header">
    <div class="container-fluid">
      
      <breadcrumb-list v-if="pageable" :white="true" />

      <div class="rooms-header__wrap">
        <div class="row">
          <div class="col-8">
            <svg-icon class="rooms-header__icon" :icon="category.icon" />
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
            <room-top v-if="best"
              :id="best.id"
              :title="best.title"
              :slug="best.slug"
              :restricted="best.restricted"
              :country="country"
              :rating="best.rating"
              :bonus="best.bonus"
              :review="best.review"
            />
          </div>
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  components: {

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

	}
}
</script>

<style lang="scss">
$rooms-bg: url('~assets/i/rooms-bg.jpg');
.rooms {
  &-header {
    margin-bottom: 55px;
    background: $rooms-bg no-repeat center top;
    background-size: auto 420px;
    &__wrap {
      padding: 0 60px;
      position: relative;
    }

    &__icon {
      margin-right: 28px;
      display: inline-block;
      vertical-align: top;
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