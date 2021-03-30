<template>
<div class="posts">
  <div :class="['block-title', 'posts-title', featured && 'posts-title_featured']">
    <span :class="['posts-title__label', featured && 'posts-title__label_featured']">{{ label }}</span>
  </div>
  <div class="posts__list">
    <slot/>
  </div>
</div>
</template>

<script>

export default {

  name: 'PostList',

  components: {

  },

  props: {
    label: {
      type: String,
      default: 'Последние новости'
    },

    featured: {
      type: Boolean,
      default: false
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
$ico-posts-featured: url('~assets/i/ico-posts-featured.svg?data');
.posts {
  margin: 40px 0;
  &:first-child {
    margin-top: 0;
  }
}
.posts-title {
  &_featured {
    margin-top: 0;
    padding: 0;
    text-align: center;
    position: relative;
    justify-content: center;
    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      display: block;
      background: #FCB43B;
    }
  }

  &__label {
    &_featured {
      position: relative;
      display: inline-flex;
      padding: 7px 14px 7px 36px;
      font-family: 'Proxima Nova Th';
      font-style: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.5px;
      color: #333333;
      text-transform: uppercase;
      border: 1px solid #FCB43B;
      border-radius: 50px;
      background: #FFFFFF $ico-posts-featured no-repeat 14px 6px;
    }
  }
}
.posts__list {
  overflow: hidden;
}
</style>