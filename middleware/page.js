// import Cookies from 'js-cookie'
// import { cookieFromRequest } from '~/utils'

// import axios from 'axios'

export default async ({ app, store, params, redirect, route, $axios }) => {

	let url = `pages/${params.parent}`

	if (params.child) {
		url += `/${params.child}`
	}

  await $axios.get(url).then((response) => {
		store.commit('pages/FETCH_PAGE', { page: response.data })
  }).catch(error => {
  });
}