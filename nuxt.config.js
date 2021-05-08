require('dotenv').config();

export default {
    env: {
        apiUrl: process.env.API_URL,
        mediaUrl: process.env.MEDIA_URL,
        appName: process.env.APP_NAME,
        appLocale: process.env.APP_LOCALE,
        appGeo: process.env.APP_GEO,
    },

    head: {
        title: 'worldpokerdeals.com',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Worldpokerdeals' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    loading: { color: '#2E87C8', throttle: 0, height: '3px' },

    router: {
        middleware: ['locale', 'location', 'check-auth'],
    },

    css: [{ src: '~assets/sass/app.scss', lang: 'scss' }],

    components: true,

    plugins: [
        '~directives',
        '~plugins/i18n',
        '~plugins/vform',
        '~plugins/axios',
        '~plugins/element-ui',
        { src: '~/plugins/glightbox', mode: 'client' },
        { src: '~/plugins/asyncComputed' },
        { src: '~/plugins/vue-carousel', mode: 'client' },
    ],

    modules: [
        '@nuxtjs/router',
        '@nuxtjs/svg',
        '@nuxtjs/device',
        '@nuxtjs/style-resources',
        ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ],
    styleResources: {
        scss: ['~assets/sass/_mixins.scss'],
    },

    // render: {
    //   resourceHints: false,
    // },

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
            ],
        },
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }

            config.resolve.alias['vue'] = 'vue/dist/vue.common';
        },
    },
};
