<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		prefetch
		:to="{ name: name }"
	>
		<li :class="[
			'my-nav__item',
			isActive && 'my-nav__item_active'
		]">
				<a :class="[
					'my-nav__link',
					isActive && 'my-nav__link_active'
				]" :href="href" @click="navigate">{{ title }}</a>
		</li>
	</nuxt-link>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'MyNavItem',

		components: {},

		props: {
			name: String,
			title: String,
		},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.my-nav__item {
		border-bottom: 1px solid #e9e9e9;
		&_active {
			border-bottom: 0;
		}
		&:last-child {
			border: none;
		}
	}
	.my-nav__link {
		display: block;
		padding: 15px 30px;
		color: #222222;
		text-decoration: none;
		font-family: 'Proxima Nova';
		font-weight: bold;
		&:hover {
			color: #222222;
			text-decoration: none;
			background: #fafafa;
		}
		&_active {
			padding-top: 16px;
			padding-left: 20px;
			background: #ffffff;
			border-left: 10px solid #008be2;
			&:hover {
				background: #ffffff;
			}
		}
	}
</style>
