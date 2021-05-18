<template>
	<label
		:class="[
			'form-radio-button',
			shouldBeChecked && 'form-radio-button_active',
			disabled && 'form-radio-button_disabled',
			size && `form-radio-button_${size}`,
		]"
	>
		<input
			:disabled="disabled"
			type="radio"
			:name="name"
			:value="value"
			:checked="shouldBeChecked"
			:class="['form-radio-button__input']"
			@change="updateInput"
		/>
		<span
			:class="[
				'form-radio-button__label',
				size && `form-radio-button__label_${size}`,
				shouldBeChecked && 'form-radio-button__label_active',
			]"
		>
			<template v-if="icon">
				<svg-icon class="form-radio-button__icon" :icon="icon" />
			</template>
			<template v-else>{{ label }}</template>
		</span>
	</label>
</template>

<script>
	export default {
		name: 'FormRadioButton',

		model: {
			prop: 'modelValue',
			event: 'change',
		},
		props: {
			value: {
				type: [String, Number, Boolean, Object],
			},
			modelValue: {
				default: '',
			},
			label: {
				type: String,
			},
			name: {
				type: String,
				default: '',
			},
			icon: {
				type: String,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			size: {
				type: String,
				default: '',
			},
		},
		computed: {
			shouldBeChecked() {
				return this.modelValue == this.value
			},
		},
		methods: {
			updateInput() {
				this.$emit('change', this.value)
			},
		},
	}
</script>

<style lang="scss">
	.form-radio-button {
		margin: 0;
		cursor: pointer;
		background: #fafafa;
		border: 1px solid #c9c9c9;
		z-index: 1;
		&_active {
			z-index: 2;
			background: #1e88e5;
			border: 1px solid #2378b7;
			&.form-radio-button_disabled {
				border-color: #c9c9c9;
				background: #c9c9c9;
			}
		}

		&_disabled {
			cursor: not-allowed;
		}

		&:first-child {
			border-radius: 4px 0 0 4px;
		}

		&:last-child {
			border-radius: 0 4px 4px 0;
		}

		&__input {
			display: none;
		}

		&__label {
			display: block;
			padding: 12px 40px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #243238;
			&_active {
				color: #fff;
			}
			&_sm {
				padding: 8px 14px;
			}
		}
	}
</style>
