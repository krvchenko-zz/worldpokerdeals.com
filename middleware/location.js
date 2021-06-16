export default async ({ app, store, req, redirect, $axios }) => {
	if (!store.getters['location/check']) {
		const { data } = await $axios.get('/country')
		store.commit('location/FETCH_COUNTRY', data.country)
		store.commit('rooms/FETCH_TOP_LIST', { list: data.rooms })
		store.commit('rooms/FETCH_TOTAL', { total: data.total })
	}
}
