<template>
<div :class="['room-item', small && 'room-item_s']">
  <nuxt-link v-if="review" :to="{name: 'index', params: {parent: 'rakeback-deals', child: review.slug}}" v-slot="{ href, route, navigate }">
    <a :href="href" @click="navigate" :class="['room-item__img-wrap', small && 'room-item__img-wrap_s']" :style="{backgroundColor: background}">
      <img :class="['room-item__img', small && 'room-item__img_s', !available && 'room-item__img_disabled']" decoding="async" loading="lazy" :src="img" :alt="image.alt || `${title} logo`">
      <img
        v-if="blacklist"
        class="room-item__blacklist"
        decoding="async"
        loading="lazy"
        width="103px"
        height="96px"
        src="~assets/icons/ico-blacklist-label.svg"
        alt="Blacklist label"
      >
    </a>
  </nuxt-link>

  <div :class="['room-item__wrap', small && 'room-item__wrap_s']">

        <div :class="['room-item__top', small && 'room-item__top_s']">
          <div :class="['room-item__title', small && 'room-item__title_s']">{{ title }}</div>
          <div v-if="network" :class="['room-item__network', small && 'room-item__network_s']">{{ network.title }}</div>
        </div>

        <div v-if="!small && !blacklist" class="room-item__geo">
          <span :class="{
            'room-item__avaliable': true,
            [`room-item__avaliable_yes`]: !restricted,
            [`room-item__avaliable_no`]: restricted
          }">
            <svg-icon class="room-item__geo-icon" :width="16" :height="16" :icon="country.code" prefix="flags/"/><template v-if="restricted">Недоступен игрокам из {{ country.from }}!</template><template v-else>Доступен игрокам из {{ country.from }}</template>
          </span>

        </div>

        <div v-if="tags.length && !blacklist" :class="['room-item__tags-list', small && 'room-item__tags-list_s']">
          <span v-for="(item, index) in tags" :key="index" :class="['room-item__tag']" :title="item.title">{{ item.title }}</span>
        </div>

        <div
          v-if="blacklist"
          :class="[
            'room-item__summary',
            'room-item__summary_blacklist'
          ]" v-html="summary"></div>


        <div :class="['room-item__rating', !available || blacklist && 'room-item__rating_disabled']">
          <rating :value="rating"/>
        </div>

        <dl v-if="available && !blacklist" class="room-item__details">
          <dt class="room-item__dt">Бонус</dt>
          <dd class="room-item__dd">{{ bonus || 'n/a' }}</dd>
          <dt class="room-item__dt room-item__dt_rakeback">Рейкбек</dt>
          <dd class="room-item__dd room-item__dd_rakeback">{{ rakeback }}</dd>
        </dl>

        <div class="room-item__claim" v-if="blacklist">
          <span class="room-item__claim-label">Сумма претензии</span>
          <span class="room-item__claim-amount">{{ claim_currency.symbol }}{{ claim_amount }}</span>
        </div>

        <!-- TODO -->
        <div v-if="!available" class="room-item__unavailable">К сожалению, сделка временно недоступна!</div>

      <div class="room-item__actions">

      <nuxt-link v-if="review" :to="{name: 'index', params: {parent: 'rakeback-deals', child: review.slug}}" v-slot="{ href, route, navigate }">
          <a :class="[
            'btn', 'btn-block',
            'room-item__link',
            'room-item__link_review',
            small && 'room-item__link_s',
          ]" :href="href" @click="navigate">Обзор</a>
      </nuxt-link>

      <room-action-button
        v-if="!blacklist"
        label="Перейти"
        type="download"
        :class="[
          'btn-block',
          'room-item__link',
          'room-item__link_download',
          small && 'room-item__link_s'
        ]"
        :icon="false"
        :disabled="!available"
        :slug="slug"
      />

      <button v-if="blacklist" :class="[
        'btn',
        'btn-block',
        'room-item__link',
        'room-item__link_blacklist',
        small && 'room-item__link_s'
      ]" @click="handleBlackList">Представитель рума?</button>

      </div>


  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '~/utils/event-bus'
