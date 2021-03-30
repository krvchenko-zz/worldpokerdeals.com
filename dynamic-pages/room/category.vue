<template>
	<div class="rooms">

    <!-- Header -->
    <room-category-header />

    <div class="container-fluid">
      <div class="row">
        <div class="col-9">
          <div class="rooms-top">
            <div v-if="rooms" class="rooms-top__info">Отфильтровано {{ total }} из {{ overall }} покер-румов</div>
            <div v-if="rooms" class="rooms-top__geo">

              <div class="rooms-top__geo-label">Предложения для</div>

              <el-select
                class="el-select-geo"
                v-model="geo"
                filterable
                reserve-keyword
                popper-class="el-poper-geo"
                :loading="loading"
                @focus="fetchCountries"
                @change="fetchItems"
              >
                <template slot="prefix">
                  <svg-icon :width="24" height="24" prefix="flags/" :icon="geo"/>
                </template>
                <el-option
                  v-for="item in countries"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left; margin-right: 12px;">
                    <svg-icon :width="24" height="24" prefix="flags/" :icon="item.value"/>
                  </span>
                  <span>{{ item.label }}</span>
                </el-option>
              </el-select>

            </div>

            <div v-if="rooms" class="rooms-top__sort">
              <el-select
                v-model="sort"
                class="el-select-sort"
                placeholder="Select"
                @change="fetchItems"
                popper-class="el-poper-sort"
              >
                <template slot="prefix">
                  <svg-icon :width="19" :height="16" icon="filter-sort-desc"/>
                </template>
                <el-option
                  label="Сначала лучшие"
                  value="rating">
                </el-option>
                <el-option
                  label="Сначала новые"
                  value="created_at">
                </el-option>
              </el-select>
            </div>
          </div>

          <div v-if="selected.length">
            <filter-selected v-for="(item, index) in selected" :key="index"
              :label="item.label"
              :value="item.value"
              :item-key="item.key"
            />
            <filter-selected
              label="Очистить фильтры"
              :clear="true"
              :value="null"
              :key="null"
            />
          </div>

          <div class="rooms-list">
            <room v-if="rooms"
              v-for="(item, index) in rooms" :key="index"
              :id="item.id"
              :title="item.title"
              :slug="item.slug"
              :rating="item.rating"
              :rakeback="item.rakeback"
              :bonus="item.bonus"
              :background="item.background"
              :restricted="item.restricted"
              :available="item.available"
              :blacklist="item.blacklist"
              :summary="item.summary"
              :claim_amount="item.claim_amount"
              :claim_currency="item.claim_currency"
              :image="item.image"
              :network="item.network"
              :tags="item.tags"
              :review="item.review"
            />

            <pagination
              v-if="rooms.length && next_page_url"
              :last="last_page"
              :current="page"
              :prevUrl="prev_page_url"
              :nextUrl="next_page_url"
              :total="total"
              :from="from"
              :to="to"
              @next="handlePageNext"
              @prev="handlePagePrev"
              @change="handlePageChange"
              @more="handleShowMore">
            </pagination>
          </div>

          <div class="row">
            <!-- Toc -->
            <div class="col-auto">

              <toc-list v-if="category.toc">
                <template v-slot="{ inline }">
                  <toc-item v-for="(item, index) in category.toc" :key="index"
                    :index="index"
                    :inline="inline"
                    :anchor="item.anchor_id"
                    :text="item.text">
                  </toc-item>
                </template>
              </toc-list>

            </div>
            <div class="col">
              <!-- Article -->
              <page-article :title="false" :text="category.text">

                <template v-slot:footer>
                  <!-- Faq -->
                  <faq-list v-if="category.faq && category.faq.mainEntity.length" label="FAQ">
                    <faq-item v-for="(item, index) in category.faq.mainEntity" :key="index"
                      :question="item.name"
                      :answer="item.acceptedAnswer.text">
                    </faq-item>
                  </faq-list>
                  
                  <!-- Author -->
                  <author v-if="category.author" :author="category.author" />

                  <!-- Comments -->
                  <comments commentable_type="App\RoomCategory" :commentable_id="category.id"/>
                </template>

              </page-article>
            </div>
          </div>
        </div>

        <div class="col-3">

          <filters
            v-if="filters"
            :selected.sync="selected"
            :geo="geo"
            :kycs="filters.kycs"
            :platforms="filters.platforms"
            :tags="filters.tags"
            :payments="filters.payments"
            :types="filters.types"
            :networks="filters.networks"
            :licenses="filters.licenses"
            :limits="filters.limits"
            :disciplines="filters.disciplines"
            :games="filters.games"
            :huds="filters.huds"
            :certificates="filters.certificates"
            @change="handleFilterChange"
            @filterOpen="handleFilterOpen"
          />

          <promotion-item
            v-if="promotions"
            v-for="(item, index) in promotions" :key="index"
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
            :currency="item.currency ? item.currency.symbol: '$'"
            :exclusive="item.exclusive"
          ></promotion-item>

          <topic-list v-if="category.topics.length">
            <topic-item
              v-for="(item, index) in category.topics" :key="index"
              :title="item.title"
              :url="item.url"
              :author="item.author"
              :created="item.created_at"
            />
          </topic-list>

        </div>

      </div>

    </div>

	</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

