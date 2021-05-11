<template>

  <div class="network">

    <div class="container-fluid">

      <breadcrumb-list v-if="pageable" />

      <network-header />

    </div>

  	<div class="container-fluid">

      <h2 :id="urlLit(`Все покер-румы сети ${network.title}`)" class="network-rooms__title">Все покер-румы сети {{ network.title }}</h2>

      <div class="row">

        <div class="col-9">

          <div class="network-rooms">
            <div class="network-filters">

              <div v-if="data.length" class="network-filters__info">Показано {{ total }} из {{ overall }} покер-румов</div>

              <div v-if="data.length" class="network-filters__geo">
                <geo-switcher :value="country.code" :geo.sync="geo" @change="fetchItems"/>
              </div>

            </div>

            <room v-if="data.length"
              v-for="(item, index) in data" :key="index"
              :id="item.id"
              :title="item.title"
              :slug="item.slug"
              :rating="item.rating"
              :rakeback="item.rakeback"
              :bonus="item.bonus"
              :background="item.background"
              :image="item.image"
              :restricted="item.restricted"
              :network="item.network"
              :tags="item.tags"
              :review="item.review"
            />

            <pagination
              v-if="rooms.length"
              :last="last_page"
              :current="parseInt(page)"
              :prev-url="prev_page_url"
              :next-url="next_page_url"
              :total="total"
              :from="from"
              :to="to"
              :load-more-width="208"
              load-more-text="Показать еще румы"
              total-text="покер-румов"
              @next="handlePageNext"
              @prev="handlePagePrev"
              @change="handlePageChange"
              @more="handleShowMore">
            </pagination>
          </div>
          
          <div class="row">

            <div class="col-auto">
              <toc-list v-if="network.toc">
                <template v-slot="{ inline }">
                  <toc-item
                    :inline="inline"
                    :anchor="urlLit(`Все покер-румы сети ${network.title}`)"
                    :text="`Все покер-румы сети ${network.title}`">
                  </toc-item>
                  <toc-item v-for="(item, index) in network.toc" :key="index"
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
              <page-article :text="network.text">
                <template v-slot:footer>
                  <!-- Faq -->
                  <faq-list v-if="network.faq && network.faq.mainEntity.length" label="FAQ">
                    <faq-item v-for="(item, index) in network.faq.mainEntity" :key="index"
                      :question="item.name"
                      :answer="item.acceptedAnswer.text">
                    </faq-item>
                  </faq-list>
                  <!-- Author -->
                  <author v-if="network.user" :author="network.user"/>
                  <!-- Comments -->
                  <comments commentable_type="App\Network" :commentable_id="network.id"/>
                </template>
              </page-article>

            </div>

          </div>

        </div>

        <div class="col-3">
          <!-- <room-top-list v-sticky="{topSpacing: 100}" /> -->
          <network-filters
            v-if="filters"
            :geo="geo"
            :kycs="filters.kycs"
            :platforms="filters.platforms"
            :tags="filters.tags"
            :payments="filters.payments"
            :types="filters.types"
            :networks="filters.networks"
            :licenses="filters.licenses"
            @change="handleFilterChange"
          />

          <topic-list v-if="network.topics.length">
            <topic-item
              v-for="(item, index) in network.topics" :key="index"
              :title="item.title"
              :url="item.url"
              :author="item.author"
              :created="item.created_at"
            />
          </topic-list>

        </div>

      </div>

      <lazy-hydrate when-visible>
        <post-list v-if="posts && posts.length" :label="`Новости ${network.title}`">
          <div class="row">
            <div v-for="(item, index) in posts" :key="index" class="col-3">
              <post-item
                :image="item.image"
                :title="item.title"
                :summary="item.summary"
                :slug="item.slug"
                :author="item.user"
                :created="item.created_at"
                :categories="item.categories"
                :medium="true"
              />
            </div>
          </div>
        </post-list>
      </lazy-hydrate>

      <lazy-hydrate when-visible>
        <network-list v-if="related" label="Другие покерные сети">
          <div class="row">
            <div class="col-3" v-for="(item, index) in related" :key="index">
              <network-item
                :title="item.title"
                :url="item.url"
                :rooms="item.rooms_count"
                :vip="item.vip_status"
                :page="item.page"
              >
              </network-item>
            </div>
          </div>
        </network-list>
      </lazy-hydrate>

  	</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import LazyHydrate from 'vue-lazy-hydration'

