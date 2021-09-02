<template>
	<div class="payment-list">
		<div v-if="label" class="block-title">{{ label }}</div>
		<div class="payment-list__list">
			<slot />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PaymentList',

		components: {},

		props: {
			label: {
				type: String,
			},
		},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.payment-list {
		&__list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(262px, 1fr));
			column-gap: 20px;
		}
	}

	@include mq('laptop') {
		.payment-list {
			margin-right: -24px;
			&__list {
				overflow-x: scroll;
				@include hide-scroll();
				grid-template-columns: none;
				grid-auto-columns: 350px;
				grid-auto-flow: column;
				gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.payment-list {
			margin-right: -20px;
			&__list {
				grid-auto-columns: 288px;
				gap: 16px;
			}
		}
	}
</style>
