<template>
	<nav class="games-nav">
		<ul class="games-nav__list">
			<slot />
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'GameNavList',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.games-nav {
		&__list {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
