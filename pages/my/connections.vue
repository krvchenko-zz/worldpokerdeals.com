<template>
	<div>
		<my-rooms-form />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({
			manager: null,
		}),

		async fetch() { 
			await this.$axios.get('/my/connections/rooms', {
			}).then(response => {
				this.$store.commit('rooms/FETCH_ROOMS', {
					rooms: response.data 
				})
			})
		},

		created() {},

		computed: {
			...mapGetters({
				rooms: 'rooms/rooms'
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
