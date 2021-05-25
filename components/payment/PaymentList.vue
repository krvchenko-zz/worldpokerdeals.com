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

	@include mq('tablet') {
		.payment-list {
			width: 100%;
			&__list {
				width: 100%;
				overflow-x: scroll;
				scrollbar-width: none;
				grid-auto-columns: 288px;
				grid-template-columns: none;
				grid-auto-flow: column;
			}
		}
	}
</style>
