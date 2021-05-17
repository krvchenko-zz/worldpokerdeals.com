<template>
<div id="reviews" class="reviews">

  <div v-if="reviews" class="block-title block-title_lg">
    Отзывы игроков <span class="reviews__count">{{ reviews.total }}</span>
  </div>

  <reviews-list v-if="reviews">
    <transition-group name="fade">
      <reviews-item
        v-for="item in reviews.data"
        :key="item.id"
        :review="item"
      />
    </transition-group>
  </reviews-list>

  <div v-if="reviews && reviews.next_page_url" class="reviews-more">
    <button class="btn btn-border reviews__more" @click.prevent="fetch">
      Показать еще <span>{{ remain }}</span>
    </button>
  </div>

  <reviews-form
    v-if="showForm && user"
    :room_id="room_id"
  />

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'Reviews',

  components: {

  },

  props: {

    room_id: {
      type: Number,
      required: true,
    },

    reviews: {
      type: [Object, Boolean],
      required: true,
    }

  },

  data: () => ({
    showForm: true,
    loading: false
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
    remain() {
      let remain = (this.reviews.per_page - this.reviews.per_page) + 5
      return remain + this.reviews.to > this.reviews.total ? this.reviews.total - this.reviews.to : remain
    }
  },

  watch: {

  },

  methods: {
    async fetch() {
      $nuxt.$loading.start()
      await this.$axios.get('reviews/list', {
        params: {
          per_page: parseInt(this.reviews.per_page) + 5,
          sort: 'created_at',
          order: 'desc',
          room_id: this.room_id,
        }
      })
      .then((response) => {
        this.$store.commit('reviews/FETCH_REVIEWS', { reviews: response.data })
        $nuxt.$loading.finish()
      })
      .catch((e) => {
        $nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style lang="scss">
.reviews {
  &__count {
    margin-left: 15px;
    padding: 2px 10px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #555555;
    border: 1px solid #AAAAAA;
    border-radius: 50px;
  }

  &__more {
    padding: 5px 15px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 14px;
    line-height: 14px;
    margin-left: 5px;
    span {
      margin-left: 5px;
      text-align: center;
      padding: 0 7px;
      min-width: 22px;
      height: 22px;
      border: 1px solid rgba(204, 204, 204, 0.6);
      border-radius: 50px;
      display: inline-block;
      font-family: 'Proxima Nova Sb';
      font-style: normal;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      color: #AAAAAA;
    }
  }
}
</style>