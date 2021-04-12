<template>
<div class="bonus-current-list">
  <div class="bonus-current-list__title">Текущие акции рума</div>

  <div class="bonus-current-list__wrap">
    <carousel
      :navigationEnabled="true"
      :perPageCustom="[[0, 3]]"
      :pagination-enabled="false"
      navigation-next-label=""
      navigation-prev-label=""
      :navigation-click-target-size="0"
    >
      <slide v-for="(item, index) in promotions" :key="index">
        <nuxt-link
          :to="{
            name: 'index',
            params: { 
              parent: item.page.parent ? item.page.parent.slug : null,
              child: item.page.slug
            }
          }"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
          <a :href="href" @click="navigate" class="bonus-current">
            <svg-icon class="bonus-current__icon" :width="46" :height="46" :icon="promotion.room.slug" viewBox="0 0 200 200" />
            <div class="bonus-current__wrap">
              <span class="bonus-current__category" :style="{
                color: item.category.label_color,
                border: `1px solid ${item.category.label_color}`
              }">{{ item.category.title }}</span>
              <span class="bonus-current__title">{{ item.title }}</span>
            </div>
          </a>
        </nuxt-link>
      </slide>
    </carousel>
  </div>

</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'BonusCurrent',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      promotions: 'promotions/items',
      promotion: 'promotions/promotion'
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
$ico-bonus-slider-arrow: url('~assets/i/ico-bonus-slider-arrow.svg?data');

.bonus-current {
  display: flex;
  margin-right: 24px;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }
  &-list {
    position: relative;
    z-index: 1;
    padding: 56px;
    margin: -76px -56px -28px -56px;
    background: radial-gradient(189.6% 133.3% at 57.43% 2.13%, #21232D 0%, #3A3E51 100%);
    border-radius: 16px;
    &__wrap {
      min-height: 64px;
    }
    &__title {
      margin-bottom: 20px;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #999999;
    }
  }
  &__wrap {
    font-size: 0;
  }
  &__icon {
    margin-right: 12px;
    flex: 0 0 46px;
    border-radius: 4px;
  }

  &__title {
    display: block;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 18px;
    color: #FAFAFA;
  }

  &__category {
    text-transform: uppercase;
    display: inline-block;
    padding: 3px 8px 1px 8px;
    margin-bottom: 8px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.2px;
    border-radius: 100px;
  }
}

.VueCarousel-navigation-button {
  position: relative;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  top: 0!important;
  transform: none!important;
  background: #292C38!important;
  &:before {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    content: '';
    width: 40px;
    height: 40px;
    background: $ico-bonus-slider-arrow no-repeat 13px center;
  }
}

.VueCarousel-navigation-prev {
  left: -75px!important;
}

.VueCarousel-navigation-next {
  right: -75px!important;
  &:before {
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
}
</style>