import Filters from '~/components/room/category/Filters'

import Pagination from '~/components/pagination/Pagination'

import Author from '~/components/Author'
import Comments from '~/components/comments/Comments'

import Room from '~/components/cards/Room'

export default {

  name: 'RoomCategory',

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
    Pagination,
    Filters,
    Comments,
    Author,
    Room
  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'rooms/category',
      rooms: 'rooms/rooms',
      filters: 'rooms/filters',
      promotions: 'promotions/items'
    }),

    params() {

      return {
        per_page: this.per_page,
        page: this.page,
        sort: this.sort,
        order: this.order,
        query: this.query,
        locale: this.locale,
        geo: this.geo,
        room_category_id: this.category.id,
        ids: this.category.list,
        types: this.types,
        payments: this.payments,
        platforms: this.platforms,
        licenses: this.licenses,
        tags: this.tags,
        currencies: this.currencies,
        disciplines: this.disciplines,
        limits: this.limits,
        games: this.games,
        networks: this.networks,
        certificates: this.certificates,
        categories: this.categories,
        hud: this.hud
      }
    }
  },

	data: () => ({
    loading: false,
    per_page: 10,
    page: 1,
    sort: 'rating',
    order: 'desc',
    geo: null,
    selected: [],
    types: [],
    payments: [],
    platforms: [],
    licenses: [],
    tags: [],
    currencies: [],
    disciplines: [],
    limits: [],
    games: [],
    networks: [],
    certificates: [],
    categories: [],
    hud: [],
    ids: null,
    data: [],
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null,
    current_page: null,
    last_page: null,
    total: 0,
    overall: 0,

    countries: []
	}),

  async fetch() {

    await axios.get(`rooms/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('rooms/FETCH_ROOM_CATEGORY', {
        category: {
          id: response.data.id,
          title: response.data.title,
          author: {
            full_name: response.data.author.full_name,
            image: {
              filename: response.data.author.image.filename
            }
          },
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
          summary: response.data.summary,
          text: response.data.text,
          faq: response.data.faq,
          toc: response.data.toc,
          topics: response.data.topics,
          list: response.data.list
        }
      })
    })

    await axios.get(`rooms/list`, { params: this.params }).then((response) => {
      this.$store.commit('rooms/FETCH_ROOMS', {
        rooms: response.data.data.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          rating: item.rating,
          rakeback: item.rakeback,
          bonus: item.bonus,
          background: item.background,
          restricted: item.restricted,
          available: item.available,
          blacklist: item.blacklist,
          summary: item.summary,
          claim_amount: item.claim_amount,
          claim_currency: item.claim_currency ? {
            code: item.claim_currency.code,
            symbol: item.claim_currency.symbol
          }: null,
          image: {
            filename: item.image.filename
          },
          network: {
            title: item.network.title
          },
          tags: item.tags.map(tag => ({
            title: tag.title
          })),
          review: item.review,
        }))
      })

      Object.keys(response.data).forEach(key => {
        if (key !== 'data') {
          this[key] = response.data[key]
        }
      })
    })

    await axios.get(`rooms/category/list`).then((response) => {
      this.$store.commit('rooms/FETCH_ROOM_CATEGORIES', { categories: response.data })
    })
    
    await axios.get(`/rooms/filters/list`, {
      params: {
        geo: this.country.code,
        ids: this.category.list,
        room_category_id: this.category.id
      }
    }).then((response) => {
      this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
    })

    await axios.get(`promotion/latest`, {
      params: {
        type: 'promotion',
        per_page: 3
      }
    }).then((response) => {
      this.$store.commit('promotions/FETCH_ITEMS', { items: response.data })
    })

  },

  mounted () {

    this.countries.push({
      label: this.country.from,
      value: this.country.code
    })

    this.geo = this.country.code
  },

  watch: {

  },

  methods: {

    async fetchItems() {

      this.$nuxt.$loading.start()

      // await axios.get(`/rooms/filters/list`, {
      //   params: {
      //     geo: this.geo,
      //     room_category_id: this.category.id
      //   }
      // }).then((response) => {
      //   this.$store.commit('rooms/FETCH_FILTERS', { filters: response.data })
      // })

      await axios.get(`rooms/list`, { params: this.params }).then((response) => {
        this.$store.commit('rooms/FETCH_ROOMS', {
          rooms: response.data.data.map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            rating: item.rating,
            rakeback: item.rakeback,
            bonus: item.bonus,
            background: item.background,
            restricted: item.restricted,
            available: item.available,
            blacklist: item.blacklist,
            summary: item.summary,
            claim_amount: item.claim_amount,
            claim_currency: item.claim_currency ? {
              code: item.claim_currency.code,
              symbol: item.claim_currency.symbol
            }: null,
            image: {
              filename: item.image.filename
            },
            network: {
              title: item.network.title
            },
            tags: item.tags.map(tag => ({
              title: tag.title
            })),
            review: item.review,
          }))
        })
        Object.keys(response.data).forEach(key => {
          if (key !== 'data') {
            this[key] = response.data[key]
          }
        })
        this.$nuxt.$loading.finish()
      })
    },

    async fetchCountries() {
      this.loading = true
      await axios.get('countries').then(response => {
        this.countries = response.data.map(item => {
          return {
            value: item.code,
            label: item.from
          }
        })

        this.loading = false
      })
    },

    handlePageNext() {
      this.page = this.current_page + 1
      this.fetchItems()
    },

    handlePagePrev() {
      this.page = this.current_page - 1
      this.fetchItems()
    },

    handlePageChange(number) {
      this.page = number
      this.fetchItems()
      // history.replaceState({}, null, `${this.$route.path}/page/${number}`)
    },

    handleShowMore() {
      this.per_page = parseInt(this.per_page) + 6
      this.fetchItems()
    },

    handleSortChange(order) {
      this.sort = order
      this.fetchItems()
    },

    handleFilterChange(selected) {

      let collection = []
      Object.keys(selected).forEach(key => {
        this[key] = _.map(selected[key], 'value')

        for (var i = 0; i < selected[key].length; i++) {
          let item = {
            ...selected[key][i],
            key: key
          }
          collection.push(item)
        }
      })

      this.selected = _.flatten(collection)
      this.fetchItems()
    },

    handleFilterOpen() {

    }

  }

}
</script>

<style lang="scss">

$ico-filters: url('~/assets/i/ico-filters.svg?data');

.el-select {
  .el-input__inner {
    background: #FAFAFA;
    border: 1px solid #D3D3D3;
    border-radius: 4px;
    font-family: 'Proxima Nova Sb';
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #333333;
  }


  .el-input.is-focus .el-input__inner {
    border-color: rgba(0, 139, 226, 0.7);
  }
}

.el-select-geo {
  max-width: 164px;
  .el-input__prefix {
    left: 16px;
    align-items: center;
    display: flex;
  }

  .el-input__inner {
    padding-left: 52px;
  }
}

.el-select-sort {
  max-width: 195px;
  .el-input__prefix {
    left: 16px;
    align-items: center;
    display: flex;
  }

  .el-input__inner {
    padding-left: 47px;
  }
}

.el-poper-geo,
.el-poper-sort {
  .el-select-dropdown__item {
    font-family: 'Proxima Nova Sb';
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #333333;
  }
}

.rooms-top {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__geo {
    margin-left: auto;
    margin-right: 24px;
    &-label {
      margin-right: 16px;
      display: inline-flex;
      font-family: 'Proxima Nova';
      font-size: 14px;
      line-height: 16px;
      color: #333333;
    }
  }

  &__info {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #222222;
  }
}
</style>