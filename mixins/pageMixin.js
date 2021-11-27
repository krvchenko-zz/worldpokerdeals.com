import { mapGetters } from 'vuex'

export default {

	middleware: 'page',

	head() {
		return {
			title: this.page.meta_title,
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: this.page ? this.page.meta_description : '' },
				{ hid : 'keywords', name: 'keywords', content: this.page ? this.page.meta_keywords : '' },
				{ name: 'og:title', content: this.page ? this.page.meta_title : '' },
				{ name: 'og:url', content: this.url },
			],
			htmlAttrs: {
				lang: this.page ? this.page.locale : 'ru',
			},
			link: [
				{ rel: 'canonical', href: this.page ? this.url : '' },
				{ rel: 'alternate', hreflang: 'x-default', href: this.page ? this.xDefault : '' },
				{ rel: 'alternate', hreflang: 'ru', href: this.page ? `https://ru.${this.host}${this.$route.path}` : '' },
				{ rel: 'alternate', hreflang: 'en', href: this.page ? `https://${this.host}${this.$route.path}` : ''},
				{ rel: 'alternate', hreflang: 'es', href: this.page ? `https://es.${this.host}${this.$route.path}` : '' },
			],
		}
	},

	data: () => ({}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			geo: 'location/code',
			page: 'pages/page',
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
	},

	mounted() {},

	methods: {},
}
