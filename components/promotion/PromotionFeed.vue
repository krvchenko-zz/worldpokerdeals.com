<template>
<div class="promotions">
  <table v-if="feed" class="promotions-table" cellspacing="0" cellpadding="0" border="0" width="100%">
    <promotion-feed-item v-for="(item, index) in feed" :key="index"
      :title="item.title"
      :type="item.type"
      :slug="item.slug"
      :created="item.created_at"
      :code="item.code"
      :room="item.room"
      :category="item.category"
      :min_deposit="item.min_deposit"
      :min_deposit_currency="item.min_deposit_currency"
      :time_left="item.time_left"
      :time_before="item.time_before"
      :cashback_value="item.cashback_value"
      :max_bonus="item.max_bonus"
      :max_bonus_currency="item.max_bonus_currency"
      :deposit_bonus="item.deposit_bonus"
      :prize="item.prize"
      :currency="item.currency"
      :start="item.start"
      :end="item.end"
      :regularity="item.regularity"
      :permanent="item.permanent"
      :index="index"
      :page="item.page"
      :terms="item.terms"
    />
  </table>

  <div v-if="next_page_url" class="promotions-more">
    <button class="btn promotions__more" @click.prevent="handleLoadMore">
      Все акции {{ room.title }} <span>{{ total - per_page }}</span>
    </button>
  </div>

  <div v-if="!next_page_url && total > 4" class="promotions-more">
    <button class="btn promotions__more" @click.prevent="handleHide">
      Скрыть <span>{{ total - 3 }}</span>
    </button>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {

  name: 'PromotionFeed',

  components: {
  },

  props: {
    contenteditable: {
      type: [Boolean, String]
    },
    
    room_id: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    ...mapGetters({
      country: 'location/country',
      feed: 'promotions/feed',
      room: 'rooms/room'
    })
  },

	data: () => ({
    per_page: 3,
    total: null,
    next_page_url: null,
	}),

  created() {

  },

  fetchOnServer: false,

  async fetch() {
    await axios.get('/promotion/feed', {
      params: {
        per_page: this.per_page,
        room_id: this.room_id
      }
    }).then((response) => {
      this.$store.commit('promotions/FETCH_FEED', { feed: response.data.data })
      $nuxt.$loading.finish()
      this.total = response.data.total
      this.next_page_url = response.data.next_page_url
    }).catch(e => {

    })
  },

  watch: {

  },

	methods: {
    handleLoadMore() {
      this.per_page = this.total
      $nuxt.$loading.start()
      this.$fetch()
    },

    handleHide() {
      $nuxt.$loading.start()
      this.per_page = 3
      this.$fetch()
    }
	},
}
</script>

<style lang="scss">
.promotions-table {
  border: 1px solid #E9E9E9;
  margin: 28px 0 32px 0;
  margin-bottom: 20px!important;
}

.promotions {
  &__more {
    padding: 6px 15px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 14px;
    line-height: 14px;
    border: 1px solid rgba(0, 139, 226, 0.5);
    background: transparent;
    color: #008BE2;
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