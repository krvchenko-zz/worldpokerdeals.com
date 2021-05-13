<template>
<nav class="page-menu" :style="{width: `${width}px`}">
  <slot name="before" />

  <div class="page-menu__wrap">
    <ul :style="{
      width: `${100 / columns}%`
    }" v-if="groups[n -1]" class="page-menu__list" v-for="n in columns" :key="n">
      <page-menu-item
        v-for="(item, index) in groups[n - 1]" :key="index"
        :label="item.name"
        :text="item.text"
        :icon="item.icon"
        :page="item.page"
      />
    </ul>
  </div>

  <slot name="after" />
</nav>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'PageMenu',

  components: {

  },

  props: {
    items: {
      type: Array,
      required: true
    },

    width: {
      type: Number,
      default: 300
    },

    columns: {
      type: Number,
      default: 1
    },

    perColumn: {
      type: Number,
      default: 5
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      country: 'location/country',
      topList: 'rooms/topList',
      menuItems: 'menu/items',
    }),

    groups() {
      return this.items.reduce((array, item, index) => {
        const chunck = Math.floor(index/this.perColumn)

        if(!array[chunck]) {
          array[chunck] = []
        }

        array[chunck].push(item)

        return array
      }, [])
    }
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.page-menu {
  display: none;
  width: 300px;
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 1;
  background: #2B2E3B;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  align-items: stretch;
  &__wrap {
    flex-grow: 1;
    display: flex;
    flex-flow: wrap;
  }
  &__list {
    position: relative;
    list-style: none;
    padding: 12px 0;
    margin: 0;
  }
}

.header-nav__item:hover {
  .page-menu {
    display: flex;
  }
}
</style>
