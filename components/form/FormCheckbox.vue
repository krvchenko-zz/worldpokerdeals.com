<template>
	<label class="form-checkbox">
		<input
			type="checkbox"
			:class="{ 'form-checkbox__input': true }"
			:checked="shouldBeChecked"
			:value="value"
			@change="updateInput"
		/>
		<span class="form-checkbox__inner"></span>
		<span class="form-checkbox__label">{{ label }}<slot /></span>
	</label>
</template>

<script>
	export default {
		name: 'FormCheckbox',

		model: {
			prop: 'modelValue',
			event: 'change',
		},

		props: {
			value: {
				type: [Boolean, String, Number],
				default: false,
			},

			modelValue: {
				default: false,
			},

			trueValue: {
				default: true,
			},

			falseValue: {
				default: false,
			},

			label: {
				type: String,
				default: '',
			},
		},

		data: () => ({}),

		computed: {
			shouldBeChecked() {
				if (this.modelValue instanceof Array) {
					return this.modelValue.includes(this.value)
				}
				return this.modelValue === this.trueValue
			},
		},

		watch: {},

		created() {},

		methods: {
			updateInput(event) {
				let isChecked = event.target.checked

				if (this.modelValue instanceof Array) {
					let newValue = [...this.modelValue]

					if (isChecked) {
						newValue.push(this.value)
					} else {
						newValue.splice(newValue.indexOf(this.value), 1)
					}

					this.$emit('change', newValue)
				} else {
					this.$emit('change', isChecked ? this.trueValue : this.falseValue)
				}
			},
		},
	}
</script>

<style lang="scss">
	$ico-checkbox: url('~assets/i/ico-checkbox.svg?data');

	.form-checkbox {
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
				background: $ico-checkbox no-repeat;
			}
		}

		&__label {
			padding-left: 15px;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 20px;
			color: #555555;
		}

		input[type='checkbox']:checked + span:before {
			background-position: -20px 0px;
		}
	}
</style>
