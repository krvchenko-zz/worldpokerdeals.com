<template>
  <header class="header">
    <div class="container-fluid">
      <div class="header__wrap">
        <div class="logo header__logo">
          <router-link to="/" v-slot="{ href, route, navigate }">
            <a :href="href" class="logo__link" title="worldpokerdeals.com">worldpokerdeals.com</a>
          </router-link>
        </div>

        <div class="geo header__geo">
          <svg-icon :width="24" :height="24" prefix="flags/" :icon="country.code" key="header"/>
        </div>

        <div class="header-nav__wrap">
          <!-- Nav -->
          <nav class="header-nav" :style="{
            opacity: !showSearch ? 1 : 0,
          }">
            <ul class="header-nav__list">
              <li :class="[
                'header-nav__item',
                showRoomsMenu && 'header-nav__item_active'
              ]" @mouseover="showRoomsMenu = true" @mouseleave="showRoomsMenu = false">
                <a :class="['header-nav__link', showRoomsMenu && 'header-nav__link_active']" href="/rakeback-deals">Покер-румы</a>
                <transition name="fade">
                  <page-menu
                    v-show="showRoomsMenu"
                    :width="900"
                    :items="menu.rooms"
                    :columns="2"
                  >
                    <template v-slot:after>
                      <room-top-list 
                        label="Лучшие румы" 
                        type="menu" 
                        :style="{
                          flex: '0 0 300px',
                          position: 'relative',
                          zIndex: '2',
                          boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)'
                        }"
                      />
                    </template>
                  </page-menu>
                </transition>
              </li>
              <li :class="[
                'header-nav__item',
                showNewsMenu && 'header-nav__item_active'
              ]" @mouseover="showNewsMenu = true" @mouseleave="showNewsMenu = false">
                <a :class="['header-nav__link', showNewsMenu && 'header-nav__link_active']" href="/blog">Новости</a>
                <transition name="fade">
                  <page-menu v-if="showNewsMenu" :items="menu.posts" />
                </transition>
              </li>
              <li :class="[
                'header-nav__item',
                showPromotionsMenu && 'header-nav__item_active'
              ]" @mouseover="showPromotionsMenu = true" @mouseleave="showPromotionsMenu = false">
                <a :class="['header-nav__link', showPromotionsMenu && 'header-nav__link_active']" href="/promotions">Акции</a>
                <transition name="fade">
                  <page-menu v-if="showPromotionsMenu"
                    :items="menu.promotions"
                    :width="600">
                    <template v-slot:after>
                      <payment-menu
                        :style="{
                          flex: '0 0 300px',
                          position: 'relative',
                          zIndex: '2',
                          boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)'
                        }"/>
                    </template>
                  </page-menu>
                </transition>
              </li>

              <li :class="[
                'header-nav__item',
                showPokerMenu && 'header-nav__item_active'
              ]" @mouseover="showPokerMenu = true" @mouseleave="showPokerMenu = false">
                <a :class="['header-nav__link', showPokerMenu && 'header-nav__link_active']" href="#">Онлайн-покер</a>
                <transition name="fade">
                  <page-menu v-if="showPokerMenu" :items="menu.poker" :columns="2" :width="600" />
                </transition>
              </li>

              <li :class="[
                'header-nav__item',
                showAboutMenu && 'header-nav__item_active'
              ]" @mouseover="showAboutMenu = true" @mouseleave="showAboutMenu = false">
                <a :class="['header-nav__link', showAboutMenu && 'header-nav__link_active']" href="/about">О нас</a>
                <transition name="fade">
                  <page-menu v-if="showAboutMenu" :items="menu.about" />
                </transition>
              </li>
            </ul>
          </nav>

          <!-- Search -->
          <div v-show="showSearch" class="search header__search">
            <input v-model="query" :class="{
                'search__input': true,
                'search__input_loading': searchLoading,
                'search__input_focused': searchFocus,
                'search__input_dropdown': searchDropdownOpen
              }"
              type="text"
              name="search"
              autocomplete="off"
              :placeholder="searchPlaceholder"
              @focusin="handleFocusIn"
              @focusout="handleFocusOut"
              @keydown.esc="handleFocusOut"
            />
            <search-loader :loading="searchLoading"/>
            <search-dropdown v-if="searchFocus"
              v-model="query"
              @loading="handleLoading($event)"
              @open="searchDropdownOpen = $event"
              @close="searchDropdownOpen = $event"/>
          </div>

          <button
            :style="{
              opacity: !searchLoading ? 0.5 : 0
            }"
            :class="[
              'search-toggle',
              showSearch && 'search-toggle_active'
            ]"
            aria-label="Search"
            @click.prevent="handleSearchClick">  
          </button>
        </div>

        <div class="header-buttons">

          <a href="/vip" class="btn btn-vip" title="VIP-сервис" aria-label="VIP-сервис"></a>

          <button :class="['lang-switcher']">
            <span :class="[
            'lang-switcher__current',
            `lang-switcher__current_lang_${locale}`
            ]">
              <span>{{ locales[locale] }}</span>
            </span>
          </button>

          <button v-if="user" :class="['user-dropdown']">
            <img
              v-if="avatar"
              width="36px"
              height="36px"
              decoding="async"
              class="user-dropdown__img"
              loading="lazy"
              :src="avatar"
              :alt="user.full_name"
            />
            <svg-icon class="user-dropdown__img" v-else :width="36" :height="36" viewBox="0 0 36 36" icon="user-avatar"/>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'


