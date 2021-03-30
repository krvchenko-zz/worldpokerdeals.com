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

    author: {
      type: [String],
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
      return `<div class=article-body>${ this.text }</div>`
    }
  },

  mounted() {
    const lightbox = this.$glightbox({
      touchNavigation: true,
      loop: true,
      selector: '.lightbox'
    })
  },

  created() {

  },

  updated() {

  },

  watch: {

  },

	methods: {

	}
}
</script>
<style lang="scss">
  

</style>