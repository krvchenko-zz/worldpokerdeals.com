<template>
<div class="front-features">
  <div class="container-fluid">
    <div class="front-features__label">Мы в цифрах</div>
    <div class="front-features__list">
      <div class="front-feature" v-for="(item, index) in features" :key="index">
        <span class="front-feature__value">{{ item.value }}</span>
        <span class="front-feature__label" v-html="item.label"></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'FrontFeatures',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({
    features: [
      {
        label: 'Лет на <br>  рынке',
        value: '7'
      },{
        label: 'Покерных  <br> румов',
        value: '150'
      },{
        label: 'Клубов',
        value: '26'
      },{
        label: 'Партнеров',
        value: '70'
      },{
        label: 'Активных  <br> игроков',
        value: '10 000'
      },{
        label: 'Аффилейт-менеджеров  <br> в команде',
        value: '10'
      },
    ]
	}),

  async fetch() {

  },

  computed: {
    ...mapGetters({
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.front-features {
  padding-bottom: 40px;
  &__list {
    display: flex;
    justify-content: center;
  }
  &__label {
    margin-bottom: 24px;
    font-family: 'Proxima Nova Sb';
    font-size: 28px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.2px;
    color: #555555;
  }
}

.front-feature {
  margin-right: 100px;
  position: relative;
  &:last-child {
    margin: 0;
  }
  &__value {
    padding-bottom: 12px;
    margin-bottom: 16px;
    position: relative;
    display: inline-block;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 41px;
    line-height: 50px;
    letter-spacing: -1px;
    font-feature-settings: 'salt' on;
    color: #777777;
    &:after {
      content: '';
      left: 0;
      bottom: 0px;
      position: absolute;
      width: 100%;
      height: 4px;
      display: block;
      background: #5F6377;
    }
  }

  &__label {
    display: block;
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 20px;
    color: #90939D;
  }
}
</style>