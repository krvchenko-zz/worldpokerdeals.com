<template>
	<section :class="['content']">
		<component :is="getPageType()" />
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import eventBus from '~/utils/event-bus'

	export default {
		components: {
			Promotion: () => import('~/dynamic-pages/promotion/index'),
			PromotionCategory: () => import('~/dynamic-pages/promotion/category'),

			Network: () => import('~/dynamic-pages/network/index'),
			NetworkCategory: () => import('~/dynamic-pages/network/category'),

			RoomCategory: () => import('~/dynamic-pages/room/category'),
			Room: () => import('~/dynamic-pages/room/index'),

			PaymentMethod: () => import('~/dynamic-pages/payment/index'),
			PaymentMethodCategory: () => import('~/dynamic-pages/payment/category'),

			SoftCategory: () => import('~/dynamic-pages/soft/category'),
			Soft: () => import('~/dynamic-pages/soft/index'),

			GameCategory: () => import('~/dynamic-pages/game/category'),
			Game: () => import('~/dynamic-pages/game/index'),

			Platform: () => import('~/dynamic-pages/platform/index'),
			PlatformCategory: () => import('~/dynamic-pages/platform/category'),

			PokerRuleCategory: () => import('~/dynamic-pages/rule/category'),
			PokerRule: () => import('~/dynamic-pages/rule/index'),

			PostCategory: () => import('~/dynamic-pages/post/category'),
			Post: () => import('~/dynamic-pages/post/index'),
		},

		async middleware({ store, redirect, params, $axios }) {

			const country = store.getters['location/country']

			if (country.code === 'RU' && params.child && params.child.match(/^.+-(download$)/, 'gm')) {
				return redirect('/restricted')
			}

			let url = `pages/${params.parent}`

			if (params.child) {
				url += `/${params.child}`
			}

			await $axios
				.get(url)
				.then(response => {
					store.commit('pages/FETCH_PAGE', { page: response.data })
				})
				.catch(error => {})
		},

		layout: 'basic',

		// middleware: 'page',

		metaInfo: {},

		data: () => ({
			dark: false,
		}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				page: 'pages/page',
				topList: 'rooms/topList',
			}),
		},

		watch: {},

		mounted() {
			eventBus.$on('layout:change', data => {
				this.dark = data
			})
		},

		methods: {
			getPageType() {
				const type = this.page.pageable_type,
					parentType = this.page.parent ? this.page.parent.pageable_type : null

				if (type === 'App\\PromotionCategory') {
					return 'PromotionCategory'
				} else if (type === 'App\\Promotion') {
					return 'Promotion'
				} else if (type === 'App\\NetworkTranslation') {
					return 'Network'
				} else if (type === 'App\\PlatformTranslation') {
					return 'Platform'
				} else if (type === 'App\\NetworkCategory') {
					return 'NetworkCategory'
				} else if (type === 'App\\PlatformCategory') {
					return 'PlatformCategory'
				} else if (type === 'App\\PaymentMethodCategory') {
					return 'PaymentMethodCategory'
				} else if (type === 'App\\PokerRuleCategory') {
					return 'PokerRuleCategory'
				} else if (type === 'App\\PokerRule') {
					return 'PokerRule'
				} else if (type === 'App\\GameCategory') {
					return 'GameCategory'
				} else if (type === 'App\\Tab' && parentType === 'App\\RoomCategory') {
					return 'Room'
				} else if (
					type === 'App\\Tab' &&
					parentType === 'App\\PaymentMethodCategory'
				) {
					return 'PaymentMethod'
				} else if (type === 'App\\Tab' && parentType === 'App\\GameCategory') {
					return 'Game'
				} else if (type === 'App\\Tab' && parentType === 'App\\SoftCategory') {
					return 'Soft'
				} else if (type === 'App\\SoftCategory') {
					return 'SoftCategory'
				} else if (type === 'App\\RoomCategory') {
					return 'RoomCategory'
				} else if (type === 'App\\PostCategory') {
					return 'PostCategory'
				} else if (type === 'App\\Post') {
					return 'Post'
				}
			},
		},
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 90px;
	}
</style>
