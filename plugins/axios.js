export default function({ app, store, redirect, req, $axios }) {
	$axios.onError(error => {
		const { status } = error.response || {}

		const token = store.getters['auth/token']

		if (token) $axios.setToken(token, 'Bearer')

		if (status >= 500) {
		}

		if (status === 401 && store.getters['auth/check']) {
			store.commit('auth/LOGOUT')
			redirect({ name: 'login' })
		}

		return Promise.reject(error)
	})
}
