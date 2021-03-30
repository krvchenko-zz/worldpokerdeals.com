<template>
  <div class="rating">
    <div class="rating__stars">
      <div :style="style"></div>
    </div>
    <div class="rating__digit">
      <span class="rating__value">{{ value }}</span>
      <span class="rating__delimeter">{{ delimeter }}</span>
      <span class="rating__max">{{ maxVal }}</span>
    </div>
  </div>
</template>

<script>

export default {

  name: 'Rating',

  props: {
    value: {
      type: [String, Number],
      default: 0
    },

    maxVal: {
      type: Number,
      default: 5
    },

    delimeter: {
      type: String,
      default: '/'
    }
  },

  created() {

  },

  data: () => ({

  }),

  computed: {
    style() {
      return {
        width: `${(this.value * 19) - 2}px`
      }
    },
  },

  watch: {

  },

  methods: {

  }
}
</script>

<style lang="scss"> 
$ico-rating: url('~assets/i/ico-rating-small.svg?data');
.rating {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-flow: wrap;
  font-size: 0;
  &__value {
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 12px;
    letter-spacing: 1px;
    color: #FEB83C;
  }
  &__delimeter {
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 12px;
    letter-spacing: 1px;
    color: #BEBEBE;
  }
  &__max {
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 1px;
    color: #BEBEBE;
  }

  &__stars {
    margin-right: 20px;
    width: 90px;
    height: 14px;
    flex: 0 0 90px;
    background-image: $ico-rating;
    background-repeat: repeat-x;
    background-position: 0px -14px;
    div {
      width: 0px;
      height: 14px;
      background-image: $ico-rating;
      background-repeat: repeat-x;
      background-position: 0px 0px;
    }
  }

  &__digit {
    white-space: nowrap;
  }
}
</style>