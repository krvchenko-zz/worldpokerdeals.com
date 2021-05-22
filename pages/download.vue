<template> </template>

<script>
	export default {
		async middleware({ store, redirect, params, $axios }) {
			const country = store.getters['location/country']

			if (country.code === 'RU') {
				return redirect('/restricted')
			}

			const { data } = await $axios.get(`/rooms/url/${params.slug}`)
			return redirect(data.url)
		},
		components: {},
		layout: 'basic',

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss"></style>
