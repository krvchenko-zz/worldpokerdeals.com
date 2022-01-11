require('dotenv').config()

export default {
	env: {
		apiUrl: process.env.API_URL,
		mediaUrl: process.env.MEDIA_URL,
		hostName: process.env.HOST_NAME,
		appName: process.env.APP_NAME,
		appLocale: process.env.APP_LOCALE,
		appGeo: process.env.APP_GEO,
		recaptchaPublic: process.env.RECAPTCHA_PUBLIC,
		recaptchaSecret: process.env.RECAPTCHA_SECRET
	},

	head: {
		title: 'worldpokerdeals.com',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Worldpokerdeals' },
			{ hid: 'og:image', name: 'og:image', content: '/og-image-default.webp' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	loading: { color: '#2E87C8', throttle: 60, height: '3px' },

	// loading: '~/components/LoadingBar.vue',

	router: {
		middleware: ['locale', 'location', 'check-auth'],
	},

	css: [{ src: '~assets/sass/app.scss', lang: 'scss' }],

	components: true,

	plugins: [
		'~directives',
		'~plugins/axios',
		'~plugins/i18n',
		'~plugins/vform',
		'~plugins/element-ui',
		'~/plugins/asyncComputed',
		{ src: '~/plugins/glightbox', mode: 'client' },
		{ src: '~/plugins/vue-carousel', mode: 'client' },
		{ src: '~/plugins/vue-dragscroll', mode: 'client' },
		{ src: '~/plugins/smoothscroll', mode: 'client' },
	],

	modules: [
		'@nuxtjs/router',
		'@nuxtjs/svg',
		'@nuxtjs/device',
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		['cookie-universal-nuxt', { alias: 'cookiz' }],
		[
			'@nuxtjs/recaptcha', {
				hideBadge: true,
				siteKey: process.env.RECAPTCHA_PUBLIC,
				version: 2,
				size: 'invisible'
			}
		],
	],

	styleResources: {
		scss: ['~assets/sass/_mixins.scss'],
	},

	axios: {
		baseURL: process.env.apiUrl,
		proxyHeaders: true,
	},

	build: {
		extractCSS: true,
		babel: {
			presets: ['@nuxt/babel-preset-app'],
			plugins: [
				[
					'component',
					{
						libraryName: 'element-ui',
						styleLibraryName: 'theme-chalk',
					},
				],
				'@babel/plugin-proposal-optional-chaining',
			],
		},
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
				})
			}

			config.resolve.alias['vue'] = 'vue/dist/vue.common'
		},
	},
}
