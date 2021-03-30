<template>
<nuxt-link prefetch :to="{ name: 'index',
		params: {
			child: page.parent ? page.slug : null,
			parent: page.parent ? page.parent.slug : page.slug
		}
	}" v-slot="{ href, route, navigate, isActive, isExactActive }">
	<li class="footer-category-item">
		<a :class="['footer-category-item__link']" :href="href" @click="navigate">{{ name }}</a>
	</li>
</nuxt-link>
</template>

<script>

export default {

	name: 'PageFooterMenuItem',

	components: {

	},

	props: {
		page: {
			type: Object
		},

		name: {
			type: String
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

.footer-category {
  flex-grow: 1;

  &-item {
    list-style: none;
    margin-bottom: 5px;
    &__link {
      font-family: 'Proxima Nova';
      font-size: 14px;
      line-height: 16px;
      color: #CCCCCC;
      text-decoration: none;
      &:hover,
      &:focus,
      &:visited,
      &:link {
        color: #CCCCCC;
        text-decoration: none;
      }
    }
  }
}
</style>