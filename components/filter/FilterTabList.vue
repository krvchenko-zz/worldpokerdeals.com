<template>
	<nav class="filter-tabs">
		<ul class="filter-tabs__list">
			<slot />
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'FilterTabList',

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
	.filter-tabs {
		&__list {
			overflow-x: scroll;
			position: relative;
			margin: 0 0 28px 0;
			padding: 0;
			display: flex;
			list-style: none;
			@include hide-scroll();
			&:before {
				content: '';
				bottom: 3px;
				position: absolute;
				height: 1px;
				width: 100%;
				display: block;
				background: #cccccc;
			}
		}
	}
</style>
