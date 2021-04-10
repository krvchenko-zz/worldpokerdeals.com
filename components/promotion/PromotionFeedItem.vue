<template>

<tbody class="promotion-item">
  <tr class="promotion-item__row">
    <td width="83px" class="promotion-item__col promotion-item__col_icon">
      <svg-icon class="promotion-item__icon" :icon="parent.slug" :width="42" :height="42" viewBox="0 0 200 200" />
    </td>

    <td class="promotion-item__col promotion-item__col_title">
      <span
        :style="{
          color: category.label_color,
          borderColor: category.label_color
        }"
        :class="{
          'promotion-item__category': true,
          [`promotion-item__category_${category.id}`]: true,
        }">{{ category.name }}</span>
        <span class="promotion-item__title">{{ title }}</span>

        <span v-if="type === 'bonus'" class="promotion-item__params">
          <span class="promotion-item__cashback">
            <span class="promotion-item__params-label">Кешбэк</span>
            {{ cashback_value }}%
          </span>
          <span class="promotion-item__deposit">
            <span class="promotion-item__params-label">К депозиту</span>
            +{{ deposit_bonus }}%
          </span>
          <span class="promotion-item__max">
            <span class="promotion-item__params-label">Макс бонус</span>
            ${{ max_bonus }} <template v-if="max_bonus_currency">{{ max_bonus_currency.symbol }}</template>
          </span>
        </span>

        <span v-else class="promotion-item__params">

          <span class="promotion-item__prize">
            <span class="promotion-item__params-label">Призовой фонд</span>
            {{ formatMoney(prize) }} <template v-if="currency">{{ currency.symbol }}</template>
          </span>

          <span v-if="permanent && regularity" class="promotion-item__regularity">
            <span class="promotion-item__params-label">Регулярная</span>
            {{ regularity }}
          </span>

          <template v-else>
            <span class="promotion-item__start">
              <span class="promotion-item__params-label">Начало</span>
              {{ dateFormat(start) }}
            </span>

            <span class="promotion-item__end">
              <span class="promotion-item__params-label">Окончание</span>
              {{ dateFormat(end) }}
            </span>
          </template>

        </span>

    </td>

    <td width="210px" class="promotion-item__col promotion-item__col_actions">

      <span 
        v-if="type === 'bonus'"
        :class="['promotion-item__code', codeHovered && 'promotion-item__code_hover']"
        @mouseover="codeHovered = true"
        @mouseleave="codeHovered = false"
      >
        <span
          :class="['promotion-item__code-label', codeHovered && 'promotion-item__code-label_hover']"
        >Бонус-код</span>
        <span class="promotion-item__code-value">{{ code }}</span>
      </span>

      <span class="promotion-item__countdown" v-else-if="time_left || time_before">
        <span class="promotion-item__countdown-label">
          <template v-if="time_left">До окончания</template>
          <template v-if="time_before">До начала</template>
        </span>
        <countdown v-if="time_left"
          :days="time_left.days"
          :live="true"
        />
        <countdown v-if="time_before"
          :days="time_before.days"
        />
      </span>

      <span class="promotion-item__buttons">

        <room-action-button
          class="btn-get-promotion"
          :icon="false"
          type="download"
          :label="type === 'promotion' ? 'Участвовать' : 'Получить'"
          :slug="room.slug"
        />

        <nuxt-link prefetch :to="{name: 'index', params: {
          parent: page.parent? page.parent.slug : page.slug,
          child: page.parent ? page.slug : null
        }}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <a :class="['btn btn-promotion-review']" :href="href" @click="navigate"></a>
        </nuxt-link>

      </span>
    </td>

  </tr>
  <tr class="promotion-item__row">
    <td colspan="3" :class="['promotion-item__col', 'promotion-item__col_info', showTerms && 'promotion-item__col_info_expanded']">

      <span :class="['promotion-item__terms', showTerms && 'promotion-item__terms_expanded']">
        <i class="promotion-item__terms-icon"></i>
        <span @click="terms ? showTerms = !showTerms : showTerms = false">Условия получения</span>
      </span>

      <span :class="{
        'promotion-item__avaliable': true,
        [`promotion-item__avaliable_yes`]: !room.restricted,
        [`promotion-item__avaliable_no`]: room.restricted
      }">
        <svg-icon :width="16" :height="16" :icon="country.code" prefix="flags/" />
        <span v-if="room.restricted">Недоступен игрокам из {{ country.from }}!</span>
        <span v-else>Доступен игрокам из {{ country.from }}</span>
      </span>
    </td>
  </tr>
  <tr v-show="showTerms" class="promotion-item__row">
    <td colspan="3" class="promotion-item__col promotion-item__col_terms" v-html="terms"></td>
  </tr>
