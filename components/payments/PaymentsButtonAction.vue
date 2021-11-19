<template>
	<a
		:href="url"
		rel="nofollow noopener"
		target="_blank"
		:class="[
			'btn',
			'btn-block',
			'btn-payments',
			flat && 'btn-payments_plain',
			`btn-payments_${type}`,
		]"
		v-on="external ? {} : { click: handleClick }"
		>{{ label }}</a
	>
</template>

<script>
	export default {
		name: 'PaymentsButtonAction',

		components: {},

		props: {
			label: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				default: '#',
			},
			external: {
				type: Boolean,
				default: true,
			},
			type: {
				type: String,
				default: 'default',
			},
			flat: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			handleClick(e) {
				e.preventDefault()
				this.$emit('click', true)
			},
		},
	}
</script>

<style lang="scss">
	.btn-payments {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 16px 20px;
		font-family: 'Proxima Nova Sb';
		font-style: normal;
		font-size: 18px;
		line-height: 18px;
		text-align: center;
		color: #ffffff;
		border-radius: 4px;
		&:active,
		&:hover,
		&:focus {
			color: #ffffff;
		}
		&_skrill {
			box-shadow: 0px 4px 0px #a21c74;
			background: linear-gradient(180deg, #c93095 0%, #b52183 100%),
				linear-gradient(0deg, #b82787, #b82787),
				radial-gradient(100% 100% at 100% 0%, #bc3590 0%, #8d276c 61.46%);
		}

		&_neteller {
			background: linear-gradient(180deg, #8bbb4e 0%, #6f9e32 100%),
				linear-gradient(0deg, #b82787, #b82787),
				radial-gradient(100% 100% at 100% 0%, #bc3590 0%, #8d276c 61.46%);
			box-shadow: 0px 4px 0px #628e28;
		}

		&_ecopayz {
			background: linear-gradient(180deg, #4f93d5 0%, #3e7ebb 100%),
				linear-gradient(0deg, #b82787, #b82787),
				radial-gradient(100% 100% at 100% 0%, #bc3590 0%, #8d276c 61.46%);
			box-shadow: 0px 4px 0px #2f6ca7;
			border-radius: 4px;
		}

		&_default {
			background: linear-gradient(180deg, #ffb82e 0%, #ec8e02 100%), #f5a200;
			box-shadow: 0px 4px 0px #d78100;
		}

		&_plain {
			box-shadow: none;
		}
	}
</style>
