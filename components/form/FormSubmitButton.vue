<template>
	<button
		type="submit"
		:disabled="disabled"
		:class="[
			'btn',
			`btn-${size}`,
			'form-submit',
			loading && 'form-submit_loading',
			disabled && 'form-submit_disabled',
			icon && 'form-submit_icon',
		]"
	>
		{{ label }}
	</button>
</template>

<script>
	export default {
		name: 'FormSubmitButtom',

		components: {},

		props: {
			loading: {
				type: Boolean,
				default: false,
			},

			label: {
				type: String,
				default: '',
			},

			size: {
				type: String,
				default: 'lg',
			},

			disabled: {
				type: Boolean,
				default: false,
			},

			icon: {
				type: Boolean,
				default: false,
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
	$ico-btn-loading: url('~assets/i/ico-btn-loading.svg?data');
	.form-submit {
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 16px;
		color: #ffffff;
		background: #2e87c8;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:hover {
			color: #ffffff;
			background: #1a76b5;
		}
		&_loading {
			transition: none;
			color: transparent;
			background: #2e87c8 $ico-btn-loading no-repeat center;
			&:hover {
				color: transparent;
				background: #1a76b5 $ico-btn-loading no-repeat center;
			}
		}

		&_disabled {
			cursor: not-allowed;
			background: #c9c9c9;
		}

		&_icon {
			position: relative;
			width: 42px;
			height: 40px;
			padding: 0;
			&:before {
				content: '';
				top: 50%;
				left: 50%;
				position: absolute;
				width: 14px;
				height: 2px;
				display: block;
				background: #ffffff;
				transform: rotate(45deg) translate3d(-8px, 0px, 0);
			}
			&:after {
				content: '';
				bottom: 50%;
				left: 50%;
				position: absolute;
				width: 14px;
				height: 2px;
				display: block;
				background: #ffffff;
				transform: rotate(-45deg) translate3d(-8px, 0px, 0);
			}
		}
	}
</style>
