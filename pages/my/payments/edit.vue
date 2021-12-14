<template>
	<my-payments-form-edit
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
			await this.$axios.get(`/my/paymentinfo/${this.$route.params.id}`)
			.then(response => {
				this.$store.commit('auth/FETCH_PAYMENT_INFO', response.data)
			})
			.catch(e => {})
			await this.$axios.get('/my/payments')
			.then(response => {
				this.payments = response.data.payments
				this.currencies = response.data.currencies
			})
			.catch(e => {})
		},


		created() {},

		computed: {
			...mapGetters({
				paymentInfo: 'auth/paymentInfo'
			})
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">

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
