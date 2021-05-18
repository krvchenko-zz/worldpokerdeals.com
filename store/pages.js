import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

const token = Cookies.get('token')

// state
export const state = () => ({
	page: null,
})

// getters
export const getters = {
	page: state => state.page,
}

// mutations
export const mutations = {
	FETCH_PAGE(state, { page }) {
		state.page = page
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
}