export default {

  name: 'PageHeader',

  components: {
    SearchDropdown: () => import('~/components/search/SearchDropdown'),
    SearchLoader: () => import('~/components/search/SearchLoader')
  },

  props: {

  },

	created() {

	},

	data: () => ({
    query: '',
    geoReady: false,
    searchFocus: false,
    searchLoading: false,
    searchDropdownOpen: false,
    showSearch: false,
    showRoomsMenu: false,
    showNewsMenu: false,
    showPromotionsMenu: false,
    showPokerMenu: false,
    showAboutMenu: false
	}),

  computed: {
    ...mapGetters({
      user: 'auth/user',
      locale: 'lang/locale',
      locales: 'lang/locales',
      country: 'location/country',
      topList: 'rooms/topList',
      menu: 'menu/items',
    }),

    geoSrc() {
      return require(`~/assets/i/flags/${this.country.code}.svg?data`)
    },

    searchPlaceholder() {
      return this.searchFocus ? '' : 'Найти что-угодно, например: GGPoker'
    },

    avatar() {
      return this.user.image ? `${this.mediaUrl}/user-icon/${this.user.image.filename}` : null
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
  },

  async fetch() {
    await axios.get('/menu/list').then((response) => {
      this.$store.commit('menu/FETCH_ITEMS', { items: response.data })
    }, (e) => {

    })
  },

  watch: {

  },

	methods: {
    handleFocusIn() {
      this.searchFocus = true
    },

    handleFocusOut(evt) {
      this.query = ''
      this.searchFocus = false
      evt.target.blur()
    },

    handleLoading($event) {
      this.searchLoading = $event
    },

    handleSearchClick() {
      this.showSearch = !this.showSearch
    }
	}
}
</script>

<style lang="scss">
$logo: url('~assets/i/layout/header/logo.svg');
$ico-vip: url('~assets/i/layout/header/ico-vip.svg?data');
$ico-search: url('~assets/i/layout/header/ico-search-btn.svg?data');
$ico-search-close: url('~assets/i/layout/header/ico-search-close.svg?data');
$ico-lang-ru: url('~assets/i/layout/header/ico-lang-ru.svg?data');
$ico-lang-en: url('~assets/i/layout/header/ico-lang-en.svg?data');
$ico-lang-es: url('~assets/i/layout/header/ico-lang-es.svg?data');
$ico-arrow-down: url('~assets/i/layout/header/ico-arrow-down.svg?data');

.header {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #2B2E3B 47.41%, #20222C 100%);
  z-index: 110;
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__geo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.1);
    display: flex;
  }

  &__logo {
    margin-top: -5px;
    margin-right: 16px;
  }

  &__search {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    top: auto;
    // &:before {
    //   content: '';
    //   width: 100%;
    //   height: 40px;
    //   display: block;
    //   position: absolute;
    //   z-index: 5;
    //   top: 0;
    //   left: 0;
    //   box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.3);
    // }
  }

  &-buttons {
    padding: 22px 0;
    margin-left: 30px;
    display: flex;
    align-items: center;
  }

  &-nav {
    &__wrap {
      position: relative;
      margin-right: auto;
      margin-left: 48px;
      display: flex;
      align-items: center;
    }
    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    &__item {
      position: relative;
      &:last-child {
        margin: 0;
      }
    }

    &__link {
      white-space: nowrap;
      padding: 30px 24px;
      display: block;
      font-family: 'Proxima Nova Sb';
      font-size: 16px;
      line-height: 20px;
      color: #CCCCCC;
      text-decoration: none;
      position: relative;
      z-index: 2;
      &:hover,
      &:focus,
      &:active,
      &_active {
        color: #FFFFFF;
        text-decoration: none;
        background: #2B2E3B;
      }

      &_active {
        box-shadow: 0px 1px 0px #2b2e3b;
      }
    }
  }
}

