import Cookies from 'js-cookie'

// state
export const state = () => ({
	user: null,
	token: null,
	age: false,
	cookie: false,
	disclaimer: false,
})

// getters
export const getters = {
	user: state => state.user,
	token: state => state.token,
	check: state => state.user !== null,
	age: state => state.age,
	cookie: state => state.cookie,
	disclaimer: state => state.disclaimer,
}

// mutations
export const mutations = {
	SET_TOKEN(state, token) {
		state.token = token
	},

	FETCH_USER_SUCCESS(state, user) {
		state.user = user
	},

	FETCH_USER_FAILURE(state) {
		state.token = null
	},

	LOGOUT(state) {
		state.user = null
		state.token = null
	},

	UPDATE_USER(state, user) {
		state.user = user
	},

	SET_DISCLAIMER(state, { disclaimer }) {
		state.disclaimer = disclaimer
	},

	SET_AGE(state, { age }) {
		state.age = age
	},

	SET_COOKIE(state, { cookie }) {
		state.cookie = cookie
	},
}

// actions
export const actions = {
	saveToken({ commit, dispatch }, { token, remember }) {
		commit('SET_TOKEN', token)
		Cookies.set('token', token, { expires: remember ? 365 : null })
	},

	async fetchUser({ commit }) {
		try {
			await this.$axios.get('user').then(response => {
				commit('FETCH_USER_SUCCESS', {
					id: response.data.id,
					username: response.data.username,
					email: response.data.email,
					birthday: response.data.birthday,
					full_name: response.data.full_name,
					name: response.data.name,
					second_name: response.data.second_name,
					country: response.data.country
						? {
								title: response.data.country.title,
						  }
						: null,
					image: response.data.image
						? {
								filename: response.data.image.filename,
						  }
						: null,
					connections: response.data.connections.map(item => ({
						id: item.id,
					})),
				})
			})
		} catch (e) {
			Cookies.remove('token')
			commit('FETCH_USER_FAILURE')
		}
	},

	updateUser({ commit }, payload) {
		commit('UPDATE_USER', payload)
	},

	async logout({ commit }) {
		try {
			await this.$axios.post('/logout')
		} catch (e) {}

		Cookies.remove('token', { path: '', domain: '.worldpokerdeals01.com' })

		commit('LOGOUT')
	},

	async fetchOauthUrl(ctx, { provider }) {
		const { data } = await this.$axios.post(`/oauth/${provider}`)

		return data.url
	},

	setDisclaimer({ commit }, { disclaimer }) {
		commit('SET_DISCLAIMER', { disclaimer })
		Cookies.set('disclaimer', disclaimer, { expires: 365, domain: '.worldpokerdeals01.com' })
	},

	setAge({ commit }, { age }) {
		commit('SET_AGE', { age })
		Cookies.set('age', age, { expires: 365, domain: '.worldpokerdeals01.com' })
	},

	setCookie({ commit }, { cookie }) {
		commit('SET_COOKIE', { cookie })
		Cookies.set('cookie', cookie, { expires: 365 })
	},
}
