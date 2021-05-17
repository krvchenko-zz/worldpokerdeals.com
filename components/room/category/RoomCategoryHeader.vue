<template>
  <div class="rooms-header">

      <breadcrumb-list v-if="pageable" :white="true" />

      <div class="rooms-header__wrap">
          <div class="rooms-header__about">
            <div class="rooms-meta__wrap">
              <svg-icon class="rooms-header__icon" :icon="category.icon" />
              <h1 class="rooms__title">{{ category.title }}</h1>
              <page-meta
                class="rooms-meta__meta"
                :title="false"
                :author="category.author.full_name"
                :created="category.created_at"
                :updated="category.updated_at"
              >
              </page-meta>
            </div>
            <div class="rooms__summary" v-html="category.summary"></div>

          </div>
          <div class="rooms-header__bonus">
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
      </div>

        <div class="rooms-header__nav">
            <nav-list>
              <nav-item v-for="(item, index) in categories" :key="index"
                :name="item.label"
                :page="item.page"
                :icon="item.icon_small"
              />
            </nav-list>
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
    max-width: 1440px;
    width: 100%;
    @include paddings('desktop');
    margin-bottom: 55px;
    background: $rooms-bg no-repeat center top;
    background-size: auto 420px;
    &__wrap {
      display: grid;
      grid-column-gap: 24px;
      grid-row-gap: 28px;
      grid-template-columns: [first] minmax(0, 3fr) [second] minmax(0, 1fr);
      grid-template-rows: [content] 1fr [nav] auto;
      position: relative;
    }

    &__about {
      grid-column: first;
      grid-row: content;
    }

    &__bonus {
      grid-column: second;
      grid-row: content;
    }

    &__nav {
      grid-column: 1 / -1;
      grid-row: nav;
      max-width: 100%;
      margin-top: -26px;
    }

    &__icon {
      grid-column: icon;
      grid-row: span 2;
      margin-right: 28px;
      display: inline-block;
      vertical-align: top;
    }
  }

  &__title {
    grid-column: title;
    grid-row: 1;
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
      display: grid;
      grid-template-columns: [icon] minmax(0, auto) [title] minmax(0, 1fr);
      grid-template-rows: auto auto;
    }
    &__meta {
      grid-column: 2;
      grid-row: 2;
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

@include mq('laptop') {
  .rooms-header {
    @include paddings('laptop');
    background-size: cover;
    &__wrap {
      grid-template-columns: [first] minmax(0, 7fr) [second] minmax(0, 5fr);
    }
    & &__icon {
      display: none;
    }
  }

  .rooms {
    &__summary {
    margin-bottom: 0;
    }
    &__info {
      width: 100%;
      /* TODO maybe do that for all article */
      .article__wrap {
        padding: 0;
      }
    }
  }
}

@include mq('tablet') {
  .rooms-header {
    @include paddings('tablet');
    &__wrap {
      grid-template-columns: [first] 1fr;
    }
    & &__icon {
      display: inline-block;
      grid-column: icon;
      grid-row: 1;
    }
    &__bonus {
      display: none;
    }
    &__about {
      display: grid;
      grid-template-columns: minmax(0, auto) minmax(0, 1fr);
      grid-template-rows: auto auto;
    }
    &__icon {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .rooms__title {
    font-size: 26px;
    line-height: 32px;
    grid-column: 2;
    grid-row: 1;
  }

  .rooms-meta {
    &__wrap {
      grid-row-gap: 16px;
      align-items: center;
      grid-column: 2;
      grid-row: 1;
    }
    &__meta {
      grid-column: span 2;
      grid-row: 2;
    }
  }

  .rooms__summary {
      grid-column: span 2;
      grid-row: 2;
  }
}

@include mq('mobile') {
  .rooms-header {
    @include paddings('mobile');
  }
  .rooms__summary {
    font-size: 17px;
    padding-bottom: 0;
  }
}
</style>
