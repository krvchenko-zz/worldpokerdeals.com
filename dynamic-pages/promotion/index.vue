<template>
	<component v-if="promotion && promotion.type" :is="component" />
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {
			Bonus: () => import('~/dynamic-pages/promotion/bonus'),
			Promotion: () => import('~/dynamic-pages/promotion/promotion'),
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				pageable: 'pages/page',
				promotion: 'promotions/promotion',
				topList: 'rooms/topList',
			}),

			component() {
				return this.promotion.type === 'bonus' ? 'Bonus' : 'Promotion'
			},
		},

		async fetch() {
			await this.$axios
				.get(`promotion/${this.pageable.slug}`, {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('promotions/FETCH_PROMOTION', {
						promotion: response.data.item,
					})
					this.$store.commit('promotions/FETCH_ITEMS', {
						items: response.data.latest,
					})
					this.$store.commit('promotions/FETCH_RELATED', {
						related: response.data.related,
					})
				})
		},

		watch: {},

		mounted() {},

		methods: {},
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 90px;
	}
</style>
