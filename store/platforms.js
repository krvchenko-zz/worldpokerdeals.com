// state
export const state = () => ({
  platform: null,
  platforms: null,
  category: null,
  filters: null
})

// getters
export const getters = {
  platform: state => state.platform,
  platforms: state => state.platforms,
  category: state => state.category,
  filters: state => state.filters
}

// mutations
export const mutations = {

  FETCH_PLATFORMS (state, { platforms }) {
    state.platforms = platforms
  },

  FETCH_PLATFORM (state, { platform }) {
    state.platform = platform
  },

  FETCH_CATEGORY (state, { category }) {
    state.category = category
  },

  FETCH_FILTERS (state, { filters }) {
    state.filters = filters
  }
}

// actions
export const actions = {

}