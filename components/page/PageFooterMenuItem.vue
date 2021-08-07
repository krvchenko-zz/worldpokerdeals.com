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
			<a :class="['footer-category-item__link']" :href="href" @click="navigate">
				<svg-icon
					v-if="icon && $device.isMobile"
					:class="['footer-category-item__icon']"
					:icon="icon"
					fill="#999999"
				/>{{ name }}
			</a>
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

			icon: {
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
			&__icon {
				margin-right: 16px;
				fill: '#999999';
			}
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
			display: flex;
			align-items: center;
			padding-left: 24px;
			margin-bottom: 20px;
			&__link {
				font-size: 16px;
				line-height: 20px;
				color: #ffffff;
				font-weight: 600;
				word-break: break-word;
				&:hover,
				&:focus,
				&:visited,
				&:link {
					color: #ffffff;
				}
			}
		}
	}
</style>
