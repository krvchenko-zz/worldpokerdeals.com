<template>
	<div class="soft-category">

    <!-- Header -->
    <soft-category-header />

    <div class="container-fluid">
      <div class="row">
        <div class="col-9">

          <div class="soft-category-top">

            <div v-if="data.length" class="soft-category__info">Показано {{ total }} из {{ overall }} програм для покера</div>

            <div v-if="data.length" class="soft-category-top__sort">
              <custom-select
                :options="[{
                  label: 'По стоимости',
                  value: 'price',
                },{
                  label: 'Сначала новые',
                  value: 'created_at'  
                }]"
                :default="'price'"
                @input="handleSortChange"
              />
            </div>

          </div>

          <div class="soft-list">

            <div v-if="items" class="row">
              <div class="col-4" v-for="(item, index) in data" :key="index">
                <soft-item v-if="data.length"
                  :id="item.id"
                  :title="item.title"
                  :review="item.review"
                  :url="item.url"
                  :short_description="item.short_description"
                  :discount="item.discount"
                  :available="item.available"
                  :discount_value="item.discount_value"
                  :price="item.price"
                  :image="item.image"
                  :category="item.categories[0].title"
                  :currency="item.currency ? item.currency.symbol : ''"
                />
              </div>
            </div>

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
              <page-article :text="category.text">
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
                  <comments commentable_type="App\SoftCategory" :commentable_id="category.id" />
                </template>
              </page-article>           
            </div>
          </div>
        </div>

        <div class="col-3">

          <filters
            v-if="filters"
            :geo="geo"
            :categories="filters.categories"
            :free="filters.free"
            @change="handleFilterChange"
            @filterOpen="handleFilterOpen"
          />

          <room-top-list />

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

import Filters from '~/components/soft/category/Filters'

export default {

  name: 'SoftCategory',

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
    Filters
  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'soft/category',
      items: 'soft/items',
      filters: 'soft/filters'
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
        soft_category_id: this.category.id,
        categories: this.categories,
        free: this.free
      }
    }
  },

	data: () => ({
    loading: false,
    per_page: 9,
    page: 1,
    sort: 'price',
    order: 'asc',
    geo: null,

    categories: [],
    free: null,

    data: [],
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null,
    current_page: null,
    last_page: null,
    total: 0,
    overall: 0,
	}),

  async fetch() {

    await axios.get(`soft/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('soft/FETCH_CATEGORY', { category: response.data })
    })

    await axios.get(`soft/category/list`).then((response) => {
      this.$store.commit('soft/FETCH_CATEGORIES', { categories: response.data })
    })

    await axios.get(`soft/list`, { params: this.params }).then((response) => {
      this.$store.commit('soft/FETCH_ITEMS', { items: response.data.data })
      Object.keys(response.data).forEach(key => {
        this[key] = response.data[key]
      })
    })

    await axios.get(`/soft/filters/list`, {
      params: {
        geo: this.country.code,
        room_category_id: this.category.id
      }
    }).then((response) => {
      this.$store.commit('soft/FETCH_FILTERS', { filters: response.data })
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

      await axios.get(`soft/list`, { params: this.params }).then((response) => {
        this.$store.commit('soft/FETCH_ITEMS', { items: response.data.data })
        Object.keys(response.data).forEach(key => {
          this[key] = response.data[key]
        })
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

    handleSortChange(sort) {
      this.sort = sort
      this.fetchItems()
    },

    handleFilterChange(selected) {
      Object.keys(selected).forEach(key => {
        this[key] = selected[key]
      })
      this.fetchItems()
    },

    handleFilterOpen() {

    }

  }

}
</script>

<style lang="scss">

.soft-list {
  margin-top: 28px;
}
.soft-category-top {
  margin-bottom: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__geo {
    // margin-left: auto;
    // margin-right: 24px;
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