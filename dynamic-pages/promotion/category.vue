<template>
	<div class="promotions">

    <!-- Header -->
    <promotion-category-header />

    <div class="container-fluid">
      <div class="row">
        <div class="col-9">
          <div class="promotions-top">

            <div v-if="data.length" class="promotions-top__info">Показано {{ total }} из {{ overall }} Акций</div>

            <div v-if="data.length" class="promotions-top__geo">
              <geo-switcher :value="country.code" :geo.sync="geo" @change="fetchItems"/>
            </div>

            <div v-if="data.length" class="promotions-top__sort">
              <custom-select
                :options="[{
                  label: 'Сначала новые',
                  value: 'created_at'
                },{
                  label: 'Сначала эксклюзивные',
                  value: 'exclusive'  
                }]"
                :default="'created_at'"
                @input="handleSortChange"
              />
            </div>

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
            @next="handlePageNext"
            @prev="handlePagePrev"
            @change="handlePageChange"
            @more="handleShowMore">
          </pagination>

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
              <page-article
                :meta="false"
                :text="category.text"
                :author="category.author.full_name"
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

        </div>

      </div>

    </div>

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
    entity: 'promotion'
	}),

  async fetch() {

    await axios.get(`promotion/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('promotions/FETCH_CATEGORY', { category: response.data })
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

  mounted() {

  },

  methods: {

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
    },

    handleFilterChange(selected) {
      Object.keys(selected).forEach(key => {
        this[key] = selected[key]
      })
      this.fetchItems()
    }

  }

}
</script>

<style lang="scss">

$ico-filters: url('~/assets/i/ico-filters.svg?data');

.promotions-top {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__geo {
    margin-left: auto;
    margin-right: 24px;
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