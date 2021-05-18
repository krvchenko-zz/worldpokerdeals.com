// state
export const state = () => ({
	game: null,
	games: null,
	tab: null,
	category: null,
	filters: null,
})

// getters
export const getters = {
	game: state => state.game,
	games: state => state.games,
	tab: state => state.tab,
	category: state => state.category,
	filters: state => state.filters,
}

// mutations
export const mutations = {
	FETCH_GAMES(state, { games }) {
		state.games = games
	},

	FETCH_GAME(state, { game }) {
		state.game = game
	},

	FETCH_TAB(state, { tab }) {
		state.tab = tab
	},

	FETCH_CATEGORY(state, { category }) {
		state.category = category
	},

	FETCH_FILTERS(state, { filters }) {
		state.filters = filters
	},
}

// actions
export const actions = {}
