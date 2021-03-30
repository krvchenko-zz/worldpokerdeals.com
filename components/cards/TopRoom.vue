<template>
<div :class="['top-room']">

  <div class="top-room__label">
    <div class="top-room__label-wrap">{{ label }}</div>
  </div>

  <div class="top-room__header">
    <svg-icon class="top-room__icon" :icon="slug" :width="88" :height="88" viewBox="0 0 200 200"/>
    <div class="top-room__info">
      <rating class="top-room__rating" :value="rating"/>
      <div class="top-room__title">{{ title }}</div>
      <nuxt-link :to="{
        name: 'index', params: {parent: 'rakeback-deals', child: review.url}
      }" v-slot="{ href, route, navigate }">
        <a :class="['btn', 'top-room__link top-room__link_review']" :href="href" @click="navigate">{{ review.name }}</a>
      </nuxt-link>
    </div>
  </div>

  <div class="top-room__footer">
    <div v-if="bonus" class="top-room-bonus">
      <svg-icon class="top-room-bonus__icon" icon="room-top-bonus" :width="24" :height="24" :opacity="1" :fill="bonus_category_label" viewBox="-6 -6 24 24"/>
      <div :style="{borderColor: bonus_category_label, color: bonus_category_label}" class="top-room-bonus__category">{{ bonus_category }}</div>
      <div class="top-room-bonus__title">{{ bonus }}</div>
    </div>
    <div class="top-room__actions">
      <nuxt-link v-if="review" :to="`/rakeback-deals/${review.url}/play`" v-slot="{ href, route, navigate }">
          <a :class="['btn', 'btn-block', 'btn-action', 'top-room__link', 'top-room__link_download']" :href="href" @click="navigate">Перейти</a>
      </nuxt-link>
    </div>

    <div class="top-room__geo">
      <span :class="{
        'top-room__avaliable': true,
        [`top-room__avaliable_yes`]: !restricted,
        [`top-room__avaliable_no`]: restricted
      }">
        <svg-icon class="top-room__geo-icon" :width="16" :height="16" :icon="country.code" prefix="flags/"/><template v-if="restricted">Недоступен игрокам из {{ country.from }}!</template><template v-else>Доступен игрокам из {{ country.from }}</template>
      </span>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Rating from '~/components/Rating'

export default {

  name: 'TopRoom',

  components: {
    Rating
  },

  props: {

    id: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true
    },

    rating: {
      type: [String, Number],
      required: true
    },

    bonus: {
      type: [String, Number],
      default: 'n/a'
    },

    review: {
      type: Object,
      required: true
    },

    bonus_category_label: {
      type: String,
    },

    bonus_category: {
      type: String,
    },

    label: {
      type: String,
      default: 'Лучший покер-рум'
    },

    restricted: {
      type: Boolean,
    },

    country: {
      type: Object,
    }

  },

  created() {

  },

  data: () => ({

  }),

  computed: {

    img() {
      return `${this.mediaUrl}/room-card/${this.image.filename}`
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

$label-bg: url('~assets/i/ico-card-label.svg?data');

.top-room {
  max-width: 326px;
  float: right;
  margin: -18px 0 32px 0;
  position: relative;
  &__header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    padding: 28px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #E9E9E9;
  }
  &__icon {
    border-radius: 50%;
    flex: 0 0 88px;
  }
  &__info {
    padding-left: 24px;
  }
  &__title {
    margin-bottom: 12px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 22px;
    letter-spacing: -0.1px;
    color: #222222;
  }
  &__rating {
    justify-content: normal;
    margin-bottom: 8px;
  }

  &__label {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    top: -8px;
    white-space: nowrap;
    padding: 0 20px;
    position: absolute;
    min-height: 24px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #222222;
    &:before {
      content: '';
      top:0;
      left: 0;
      position: absolute;
      display: block;
      width: 20px;
      height: 24px;
      background: $label-bg no-repeat center;
    }
    &:after {
      content: '';
      top:0;
      right: 0;
      position: absolute;
      display: block;
      width: 20px;
      height: 24px;
      background: $label-bg no-repeat center;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    &-wrap {
      margin: 0 -1px;
      padding: 4px 11px;
      background: linear-gradient(0deg, #FFC255, #FFC255), #EAC24A;
    }
  }

  &__link {
    &_review {
      padding: 4px 12px;
      background: #FFFFFF;
      border: 1px solid rgba(204, 204, 204, 0.7);
      box-sizing: border-box;
      border-radius: 3px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #777777;
      &:hover,
      &:active,
      &:focus,
      &:visited {
        color: #555555;
        background: rgba(204, 204, 204, 0.7);
      }
    }
  }

  &__footer {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 28px 28px 16px 28px;
    background: #FFFFFF;
  }

  &__geo {
    margin-top: 10px;
    &-icon {
      margin-right: 10px;
    }
  }

  &__avaliable {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 16px;
    color: #777777;
  }

  &-bonus {
    text-align: center;
    &__category {
      margin-top: 4px;
      margin-bottom: 12px;
      display: inline-block;
      text-align: center;
      // background: #55BF4F;
      border: 1px solid #FFFFFF;
      border-radius: 20px;
      padding: 4px 12px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.5px;
      color: #FAFAFA;
      text-transform: uppercase;
    }

    &__title {
      margin-bottom: 12px;
      text-align: center;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #222222;
    }

    &__icon {
      margin: -48px auto 0 auto;
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      background: #FFFFFF;
    }
  }
}
</style>