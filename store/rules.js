// state
export const state = () => ({
	rule: null,
	rules: null,
	category: null,
	filters: null,
})

// getters
export const getters = {
	rule: state => state.rule,
	rules: state => state.rules,
	category: state => state.category,
	filters: state => state.filters,
}

// mutations
export const mutations = {
	FETCH_RULES(state, { rules }) {
		state.rules = rules
	},

	FETCH_RULE(state, { rule }) {
		state.rule = rule
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
