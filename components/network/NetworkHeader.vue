<template>
  <div class="network-header">
    <div class="container-fluid">

      <div class="network-header__wrap">
        <div class="row">
          <div class="col-2">
            <div class="network-header__logo">
              <svg-icon class="network__icon" :icon="network.url" :width="136" :height="136" viewBox="0 0 200 200" />
            </div>
          </div>
          <div class="col-7">
            <h1 class="network__title">{{ title }}</h1>
            <page-meta
              :author="author"
              :created="created"
              :updated="updated"
              :dark="true"
            >
            </page-meta>
            <div class="network__summary">{{ summary }}</div>

            <toc-list v-if="toc" :inline="true" :white="false">
              <template v-slot="{ inline, white }">
                <toc-item v-for="(item, index) in toc" :key="index"
                  :index="index"
                  :inline="inline"
                  :white="white"
                  :anchor="item.anchor_id"
                  :text="item.text">
                </toc-item>
              </template>
            </toc-list>
          </div>
          <div class="col-3">
<!--             <promotion-item
              v-if="latest"
              :image="latest.image"
              :title="latest.title"
              :summary="latest.summary"
              :page="latest.page"
              :author="latest.user"
              :created="latest.created_at"
              :category="latest.category"
              :time_left="latest.time_left"
              :time_before="latest.time_before"
              :prize="latest.prize"
              :currency="latest.currency.symbol"
              :exclusive="latest.exclusive"
              :featured="true"
            ></promotion-item> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'NetworkHeader',

  components: {

  },

  props: {
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    created: {
      type: String,
      required: true
    },

    updated: {
      type: String,
      required: true
    },

    summary: {
      type: String,
      required: true
    },

    toc: {
      type: Array
    },

    latest: {
      type: [Object, Boolean],
      default: false
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      // locale: 'lang/locale',
      // country: 'location/country',
      // geo: 'location/code',
      network: 'networks/network',
      pageable: 'pages/page',
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

.network-header {
  margin-bottom: 32px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #CCCCCC 0%, #F1F1F1 100%);
}

.network {

  &-header {
    &__wrap {
      padding: 30px 30px 0 30px;
      position: relative;
    }

    &__logo {
      text-align: right;
    }


    &__meta {

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

  &__icon {
    border-radius: 50%;
  }
}
</style>