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

		async middleware({ store, redirect, $axios }) {

			const user = store.getters['auth/user']

			await $axios.get('/my/paymentinfo', {
				params: {
					user_id: user.id,
				}
			}).then(response => {
				store.dispatch('auth/fetchPaymentInfos', response.data)
				$nuxt.$loading.finish()
			})

			if (!store.getters['auth/checkPaymentInfos']) {
				return redirect('/my/payments/add')
			}
		},

		props: {},

		data: () => ({}),

		async fetch() {

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
