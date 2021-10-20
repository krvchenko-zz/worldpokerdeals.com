<template> </template>

<script>
	export default {
		async middleware({ store, redirect, params, $axios }) {
			
			const { data } = await $axios.get(`/soft/item/${params.id}`)
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
