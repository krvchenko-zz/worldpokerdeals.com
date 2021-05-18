<template>
	<div>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{ name: 'index', params: {} }"
		>
			<a :href="href" @click="navigate"></a>
		</nuxt-link>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Default',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss"></style>
