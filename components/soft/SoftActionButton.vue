<template>
	<nuxt-link v-slot="{ href, route, navigate }" :to="to">
		<button
			:disabled="disabled"
			:class="[
				'btn',
				'btn-soft-action',
				`btn-soft-action_${type}`,
				disabled && 'btn-soft-action_disabled',
				icon && `btn-soft-action_icon`,
			]"
			v-on="{ click: handleClick }"
		>
			{{ label }}
		</button>
	</nuxt-link>
</template>

<script>
	export default {
		name: 'SoftActionButton',

		components: {},

		props: {
			id: {
				type: [String, Number],
			},

			type: {
				type: String,
				default: 'download',
			},

			label: {
				type: String,
				default: '',
			},

			icon: {
				type: Boolean,
				default: false,
			},

			slug: {
				type: String,
				default: '',
			},

			color: {
				type: String,
				default: '#FFFFFF',
			},

			disabled: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {
			to() {
				return `/soft/${this.id}/download`
			},
		},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				window.open(this.to, '_blank')
			},
		},
	}
</script>

<style lang="scss">
	$ico-soft-download: url('~assets/i/ico-soft-download.svg?data');
	.btn-soft-action {
		color: #ffffff;
		font-family: 'Proxima Nova Sb';
		font-size: 16px;
		line-height: 16px;
		color: #ffffff;
		background: #ff5e38;

		&_icon {
			padding: 12px 44px 12px 76px;
			text-align: right;
			background: #ff5e38 $ico-soft-download no-repeat 44px center;
			&:hover,
			&:active,
			&:visited {
				color: #ffffff;
			}
		}

		&_disabled {
			opacity: 0.5;
	    pointer-events: none;
	    cursor: not-allowed;
		}
	}
</style>
