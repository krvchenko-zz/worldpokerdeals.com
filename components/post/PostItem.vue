<template>
	<article :class="[
    'post-item', medium && 'post-item_size_m'
  ]">
    <img
      decoding="async"
      :width="medium ? `327px` : `80px`"
      :height="medium ? `185px` : `80px`"
      :class="['post-item__img', medium && 'post-item__img_size_m']"
      :src="src" 
      :alt="image.alt || title"
      loading="lazy">
    <div v-if="medium" class="post-item__meta">
      <span class="post-item__date post-item__date_size_m">{{ dateFormat(created) }}</span>
      <span v-for="(item, index) in categories" :key="index" class="post-item__category">{{ item.title }}</span>
    </div>
    <nuxt-link prefetch :to="{name: 'index', params: {parent: 'blog', child: slug}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
      <a :class="['post-item__link', medium && 'post-item__link_size_m']" :href="href" @click="navigate">{{ title }}</a>
    </nuxt-link>
    
    <p v-if="medium" class="post-item__summary">{{ strLimit }}</p>
    <div :class="['post-item__author', medium && 'post-item__author_size_m']">
      <span>
        <img decoding="async" width="24px" height="24px" class="post-item__author-pic" :src="avatar" :alt="author.full_name" loading="lazy">
        <span class="post-item__author-name">{{ author.full_name }}</span>
      </span>
      <span v-if="!medium" class="post-item__sep">·</span>
      <span v-if="!medium" class="post-item__date">{{ dateFormat(created) }}</span>
    </div>
  </article>
</template>

<script>

export default {

  name: 'PostItem',

  components: {

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

    summary: {
      type: String,
      required: true
    },

    slug: {
      type: String,
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

    categories: {
      type: Array
    },

    medium: {
      type: Boolean,
      default: false
    }
  },

	created() {

	},

	data: () => ({
    imageStyle: 'post-square'
	}),

  computed: {
    mediaUrl() {
      return process.env.mediaUrl
    },
    
    avatar() {
      return `${this.mediaUrl}/user-square/${this.author.image.filename}`
    },

    src() {
      return `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
    },

    url() {
      return `/blog/${this.slug}`
    },

    strLimit() {
      return this.summary.length > 88 ? `${this.summary.substring(0, 88)}...` : this.summary
    }
  },

  watch: {
    medium: {
      immediate: true,
      handler(val) {
        this.imageStyle = val ? 'post-medium' : 'post-square'
      }
    }
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
	}
}
</script>

<style lang="scss">
.post-item {
  margin-bottom: 20px;
  overflow: hidden;
  &_size_m {
    margin-bottom: 25px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &__img {
    max-width: 100%;
    height: auto;
    float: left;
    &_size_m {
      border-radius: 4px;
      float: none;
      clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
    }
  }
  &__link {
    padding-left: 100px;
    margin-bottom: 10px;
    display: block;
    font-style: normal;
    font-weight: bold;
    color: #243238;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.1px;
    font-family: 'Proxima Nova';
    transition: background 0.1s ease,
                border-color 0.1s ease,
                color 0.1s ease;
    &:hover {
      color: #555555;
      text-decoration: none;
    }
    &_size_m {
      padding: 0;
      letter-spacing: 0;
      line-height: 24px;
      font-size: 20px;
      &:hover {
        color: #008BE2;
      }
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
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  &__date {
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    color: #999999;
    font-family: 'Proxima Nova';

    &_size_m {
      font-family: 'Proxima Nova Sb';
      font-size: 12px;
      line-height: 16px;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #555555;
    }
  }

  &__category {
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

  &__sep {
    color: #999999;
    font-weight: bold;
    line-height: 22px;
    font-size: 18px;
    font-family: 'Proxima Nova';
  }

  &__author {
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    &_size_m {
      padding: 0;
    }
    &-pic {
      margin-right: 6px;
      border-radius: 50%;
    }

    &-name {
      font-family: 'Proxima Nova';
      font-size: 12px;
      line-height: 16px;
      color: #999999;
    }
  }
}
</style>