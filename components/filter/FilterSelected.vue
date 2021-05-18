<template>
	<div :class="['filter-selected', clear && 'filter-selected_clear']">
		<span
			:class="[
				'filter-selected__label',
				clear && 'filter-selected__label_clear',
			]"
			@click="handleClick"
			>{{ label }}</span
		>
	</div>
</template>

<script>
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'FilterSelected',

		components: {},

		props: {
			label: {
				type: String,
			},

			value: {
				type: [String, Number, Boolean],
			},

			itemKey: {
				type: [String, Number, Boolean],
			},

			clear: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				eventBus.$emit('selected:delete', {
					clear: this.clear,
					key: this.itemKey,
					value: this.value,
				})
			},
		},
	}
</script>

<style lang="scss">
	$ico-filter-close: url('~assets/i/ico-filter-close.svg?data');

	.filter-selected {
		margin: 0 8px 8px 0;
		cursor: pointer;
		display: inline-block;
		position: relative;
		border: 1px solid rgba(0, 139, 226, 0.7);
		border-radius: 50px;
		background: #ffffff;
		&:before {
			content: '';
			top: 7px;
			left: 10px;
			position: absolute;
			width: 8px;
			height: 8px;
			display: block;
			opacity: 0.5;
			background: $ico-filter-close no-repeat center;
		}
		&:hover {
			border: 1px solid transparent;
			background: rgba(0, 139, 226, 0.3);
			&:before {
				opacity: 1;
			}
		}
		&_clear {
			border: 1px solid #e9e9e9;
			&:before {
				filter: grayscale(1);
			}
			&:hover {
				background: #e9e9e9;
			}
		}
		&__label {
			display: block;
			padding: 3px 10px 3px 23px;
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 16px;
			color: #008be2;
			&_clear {
				color: #777777;
			}
		}
	}
</style>
