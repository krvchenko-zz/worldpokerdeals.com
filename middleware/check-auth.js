export default async ({ store, req, redirect, $axios }) => {
	const token = store.getters['auth/token']

	if (process.server) {
		if (token) {
			$axios.setToken(token, 'Bearer')
		} else {
			$axios.setToken(false)
		}
	}

	if (!store.getters['auth/check'] && token) {
		await store.dispatch('auth/fetchUser')
	}
}
