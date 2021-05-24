import { loadMessages } from '~/plugins/i18n'

export default async ({ app, store, req, $axios }) => {
	if (process.server) {
		const host = req.headers.host
		
		if (
			host.substr(2, 1) === '.' &&
			(host.substr(0, 2) === 'ru' || host.substr(0, 2) === 'es')
		) {
			store.dispatch('lang/setLocale', { locale: host.substr(0, 2) })
		}
	}

	const locale = store.getters['lang/locale']

	if (locale) {
		$axios.setHeader('Accept-Language', locale)
	}

	await loadMessages(store.getters['lang/locale'])
}
