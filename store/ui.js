// state
export const state = () => ({
	isMobileOrTablet: false,
})

// getters
export const getters = {
	isMobileOrTablet: state => state.isMobileOrTablet,
}

// mutations
export const mutations = {
	SET_IS_MOBILE_OR_TABLET(state, { value }) {
		state.isMobileOrTablet = value
	},
}

// actions
export const actions = {}
