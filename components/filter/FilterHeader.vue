<template>
<div class="filters-header">
  <div class="filters-header__text">Отфильтровано {{ total }} из {{ overall }} {{ entityLabel }}</div>
  <div class="filters-header__geo">

    <div class="filters-header__text_geo">Предложения для</div>

    <el-select
      class="el-select-geo"
      :value="geo"
      :loading="loading"
      filterable
      clearable
      reserve-keyword
      popper-class="el-poper-geo"
      @focus="fetchCountries"
      @change="handleGeoChange"
      @clear="handleGeoClear"
    >
      <template slot="prefix">
        <svg-icon :width="24" height="24" prefix="flags/" :icon="geo"/>
      </template>
      <el-option
        v-for="item in countries"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left; margin-right: 12px;">
          <svg-icon :width="24" height="24" prefix="flags/" :icon="item.value"/>
        </span>
        <span>{{ item.label }}</span>
      </el-option>
    </el-select>

  </div>

  <div class="filters-header__sort">
    <el-select
      :value="sort"
      class="el-select-sort"
      placeholder="Select"
      @change="handleSortChange"
      popper-class="el-poper-sort"
    >
      <template slot="prefix">
        <svg-icon :width="19" :height="16" icon="filter-sort-desc"/>
      </template>
      <el-option v-for="(item, index) in sortOptions" :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'FilterHeader',

  components: {

  },

  props: {
    entityLabel: {
      type: String,
      default: ''
    },

    sortOptions: {
      type: Array,
      default: () => {
        return [
          {
            label: 'Сначала новые',
            value: 'created_at'
          }
        ]
      }
    },

    sort: {
      type: [String, Boolean, Number],
      default: 'created_at'
    },

    geo: {
      type: [String, Boolean, Number],
      // default: 'created_at'
    },

    total: {
      type: [String, Number],
      default: 0
    },

    overall: {
      type: [String, Number],
      default: 0
    }
  },

	mounted() {
    this.countries.push({
      label: this.country.from,
      value: this.country.code
    })
	},

	data: () => ({
    loading: false,
    countries: [],
	}),

  async fetch() {

  },

  computed: {
    ...mapGetters({
      locale: 'lang/locale',
      country: 'location/country',
    }),
  },

  watch: {

  },

	methods: {
    handleSortChange($event) {
      this.$emit('update:sort', $event)
    },

    handleGeoChange($event) {
      this.$emit('update:geo', $event)
    },

    handleGeoClear() {
      this.$emit('update:geo', null)
    },

    async fetchCountries() {
      if (this.countries.length > 1) {
        return false
      }
      this.loading = true
      await axios.get('countries').then(response => {
        this.countries = response.data.map(item => {
          return {
            value: item.code,
            label: item.from
          }
        })
        this.loading = false
      })
    }
	}
}
</script>

<style lang="scss">
.filters-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__geo {
    margin-left: auto;
    margin-right: 24px;
  }

  &__text {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #222222;
    &_geo {
      margin-right: 16px;
      display: inline-flex;
      font-family: 'Proxima Nova';
      font-size: 14px;
      line-height: 16px;
      color: #333333;
    }
  }
}

.el-select {
  .el-input__inner {
    background: #FAFAFA;
    border: 1px solid #D3D3D3;
    border-radius: 4px;
    font-family: 'Proxima Nova Sb';
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #333333;
  }
  .el-input.is-focus .el-input__inner {
    border-color: rgba(0, 139, 226, 0.7);
  }
}

.el-select-geo {
  max-width: 164px;
  .el-input__prefix {
    left: 16px;
    align-items: center;
    display: flex;
  }

  .el-input__inner {
    padding-left: 52px;
  }
}

.el-select-sort {
  max-width: 195px;
  .el-input__prefix {
    left: 16px;
    align-items: center;
    display: flex;
  }

  .el-input__inner {
    padding-left: 47px;
  }
}

.el-poper-geo,
.el-poper-sort {
  .el-select-dropdown__item {
    font-family: 'Proxima Nova Sb';
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #333333;
  }
}
</style>