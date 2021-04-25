<template>
<div :class="['top-rooms', `top-rooms_${type}`]">
	<div :class="['top-rooms-header', `top-rooms-header_${type}`]">
		<template v-if="type === 'front'">
			<button @click="handleToggleApps" :class="['top-rooms-header__button', !showApps && 'top-rooms-header__button_active']">
				<svg-icon :class="['top-rooms-header__flag', `top-rooms-header__flag_${type}`]" :icon="country.code" prefix="flags/" :width="24" :height="24"/>
				<div :class="['top-rooms-header__label', `top-rooms-header__label_${type}`]">Топовые румы</div>
				<div :class="['top-rooms-header__country', `top-rooms-header__country_${type}`]">для {{ country.from }}</div>
			</button>
			<button @click="handleToggleApps" :class="['top-rooms-header__button', showApps && 'top-rooms-header__button_active']">
				<div :class="['top-rooms-header__label', `top-rooms-header__label_${type}`]">Приложения</div>
				<div :class="['top-rooms-header__country', `top-rooms-header__country_${type}`]">С приватными клубами</div>
			</button>
		</template>

		<template v-else-if="type === 'menu'">
			<div :class="['top-rooms-header__label', `top-rooms-header__label_${type}`]">Лучшие румы</div>
		</template>

		<template v-else>
			<svg-icon :class="['top-rooms-header__flag', `top-rooms-header__flag_${type}`]" :icon="country.code" prefix="flags/" :width="24" :height="24"/>
			<div :class="['top-rooms-header__label', `top-rooms-header__label_${type}`]">Топ-{{ rooms.length }} покер-румов</div>
			<div :class="['top-rooms-header__country', `top-rooms-header__country_${type}`]">для {{ country.from }}</div>
		</template>
	</div>
	<div :class="['top-rooms__list', `top-rooms__list_${type}`]">
		<room-top-item
			v-for="item in rooms" :key="item.id"
			:title="item.title"
			:slug="item.slug"
			:review="item.review"
			:bonus="item.bonus"
			:image="item.image"
			:background="item.background"
			:rakeback="item.rakeback"
			:rating="item.rating"
			:front="front"
			:menu="menu"
			:type="type"
		/>
	</div>

	<div v-if="type !== 'menu'" :class="['top-rooms__footer', `top-rooms__footer_${type}`]">

		<span v-if="type !== 'front'" @click.prevent="handleLoadMore" class="top-rooms__footer-more">Показать еще 5</span>

	  <nuxt-link to="/rakeback-deals" v-slot="{ href, route, navigate, isActive, isExactActive }">
		<a :class="['top-rooms__footer-link', `top-rooms__footer-link_${type}`]" :href="href" @click="navigate">
			<span :class="['top-rooms__footer-text', `top-rooms__footer-text_${type}`]">Полный каталог покерных румов</span>
			<span :class="['top-rooms__footer-total', `top-rooms__footer-total_${type}`]">Все {{ total }} покерных {{ declOfNum(total, ['сайта', 'сайтов', 'сайтов']) }}</span>
		</a>
	  </nuxt-link>
	</div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

	name: 'RoomTopList',

	components: {

	},

	props: {
		label: {
			type: String,
			default: 'Top-5 покер-румов'
		},

		front: {
			type: Boolean,
			default: false
		},

		menu: {
			type: Boolean,
			default: false
		},

		type: {
		  type: String,
		  default: 'default'
		}
	},

	mounted() {

	},

	data: () => ({
		per_page: 5,
		showApps: false,
	}),

	computed: {
	...mapGetters({
	  locale: 'lang/locale',
	  country: 'location/country',
	  rooms: 'rooms/topList',
	  total: 'rooms/total',
	}),
	},

  async fetch() {

  },

	watch: {
		// $route() {
		// 	this.$store.commit('rooms/FETCH_TOP_LIST', { list: response.data })
		// }
	},

	methods: {
		async handleLoadMore() {
			$nuxt.$loading.start()
			this.per_page = parseInt(this.per_page) + 5
			await axios.get('/rooms/geo/top', {
				params: {
					geo: this.country.geo,
					per_page: this.per_page,
				}
			}).then((response) => {
			  this.$store.commit('rooms/FETCH_TOP_LIST', { list: response.data })
			  $nuxt.$loading.finish()
			})
		},

		async handleToggleApps() {
			this.showApps = !this.showApps
			$nuxt.$loading.start()
			await axios.get('/rooms/geo/top', {
				params: {
					geo: this.country.geo,
					per_page: this.per_page,
					type_id: this.showApps ? 3 : null
				}
			}).then((response) => {
			  this.$store.commit('rooms/FETCH_TOP_LIST', { list: response.data })
			  $nuxt.$loading.finish()
			})
		},

		declOfNum(number, titles) {
		  const cases = [2, 0, 1, 1, 1, 2];
		  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
		}
	}
}
</script>