export default {
  name: 'Room',
  components: {
  },
  props: {
    id: {
      type: [Number, String],
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
    converter: {
      type: [Boolean, Number],
      default: false
    },
    restricted: {
      type: [Boolean, Number],
      default: false
    },
    summary: {
      type: String
    },
    available: {
      type: Boolean,
      default: true
    },
    blacklist: {
      type: Boolean,
      default: false
    },
    claim_amount: {
      type: [Number, String],
      default: 0
    },
    claim_currency: {
      type: Object,
      default: () => {
        return {
          symbol: '$',
          code: 'usd'
        }
      }
    },
    rakeback: {
      type: [String, Number],
      default: 'n/a'
    },
    bonus: {
      type: [String, Number],
      default: 'n/a'
    },
    background: {
      type: String,
      default: '#000000'
    },
    image: {
      type: [String, Object],
      required: true
    },
    network: {
      type: [String, Object],
      required: true
    },
    tags: {
      type: [Array],
      default() {
        return []
      }
    },
    review: {
      type: [Object, String, Boolean],
      default: () => {
        return {
          parent: null,
          child: null,
        }
      }
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      geo: 'location/geo',
      country: 'location/country',
    }),
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
    handleBlackList() {
      eventBus.$emit('roomAction:click', { type: 'blacklist', title: this.title })
    }
  }
}
</script>

