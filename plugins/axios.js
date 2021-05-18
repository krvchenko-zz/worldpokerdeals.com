export default function({ app, store, redirect, req, $axios }) {
	// $axios.onRequest(request => {
	// const locale = store.getters['lang/locale']
	// if (locale) {
	//   $axios.setHeader('Accept-Language', locale)
	// }
	// return request
	// })

	$axios.onError(error => {
		const { status } = error.response || {}

		if (status >= 500) {
		}

		if (status === 401 && store.getters['auth/check']) {
			store.commit('auth/LOGOUT')
			redirect({ name: 'login' })
		}

		return Promise.reject(error)
	})
}