export default {

  name: 'NetworkPage',

  head () {
    return { 
      title: this.network.meta_title,
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: this.network.meta_description },
        { name: 'keywords', content: this.network.meta_keywords }
      ],
    }
  },

  components: {
    LazyHydrate
  },

	data: () => ({
    loading: false,
    per_page: 10,
    page: 1,
    sort: 'rating',
    order: 'desc',
    geo: null, 
    network_id: null,
    kyc: [],
    platforms: [],
    tags: [],
    payments: [],
    types: [],
    licenses: [],
    ids: [],
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

  computed: {
		...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      network: 'networks/network',
      rooms: 'rooms/rooms',
      filters: 'networks/filters',
      related: 'networks/related',
      posts: 'networks/posts'
		}),

    mediaUrl() {
      return process.env.mediaUrl
    },

    params() {
      return {
        per_page: this.per_page,
        page: this.page,
        sort: this.sort,
        order: this.order,
        query: this.query,
        locale: this.locale,
        network_id: this.network.id,
        geo: this.geo,
        kyc: this.kyc,
        platforms: this.platforms,
        tags: this.tags,
        payments: this.payments,
        types: this.types,
        licenses: this.licenses,
        ids: this.network.list
      }
    }
  },

  async fetch() {

    await this.$axios.get(`network/${this.pageable.slug}`,{
      params: {
        locale: this.locale
      }
    })
    .then((response) => {
      this.loading = false
      this.$store.commit('networks/FETCH_NETWORK', { network: response.data.item })
      this.$store.commit('networks/FETCH_POSTS', { posts: response.data.posts })
      this.$store.commit('networks/FETCH_RELATED', { related: response.data.related })
    })
    .catch((e) => {
    })


    await this.$axios.get('rooms/list', {
      params: {
        geo: this.geo,
        per_page: 10,
        sort: 'rating',
        order: 'desc',
        network_id: this.network.id,
        ids: this.network.list
      }
    })
    .then((response) => {
      Object.keys(response.data).forEach(key => {
        this[key] = response.data[key]
      })
      this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
    })
    .catch((e) => {
    })

    await this.$axios.get(`/network/filters/list`, {
      params: {
        geo: this.geo,
        network_id: this.network.id
      }
    }).then((response) => {
      this.$store.commit('networks/FETCH_FILTERS', { filters: response.data })
    })
  },

  created () {
    this.geo = null
  },

  watch: {

  },

  methods: {

    async fetchItems() {

      this.$nuxt.$loading.start()

      await this.$axios.get(`/network/filters/list`, {
        params: {
          geo: this.geo,
          network_id: this.network.id
        }
      }).then((response) => {
        this.$store.commit('networks/FETCH_FILTERS', { filters: response.data })
      })

      await this.$axios.get(`rooms/list`, { params: this.params }).then((response) => {
        this.$store.commit('rooms/FETCH_ROOMS', { rooms: response.data.data })
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
    },

    urlLit(w,v) {
      let tr='a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(' ')
      let ww=''; w=w.toLowerCase()
      for(let i=0; i<w.length; ++i) {
        let cc=w.charCodeAt(i); var ch=(cc>=1072?tr[cc-1072]:w[i])
        if(ch && ch.length<3) ww+=ch; else if(ch) ww+=eval(ch)[v]
      }
      return(ww.replace(/[^a-zA-Z0-9\-]/g,'-').replace(/[-]{2,}/gim, '-').replace( /^\-+/g, '').replace( /\-+$/g, ''))
    }
  }
}
</script>

<style lang="scss">
// .promotion {
//   &__wrap {
//     padding: 0 30px;
//   }

//   &__img-wrap {
//     margin: 20px 0 30px 0;
//   }
// }

.network-filters {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__geo {
    margin-left: auto;
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

.network-rooms {
  margin-bottom: 40px;
  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: -0.2px;
    color: #222222;
  }
}
</style>