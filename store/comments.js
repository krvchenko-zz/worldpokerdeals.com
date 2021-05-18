// import axios from 'axios'

// state
export const state = () => ({
	comments: null,
})

// getters
export const getters = {
	comments: state => state.comments,
}

// mutations
export const mutations = {
	FETCH_COMMENTS(state, { comments }) {
		state.comments = comments
	},
}

// actions
export const actions = {}
