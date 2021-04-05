import axios from 'axios'
export default async ({ app, store, req, redirect }) => {

  if (!store.getters['location/check']) {
		await store.dispatch('location/fetchCountry').then(data => {
			store.commit('location/FETCH_COUNTRY', data.country)
			store.commit('rooms/FETCH_TOP_LIST', { list: data.rooms })
			store.commit('rooms/FETCH_TOTAL', { total: data.total })
			app.$cookiz.set('geo', data.country.code, {
				maxAge: 60 * 60 * 24 * 365
			})
		})
  }
}