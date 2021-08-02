<template>
	<div class="filters-selected">
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'FilterSelectedList',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.filters-selected {
		margin-top: -12px;
		margin-bottom: 16px;
		display: flex;
		flex-wrap: wrap;
	}
</style>
