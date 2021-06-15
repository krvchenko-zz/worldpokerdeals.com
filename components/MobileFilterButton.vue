<template>
	<button class="filter-button" @click="onClick">
		<svg-icon
			fill="#fff"
			class="filter-button__icon"
			icon="filter-settings"
		></svg-icon>
		Фильтры
	</button>
</template>

<script>
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MobileFilterButton',
		methods: {
			onClick() {
				eventBus.$emit('filter:toggle', null)
			},
		},
	}
</script>

<style lang="scss">
	.filter-button {
		display: inline-flex;
		border: none;
		outline: none;
		justify-content: center;
		align-items: center;
		padding: 12px 16px;
		white-space: nowrap;
		background: #1e88e5;
		border-radius: 4px;
		color: #fff;
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
		&__icon {
			margin-right: 12px;
		}
	}
</style>
