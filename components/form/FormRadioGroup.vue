<template>
	<div class="form-radio-group">
		<label
			v-if="label"
			:class="[
				'form-radio-group__label',
				labelPosition && `form-radio-group__label_${labelPosition}`,
			]"
			>{{ label }}</label
		>
		<div class="form-radio-group__wrap">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FormRadioGroup',

		components: {},

		props: {
			label: {
				type: String,
			},

			labelPosition: {
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
	.form-radio-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		&__label {
			position: relative;
			display: block;
			margin-bottom: 8px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #222222;
			flex: 0 0 100%;
			&_left {
				margin-right: 20px;
				flex: none;
				margin-bottom: 0;
			}
		}

		&__wrap {
			display: flex;
		}

		.form-radio-button {
			margin-right: -1px;
		}
		.form-radio {
			margin-right: 40px;
			&:last-child {
				margin: 0;
			}
		}
	}
</style>
