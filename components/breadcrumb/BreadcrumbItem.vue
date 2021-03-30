<template>
  <nuxt-link prefetch :to="{name: 'index', params: route}" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <li :class="['breadcrumb-item', last && 'breadcrumb-item_current']" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
      <a v-if="!last" :class="['breadcrumb-item__link', white && 'breadcrumb-item__link_white']" itemprop="item" :href="href" @click="navigate">
        <span :class="['breadcrumb-item__name', white && 'breadcrumb-item__name_white']" itemprop="name">{{ title }}</span>
        <meta itemprop="position" :content="index + 1">
      </a>
      <span v-else :class="['breadcrumb-item__current', white && 'breadcrumb-item__current_white']" itemprop="item">
        <span :class="['breadcrumb-item__name', white && 'breadcrumb-item__name_white']" itemprop="name">{{ title }}</span>
        <meta itemprop="position" :content="index + 1">
      </span>
    </li>
  </nuxt-link>

</template>

<script>

export default {

  name: 'BreadcrumbItem',

  components: {

  },

  props: {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: [Object, Boolean, String],
      default: null
    },

    index: {
      type: Number,
      default: 0
    },

    parent: {
      type: [Object, Boolean, String],
      default: null
    },

    last: {
      type: Boolean,
    },

    white: {
      type: Boolean,
      default: false
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    route() {
      return {
        parent: this.parent ? this.parent.slug : this.slug,
        child: this.parent ? this.slug : null
      }
    }
  },
  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
$ico-breadcrumb-arrow-grey: url('~assets/i/ico-breadcrumb-arrow-grey.svg?data');
$ico-breadcrumb-arrow-white: url('~assets/i/ico-breadcrumb-arrow-white.svg?data');

.breadcrumb-item {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  list-style: none;
  padding-right: 12px;
  margin-right: 8px;
  &:after {
    top: 3px;
    right: 0;
    position: absolute;
    content: '';
    display: block;
    width: 4px;
    height: 7px;
    background: $ico-breadcrumb-arrow-grey no-repeat center;
  }
  &_current {
    padding: 0;
    margin: 0;
    &:after {
      display: none;
    }
  }
  &__link {
    display: block;
    text-decoration: none;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 14px;
    color: #008BE2;

    &:hover,
    &:active,
    &:focus,
    &:visited {
      text-decoration: none;
      color: #008BE2;
    }

    &_white {
      color: #fff;
      &:hover,
      &:active,
      &:focus,
      &:visited {
        color: #fff;
      }
    }
  }

  &__current {
    display: block;
    font-family: 'Proxima Nova';
    font-size: 12px;
    line-height: 14px;
    color: #999999;
  } 
}
</style>