</tbody>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'PromotionFeedItem',

  components: {

  },

  props: {

    index: {
      type: [String, Number]
    },

    type: {
      type: [String],
      default: 'bonus'
    },

    time_left: {
      type: Object
    },

    time_before: {
      type: Object
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    created: {
      type: String,
      required: true
    },

    code: {
      type: [String, Boolean],
      default: false
    },

    category: {
      type: Object
    },

    room: {
      type: Object
    },

    page: {
      type: Object
    },

    min_deposit: {
      type: Number,
      default: 0
    },

    min_deposit_currency: {
      type: [Object, Boolean],
      default: false
    },

    cashback_value: {
      type: Number,
      default: 0
    },

    max_bonus: {
      type: Number,
      default: 0
    },

    max_bonus_currency: {
      type: [Object, Boolean],
      default: false
    },

    deposit_bonus: {
      type: Number,
      default: 0
    },

    prize: {
      type: [Number, String],
      default: null
    },

    currency: {
      type: [String, Object],
      default: null
    },

    start: {
      type: String,
      default: ''
    },

    end: {
      type: String,
      default: ''
    },

    regularity: {
      type: String,
    },

    permanent: {
      type: Boolean,
      default: false
    },

    terms: {
      type: [String, Boolean],
      default: ''
    }
    
  },

	created() {

	},

  mounted() {

  },

	data: () => ({
    showTerms: false,
    codeHovered: false
	}),

  computed: {

    ...mapGetters({
      user: 'auth/user',
      locale: 'lang/locale',
      locales: 'lang/locales',
      country: 'location/country',
      parent: 'rooms/room'
    }),

    url() {
      return `/promotions/${this.slug}`
    },

  },

	methods: {
    dateFormat(timestamp) {
      let date = new Date(timestamp),
          d = date.getDate(),
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

<style scoped lang="scss">

$ico-arrow-right: url('~assets/i/promotion/ico-bonus-arrow-right.svg?data');
$ico-terms: url('~assets/i/promotion/ico-bonus-terms.svg?data');
$ico-scissors: url('~assets/i/promotion/ico-scissors.svg?data');


.promotion-item {

  &__table {
    width: 100%;
  }

  &__col {
    padding: 20px;
    vertical-align: top;
    background: #FFFFFF;
    border: none;
    &_icon {
      padding: 20px;
    }
    &_title {
      border: none;
      padding: 20px 20px 20px 0;
    }

    &_actions {
      padding: 20px 20px 20px 0;
      position: relative;
      vertical-align: bottom;
    }

    &_info {
      border: 1px solid #E9E9E9;
      padding: 8px 20px;
      background: #FAFAFA;
      border-bottom-width: 2px;
      font-size: 0;
      &_expanded {
        border-bottom: none;
      }
    }

    &_terms {
      border: 1px solid #E9E9E9;
      border-top: none;
      background: #FAFAFA;
      padding: 4px 20px 20px 20px;
      &::v-deep ol, ul {
        margin: 0;
        padding: 0;
        list-style-position: inside;
      }

      &::v-deep ol {
        margin-bottom: 20px;
        list-style-type: decimal;
        &:last-child {
          margin: 0;
        }
      }

      &::v-deep ul {
        margin-bottom: 20px;
        list-style: none;
        &:last-child {
          margin: 0;
        }
      }

      &::v-deep ol li {
        margin: 0 0 10px 0;
        padding: 0;
        font-family: 'Proxima Nova';
        font-size: 15px;
        line-height: 18px;
        color: #777777;
        &:last-child {
          margin: 0;
        }
        &:before {
          display: none;
        }
      }

      &::v-deep ul li {
        margin: 0 0 10px 0;
        padding: 0 0 0 20px;
        font-family: 'Proxima Nova';
        font-size: 15px;
        line-height: 18px;
        color: #777777;
        &:last-child {
          margin: 0;
        }
        &:before {
          top: 7px;
          left: 0px;
        }
      }

      &::v-deep p {
        margin: 0 0 16px 0;
        font-family: 'Proxima Nova';
        font-size: 15px;
        line-height: 18px;
        color: #777777;
        &:last-child {
          margin: 0;
        }
      }
    }

    &_cashback,
    &_deposit,
    &_max {
      position: relative;
      &:before {
        content: '';
        top: calc(50% - (40px / 2));
        left: 0px;
        position: absolute;
        display: block;
        width: 1px;
        height: calc(100% / 2);
        background: #E9E9E9;
      }
    }
  }

  &__icon {
    border-radius: 4px;
    display: block;
  }

  &__title {
    margin-bottom: 12px;
    display: block;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 18px;
    line-height: 22px;
    color: #222222;
  }

  &__category {
    margin-bottom: 4px;
    padding: 4px 8px 3px 8px;
    display: inline-block;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 11px;
    letter-spacing: 0.2px;
    border-radius: 100px;
    text-transform: uppercase;
    color: #212529;
    border: 1px solid #212529;

    &_19 {
      color: #55BF4F;;
      border: 1px solid #55BF4F;
    }

    &_20 {
      color: #C128B2;
      border: 1px solid #C128B2;
    }

    &_21 {
      color: #3C9BE0;
      border: 1px solid #3C9BE0;
    }
  }

  &__params {
    display: flex;
    &-label {
      margin-bottom: 4px;
      display: block;
      font-family: 'Proxima Nova Sb';
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      color: #777777;
    }
  }

  &__cashback {
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__start {
    border-left: 1px solid #E9E9E9;
    padding: 0 20px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__end {
    border-left: 1px solid #E9E9E9;
    padding-left: 20px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__deposit {
    border-left: 1px solid #E9E9E9;
    padding-left: 20px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__max {
    border-left: 1px solid #E9E9E9;
    padding-left: 20px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__prize {
    padding-right: 20px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
    color: #243238;
    flex: 0 0 33.3%;
  }

  &__regularity {
    border-left: 1px solid #E9E9E9;
    padding-left: 20px;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 22px;
    color: #222222;
    flex: 0 0 66.6%;
  }

  &__code {
    margin-bottom: 12px;
    position: relative;
    cursor: pointer;
    display: block;
    min-width: 130px;
    padding: 8px 0 4px 0;
    background: #FAFAFA;
    border: 1px dashed rgba(119, 119, 119, 0.5);
    border-radius: 4px;
    transition: background 0.1s ease,
                border-color 0.1s ease,
                color 0.1s ease;
    &_hover {
      border-color: #008BE2;

      &:before {
        content: '';
        top: -12px;
        left: 50%;
        margin-left: -9px;
        position: absolute;
        width: 18px;
        height: 12px;
        display: block;
        background: $ico-scissors no-repeat center;
      }
    }

    &-label {
      display: block;
      text-align: center;
      font-family: 'Proxima Nova Sb';
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      color: #777777;
      transition: background 0.1s ease,
                  border-color 0.1s ease,
                  color 0.1s ease;
      &_hover {
        color: #008BE2;
      }
    }

    &-value {
      display: block;
      text-align: center;
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #555555;
      text-transform: uppercase;
    }
  }

  &__countdown {
    top: 20px;
    right: 20px;
    white-space: nowrap;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-label {
      margin-right: 12px;
      font-family: Proxima Nova;
      font-size: 14px;
      line-height: 16px;
      color: #777777;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }

  &__terms {
    margin-right: 40px;
    padding-left: 26px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 16px;
    color: #777777;
    span {
      border-bottom: 1px dashed #AAAAAA;
    }
    &:hover {
      span {
        border: none;
      }
    }
    &-icon {
      left: 0;
      top: 0;
      position: absolute;
      width: 16px;
      height: 16px;
      display: block;
      transition: transform 0.1s ease;
      background: $ico-terms no-repeat center;
    }

    &_expanded {
      .promotion-item__terms-icon {
        transform: rotate(180deg);
      }
    }
  }

  &__avaliable {
    display: inline-block;
    vertical-align: middle;
    font-size: 0;
    span {
      margin-left: 8px;
      vertical-align: middle;
      font-size: 12px;
      line-height: 16px;
      font-family: 'Proxima Nova';
    }
    &_yes {
      color: #777777;
    }
    &_no {
      color: #EB5757;
    }
  }
}

.btn-get-promotion {
  flex-grow: 1;
  margin-right: 20px;
  display: block;
  padding: 12px 24px;
  font-family: 'Proxima Nova Sb';
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #FFFFFF;
  background: #FF4151;
  transition: background 0.1s ease,
              border-color 0.1s ease,
              color 0.1s ease;
  &:hover,
  &:active,
  &:focus {
    background: #EE3C4B;
  }
}

.btn-promotion-review {
  display: block;
  padding: 0;
  border: 1px solid rgba(119, 119, 119, 0.3);
  border-radius: 3px;
  width: 40px;
  height: 40px;
  background: $ico-arrow-right no-repeat center;
  transition: background 0.1s ease,
              border-color 0.1s ease,
              color 0.1s ease;
  &:hover,
  &:active,
  &:focus {
    background: #DDDDDD $ico-arrow-right no-repeat center;
  }
}
</style>