export default async ({ app, res, store, params, redirect, route, $axios }) => {

	const country = store.getters['location/country']

	if (country.code === 'RU' && params.child && params.child.match(/^.+-(download$)/, 'gm')) {
		return redirect('/restricted')
	}

	let url = route.path = '/' ? 'pages/front' : `pages/${params.parent}`

	if (params.child) {
		url += `/${params.child}`
	}

	await $axios
		.get(url)
		.then(response => {
			store.commit('pages/FETCH_PAGE', { page: response.data })
		})
		.catch(error => {
			res.statusCode = 404
		})
}
