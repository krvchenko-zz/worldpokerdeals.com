<template>
	<my-payments-form-add
		v-if="payments.length && currencies.length"
		:payments="payments"
		:currencies="currencies"
	/>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({
			payments: [],
			currencies: []
		}),

		async fetch() {
			await this.$axios.get('/my/payments')
			.then(response => {
				this.payments = response.data.payments
				this.currencies = response.data.currencies
			})
			.catch(e => {})
		},


		created() {},

		computed: {

		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	// $contact-us-bg: url('~assets/i/contact-us-bg.jpg');

	@include mq('desktop') {

	}

	@include mq('laptop') {

	}

	@include mq('tablet') {

	}

	@media (max-width: 415px) {

	}

	@media (max-width: 376px) {

	}
</style>
