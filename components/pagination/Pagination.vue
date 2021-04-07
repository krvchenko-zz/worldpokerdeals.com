<template>
<div class="pagination">
  <button 
    v-if="nextUrl"
    :style="{
      width: loadMoreWidth ? `${loadMoreWidth}px` : 'auto'
    }"
    :class="['btn', 'btn-sm', 'btn-primary', 'btn-pagination_more']"
    @click="handleShowMore">{{ loadMoreText }}</button>
  <ul class="pagination__list">
    <li v-if="prevUrl" :class="['pagination__item', 'pagination__item_prev']">
      <button :disabled="!prevUrl" :class="['btn', 'btn-pagination', 'btn-pagination_prev']" aria-label="Previous" @click="handlePagePrev">
      </button>
    </li>
    <li v-for="(item, index) in pages" :key="index" :class="['pagination__item', item.number === current && 'pagination__item_active']">
      <button
        :class="['btn', 'btn-pagination',
          item.number === current && 'btn-pagination_active'
        ]" 
        :disabled="item.number === current"
        @click="handlePageChange(item.number)"
      >{{ item.number }}</button>
    </li>
    <li v-if="nextUrl" :class="['pagination__item', 'pagination__item_next']">
      <button :class="['btn', 'btn-pagination', 'btn-pagination_next']" aria-label="Next" :disabled="!nextUrl" @click="handlePageNext">
      </button>
    </li>
  </ul>
  <div class="pagination-info">{{ from }}–{{ to }} из {{ total }} {{ totalText }}</div>
</div>
</template>

<script>

export default {

  name: 'Pagination',

  components: {

  },

  props: {
    last: {
      type: Number,
      required: true,
    },

    current: {
      type: Number,
      required: true,
    },

    prevUrl: {
      type: String,
      required: false,
    },

    nextUrl: {
      type: String,
      required: false,
    },

    from: {
      type: Number,
      required: true,
    },

    to: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    totalText: {
      type: String,
      default: ''
    },

    loadMoreText: {
      type: String,
      default: 'Показать еще'
    },

    loadMoreWidth: {
      type: Number
    },
  },

  created() {

  },

  data: () => ({

  }),

  computed: {
    pages() {

      let range = []

      for (var i = 0; i < this.last; i++) {
        range.push({
          number: i + 1
        })
      }

      if (this.current > 3 && this.current + 3 < this.last) {
        range = range.slice(this.current - 3, this.current + 2)
      } else if(this.current + 2 >= this.last) {
        range = range.slice(Math.max(0, this.last - 5), this.last)
      } else {
        range = range.slice(0, 5)
      }

      return range
    }
  },

  watch: {

  },

  methods: {
    handlePageNext() {
      this.$emit('next', this.current + 1)
    },

    handlePagePrev() {
      this.$emit('prev', this.current - 1)
    },

    handlePageChange(number) {
      if (number === this.current) return false
      this.$emit('change', number)
    },

    handleShowMore() {
      if (!this.nextUrl) return false
      this.$emit('more')
    },
  }
}
</script>

<style lang="scss">
.pagination {
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  &__list {
    padding: 0;
    margin: 0 28px 0 0;
    display: flex;
    align-items: center;
  }

  &__item {
    list-style: none;
    overflow: hidden;
    border-top: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    &:first-child {
      border-left: 1px solid #E9E9E9;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-right: 1px solid #E9E9E9;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &_prev {
      border-right: 1px solid #E9E9E9;
    }
    &_next {
      border-left: 1px solid #E9E9E9;
    }
    &:hover,
    &:focus,
    &:active {
      border-color: #2E87C8;
    }
    &_active {
      border-color: #C6C7CA;
      border-left: 0!important;
      border-right: 0!important;
      &:hover,
      &:focus,
      &:active {
        border-color: #C6C7CA;
      }
    }
  }

  &-info {
    line-height: 36px;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 16px;
    color: #555555;
  }
}

.btn-pagination {
  border-radius: 0;
  padding: 2px;
  min-width: 36px;
  display: block;
  position: relative;
  font-family: Proxima Nova;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #777777;
  background: #FFFFFF;
  &_prev {
    &:before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 4px 4px 0;
      border-color: transparent #c6c7ca transparent transparent;
    }

    &:hover,
    &:focus,
    &:active {
      color: #FFFFFF;
      background: #2E87C8;
      &:before {
        border-color: transparent #FFFFFF transparent transparent;
      }
    }
  }

  &_next {
    &:before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 4px;
      border-color: transparent transparent transparent #c6c7ca;
    }

    &:hover,
    &:focus,
    &:active {
      color: #FFFFFF;
      background: #2E87C8;
      &:before {
        border-color: transparent transparent transparent #FFFFFF;
      }
    }
  }

  &:hover,
  &:focus,
  &:active {
    color: #FFFFFF;
    background: #2E87C8;
  }

  &_active {
    color: #FFFFFF;
    background: #C6C7CA;
    &:hover,
    &:focus,
    &:active {
      color: #FFFFFF;
      background: #C6C7CA;
    }
  }

  &_more {
    margin: 0 28px 0 0;
    width: auto;
    padding: 10px 20px;
  }
}
</style>