.logo {
  width: 208px;
  height: 50px;
  &__link {
    text-indent: -999999px;
    width: 208px;
    height: 50px;
    display: block;
    background: $logo no-repeat center;
  }
}

.search {
  &__input {
    width: 100%;
    padding: 9px 15px 9px 50px;
    border: 1px solid rgba(204, 204, 204, 0.1);
    border-radius: 4px;
    caret-color: #888888;
    color: #E5E5E5;
    line-height: 20px;
    font-size: 16px;
    font-family: 'Proxima Nova';
    background: #2F323F $ico-search no-repeat 15px center;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.3);
    z-index: 1;
    &:focus,
    &:active {
      outline: none;
    }
    &::-webkit-input-placeholder {
      font: 14px/16px 'Proxima Nova';
    }
    &::-moz-placeholder {
      font: 14px/16px 'Proxima Nova';
    }
    &:-ms-input-placeholder {
      font: 14px/16px 'Proxima Nova';
    }
    &:-moz-placeholder {
      font: 14px/16px 'Proxima Nova';
    }
    &_dropdown {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

.btn {
  &-vip {
    padding: 0;
    width: 36px;
    height: 32px;
    background: $ico-vip no-repeat center;
    white-space: nowrap;
  }
}

.search-toggle {
  position: relative;
  margin-right: 8px;
  margin-left: 38px;
  padding: 0;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  background: $ico-search no-repeat center;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  &_active {
    opacity: 0.5;
    background: $ico-search-close no-repeat center;
  }
}

.lang-switcher {
  margin-left: 32px;
  padding: 0;
  vertical-align: middle;
  background: transparent;
  border: none;
  white-space: nowrap;
  &:active,
  &:focus {
    outline: none;
  }
  &__list {
    padding: 0;
  }
  &__current {
    cursor: pointer;
    position: relative;
    padding: 11px 12px;
    display: flex;
    align-items: center;
    color: #999999;
    background: #2F323F;
    border: 1px solid rgba(204, 204, 204, 0.1);
    border-radius: 4px;
    span {
      opacity: 0.5;
      color: #CCCCCC;
      font-size: 12px;
      line-height: 12px;
      font-style: normal;
      font-family: 'Proxima Nova Sb';
    }

    &:focus,
    &:active {
      outline: none;
    }
    &:before {
      content: '';
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    &_lang {
      &_ru {
        &:before {
          background-image: $ico-lang-ru;
        }
      }
      &_en {
        &:before {
          background-image: $ico-lang-en;
        }
      }
      &_es {
        &:before {
          background-image: $ico-lang-es;
        }
      }
    }
  }

  &__item {
    position: relative;
    color: #999999;
    font-size: 0;
    font-family: 'Proxima Nova';
    &:focus,
    &:active {
      outline: none;
    }
    &:before {
      content: '';
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    &_lang {
      &_ru {
        &:before {
          background-image: $ico-lang-ru;
        }
      }
      &_en {
        &:before {
          background-image: $ico-lang-en;
        }
      }
      &_es {
        &:before {
          background-image: $ico-lang-es;
        }
      }
    }
  }
  &__link {
    font-size: 14px;
    vertical-align: middle;
    color: #999999;
    &:active,
    &:focus,
    &:hover {
      color: #999999;
      text-decoration: none;
    }
  }
}

.user-dropdown {
  position: relative;
  margin-left: 32px;
  padding: 0 15px 0 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  &:after {
    content: '';
    width: 10px;
    height: 6px;
    display: block;
    position: absolute;
    right: 0px;
    top: 17px;
    background: $ico-arrow-down;
  }
  &__img {
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  &:active,
  &:focus {
    outline: none;
  }
}
</style>