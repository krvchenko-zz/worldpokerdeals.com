<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		prefetch
		:to="{
			name: 'index',
			params: {
				child: page.parent ? page.slug : null,
				parent: page.parent ? page.parent.slug : page.slug,
			},
		}"
	>
		<li class="footer-category-item">
			<a
				:class="['footer-category-item__link']"
				:href="href"
				@click="navigate"
				>{{ name }}</a
			>
		</li>
	</nuxt-link>
</template>

<script>
	export default {
		name: 'PageFooterMenuItem',

		components: {},

		props: {
			page: {
				type: Object,
			},

			name: {
				type: String,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
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
				color: #cccccc;
				text-decoration: none;
				&:hover,
				&:focus,
				&:visited,
				&:link {
					color: #cccccc;
					text-decoration: none;
				}
			}
		}
	}

	@include mq('tablet') {
		.footer-category-item {
			padding-left: 20px;
		}
	}
</style>
