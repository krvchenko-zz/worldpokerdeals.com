<template>
  <div class="filters">

    <div class="filters__label">Фильтры</div>

    <div v-if="category.entity === 'promotion'" class="filter">
      <filter-item :count="exclusive.count">
        <checkbox
          v-model="selected.exclusive"
          label="Только эксклюзивные"
          @change="handleFilterChange"
          :trueValue="1"
          :falseValue="null"
        />
      </filter-item>
    </div>

    <filter-dropdown
      v-if="category.is_general"
      :label="category.entity === 'promotion' ? 'Тип акции' : 'Тип бонуса'"
      icon="filter-promotion-category"
    >
      <filter-item v-if="categories.length" v-for="(item, index) in categories" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.categories"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="category.entity === 'promotion'"
      label="По дисциплинам"
      icon="filter-discipline"
    >
      <filter-item v-if="disciplines.length" v-for="(item, index) in disciplines" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.disciplines"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="category.entity === 'promotion'"
      label="Формат игры"
      icon="filter-game"
    >
      <filter-item v-if="games.length" v-for="(item, index) in games" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.games"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="category.entity === 'promotion'"
      label="Лимиты"
      icon="filter-limit"
    >
      <filter-item v-if="limits.length" v-for="(item, index) in limits" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.limits"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Покер-румы"
      icon="filter-room"
    >
      <filter-item v-if="rooms.length" v-for="(item, index) in rooms" :key="index"
        :icon="item.slug"
        :count="item.count"
      >
        <checkbox
          v-model="selected.rooms"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Сети"
      icon="filter-network"
    >
      <filter-item v-if="networks.length" v-for="(item, index) in networks" :key="index"
        :icon="item.slug"
        :count="item.count"
      >
        <checkbox
          v-model="selected.networks"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'


export default {

  name: 'PromotionCategoryFilters',

  components: {
  },

  props: {

    geo: {
      required: true
    },

    categories: {
      type: Array,
    },

    disciplines: {
      type: Array,
    },

    limits: {
      type: Array,
    },

    games: {
      type: Array,
    },

    rooms: {
      type: Array,
    },

    networks: {
      type: Array,
    },

    exclusive: {
      type: Object,
    },

  },

  updated() {

  },

	created() {

	},

	data: () => ({
    newRooms: [],
    loading: false,
    selected: {
      exclusive: null,
      categories: [],
      disciplines: [],
      limits: [],
      games: [],
      rooms: [],
      networks: [],
    }
	}),

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
      category: 'promotions/category',
      items: 'promotions/items'
    }),
  },

  watch: {

  },

	methods: {
    handleFilterChange() {
      this.$emit('change', this.selected)
    },
	}
}
</script>

<style lang="scss">
$ico-filters: url('~assets/i/ico-filters.svg?data');

.filters {
  margin-bottom: 40px;
  border-radius: 4px;
  overflow: hidden;
  background: #2E3141;
  box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
}

.filters__label {
  position: relative;
  padding: 20px 24px;
  font-family: 'Proxima Nova';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.2px;
  color: #FFFFFF;
  background: #2E3141;
  &:after {
    right: 20px;
    top: 12px;
    position: absolute;
    content: '';
    width: 33px;
    height: 34px;
    background: $ico-filters no-repeat center;
  }
}

.filter {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #E9E9E9;
  border-bottom: 0;
  background: #FAFAFA;
  padding: 20px;
  .filter-item {
    padding: 0
  }
}
</style>