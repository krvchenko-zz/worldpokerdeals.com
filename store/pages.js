import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// state
export const state = () => ({
	page: null,
	loading: true,
})

// getters
export const getters = {
	page: state => state.page,
	loading: state => state.loading,
}

// mutations
export const mutations = {
	FETCH_PAGE(state, { page }) {
		state.page = page
	},
	SET_LOADING(state, { loading }) {
		state.loading = loading
	},
}

// actions
export const actions = {
	async fetchPage({ commit }, { slug }) {
		try {
			const { data } = await axios.get(slug)
			commit('FETCH_PAGE', { page: data })
		} catch (e) {}
	},

	setLoading({ commit }, { loading }) {
		commit('SET_LOADING', { loading })
	},
}
