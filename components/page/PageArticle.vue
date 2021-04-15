<template>
  <article class="article">
    <div class="article__wrap">
      <h1 :id="titleId" v-if="title" class="page-title">{{ title }}</h1>

      <page-meta
        v-if="meta"
        :author="author"
        :created="created"
        :updated="updated"
        :dark="true"
      />

      <div v-if="summary" class="article__summary" v-html="summary"></div>

      <img
        v-if="image"
        class="article__img"
        decoding="async"
        loading="lazy"
        width="742px"
        height="320px"
        :src="src"
        :alt="image.alt || title"
      />

      <slot name="header" />

      <v-runtime-template
        v-carousel
        v-table-hideable
        :template="template"
      />

      <slot name="footer" />
    </div>
  </article>
</template>

<script>
  
import Soft from '~/components/cards/Soft'
import Manager from '~/components/cards/Manager'

import VRuntimeTemplate from 'v-runtime-template'

export default {

  name: 'PageArticle',

  components: {
    VRuntimeTemplate, Soft, Manager,
    PromotionFeed: () => import('~/components/promotion/PromotionFeed'),
    ClubFeed: () => import('~/components/club/ClubFeed'),
    RoomActions: () => import('~/components/room/RoomActions')
  },

  props: {

    text: {
      type: String,
      required: true,
    },

    summary: {
      type: String
    },

    image: {
      type: Object
    },

    imageStyle: {
      type: String,
      default: 'article-large'
    },

    author: {
      type: String,
    },

    created: {
      type: String,
    },

    updated: {
      type: String,
    },

    meta: {
      type: Boolean,
    },

    title: {
      type: [Boolean, String],
      default: false
    },

    titleId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    lightbox: null,
  }),

  computed: {
    template() {
      return `
        <div class=article-body>
          ${ this.text }
        </div>`
    },

    mediaUrl() {
      return process.env.mediaUrl
    },

    src() {
      return `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
    }
  },

  mounted() {
    const lightbox = this.$glightbox({
      touchNavigation: true,
      loop: true,
      selector: '.lightbox'
    })

    // const icons = this.$refs.body.$el.getElementsByTagName('svg')

    // for (var i = 0; i < icons.length; i++) {
    //   const clone = icons[i].cloneNode(true);
    //   icons[i].replaceWith('');
    // }
  },

  created() {

  },

  updated() {
    const lightbox = this.$glightbox({
      touchNavigation: true,
      loop: true,
      selector: '.lightbox'
    })
  },

  watch: {
    text() {

    },
  },

	methods: {
	}
}
</script>
<style lang="scss">
.article {
  &__wrap {
    padding: 0 28px;
  }
  &__summary {
    margin-bottom: 28px;
    font-family: 'Proxima Nova Sb';
    font-size: 17px;
    line-height: 21px;
    color: #555555;
  }
  &__img {
    margin-bottom: 40px;
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
}
</style>