<style lang="scss">
$ico-link: url('~assets/i/ico-room-top-link.svg?data');

.top-rooms {
	margin: 0 0 40px 0;
	&_front {
		margin: 0;
	}
	&_menu {
		margin: 0;
	}
  &__list {
		&_front {
			margin: 0;
		  background: #292C38;
		}
  }
	&-header {
		padding: 20px 20px 20px 60px;
		position: relative;
		background: #F1EFEF;
		box-shadow: 0px -2px 0px #FEB83C;
		&__flag {
			position: absolute;
			left: 20px;
			top: 20px;
		}

		&__label {
			margin-bottom: 4px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 20px;
			line-height: 21px;
			color: #222222;
			&_front {
				color: #FFFFFF;
			}
			&_menu {
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 12px;
				line-height: 20px;
				letter-spacing: 1px;
				text-transform: uppercase;
				color: #999999;
			}
		}

		&__country {
			font-family: 'Proxima Nova';
			font-weight: normal;
			font-size: 14px;
			line-height: 14px;
			color: #777777;
			&_front {
				color: #CCCCCC;
			}
		}

		&_front {
			padding: 2px 0 0 0;
			background: transparent;
			display: flex;
			box-shadow: none;
		}

		&_menu {
			padding: 24px 24px 4px 24px;
			background: #353847;
			box-shadow: none;
		}

		&__button {
			text-align: left;
			padding: 20px;
			position: relative;
			border: 0;
			outline: none;
			flex: 0 0 50%;
			background: linear-gradient(180deg, #292C38 59.9%, #191B23 100%);
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:first-child{
				padding: 20px 20px 20px 60px;
			}
			&:focus,
			&:active,
			&_active {
				outline: none;
				background: #292C38;
				box-shadow: 0px -2px 0px #FEB83C;
			}
		}
	}

	&_front {
		border-radius: 8px;
		box-shadow: -20px -10px 50px rgba(0, 0, 0, 0.3);
	}

	&__list {
		&_menu {
			background: #353847;
			padding: 0 0 15px 0;
		}
	}

	&__footer {
		text-align: center;
		margin-top: -36px;
		padding: 20px;
		background: #F1EFEF;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		&_front {
			margin-top: 0;
			background: #292C38;
		}
		&-link {
			position: relative;
			text-align: left;
			display: block;
			text-decoration: none;
		  &:hover,
		  &:active,
		  &:visited {
				text-decoration: none;
		  }
		  &:after {
				content: '';
				width: 32px;
				height: 30px;
				position: absolute;
				right: 0;
				top: 0;
				background: $ico-link no-repeat center;
		  }

		  &_front {
			display: block;
				margin: 0 auto -50px auto;
			max-width: 316px;
			padding: 15px 76px 15px 20px;
			background: #292C38;
			border-radius: 4px;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:after {
				opacity: 0.2;
					top: 50%;
				transform: translate3d(-16px, -50%, 0);
			}
			&:hover,
			&:active,
			&:focus {
				background: #2E87C8;
			}
		  }
		}
	  &-text {
			display: block;
			margin-bottom: 4px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 14px;
			color: #008BE2;
			&_front {
				color: #FFFFFF;
			}
	  }
		&-total {
			display: block;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 12px;
			color: #777777;
			&_front {
				color: #FFFFFF;
			}
		}
		&-more {
			position: relative;
			margin-bottom: 16px;
			padding: 8px 12px;
			display: inline-block;
			background: #FAFAFA;
			border: 1px solid #DFDEDE;
			border-radius: 24px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 12px;
			line-height: 12px;
			text-align: center;
			cursor: pointer;
			color: #777777;
		}
	}

  @media (max-width: 480px) {
      .top-rooms-header_front {
        .top-rooms-header {
          &__button {
            font-size: 20px;
            line-height: 21px;
            white-space: nowrap;
            background: linear-gradient(180deg, #FAFAFA 59.9%, #DFDEDE 100%);
            &:focus,
            &:active,
            &_active {
              background: #FAFAFA;
              box-shadow: 0px -4px 0px #FEB83C;
            }
          }

          &__label {
            color: #222222;
          }
          &__country {
            color: #777777;
          }
        }
      }

      .top-rooms__item {
        &_front {
          background: #FAFAFA;
        }
        &-title_front {
          color: #222222;
        }
        &-rating-label {
          color: #555555;
        }
        &-rakeback-label {
          color: #555555;
        }
        &-rakeback-val {
          color: #222222;
        }
        &-link {
          background: #E9E9E9;
          color: #777777;
        }
      }

      .top-rooms__footer {
        &_front {
          background: #F1EFEF;
        }
        &-link_front {
          max-width: none;
          background: #2E87C8;
          border-radius: 4px;
        }
        &-text_front {
          font-size: 16px;
          line-height: 20px;
        }
        &-total_front {
          font-size: 14px;
          line-height: 16px;
          color: #FFFFFF;
          opacity: 0.8;
        }
      }
  }
}
</style>
