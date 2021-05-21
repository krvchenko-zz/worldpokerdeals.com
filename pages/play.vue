<template> </template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		async middleware({ store, redirect, params, $axios }) {
			const { data } = await $axios.get(`/rooms/url/${params.slug}`)
			return redirect(data.url)
		},
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss"></style>
