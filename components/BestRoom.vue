<template>
<div class="best-room">
  <div class="container-fluid">
    <div class="best-room__wrap">
     <div class="best-room__item best-room__item_left" :style="{ backgroundColor: background }">
      <div class="best-room__geo">
        <div class="best-room__geo-label">Лучший рум</div>
        <div class="best-room__geo-wrap">
          <svg-icon class="best-room__geo-flag" prefix="flags/" :icon="country.code" :width="20" :height="20"/>
          <span class="best-room__geo-country">{{ country.title }}</span>
        </div>
      </div>
      <div class="best-room__logo">
        <img decoding="async" loading="lazy" :src="img" :alt="image.alt || `${title} logo`">
      </div>
      <div class="best-room__action">
        <nuxt-link :to="{
          name: 'index', params: {parent: 'rakeback-deals', child: review.url}
        }" v-slot="{ href, route, navigate }">
          <a :class="['btn', 'btn-block', 'btn-border', 'best-room__link']" :href="href" @click="navigate">{{ review.name }}</a>
        </nuxt-link>
      </div>
     </div>
     <div class="best-room__item best-room__item_right" :style="{ backgroundColor: '#4E5262' }">
      <div class="best-room__description">Закрытые азиатские клубы, статистика рейка, бесплатные хендхистори и приватные офферы</div>
      <div class="best-room__action">
        <nuxt-link to="/auth/register" v-slot="{ href, route, navigate }">
          <a :class="['btn', 'btn-block', 'btn-action', 'best-room__register']" :href="href" @click="navigate">Регистрируйтесь</a>
        </nuxt-link>
      </div>
     </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'BestRoom',

  components: {

  },

  props: {
    title: {
      type: String,
      required: true
    },
    background: {
      type: String,
      default: '#000000'
    },
    image: {
      type: [String, Object],
      required: true
    },
    review: {
      type: Object,
      required: true
    },
    country: {
      type: Object,
      required: true
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    // ...mapGetters({
    //   'topList': 
    // }),
    img() {
      return `${this.mediaUrl}/room-card/${this.image}`
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.best-room {
  z-index: 10;
  position: relative;
  margin: -45px 0;
  &__wrap {
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
  }
  &__item {
    padding: 24px 32px 24px 28px;
    width: 50%;
    display: flex;
    justify-content: space-between;
    &_left {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &_right {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &__geo {
    &-label {
      margin-bottom: 4px;
      font-family: 'Proxima Nova Sb';
      font-size: 14px;
      line-height: 16px;
      color: #CCCCCC;
    }

    &-wrap {
      display: flex;
      align-items: center;
    }

    &-flag {
      margin-right: 8px;
    }

    &-country {
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 18px;
      line-height: 20px;
      color: #FFFFFF;
    }
  }

  &__description {
    padding-right: 36px;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 18px;
    color: #F1EFEF;
  }

  &__register {
    padding: 11px 40px 10px 40px;
  }
}
</style>