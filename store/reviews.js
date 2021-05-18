// import axios from 'axios'

// state
export const state = () => ({
	reviews: null,
})

// getters
export const getters = {
	reviews: state => state.reviews,
}

// mutations
export const mutations = {
	FETCH_REVIEWS(state, { reviews }) {
		state.reviews = reviews
	},
}

// actions
export const actions = {}
