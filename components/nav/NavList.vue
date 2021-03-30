<template>
  <nav class="page-nav">
    <ul class="page-nav__list" v-scrollable>
      <slot />
    </ul>
  </nav>
</template>

<script>

export default {

  name: 'NavList',

  components: {

  },

  props: {

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

$ico-scrollable: url('~assets/i/ico-scrollable.svg?data');

.page-nav {
  position: relative;
  margin-bottom: -25px;
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    margin: 0;
    // margin-bottom: -17px;
    // padding: 4px 1px 17px 1px;
    border-radius: 4px;
    display: flex;
    overflow: scroll;
    flex-basis: 100%;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    transition: transform .25s;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}

.scrollable {
  &__item {
    width: 52px;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
    text-indent: -999999px;
    background: #F1EFEF;
    cursor: pointer;

    &:after {
      top: 20px;
      left: 22px;
      position: absolute;
      display: block;
      content: '';
      width: 8px;
      height: 14px;
    }

    &_l {
      left: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      background: #F1EFEF;
      &::before {
        right: -42px;
        top: 10px;
        content: '';
        height: 32px;
        width: 52px;
        position: absolute;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.150869) 100%);
        opacity: 0.5;
        transform: rotate(90deg);
      }

      &:after {
        transform: rotate(180deg);
        background: $ico-scrollable no-repeat center;
      }
    }

    &_r {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      &::before {
        left: -42px;
        top: 10px;
        content: '';
        height: 32px;
        width: 52px;
        position: absolute;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.150869) 100%);
        opacity: 0.5;
        transform: rotate(-90deg);
      }

      &:after {
        background: $ico-scrollable no-repeat center;
      }
    }
  }
}
</style>