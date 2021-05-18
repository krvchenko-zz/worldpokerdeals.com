<template>
	<label
		:class="[
			'form-radio',
			shouldBeChecked && 'form-radio_active',
			disabled && 'form-radio_disabled',
		]"
	>
		<input
			:disabled="disabled"
			type="radio"
			:name="name"
			:value="value"
			:checked="shouldBeChecked"
			:class="['form-radio__input']"
			@change="updateInput"
		/>
		<span class="form-radio__inner"></span>
		<span class="form-radio__label">{{ label }}</span>
		<slot></slot>
	</label>
</template>

<script>
	export default {
		name: 'FormRadio',

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
				required: true,
			},
			name: {
				type: String,
				default: '',
			},

			disabled: {
				type: Boolean,
				default: false,
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
	$ico-radio: url('~assets/i/ico-radio.svg?data');

	.form-radio {
		margin: 0;
		position: relative;
		display: flex;
		cursor: pointer;
		&__input {
			display: none;
		}

		&__inner {
			&:before {
				display: block;
				width: 20px;
				height: 20px;
				content: '';
				background: $ico-radio no-repeat;
			}
		}

		&__label {
			padding-left: 16px;
			font-family: 'Proxima Nova';
			font-size: 16px;
			line-height: 20px;
			color: #555555;
		}

		input[type='radio']:checked + span:before {
			background-position: -20px 0px;
		}
	}
</style>
