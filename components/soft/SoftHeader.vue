<template>
  <div class="soft-header">
    <div class="container-fluid">

      <div class="soft-header__wrap">
        <div class="row">
          <div class="col-2">
            <div class="soft-header__logo">
              <img :class="['soft-item__img']" decoding="async" loading="lazy" :src="img" :alt="soft.image.alt || `${soft.title} logo`">
            </div>
          </div>
          <div class="col-7">
            <div v-if="soft.category" class="soft-category">{{ soft.category.title }}</div>
            <h1 class="soft__title">{{ tab.title }}</h1>
            <page-meta
              :author="tab.author ? tab.author.full_name : ''"
              :created="tab.created_at"
              :updated="tab.updated_at"
              :dark="true"
            >
            </page-meta>

            <div class="soft-actions">

              <soft-action-button
                v-if="soft.url"
                label="Скачать"
                type="download"
                :slug="soft.slug"
                :icon="true"
              />
              <div class="soft-price">
                <span class="soft-price__label">Стоимость</span>
                <span class="soft-price__value">
                  <template v-if="soft.currency">{{ soft.currency.symbol }}</template>{{ soft.price }}
                </span>
              </div>
            </div>

            <div class="soft__summary" v-html="tab.summary"></div>
          </div>
          <div class="col-3">

            <div v-if="soft.images.length" class="soft-screenshots">
              <carousel
                :navigationEnabled="false"
                :perPageCustom="[[0, 1]]"
                :paginationPadding="5"
                :paginationSize="8"
                paginationColor="#ffffff"
                paginationActiveColor="#CCCCCC">
                <slide v-for="(item, index) in soft.images" :key="index">
                  <a :href="`${mediaUrl}/gallery-large/${item.filename}`" class="soft-screenshots__item lightbox">
                    <img class="soft-screenshots__img" :src="`${mediaUrl}/room-screenshot-medium/${item.filename}`" :alt="item.alt">
                  </a>
                </slide>
              </carousel>
            </div>
          </div>
        </div>

        <div v-if="soft.tabs.length && soft.tabs.length > 1" class="row">
          <div class="col-12">
            <tab-list>
              <tab-item v-for="(item, index) in tabs" :key="index"
                :params="{
                  parent: 'soft',
                  child: item.url
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

  name: 'SoftHeader',

  components: {

  },

  props: {

  },

	created() {

	},

  mounted() {

  },

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      pageable: 'pages/page',
      soft: 'soft/soft',
      tab: 'soft/tab'
    }),

    img() {
      return `${this.mediaUrl}/soft-card/${this.soft.image.filename}`
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
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
$soft-bg: url('~assets/i/summary-bg.jpg?data');

.soft-header {
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
    background: $soft-bg no-repeat center;
    background-size: cover;
  }
}

.soft {
  &-header {
    &__wrap {
      padding: 30px 15px 0 15px;
      position: relative;
    }

    &__logo {
      text-align: right;
    }
  }

  &-actions {
    margin-bottom: 32px;
    font-size: 0;
  }
  &-category {
    margin-bottom: 8px;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #555555;
  }
  &-price {
    display: inline-block;
    vertical-align: top;
    margin-left: 28px;
    &__label {
      display: block;
      margin-bottom: 2px;
      font-family: Proxima Nova;
      font-size: 14px;
      line-height: 14px;
      color: #222222;
      opacity: 0.8;
    }
    &__value {
      display: block;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 22px;
      line-height: 24px;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #FF5E38;
    }
  }
  &-screenshots {
    &__img {
      width: 100%;
      height: auto;
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
}
</style>