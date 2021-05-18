// import axios from 'axios'

// state
export const state = () => ({
	items: null,
})

// getters
export const getters = {
	items: state => state.items,
}

// mutations
export const mutations = {
	FETCH_ITEMS(state, { items }) {
		state.items = items
	},
}

// actions
export const actions = {}
