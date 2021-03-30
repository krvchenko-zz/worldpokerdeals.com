<template>
  <div class="rules">
    <div class="rules-header">
      <div class="container-fluid">
        <breadcrumb-list :white="true"/>
        <h1 class="rules__title">{{ category.title }}</h1>
        <div class="rules__summary" v-html="category.summary"></div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="rules-list">
        <div class="row">
          <div class="col-3" v-for="item in rules" :key="item.slug">
            <rule-item
              :title="item.title"
              :icon="item.icon"
              :image="item.image"
              :background="item.background"
              :rooms="item.rooms"
              :page="item.page"
            >
            </rule-item>
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

        <div class="col">
          <!-- Article -->
          <page-article :text="category.text">
            <template v-slot:footer>
              <!-- Author -->
              <author v-if="category.author" :author="category.author" />
              <!-- Comments -->
              <comments commentable_type="App\PokerRuleCategory" :commentable_id="category.id" />
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'RuleCategory',

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

  components: {},

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'rules/category',
      rules: 'rules/rules',
      posts: 'posts/posts'
    }),
  },

  data: () => ({
    loading: false,
  }),

  async fetch() {
    await axios.get(`rules/category/${this.pageable.slug}`).then((response) => {
      this.$store.commit('rules/FETCH_CATEGORY', { category: {
        id: response.data.id,
        title: response.data.title,
        summary: response.data.summary,
        toc: response.data.toc,
        text: response.data.text,
        topics: response.data.topics.map(this.mapTopics),
        meta_title: response.data.meta_title,
        meta_description: response.data.meta_description,
        meta_keywords: response.data.meta_keywords,
        author: {
          username: response.data.author.username,
          full_name: response.data.author.full_name,
          image: response.data.author.image ? {
            filename: response.data.author.image.filename
          } : null,
        },
      } })
    })

    await axios.get('rules/list').then((response) => {
      this.$store.commit('rules/FETCH_RULES', { rules: response.data.map(item => ({
        title: item.title,
        icon: item.icon,
        image: item.image,
        background: item.background,
        rooms: item.rooms,
        page: item.page
      })) })
    })

    await axios.get('posts/list', {
      params: {
        locale: this.locale,
        per_page: 5,
        order: 'created_at',
        sort: 'desc'
      }
    }).then((response) => {
      this.$store.commit('posts/FETCH_POSTS', { posts: response.data.data.map(this.mapPosts) })
    })
  },

  mounted() {
    
  },

  created () {

  },

  watch: {

  },

  methods: {
    mapPosts(item) {
      return({
        image: {
          filename: item.image.filename,
          alt: item.image.alt
        },
        title: item.title,
        summary: item.summary,
        slug: item.slug,
        user: {
          image: {
            filename: item.image.filename,
            alt: item.image.alt
          },
          full_name: item.user.full_name
        },
        created_at: item.created_at,
      })
    },

    mapTopics(item) {
      return ({
        title: item.title,
        url: item.url,
        created_at: item.created_at,
        author: {
          username: item.author.username,
          full_name: item.author.full_name,
          image: item.author.image ? {
            filename: item.author.image.filename
          } : null,
        }
      })
    }
  }
}
</script>

<style lang="scss">
  
$poker-rules-bg: url('~assets/i/poker-rules-bg.jpg');

.rules-header {
  margin-bottom: 32px;
  padding: 0 0 32px 0;
  // background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #BA2B2B 0%, #5A0101 100%);
  background: $poker-rules-bg no-repeat center;
  background-size: cover;
}

.rules-list {
  margin-bottom: 20px;
}

.rules__title {
  text-align: center;
  margin: 0 0 16px 0;
  font-family: Proxima Nova;
  font-weight: bold;
  font-size: 32px;
  line-height: 36px;
  color: #FFFFFF;
}

.rules__summary {
  margin-bottom: 24px;
  font-family: Proxima Nova;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.8;
}
</style>