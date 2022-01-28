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
			Promotion: () => import(
				'~/dynamic-pages/promotion/index'
			),
			PromotionCategory: () => import(
				'~/dynamic-pages/promotion/category'
			),

			Network: () => import(
				'~/dynamic-pages/network/index'
			),
			NetworkCategory: () => import(
				'~/dynamic-pages/network/category'
			),

			Room: () => import(
				'~/dynamic-pages/room/index'
			),
			RoomCategory: () => import(
				'~/dynamic-pages/room/category'
			),

			PaymentMethod: () => import(
				'~/dynamic-pages/payment/index'
			),
			PaymentMethodCategory: () => import(
				'~/dynamic-pages/payment/category'
			),

			Soft: () => import(
				'~/dynamic-pages/soft/index'
			),
			SoftCategory: () => import(
				'~/dynamic-pages/soft/category'
			),

			Game: () => import(
				'~/dynamic-pages/game/index'
			),
			GameCategory: () => import(
				'~/dynamic-pages/game/category'
			),

			Platform: () => import(
				'~/dynamic-pages/platform/index'
			),
			PlatformCategory: () => import(
				'~/dynamic-pages/platform/category'
			),

			Post: () => import(
				'~/dynamic-pages/post/index'
			),
			PostCategory: () => import(
				'~/dynamic-pages/post/category'
			),

			NotFound: () => import(
				'~/pages/404'
			),
		},

		async middleware({ res, app, store, redirect, params, $axios  }) {

			const country = store.getters['location/country']

			if (country.code === 'RU' && params.child && params.child.match(/^.+-(download$)/, 'gm')) {
				let room = store.getters['rooms/room']
				return redirect(`/restricted/${room.slug}`)
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

				link: this.canocical,

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

			canocical() {
				let value = [
					{
						rel: 'canonical',
						href: `https://${this.locale !== 'en' ? this.locale + '.' : ''}${this.host}${this.$route.path}`
					},
				]

				const translations = this.pageable ? this.pageable.translations : null

				if (translations && translations.length) {

					if (this.pageable.pageable_type !== 'App\\Post') {
						value.push({ rel: 'alternate', href: `https://${this.host}${this.$route.path}`, hreflang: 'x-default' })
					}

					value.push({
						rel: 'alternate', hreflang: this.pageable.locale, href: this.pageable ? `https://${this.pageable.locale !== 'en' ? this.pageable.locale + '.' : ''}${this.host}${this.$route.path}` : ''
					})

					for (var i = 0; i < translations.length; i++) {
						let locale = translations[i].locale,
								item = {
									rel: 'alternate',
									hreflang: locale,
									href: `https://${locale !== 'en' ? locale + '.' : ''}${this.host}${translations[i].parent ? '/' : ''}${translations[i].parent ? translations[i].parent.slug : ''}/${translations[i].slug}`,
								}

						value.push(item)
					}
				}

				return value
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
				else if (type === 'App\\Network')
					return 'Network'
				else if (type === 'App\\Platform')
					return 'Platform'
				else if (type === 'App\\NetworkCategory')
					return 'NetworkCategory'
				else if (type === 'App\\PlatformCategory')
					return 'PlatformCategory'
				else if (type === 'App\\PaymentMethodCategory')
					return 'PaymentMethodCategory'
				else if (type === 'App\\GameCategory')
					return 'GameCategory'
				else if (type === 'App\\SoftCategory')
					return 'SoftCategory'
				else if (type === 'App\\RoomCategory')
					return 'RoomCategory'
				else if (type === 'App\\PostCategory')
					return 'PostCategory'
				else if (type === 'App\\Room')
					return 'Room'
				else if (type === 'App\\PaymentMethod')
					return 'PaymentMethod'
				else if (type === 'App\\Game')
					return 'Game'
				else if (type === 'App\\Soft')
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
