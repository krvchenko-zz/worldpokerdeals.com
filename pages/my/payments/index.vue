<template>
	<div>
		<my-payments-form />
		
		<my-payments-table v-if="paymentInfos && paymentInfos.length" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({}),

		async fetch() {
			await this.$axios.get('/my/paymentinfo', {
				params: {
					user_id: this.user.id,
				}
			}).then(response => {
				this.$store.dispatch('auth/updatePaymentInfos', response.data)
			})
		},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				paymentInfos: 'auth/paymentInfos',
			})
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
