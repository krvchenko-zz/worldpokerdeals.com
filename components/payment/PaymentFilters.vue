<template>
  <div class="filters">

    <div class="filters__label">Фильтры</div>

    <filter-dropdown
      label="Тип рума"
      icon="filter-room-type"
    >
      <filter-item v-if="types.length" v-for="(item, index) in types" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.types"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Платежки"
      icon="filter-payments"
    >
      <filter-item v-if="payments.length" v-for="(item, index) in payments" :key="index"
        :count="item.count"
        :icon="`${item.slug}-color-square`"
      >
        <checkbox
          v-model="selected.payments"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Платформы"
      icon="filter-platforms"
    >
      <filter-item v-if="platforms.length" v-for="(item, index) in platforms" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.platforms"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Лицензии"
      icon="filter-licenses"
    >
      <filter-item v-if="licenses.length" v-for="(item, index) in licenses" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.licenses"
          :value="item.value"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Верицикация"
      icon="filter-kyc"
    >
      <filter-item v-if="kycs.length" v-for="(item, index) in kycs" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.kyc"
          :value="item.value"
          :label="item.label"
          :trueValue="1"
          :falseValue="0"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="Особенности рума"
      icon="filter-room-features"
    >
      <filter-item v-if="tags.length" v-for="(item, index) in tags" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.tags"
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

export default {

  name: 'PaymentFilters',

  components: {

  },

  props: {

    geo: {
      required: true
    },

    kycs: {
      type: Array,
    },

    platforms: {
      type: Array,
    },

    tags: {
      type: Array,
    },

    payments: {
      type: Array,
    },

    types: {
      type: Array,
    },

    licenses: {
      type: Array,
    },

  },

  updated() {

  },

	created() {

	},

	data: () => ({
    loading: false,
    selected: {
      kyc: [],
      platforms: [],
      tags: [],
      payments: [],
      types: [],
      licenses: [],
    }
	}),

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
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