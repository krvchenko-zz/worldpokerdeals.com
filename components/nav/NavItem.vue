<template>
  <nuxt-link :to="{name: 'index', params: {
    parent:  page.parent ? page.parent.slug : page.slug,
    child: page.parent ? page.slug : null
  }}" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <li :class="['page-nav__item', isExactActive && 'page-nav__item_active']">
      <a :class="['page-nav__link', isExactActive && 'page-nav__link_active']" :href="href" @click="navigate">
        <svg-icon
          v-if="icon"
          class="page-nav__icon"
          :icon="icon"
          :fill="isExactActive ? '#2E87C8' : '#999999'"
          :opacity="isExactActive && true"
        />
        <span :class="['page-nav__name', isExactActive && 'page-nav__name_active']">{{ name }}</span>
      </a>
    </li>
  </nuxt-link>
</template>

<script>

export default {

  name: 'NavItem',

  components: {

  },

  props: {
    name: {
      type: String,
      required: true
    },

    page: {
      type: Object,
      required: true
    },

    icon: {
      type: String
    }
  },

	created() {

	},

	data: () => ({
    // show: false
	}),

  computed: {

  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.page-nav {
  &__item {
    background: #F1EFEF;
    border-right: 2px solid #E9E9E9;
    border-top: 2px solid #E9E9E9;
    border-bottom: 2px solid #E9E9E9;
    box-sizing: border-box;
    &:first-child {
      border-left: 2px solid #E9E9E9;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:hover {
      background: #E9E9E9;
    }

    &_active {
      border-left: 2px solid #E9E9E9;
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0px 0px 0 2px #F1EFEF;

      &:first-child {
        box-shadow: 4px 0px 0 0px #F1EFEF;
      }

      &:hover {
        background: #FFFFFF;
      }
    }

  }

  &__link {
    padding: 14px 24px;
    display: flex;
    text-decoration: none;
    &:hover,
    &:active,
    &:visited {
      text-decoration: none;
    }
  }

  &__name {
    white-space: nowrap;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    color: #222222;
    &_active {
      color: #2E87C8;
    }
  }

  &__icon {
    margin-right: 16px;
  }
}
</style>