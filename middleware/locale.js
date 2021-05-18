// import axios from 'axios'
import { loadMessages } from '~/plugins/i18n'

export default async ({ app, store, req, $axios }) => {
	if (process.server) {
		const host = req.headers.host

		if (
			host.substr(2, 1) === '.' &&
			(host.substr(0, 2) === 'ru' || host.substr(0, 2) === 'es')
		) {
			store.commit('lang/SET_LOCALE', { locale: host.substr(0, 2) })
		}
	}

	const locale = store.getters['lang/locale']

	$axios.onRequest(request => {
		if (locale) {
			$axios.setHeader('Accept-Language', locale)
		}
		return request
	})

	app.$cookiz.set('locale', locale, {
		maxAge: 60 * 60 * 24 * 365,
	})

	await loadMessages(store.getters['lang/locale'])
}
