<template>
<div :class="['club-item']">
  <div class="club-item__img" :style="{
    backgroundColor: background
  }">
    <img decoding="async" loading="lazy" :src="img" :alt="title">
  </div>

  <div class="club-item__info">
    <div class="club-item__col">
      <rating :value="rating"/>
      <div class="club-item__title">{{ title }}</div>
      <div class="club-item__union">{{ union }}</div>
      <div v-if="features.length" class="club-item__features-list">
        <span v-for="(item, index) in features" :key="index" :class="['club-item__feature']" :title="item.title">
          <i :class="['ico-feature', 'ico-feature_enabled', `ico-feature_type_${item.slug}`]"></i>
        </span>
      </div>
    </div>

    <div class="club-item__col club-item__col_border">
      
      <dl class="club-item-params">
        <dt class="club-item__param label">ID клуба</dt>
        <dd class="club-item__param">{{ club_id }}</dd>
        <dt class="club-item__param label">ID агента</dt>
        <dd class="club-item__param">{{ agent_id || 'n/a' }}</dd>
        <dt class="club-item__param label">Гарантия</dt>
        <dd class="club-item__param">{{ warranty || 'n/a' }}</dd>
        <dt class="club-item__param label">Страна</dt>
        <dd class="club-item__param">
          <inline-svg :src="countryImage" width="16" height="16"></inline-svg>
        </dd>
      </dl>

    </div>

    <div class="club-item__col">
      
      <dl class="club-item-params">
        <dt class="club-item__param label">1 фишка</dt>
        <dd class="club-item__param">{{ chip_cost || 'n/a' }}</dd>
        <dt class="club-item__param label">Рейкбек</dt>
        <dd class="club-item__param">{{ rakeback || 'n/a' }}</dd>
        <dt class="club-item__param label">Платежи</dt>
        <dd class="club-item__param">
          <template v-if="payments.length" v-for="item in payments">
            {{ item.title }}
          </template>
          <template v-else>n/a</template>
        </dd>
        <dt class="club-item__param label">Столов</dt>
        <dd class="club-item__param">{{ tables || 'n/a' }}</dd>
      </dl>

    </div>
  </div>

</div>
</template>

<script>

import Rating from '~/components/Rating'

export default {
  name: 'Club',

  components: {
    Rating
  },

  props: {
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
    },

    background: {
      type: String,
      required: true
    },

    image: {
      type: Object,
    },

    warranty: {
      type: String,
    },

    club_id: {
      type: String,
    },

    agent_id: {
      type: String,
    },

    chip_cost: {
      type: [String, Number]
    },

    rakeback: {
      type: [String, Number]
    },

    currency: {
      type: String,
      required: true
    },

    tables: {
      type: String,
    },

    union: {
      type: String,
    },

    features: {
      type: Array,
    },

    country: {
      type: Object,
    },

    payments: {
      type: Array,
    },

  },

  data: () => ({
  }),

  created() {

  },

  computed: {
    img() {
      return `/images/club-small/${this.image.filename}`
    },

    countryImage() {
      return `/assets/flags/${this.country.code}.svg`
    }
  },

  watch: {

  },

  methods: {

  }
}
</script>

<style lang="scss">
.club-item {
  display: flex;
  background: #FAFAFA;
  .rating {
    margin-bottom: 8px;
  }
  &__img {
    margin: 0;
    flex: 0 0 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin: 0;
    }
  }

  &__info {
    border-left: 0;
    border: 1px solid #E9E9E9;
    padding: 15px 0;
    flex-grow: 1;
    display: flex;
  }

  &__col {
    padding: 0 20px;
    flex: 0 0 33.33%;
    &_border {
      border-left: 1px solid #E9E9E9;
      border-right: 1px solid #E9E9E9;
    }
  }

  &__title {
    margin-bottom: 5px;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #243238;
  }

  &__union {
    margin-bottom: 10px;
    font-family: 'Proxima Nova Sb';
    font-size: 12px;
    line-height: 16px;
    color: #777777;
  }

  &-params {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__param {
    margin: 0;
    padding: 5px 0 10px 0;
    width: 50%;
    color: #243238;
    font-family: 'Proxima Nova Sb';
    font-size: 14px;
    line-height: 16px;
    &.label {
      color: #555555;
      font-weight: normal;
      font-family: 'Proxima Nova';
    }
  }

  &__feature {
    margin-bottom: 5px;
    margin-right: 5px;
    display: inline-block;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
  }
}
</style>