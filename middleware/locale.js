import axios from 'axios'
import { loadMessages } from '~/plugins/i18n'

export default async ({ app, store }) => {

	const locale = store.getters['lang/locale']
	if (locale) {
	  axios.defaults.headers.common['Accept-Language'] = locale
	}

	// app.$cookiz.set('locale', locale, {
	// 	maxAge: 60 * 60 * 24 * 365
	// })

  await loadMessages(store.getters['lang/locale'])
}
