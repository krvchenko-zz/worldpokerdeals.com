<template></template>

<script>

	export default {
		components: {},
		layout: 'basic',

		async middleware({ store, redirect, params, $axios }) {
			await $axios
				.get(`auth/verify/${params.token}`)
				.then(response => {
					return redirect('/')
				})
				.catch(error => {
					return redirect('/')
				})
		},

		methods: {},
	}
</script>
<style lang="scss"></style>