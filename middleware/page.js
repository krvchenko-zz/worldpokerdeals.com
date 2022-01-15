export default async ({ app, res, store, params, redirect, route, $axios }) => {

	let url = route.name === 'front' ?
						'pages/front' :
						route.name === 'restricted' ?
						'pages/restricted':
						`pages${route.path}`

	await $axios
		.get(url)
		.then(response => {
			store.commit('pages/FETCH_PAGE', { page: response.data })
		})
		.catch(error => {
			res.statusCode = 404
		})
}