<style scoped lang="scss">
$ico-room-unavailable: url('~assets/i/ico-room-unavailable.svg?data');
$ico-blacklist-summary: url('~assets/i/ico-blacklist-summary.svg?data');
.room-item {
  margin: 20px 0;
  display: grid;
  grid-template-columns: 2fr 7fr;
  column-gap: 28px;
  row-gap: 8px;
  min-height: 148px;
  border-radius: 4px;
  padding-right: 28px;
  border: 1px solid #E9E9E9;
  background: #FAFAFA;
  transition: all 0.5s ease;
  overflow: hidden;
  &:hover {
    border: 1px solid transparent;
    background: #FFFFFF;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  }
  &__wrap {
    width: 100%;
    display: grid;
    align-items: center;
    padding: 20px 0;
    grid-template-columns: 3fr 2fr 1.86fr;
    column-gap: 28px;
    grid-template-areas:
      "title rating buttons"
      "geo bonus buttons"
      "tags bonus buttons";
    &_s {
      padding: 16px 0;
    }
  }
  &__img {
    &-wrap {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &_s {
        flex: 0 0 180px;
      }
    }
    display: block;
    max-width: 80%;
    max-height: 80%;
    &_disabled {
      filter: grayscale(1);
    }
  }
  &__summary {
    margin-top: 4px;
    ul {
      padding: 0;
      margin: 0;
      li {
        position: relative;
        list-style: none;
        margin-bottom: 8px;
        font-family: Proxima Nova;
        font-size: 14px;
        line-height: 16px;
        color: #555555;
        &:last-child {
          margin: 0;
        }
      }
    }
    &_blacklist {
      ul {
        li {
          padding-left: 24px;
          background: $ico-blacklist-summary no-repeat left 2px;
        }
      }
    }
  }
  &__blacklist {
    right: 0;
    top: 0;
    position: absolute;
  }
  &__claim {
    &-label {
      margin-bottom: 4px;
      display: block;
      font-family: 'Proxima Nova Sb';
      font-size: 14px;
      line-height: 16px;
      color: #555555;
    }
    &-amount {
      display: block;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      color: #DB1414;
    }
  }
  &__info {
    padding: 0 30px;
    width: 100%;
    display: flex;
    flex-grow: 1;
    &_s {
      padding: 0 20px 0 16px;
    }
  }
  &__actions {
    grid-area: buttons;
    flex: 0 0 210px;
    align-self: baseline;
    &_s {
      padding-right: 20px;
      flex: 0 0 170px;
    }
  }
  &__col {
    flex-grow: 1;
    &:nth-child(1) {
      width: 60%;
      padding-right: 20px;
      border-right: 1px solid #E9E9E9;
    }
    &:nth-child(2) {
      width: 40%;
      padding-left: 20px;
    }
    &_s {
      &:nth-child(1) {
        width: 50%;
      }
      &:nth-child(2) {
        width: 50%;
      }
    }
  }
  &__top {
    grid-area: title;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-between;
    &_s {
      display: block;
      margin-bottom: 4px;
    }
  }
  &__title {
    margin-right: 5px;
    color: #243238;
    letter-spacing: -0.1px;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    font-family: 'Proxima Nova';
    white-space: nowrap;
    &_s {
      margin-bottom: 4px;
      margin-right: 0;
      font-size: 18px;
      line-height: 20px;
      color: #222222;
    }
  }
  &__network {
    white-space: nowrap;
    padding: 4px 8px;
    display: inline-block;
    border-radius: 50px;
    border: 1px solid #E9E9E9;
    text-align: center;
    color: #777777;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 14px;
    &_s {
      margin: 0;
      border: none;
      border-radius: 0;
      display: block;
      padding: 0;
      text-align: left;
    }
  }
  &__geo {
    grid-area: geo;
    display: flex;
    flex-grow: 1;
    &-icon {
      margin-right: 8px;
    }
  }
  &__flag {
    margin-right: 10px;
    flex: 0 0 16px;
  }
  &__label {
    color: #777777;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 16px;
    &_restricted {
      color: #FF4151;
    }
  }
  &__tags-list {
    grid-area: tags;
    font-size: 0;
    &_s {
      margin-top: 12px;
    }
  }
  &__tag {
    padding: 5px 8px 4px 8px;
    margin: 0 5px 5px 0;
    display: inline-block;
    background: #E9E9E9;
    border-radius: 2px;
    color: #777777;
    white-space: nowrap;
    text-transform: uppercase;
    font-family: 'Proxima Nova Sb';
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.2px;
  }
  &__details {
    grid-area: bonus;
    margin: 0;
    font-size: 0;
  }
  &__dt {
    margin-bottom: 16px;
    width: 50%;
    display: inline-block;
    vertical-align: middle;
    color: #555555;
    font-family: 'Proxima Nova';
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    &_rakeback {
      margin: 0;
    }
  }
  &__dd {
    margin-bottom: 16px;
    width: 50%;
    display: inline-block;
    vertical-align: middle;
    color: #243238;
    font-weight: normal;
    font-style: normal;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 16px;
    text-align: right;
    &_rakeback {
      margin: 0;
    }
  }
  &__link {
    padding: 11px 20px;
    border-radius: 3px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 18px;
    &_review {
      grid-area: review;
      margin-bottom: 10px;
      color: #777777;
      background: #DFE4E6;
      &:hover,
      &:active,
      &:focus,
      &:visited {
        color: #777777;
      }
    }
    &_download {
      grid-area: download;
      color: #FFFFFF;
      background: #FF4151;
      &:hover,
      &:active,
      &:focus,
      &:visited {
        color: #ffffff;
      }
    }
    &_disabled {
      cursor: not-allowed;
      background: #AAAAAA;
      &:hover,
      &:active,
      &:focus {
        background: #AAAAAA;
      }
    }
    &_blacklist {
      padding: 11px;
      border: 1px solid #E9E9E9;
      font-family: 'Proxima Nova Sb';
      font-size: 14px;
      line-height: 16px;
      color: #999999;
      background: transparent;
    }
    &_s {
      padding: 10px 20px;
      font-size: 14px;
      line-height: 16px;
    }
  }
  &__rating {
    grid-area: rating;
    &_disabled {
      filter: grayscale(1);
    }
  }
  &__avaliable {
    display: flex;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 16px;
    background-repeat: no-repeat;
    background-size: 16px;
    &_yes {
      color: #777777;
    }
    &_no {
      color: #EB5757;
    }
  }
  &__unavailable {
    position: relative;
    padding-left: 30px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: #777777;
    &:before {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 18px;
      height: 16px;
      display: block;
      background: $ico-room-unavailable no-repeat center;
      background-size: contain;
    }
  }
}
/* @include mq('laptop') { */
@media (max-width: 1000px) {
  .room-item {
    grid-template-columns: 1fr minmax(0, 3fr);
    column-gap: 20px;
    &__wrap {
      grid-template-columns: minmax(0, 4.5fr) minmax(0, 3.5fr);
      column-gap: 20px;
      grid-template-areas:
        "title rating"
        "geo bonus"
        "tags  bonus"
        "buttons buttons";
    }
    &__info {
      padding: 0;
    }
    &__col {
      flex-grow: 0;
      &:nth-child(1) {
        width: auto;
      }
      &:nth-child(2) {
        width: auto;
        padding-right: 20px;
      }
    }
    &__actions {
      display: flex;
      flex: 0;
      align-items: center;
      padding-top: 20px;
      padding-right: 0;
      width: 100%;
    }
    &__link_review {
      margin-bottom: 0;
      margin-right: 20px;
      max-width: 267px;
    }
    &__link_download {
      max-width: 207px;
    }
  }
}
@include mq('tablet') {
  .room-item {
    column-gap: 16px;
    &__wrap {
      row-gap: 12px;
      grid-template-areas:
        "title rating"
        "tags tags"
        "bonus bonus"
        "geo geo"
        "buttons buttons";
    }
    &__top {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
    &__network {
      margin-bottom: 8px;
    }
    &__actions {
      padding-top: 0;
    }
    /* TODO */
    .rating {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }
    .rating__stars {
      flex: 0;
      margin-bottom: 12px;
      margin-right: 0;
    }
  }
}
@include mq('mobile') {
  .room-item {
    column-gap: 16px;
    @include paddings('mobile');
    margin-left: -20px;
    margin-right: -20px;
  }
}
</style>