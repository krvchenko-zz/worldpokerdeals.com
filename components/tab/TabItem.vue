<template>
  <nuxt-link prefetch :to="{name: 'index', params: params}" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <li :class="['tab-nav__item', isExactActive && 'tab-nav__item_active']">
      <a :class="['tab-nav__link', isExactActive && 'tab-nav__link_active']" :href="href" @click="navigate">{{ name }}</a>
    </li>
  </nuxt-link>
</template>

<script>

export default {

  name: 'TabItem',

  components: {

  },

  props: {
    name: {
      type: String,
      required: true
    },

    params: {
      type: [Object],
      required: true
    },
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
.tab-nav {
  &__item {
    background: #F1EFEF;
    border-right: 2px solid #E9E9E9;
    box-sizing: border-box;
    transition: background 0.1s ease,
                border-color 0.1s ease,
                color 0.1s ease;

    &:hover,
    &:focus {
      background: #E9E9E9;
    }

    &:first-child {
      border-top-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-right: none;
    }

    &_active {
      border-right: 1px solid #008BE2;
      border-left: 1px solid #008BE2;
      background: #FFFFFF;
      box-shadow: 0px -2px 0px #008BE2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      &:hover,
      &:focus {
        background: #FFFFFF;
      }
      &:last-child {
        border-right: 1px solid #008BE2;
      }

    }

  }

  &__link {
    padding: 16px 28px;
    text-decoration: none;
    display: block;
    white-space: nowrap;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 20px;
    color: #555555;
    letter-spacing: -0.1px;
    mix-blend-mode: normal;
    &:hover,
    &:active,
    &:visited {
      color: #555555;
      text-decoration: none;
      // background: #E9E9E9;
    }
    &_active {
      color: #243238;
      font-family: 'Proxima Nova';
      font-weight: bold;
      &:hover,
      &:active,
      &:visited {
        color: #243238;
      }
    }
  }

  &__icon {
    padding-right: 16px;
  }
}
</style>