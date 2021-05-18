// state
export const state = () => ({
	feed: null,
})

// getters
export const getters = {
	feed: state => state.feed,
}

// mutations
export const mutations = {
	FETCH_FEED(state, { feed }) {
		state.feed = feed
	},
}

// actions
export const actions = {}
