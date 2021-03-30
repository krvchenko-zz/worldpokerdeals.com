<template>
<div :class="['club-item']">
  <div :class="['club-item__img-wrap']" :style="{backgroundColor: background}">
    <img :class="['club-item__img']" decoding="async" loading="lazy" :src="img" :alt="image.alt || `${title} logo`">
  </div>

  <div :class="['club-item__wrap']">
    
    <div class="club-item__col">
      <rating class="club-item__rating" :value="rating"/>
      <div class="club-item__title">{{ title }}</div>
      <div class="club-item__union">{{ union }}</div>

      <div class="club-item__features">
        <svg-icon class="club-item__feature" v-for="(item, index) in features" :key="index"
          :icon="`${item.icon_small}`"
          :width="24"
          :height="24"
        />
      </div>
    </div>

    <div class="club-item__col">
      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">ID клуба</span>
        <span @click="handleCopy" class="club-item__prop club-item__prop_id">{{ club_id }}</span>
      </div>
      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">ID агента</span>
        <span class="club-item__prop">{{ agent_id }}</span>
      </div>
      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">Гарантия</span>
        <span class="club-item__prop">{{ warranty }}</span>
      </div>
      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">Страна</span>
        <span class="club-item__prop">
          <svg-icon prefix="flags/" :icon="country.code" :width="16" height="16"/>
        </span>
      </div>
    </div>

    <div class="club-item__col">

      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">Рейкбэк</span>
        <span class="club-item__prop">{{ rakeback }}</span>
      </div>

      <div class="club-item__prop-wrap">
        <span class="club-item__prop-label">Столов</span>
        <span class="club-item__prop">{{ tables_count }}</span>
      </div>

      <div class="club-item__actions">
        <a class="btn btn-block btn-border club-item__join" href="#">Вступить в клуб</a>
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Rating from '~/components/Rating'

export default {

  name: 'ClubFeedItem',

  components: {
    Rating
  },

  props: {

    title: {
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

    rakeback: {
      type: [String, Number]
    },

    tables_count: {
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

  },

  created() {

  },

  data: () => ({

  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
      geo: 'location/geo'
    }),

    img() {
      return `${this.mediaUrl}/club-small/${this.image.filename}`
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
  },

  watch: {

  },

  methods: {
    handleCopy() {
      navigator.clipboard.writeText(this.club_id)
    }
  }
}
</script>

<style lang="scss">

$ico-copy: url('~assets/i/ico-copy.svg?data');
.club-item {
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  &__img {
    margin: 0!important;
    flex: 0 0 80px;
    align-items: center;
    justify-content: center;
    &-wrap {
      flex: 0 0 110px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__wrap {
    padding: 20px;
    border: 1px solid #E9E9E9;
    border-left: 0;
    flex-grow: 1;
    background: #FAFAFA;
    display: flex;
  }

  &__col {
    width: calc(100% / 3);
    padding: 0;
    border-right: 1px solid #E9E9E9;
    &:last-child {
      border: 0;
    }
    &:nth-child(1) {
      padding: 0 20px 0 0;
    }
    &:nth-child(2) {
      box-sizing: content-box;
      padding: 0 20px;
    }
    &:nth-child(3) {
      padding: 0 0 0 20px;
    }
  }

  &__prop {
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #243238;
    // width: 50%;
    &-label {
      width: 50%;
      font-family: 'Proxima Nova';
      font-size: 14px;
      line-height: 16px;
      color: #555555;
    }
    &-wrap {
      margin-bottom: 8px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
    }
    &_id {
      padding: 4px 8px 4px 25px;
      margin: -4px 0px;
      cursor: pointer;
      position: relative;
      background: rgba(0, 139, 226, 0.1) $ico-copy no-repeat 8px center;
      border-radius: 50px;
    }
  }

  &__rating {
    margin-top: -3px;
    margin-bottom: 9px;
    justify-content: start;
    .rating__stars {
      margin: 0 10px 0 0;
    }
    .rating__digit {
      margin: 3px 0 0 0;
    }
  }

  &__title {
    margin-bottom: 4px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: -0.1px;
    color: #222222;
  }

  &__union {
    margin-bottom: 12px;
    font-family: 'Proxima Nova SB';
    font-size: 12px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #777777;
  }

  &__features {
    margin-bottom: -4px;
  }

  &__feature {
    margin: 0 4px 4px 0;
  }

  &__actions {
    margin-top: 24px;
  }

  &__join {
    border-color: #008be280;
    font-size: 14px;
    line-height: 14px;
    color: #3C9BE0;
    &:active,
    &:hover,
    &:visited,
    &:link {
      color: #3C9BE0;
    }
  }
}
</style>