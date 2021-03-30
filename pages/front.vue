<template>
  <section :class="['content']">
    <div class="front">
      <lazy-hydrate when-visible>
        <front-top />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <front-posts />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <front-posts-featured />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <front-rooms />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <front-promotions />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <front-clubs />
      </lazy-hydrate>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import LazyHydrate from 'vue-lazy-hydration'

export default {
  layout: 'basic',

  metaInfo: {

  },

  components: {
    LazyHydrate,
    RoomTopList: () => import('~/components/room/RoomTopList'),
    FrontPosts: () => import('~/components/front/FrontPosts'),
    FrontPostsFeatured: () => import('~/components/front/FrontPostsFeatured'),
    FrontRooms: () => import('~/components/front/FrontRooms'),
    FrontPromotions: () => import('~/components/front/FrontPromotions'),
    FrontClubs: () => import('~/components/front/FrontClubs')
  },

	data: () => ({

	}),

  computed: {
		...mapGetters({
		  locale: 'lang/locale',
		  country: 'location/country',
		  geo: 'location/code',
		  page: 'pages/page',
      topList: 'rooms/topList'
		}),
  },

  async fetch() {
    await axios.get('/front', {
      params: {
        geo: this.country.code,
        locale: this.locale
      }
    }).then(response => {
      this.$store.commit('front/FETCH_POSTS', { posts: response.data.posts })
      this.$store.commit('front/FETCH_POST_CATEGORIES', { post_categories: response.data.post_categories })
      this.$store.commit('front/FETCH_ROOMS', { rooms: response.data.rooms })
      this.$store.commit('front/FETCH_CLUBS', { clubs: response.data.clubs })
      this.$store.commit('front/FETCH_IMPORTANT', { important: response.data.important })
      this.$store.commit('front/FETCH_PROMOTIONS', { promotions: response.data.promotions })
      this.$store.commit('front/FETCH_ROOM_CATEGORIES', { room_categories: response.data.room_categories })
      this.$store.commit('front/FETCH_PROMOTION_CATEGORIES', { promotion_categories: response.data.promotion_categories })
      this.$store.commit('front/FETCH_CLUB_CATEGORIES', { club_categories: response.data.club_categories })
    })
    .catch(e => {

    })

  },

  mounted () {

  },

  watch: {

  },

  methods: {
  }
}
</script>

<style lang="scss">
.content {
  padding-bottom: 90px;
}
</style>