<template>
	<div class="soft-list">
		<div v-if="label" class="block-title">{{ label }}</div>
		<slot />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'SoftList',

		components: {},

		props: {
			label: {
				type: String,
			},
		},

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
