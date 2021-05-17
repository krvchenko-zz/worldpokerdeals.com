<template>
  <div class="games">
    <div class="games-header">
      <div class="container-fluid">
        <breadcrumb-list :white="true"/>
        <h1 class="games__title">{{ category.title }}</h1>
        <div class="games__summary" v-html="category.summary"></div>

        <game-nav-list>
          <game-nav-item
            v-for="(item, index) in types" :key="index"
            :active="item.value === type"
            :label="item.label"
            :value="item.value"
            @click="handleNavClick">
          </game-nav-item>
        </game-nav-list>

      </div>
    </div>
    <div class="container-fluid">
      <div class="games-list">
        <div class="row">
          <div class="col-3" v-for="item in games" :key="item.slug">
            <game-item
              :title="item.title"
              :icon="item.icon"
              :rooms="item.rooms"
              :page="item.page"
            >
            </game-item>
          </div>
        </div>
      </div>

      <div class="row">
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

        <div class="col col-article">
          <!-- Article -->
          <page-article :text="category.text">
            <template v-slot:footer>
              <!-- Author -->
              <author v-if="category.author" :author="category.author" />
              <!-- Comments -->
              <comments commentable_type="App\GameCategory" :commentable_id="category.id" />
            </template>
          </page-article>
        </div>

        <div class="col-3">
          <room-top-list />
          <topic-list v-if="category.topics">
            <topic-item
              v-for="(item, index) in category.topics" :key="index"
              :title="item.title"
              :url="item.url"
              :author="item.author"
              :created="item.created_at"
            />
          </topic-list>
          <post-list v-if="posts">
            <post-item
              v-for="(item, index) in posts" :key="index"
              :image="item.image"
              :title="item.title"
              :summary="item.summary"
              :slug="item.slug"
              :author="item.user"
              :created="item.created_at"
              :categories="item.categories"
            ></post-item>
          </post-list>
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

  name: 'GameCategory',

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
    Background: () => import('~/assets/i/games-bg.jpg'), 
  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'games/category',
      games: 'games/games',
      posts: 'posts/posts'
    }),
  },

  data: () => ({
    loading: false,
    type: 'discipline',
    types: [
      {
        label: 'Дисциплины',
        value: 'discipline'
      },
      {
        label: 'Виды покера',
        value: 'game'
      },
      {
        label: 'Лимиты',
        value: 'limit'
      },
      {
        label: 'Тип стола',
        value: 'table'
      }
    ]
  }),

  async fetch() {
    await this.$axios.get(`games/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('games/FETCH_CATEGORY', { category: response.data })
    }).then()

    await this.$axios.get('games/list', {
      params: {
        type: this.type
      }
    }).then((response) => {
      this.$store.commit('games/FETCH_GAMES', { games: response.data.map(item => ({
        title: item.title,
        icon: item.icon,
        page: item.page,
        rooms: item.rooms_count
      })) })
    })

    await this.$axios.get('posts/list', {
      params: {
        locale: this.locale,
        per_page: 5,
        order: 'created_at',
        sort: 'desc'
      }
    }).then((response) => {
      this.$store.commit('posts/FETCH_POSTS', { posts: response.data.data.map(item => ({
        image: item.image,
        title: item.title,
        summary: item.summary,
        slug: item.slug,
        user: {
          image: item.user.image,
          full_name: item.user.full_name
        },
        created_at: item.created_at,
        categories: item.categories
      })) })
    })
  },

  mounted() {
    
  },

  created () {

  },

  watch: {

  },

  methods: {
    handleNavClick($event) {
      $nuxt.$loading.start()
      this.type = $event

      this.$fetch().then(() => {
        $nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style lang="scss">
  
$games-bg: url('~assets/i/games-bg.jpg');

.games-header {
  margin-bottom: 32px;
  padding: 0 0 32px 0;
  // background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #BA2B2B 0%, #5A0101 100%);
  background: $games-bg no-repeat center;
  background-size: cover;
}

.games-list {
  margin-bottom: 20px;
}

.games__title {
  text-align: center;
  margin: 0 0 16px 0;
  font-family: Proxima Nova;
  font-weight: bold;
  font-size: 32px;
  line-height: 36px;
  color: #FFFFFF;
}

.games__summary {
  margin-bottom: 24px;
  font-family: Proxima Nova;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.8;
}
</style>