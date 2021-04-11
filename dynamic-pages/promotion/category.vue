<template>
<div class="promotions">
  <!-- Header -->
  <promotion-category-header />
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
        <div class="promotions-top">
          <div v-if="items" class="promotions-top__info">Отфильтровано {{ total }} из {{ overall }} акций</div>
          <div v-if="items" class="promotions-top__geo">

            <div class="promotions-top__geo-label">Предложения для</div>

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

          <div v-if="items" class="promotions-top__sort">
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
                label="Сначала новые"
                value="created_at">
              </el-option>
              <el-option
                label="Сначала эксклюзивные"
                value="exclusive">
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

        <!-- List -->
        <template v-if="category.entity === 'promotion'">
          <promotion-list v-if="!loading && data.length">
            <div class="row">
              <div class="col-4" v-for="(item, index) in data" :key="index">
                <promotion-item
                  :image="item.image"
                  :title="item.title"
                  :summary="item.summary"
                  :page="item.page"
                  :author="item.user"
                  :created="item.created_at"
                  :category="item.category"
                  :time_left="item.time_left"
                  :time_before="item.time_before"
                  :regularity="item.regularity"
                  :prize="item.prize"
                  :currency="item.currency ? item.currency.symbol : ''"
                  :exclusive="item.exclusive"
                  :active="item.active"
                ></promotion-item>
              </div>
            </div>
          </promotion-list>
        </template>

        <template v-else>
          <bonus-list v-if="!loading && data.length">
            <bonus-item v-for="(item, index) in data" :key="index"
              :title="item.title"
              :slug="item.slug"
              :created="item.created_at"
              :code="item.code"
              :terms="item.terms"
              :room="item.room"
              :page="item.page"
              :category="item.category"
              :min_deposit="item.min_deposit"
              :min_deposit_currency="item.min_deposit_currency"
              :cashback_value="item.cashback_value"
              :max_bonus="item.max_bonus"
              :max_bonus_currency="item.max_bonus_currency"
              :deposit_bonus="item.deposit_bonus"
              :index="index"
            ></bonus-item>
          </bonus-list>
        </template>

        <!-- Pagination -->
        <pagination
          v-if="data.length"
          :last="last_page"
          :current="page"
          :prevUrl="prev_page_url"
          :nextUrl="next_page_url"
          :total="total"
          :from="from"
          :to="to"
          :load-more-width="208"
          :load-more-text="category.entity === 'promotion' ? 'Показать еще акции' : 'Показать еще бонусы'"
          total-text="акций"
          @next="handlePageNext"
          @prev="handlePagePrev"
          @change="handlePageChange"
          @more="handleShowMore">
        </pagination>

        <div class="row">
          <!-- Toc -->
          <div class="col-auto">

            <toc-list v-if="category.toc && category.toc.length">
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
          <div class="col col-article">
            <!-- Article -->
            <page-article
              :meta="false"
              :text="category.text"
              :author="category.author ? category.author.full_name : null"
              :created="category.created_at"
              :updated="category.updated_at">
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
                <comments commentable_type="App\PromotionCategory" :commentable_id="category.id" />
              </template>
            </page-article>          
          </div>
        </div>
      </div>

      <div class="col-3">
        <promotion-category-filters
          v-if="filters"
          :geo="geo"
          :categories="filters.categories"
          :disciplines="filters.disciplines"
          :limits="filters.limits"
          :games="filters.games"
          :rooms="filters.rooms"
          :networks="filters.networks"
          :exclusive="filters.exclusive"
          @change="handleFilterChange"
        />
        <room-top-list v-if="category.entity === 'promotion'" />

        <topic-list v-if="category.topics.length">
          <topic-item
            v-for="(item, index) in category.topics" :key="index"
            :title="item.title"
            :url="item.url"
            :author="item.author"
            :created="item.created_at"
          />
        </topic-list>

        <game-search-banner />

      </div>

    </div>

  </div>

  <page-banners />
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'PromotionCategoryPage',

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

  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'promotions/category',
      items: 'promotions/items',
      filters: 'promotions/filters',
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
        exclusive: this.exclusive,
        promotion_category_id: this.category.id,
        categories: this.categories,
        disciplines: this.disciplines,
        limits: this.limits,
        games: this.games,
        rooms: this.rooms,
        networks: this.networks,
      }
    }
  },

	data: () => ({
    loading: false,
    per_page: 6,
    page: 1,
    sort: 'created_at',
    order: 'desc',
    exclusive: null,
    geo: null,
    categories: [],
    disciplines: [],
    limits: [],
    games: [],
    rooms: [],
    networks: [],
    data: [],
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null,
    current_page: null,
    last_page: null,
    total: 0,
    overall: 0,
    entity: 'promotion',
    countries: [],
    selected: []
	}),

  async fetch() {

    await axios.get(`promotion/category/${this.pageable.slug}`, {
      params: {
        locale: this.locale
      }
    }).then((response) => {
      this.$store.commit('promotions/FETCH_CATEGORY', { category: response.data.category })
      this.$store.commit('promotions/FETCH_BEST', { best: response.data.best })
    })

    await axios.get(`promotion/list`, { params: this.params }).then((response) => {
      this.$store.commit('promotions/FETCH_ITEMS', { items: response.data.data })
      Object.keys(response.data).forEach(key => {
        this[key] = response.data[key]
      })
    })

    await axios.get(`promotion/category/list`).then((response) => {
      this.$store.commit('promotions/FETCH_CATEGORIES', { categories: response.data })
    })

    await axios.get(`/promotion/filters/list`, {
      params: {
        geo: this.country.code,
        type: this.category.entity,
        exclusive: null,
        promotion_category_id: this.category.id
      }
    }).then((response) => {
      this.$store.commit('promotions/FETCH_FILTERS', { filters: response.data })
    })

  },

  created () {
    this.geo = this.country.code
  },

  watch: {

  },

  mounted () {

    this.countries.push({
      label: this.country.from,
      value: this.country.code
    })

    this.geo = this.country.code
  },

  methods: {

    handleFilterChange(selected) {
      let collection = []
      Object.keys(selected).forEach(key => {
        this[key] = [].map.call(selected[key], item => { return item.value })
        for (var i = 0; i < selected[key].length; i++) {
          let item = {
            ...selected[key][i],
            key: key
          }
          collection.push(item)
        }
      })
      this.selected = [].concat.apply([], collection)
      this.fetchItems()
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

    async fetchItems() {

      this.$nuxt.$loading.start()

      await axios.get(`/promotion/filters/list`, {
        params: {
          geo: this.geo,
          type: this.category.entity,
          exclusive: this.exclusive,
          promotion_category_id: this.category.id
        }
      }).then((response) => {
        this.$store.commit('promotions/FETCH_FILTERS', { filters: response.data })
      })

      await axios.get(`promotion/list`, { params: this.params }).then((response) => {
        this.$store.commit('promotions/FETCH_ITEMS', { items: response.data.data })
        Object.keys(response.data).forEach(key => {
          this[key] = response.data[key]
        })
        this.loading = false
        this.$nuxt.$loading.finish()
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
    }

  }

}
</script>

<style lang="scss">

.promotions-top {
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