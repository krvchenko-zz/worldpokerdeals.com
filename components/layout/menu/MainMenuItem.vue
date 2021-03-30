<template>
  <router-link
    :to="{ name: route, params: params }"
    v-slot="{ href, route, navigate, isActive, isExactActive }"
  >
    <li :class="['menu-main__item', isActive && 'menu-main__item_active']">
      <a :class="['menu-main__link', isActive && 'menu-main__link_active']" :href="href" @click="navigate">{{ name }}</a>
    </li>
  </router-link>
</template>

<script>

export default {

  name: 'MainMenuItem',

  components: {

  },

  props: {
    name: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true 
    },
    params: {
      type: Object,
      required: true
    }
  },

	created() {

	},

	data: () => ({

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
.menu-main {
  &__item {
    
  }

  &__link {
    display: block;
    padding: 15px 25px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    text-decoration: none;
    transition: all .3s ease-out;
    white-space: nowrap;
    &:hover,
    &:focus,
    &:active,
    &:visited {
      color: #FFFFFF;
      text-decoration: none;
      background: #2378B7;
    }
  }

  &__button {
    padding: 18px 18px 18px 0;
    position: relative;
    border: none;
    outline: none;
    background: transparent;
    &:active,
    &:focus,
    &:hover {
      outline: none;
      // background: #2378B7;
    }
    span {
      display: block;
      height: 2px;
      background: #FFFFFF;
      &:nth-child(1),
      &:nth-child(3) {
        width: 16px;
      }
      &:nth-child(2) {
        margin: 4px 0;
        width: 12px;
      }
    }
  }
}
</style>