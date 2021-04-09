<template>
  <div class="filters">

    <div class="filters__label">Фильтры</div>

    <filter-dropdown
      v-if="payments.length"
      label="Методы депозита"
      icon="filter-payments"
      :opened="true"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in payments" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.payments"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
        <template v-slot:icon>
          <svg-icon
            class="filter-item__icon"
            :icon="`${item.slug}-color`"
            :width="28"
            :height="28"
            viewBox="0 0 30 30"
          />
        </template>
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      label="По дисциплинам"
      icon="filter-discipline"
      v-if="disciplines.length"
    >
      <filter-item v-for="(item, index) in disciplines" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.disciplines"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="games.length" 
      label="Формат игры"
      icon="filter-game"
    >
      <filter-item v-for="(item, index) in games" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.games"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="limits.length"
      label="Лимиты"
      icon="filter-limit"
    >
      <filter-item v-for="(item, index) in limits" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.limits"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>


    <filter-dropdown
      v-if="types.length"
      label="Тип рума"
      icon="filter-room-type"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in types" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.types"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="platforms.length"
      label="Платформы"
      icon="filter-platforms"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in platforms" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.platforms"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />

        <template v-slot:icon>
          <svg-icon
            class="filter-item__icon"
            :icon="`${item.slug}-square`"
            :width="28"
            :height="28"
            viewBox="0 0 40 40"
          />
        </template>
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="huds.length"
      label="Поддержка HUD"
      icon="filter-hud"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in huds" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.hud"
          :value="item"
          :label="item.label"
          :trueValue="1"
          :falseValue="0"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="certificates.length"
      label="ГСЧ-проверка"
      icon="filter-certificate"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in certificates" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.certificates"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="licenses.length"
      label="Лицензии"
      icon="filter-licenses"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in licenses" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.licenses"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="networks.length"
      label="Покерные сети"
      icon="filter-network"
    >
      <filter-item v-for="(item, index) in networks" :key="index"
        :count="item.count"
        icon-viewbox="0 0 200 200"
      >
        <checkbox
          v-model="selected.networks"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />

        <template v-slot:icon>
          <svg-icon
            class="filter-item__icon"
            :icon="`${item.slug}`"
            :width="28"
            :height="28"
            viewBox="0 0 200 200"
          />
        </template>
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="kycs.length"
      label="Верицикация"
      icon="filter-kyc"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in kycs" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.kyc"
          :value="item"
          :label="item.label"
          :trueValue="1"
          :falseValue="0"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

    <filter-dropdown
      v-if="tags.length"
      label="Особенности рума"
      icon="filter-room-features"
      @open="$emit('filterOpen')"
    >
      <filter-item v-for="(item, index) in tags" :key="index"
        :count="item.count"
      >
        <checkbox
          v-model="selected.tags"
          :value="item"
          :label="item.label"
          @change="handleFilterChange"
        />
      </filter-item>
    </filter-dropdown>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import eventBus from '~/utils/event-bus'

export default {

  name: 'RoomCategoryFilters',

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

    limits: {
      type: Array,
    },

    games: {
      type: Array,
    },

    disciplines: {
      type: Array,
    },

    networks: {
      type: Array,
    },

    huds: {
      type: Array,
    },

    certificates: {
      type: Array,
    }

  },

  mounted() {
    eventBus.$on('selected:delete', data => {
      if (data.clear) {
        this.selected = {
          kyc: [],
          platforms: [],
          tags: [],
          payments: [],
          types: [],
          licenses: [],
          limits: [],
          games: [],
          disciplines: [],
          networks: [],
          hud: [],
          certificates: []
        }
      } else {
        this.selected[data.key] = this.selected[data.key].filter(item => { return item.value !== data.value})
      }
      this.$emit('change', this.selected)
    })
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
      limits: [],
      games: [],
      disciplines: [],
      networks: [],
      hud: [],
      certificates: []
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
    top: 16px;
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