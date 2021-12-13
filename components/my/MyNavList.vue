<template>
	<nav class="my-nav">
		<ul class="my-nav__list">
			<slot />
		</ul>
	</nav>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'MyNavList',

		components: {},

		props: {},

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
	.my-nav {
		background: #f1efef;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
		ul {
			list-style: none;
			padding: 0;
	    margin: 0;
		}
	}
</style>
