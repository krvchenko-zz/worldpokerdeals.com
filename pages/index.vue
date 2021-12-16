<template>
	<section :class="[
		'content',
		!pageable && 'content_dark',
	]">
		<component :is="page" />
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	export default {
		components: {
			Promotion: () => import('~/dynamic-pages/promotion/index'),
			PromotionCategory: () => import('~/dynamic-pages/promotion/category'),

			Network: () => import('~/dynamic-pages/network/index'),
			NetworkCategory: () => import('~/dynamic-pages/network/category'),

			Room: () => import('~/dynamic-pages/room/index'),
			RoomCategory: () => import('~/dynamic-pages/room/category'),

			PaymentMethod: () => import('~/dynamic-pages/payment/index'),
			PaymentMethodCategory: () => import('~/dynamic-pages/payment/category'),

			Soft: () => import('~/dynamic-pages/soft/index'),
			SoftCategory: () => import('~/dynamic-pages/soft/category'),

			Game: () => import('~/dynamic-pages/game/index'),
			GameCategory: () => import('~/dynamic-pages/game/category'),

			Platform: () => import('~/dynamic-pages/platform/index'),
			PlatformCategory: () => import('~/dynamic-pages/platform/category'),

			PokerRule: () => import('~/dynamic-pages/rule/index'),
			PokerRuleCategory: () => import('~/dynamic-pages/rule/category'),

			Post: () => import('~/dynamic-pages/post/index'),
			PostCategory: () => import('~/dynamic-pages/post/category'),

			NotFound: () => import('~/pages/404'),
		},

		async middleware({ res, app, store, redirect, params, $axios  }) {

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
				.catch(error => {
					res.statusCode = 404
				})
		},

		layout: 'basic',

		head() {
			return {
				title: this.pageable ? this.pageable.meta_title : '',
				titleTemplate: '%s',
				htmlAttrs: {
					lang: this.pageable ? this.pageable.locale : 'ru',
				},

				meta: [
					{ hid : 'description', name: 'description', content: this.pageable ? this.pageable.meta_description : '' },
					{ hid : 'keywords', name: 'keywords', content: this.pageable ? this.pageable.meta_keywords : '' },
					{ name: 'og:title', content: this.pageable ? this.pageable.meta_title : '' },
					{ name: 'og:url', content: this.url },
				],

				link: [
					{ rel: 'canonical', href: this.pageable ? this.url : '' },
					{ rel: 'alternate', hreflang: 'x-default', href: this.pageable ? this.xDefault : '' },
					{ rel: 'alternate', hreflang: 'ru', href: this.pageable ? `https://ru.${this.host}${this.$route.path}` : '' },
					{ rel: 'alternate', hreflang: 'en', href: this.pageable ? `https://${this.host}${this.$route.path}` : ''},
					{ rel: 'alternate', hreflang: 'es', href: this.pageable ? `https://es.${this.host}${this.$route.path}` : '' },
				],

				script: [{ type: 'application/ld+json', json: this.pageable ? this.pageable.faq : '' }],
			}
		},

		data: () => ({}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				locales: 'lang/locales',
				country: 'location/country',
				geo: 'location/code',
				pageable: 'pages/page',
				topList: 'rooms/topList',
			}),

			host() {
				return process.env.hostName
			},

			url() {
				let url = `https://${this.locale !== 'en' ? this.locale + '.' : ''}${this.host}${this.$route.path}`

				return url.replace(/\/page\/(.*)/gi, '')
			},

			xDefault() {
				return `https://${this.host}${this.$route.path}`
			},

			page() {
				if (!this.pageable)
					return 'NotFound'

				const type = this.pageable.pageable_type,
							parentType = this.pageable.parent ? this.pageable.parent.pageable_type : null

				if (type === 'App\\PromotionCategory')
					return 'PromotionCategory'
				else if (type === 'App\\Promotion')
					return 'Promotion'
				else if (type === 'App\\Post')
					return 'Post'
				else if (type === 'App\\NetworkTranslation')
					return 'Network'
				else if (type === 'App\\PlatformTranslation')
					return 'Platform'
				else if (type === 'App\\NetworkCategory')
					return 'NetworkCategory'
				else if (type === 'App\\PlatformCategory')
					return 'PlatformCategory'
				else if (type === 'App\\PaymentMethodCategory')
					return 'PaymentMethodCategory'
				else if (type === 'App\\PokerRuleCategory')
					return 'PokerRuleCategory'
				else if (type === 'App\\PokerRule')
					return 'PokerRule'
				else if (type === 'App\\GameCategory')
					return 'GameCategory'
				else if (type === 'App\\SoftCategory')
					return 'SoftCategory'
				else if (type === 'App\\RoomCategory')
					return 'RoomCategory'
				else if (type === 'App\\PostCategory')
					return 'PostCategory'
				else if (type === 'App\\Tab' && parentType === 'App\\RoomCategory')
					return 'Room'
				else if (type === 'App\\Tab' && parentType === 'App\\PaymentMethodCategory')
					return 'PaymentMethod'
				else if (type === 'App\\Tab' && parentType === 'App\\GameCategory')
					return 'Game'
				else if (type === 'App\\Tab' && parentType === 'App\\SoftCategory')
					return 'Soft'
			},
		},

		mounted() {},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 90px;
		&_dark {
			background: #272937;
		}
	}
</style>
