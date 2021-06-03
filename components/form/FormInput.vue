<template>
	<div
		:class="[
			'form-input',
			prefix && 'form-input_prepend',
			`form-input_type_${type}`,
		]"
	>
		<label
			v-if="label"
			:style="{
				color: labelColor,
			}"
			:class="['form-input__label', required && 'form-input__label_required']"
		>
			{{ label }}
			<slot name="label" />
		</label>
		<div
			:class="['form-input__inner', hasPrefix() && 'form-input__inner_prepend']"
		>
			<div class="form-input__prepend">
				<slot name="prefix" />
			</div>
			<input
				autocomplete="false"
				:placeholder="placeholder"
				:disabled="disabled"
				:type="
					type !== 'password' || (type === 'password' && !showPassword)
						? type
						: 'text'
				"
				:name="name"
				:value="value"
				:class="[
					'form-input__value',
					loading && 'form-input__value_loading',
					error && 'form-input__value_error',
					disabled && 'form-input__value_disabled',
					hasPrefix() && 'form-input__value_prepend',
				]"
				@input="$emit('input', $event.target.value)"
			/>
			<span
				v-if="type === 'password'"
				:class="[
					'form-input-password',
					showPassword && 'form-input-password_hide',
					!showPassword && 'form-input-password_show',
				]"
				@click="showPassword = !showPassword"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FormInput',
		components: {},

		model: {
			prop: 'value',
			event: 'input',
		},

		props: {
			value: {
				type: String,
				default: '',
			},

			label: {
				type: [String, Boolean],
				default: false,
			},

			placeholder: {
				type: [String],
				default: '',
			},

			prefix: {
				type: [Boolean],
				default: false,
			},

			type: {
				type: String,
				default: 'text',
			},

			name: {
				type: String,
				default: '',
			},

			error: {
				type: Boolean,
				default: false,
			},

			icon: {
				type: [String, Boolean],
				default: false,
			},

			loading: {
				type: Boolean,
				default: true,
			},

			labelColor: {
				type: String,
				default: '#222222',
			},

			required: {
				type: Boolean,
				default: false,
			},

			disabled: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			showPassword: false,
		}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			hasPrefix() {
				return !!this.$slots.prefix
			},
		},
	}
</script>

<style lang="scss">
	$ico-password-hide: url('~assets/i/ico-password-hide.svg?data');
	$ico-password-show: url('~assets/i/ico-password-show.svg?data');

	.form-input {
		&__label {
			position: relative;
			display: block;
			margin-bottom: 8px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #222222;

			&_required {
				display: flex;
				align-items: center;
				&:after {
					margin-left: 8px;
					content: '';
					width: 5px;
					height: 5px;
					display: block;
					line-height: 20px;
					border-radius: 50%;
					background: #ff4151;
				}
			}
		}

		&__inner {
			position: relative;
			&_prepend {
				display: flex;
			}
		}

		&__prepend {
			width: 50%;
			input,
			select {
				border-right-width: 0 !important;
				border-top-right-radius: 0 !important;
				border-bottom-right-radius: 0 !important;
				&:focus {
					margin-right: -1px;
					border-right-width: 1px !important;
				}
			}
		}

		&__value {
			padding: 9px;
			width: 100%;
			background: #ffffff;
			mix-blend-mode: normal;
			border: 1px solid #c9c9c9;
			border-radius: 4px;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 16px;
			color: #555555;
			&_prepend {
				width: 50%;
			}
			&:focus,
			&:active {
				outline: none;
				border: 1px solid #008be2;
				box-shadow: 0px 0px 20px rgba(0, 139, 226, 0.2);
				border-radius: 4px;
			}

			&:-webkit-autofill {
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 16px;
				color: #555555;
				-webkit-text-fill-color: #555555 !important;
				-webkit-box-shadow: 0 0 0 30px white inset !important;
			}

			&-webkit-autofill {
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 16px;
				color: #555555;
				-webkit-text-fill-color: #555555 !important;
				-webkit-box-shadow: 0 0 0 30px white inset !important;
			}

			&:-webkit-autofill:focus,
			&:-webkit-autofill:active {
				box-shadow: 0px 0px 20px rgba(0, 139, 226, 0.2);
			}

			&_error {
				border-color: #ff4151;
			}

			&_loading {
				background: #e9e9e9;
				border: 1px solid #e9e9e9;
			}

			&_disabled {
				border-color: #e9e9e9;
				cursor: not-allowed;
				background: #fafafa;
			}

			&_prepend {
				border-top-left-radius: 0 !important;
				border-bottom-left-radius: 0 !important;
			}
		}

		&-password {
			right: 0;
			top: 0;
			width: 42px;
			height: 40px;
			cursor: pointer;
			position: absolute;
			display: block;
			&_show {
				background: $ico-password-show no-repeat center;
			}
			&_hide {
				background: $ico-password-hide no-repeat center;
			}
		}
	}

	.invalid-feedback {
		margin-top: 8px;
		font-family: 'Proxima Nova Sb';
		font-size: 12px;
		line-height: 16px;
		color: #ff4151;
	}
</style>
