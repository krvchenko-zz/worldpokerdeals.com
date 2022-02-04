<template>
	<button class="filter-button" @click="onClick">
		<span v-if="selected" class="filter-button__label">{{ selected }}</span>
		<svg-icon
			class="filter-button__icon"
			width="16px"
			height="16px"
			icon="filter-settings"
			:image="true"
		></svg-icon>
		Фильтры
	</button>
</template>

<script>
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MobileFilterButton',
		props: {
			selected: {
				type: [String, Number],
			}
		},
		methods: {
			onClick() {
				eventBus.$emit('filter:toggle', null)
			},
		},
	}
</script>

<style lang="scss">
	.filter-button {
		position: relative;
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
		font-size: 16px;
		line-height: 16px;
		font-family: 'Proxima Nova Sb';
		&__icon {
			margin-right: 12px;
		}

		&__label {
			left: -4px;
			top: -4px;
			min-width: 16px;
			padding: 0 4px;
			background: #F82814;
			border: 1px solid #FFFFFF;
			border-radius: 10px;
			position: absolute;
			display: block;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 10px;
			line-height: 14px;
			color: #FFFFFF;
		}
	}
</style>
