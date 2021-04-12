<template>
	<article :class="['promotion-item', featured && 'promotion-item_featured']">

    <nuxt-link prefetch :to="{name: 'index', params: {
      parent:  page.parent ? page.parent.slug : page.slug,
      child: page.parent ? page.slug : null
    }}" v-slot="{ href, route, navigate, isActive, isExactActive }">
      <a :class="['promotion-item__img-link', featured && 'promotion-item__img-link_featured']" :href="href" @click="navigate">
        <img
          decoding="async"
          width="327px"
          height="185px"
          :class="['promotion-item__img']"
          :src="src"
          :alt="image.alt || title"
          loading="lazy"
        />
        <span v-if="active" :class="['promotion-item__status']">Live</span>
      </a>
    </nuxt-link>

    <div :class="['promotion-item__inner', featured && 'promotion-item__inner_featured']">

      <div :class="['promotion-item__prize', featured && 'promotion-item__prize_featured']">
        <div class="promotion-item__prize-label">Призовой фонд</div>
        <div class="promotion-item__prize-value">{{ formatMoney(prize) }} {{ currency }}</div>
      </div>

      <div v-if="!featured" :class="['promotion-item__meta']">
        <span class="promotion-item__date">{{ dateFormat(created) }}</span>
        <span class="promotion-item__category" :style="{color: category.label_color}">{{ category.title }}</span>
        <span v-if="exclusive" class="promotion-item__exclusive"></span>
      </div>

      <nuxt-link prefetch :to="{name: 'index', params: {
        parent:  page.parent ? page.parent.slug : page.slug,
        child: page.parent ? page.slug : null
      }}" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <a :class="['promotion-item__link', featured && 'promotion-item__link_featured']" :href="href" @click="navigate">{{ title }}</a>
      </nuxt-link>

      <div :class="['promotion-item__info', featured && 'promotion-item__info_featured']">
        <div v-if="!featured" class="promotion-item__author">
          <img decoding="async" width="24px" height="24px" class="promotion-item__author-pic" :src="avatar" :alt="author.full_name" loading="lazy">
          <span class="promotion-item__author-name">{{ author.full_name }}</span>
        </div>

        <countdown v-if="time_left"
          label="До конца"
          :days="time_left.days"
        />
        <countdown v-if="time_before"
          label="До начала"
          :days="time_before.days"
        />

        <countdown v-if="regularity"
          :label="regularity"
        />
      </div>
    </div>
  </article>
</template>

<script>

// import Countdown from '~/components/Countdown'

export default {

  name: 'PromotionItem',

  components: {
    // Countdown
  },

  props: {
    image: {
      type: Object,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    page: {
      type: Object,
      required: true
    },

    author: {
      type: Object,
      required: true
    },

    created: {
      type: String,
      required: true
    },

    category: {
      type: Object
    },

    time_left: {
      type: Object
    },

    time_before: {
      type: Object
    },

    regularity: {
      type: String
    },

    prize: {
      type: [Number, String],
      default: null
    },

    currency: {
      type: String,
      default: null
    },

    exclusive: {
      type: [Boolean, Number],
      default: false
    },

    featured: {
      type: Boolean,
      default: false
    },

    active: {
      type: Boolean,
      default: false
    }
  },

	created() {

	},

	data: () => ({
    imageStyle: 'promotion-medium'
	}),

  computed: {
    avatar() {
      return `${this.mediaUrl}/user-square/${this.author.image.filename}`
    },

    src() {
      return `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
    },

    url() {
      return `/promotions/${this.slug}`
    },

    strLimit() {
      return this.summary.length > 88 ? `${this.summary.substring(0, 88)}...` : this.summary
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
  },

	methods: {
    dateFormat(timestamp) {
      let date = new Date(timestamp)

      if (date == 'Invalid Date') {
        return timestamp
      }

      let d = date.getDate(),
          m = date.getMonth() + 1,
          y = date.getFullYear()

      return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
    },

    formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ',') {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
	}
}
</script>

<style lang="scss">

$ico-exclusive: url('~assets/i/promotion/exclusive.svg?data');

.promotion-item {
  position: relative;
  margin-bottom: 48px;
  max-width: 326px;
  &_featured {
    float: right;
    margin: 0 0 10px 0;
    border-radius: 10px;
  }
  &__img {
    max-width: 100%;
    height: auto;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 40% 100%, 0 90%);
    &-link {
      overflow: hidden;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      display: block;
      position: relative;
      &_featured {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      &:before {
        content: '';
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 61.98%, #000000 100%);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        clip-path: polygon(0 0, 100% 0, 100% 90%, 40% 100%, 0 90%);
      }
    }
  }

  &__inner {
    &_featured {
      background: #FAFAFA;
      padding: 0 20px 24px 20px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  &__link {
    display: block;
    margin-bottom: 10px;
    display: block;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0;
    color: #243238;
    font-family: 'Proxima Nova';
    &_featured {
      margin: 0;
      text-align: center;
    }
    &:hover,
    &:active,
    &:focus,
    &:visited {
      color: #243238;
      text-decoration: none;
    }
  }
  &__status {
    padding: 5px 27px 5px 10px;
    top: 10px;
    left: 10px;
    position: absolute;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #FF0015;
    border-radius: 2px;

    &:after {
      content: '';
      right: 8px;
      top: 8px;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #FFFFFF;
    }

    &:before {
      content: '';
      right: 6px;
      top: 6px;
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffffff66;
    }
  }

  &__summary {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #555555;
    font-family: 'Proxima Nova';
  }

  &__meta {
    margin: 5px 0;
    position: relative;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0;
    line-height: 24px;
    font-size: 20px;
    min-height: 24px;
  }

  &__date {
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    color: #555555;
    font-family: 'Proxima Nova Sb';
  }

  &__category {
    margin-left: auto;
    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    letter-spacing: 0.5px;
    color: #0770A5;
    font-family: 'Proxima Nova';
  }

  &__prize {
    margin-top: -50px;
    // padding: 0 36px;
    position: relative;
    z-index: 2;
    font-size: 0;
    text-align: center;
    &_featured {
      margin-bottom: 12px;
    }
    &-label {
      z-index: 2;
      display: inline-block;
      position: relative;
      padding: 5px 11px 2px 11px;
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 11px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #fafafae6;
      background: #333333;
      clip-path: polygon(0 0%, 100% 8%, 96% 100%, 4% 100%);
    }
    &-value {
      margin-top: -23px;
      z-index: 1;
      min-width: 200px;
      display: inline-block;
      position: relative;
      padding: 29px 20px 11px 20px;
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 26px;
      line-height: 30px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #2B2E3B;
      background: #FFD809;
      clip-path: polygon(0 28%, 100% 0%, 95% 90%, 5% 100%);
    }
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap;
    &_featured {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: -10px;
      justify-content: center;
    }
  }

  &__author {
    display: flex;
    align-items: center;
    margin-right: 10px;
    &-pic {
      margin-right: 6px;
      border-radius: 50%;
    }
    &-name {
      font-family: 'Proxima Nova Sb';
      font-size: 14px;
      line-height: 16px;
      color: #999999;
    }
  }

  &__exclusive {
    margin-left: 10px;
    display: block;
    width: 24px;
    height: 24px;
    background: $ico-exclusive no-repeat center;
    background-size: cover;
  }
}
</style>