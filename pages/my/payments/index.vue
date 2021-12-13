<template>
	<div>
		<my-payments-form />

		<my-payments-table v-if="user.payment_infos && user.payment_infos.length" />
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
			await this.$axios.get('user', {
				params: {
					locale: this.locale,
					with: ['connections', 'paymentInfos.currency', 'paymentInfos.method'],
				}
			}).then(response => {
				this.$store.dispatch('auth/updateUser', response.data)
			})
		},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
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
