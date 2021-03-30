// state
export const state = () => ({
  networks: null,
  network: null,
  filters: null,
  category: null
})

// getters
export const getters = {
  networks: state => state.networks,
  network: state => state.network,
  category: state => state.category,
  filters: state => state.filters
}

// mutations
export const mutations = {

  FETCH_NETWORK (state, { network }) {
    state.network = network
  },

  FETCH_NETWORKS (state, { networks }) {
    state.networks = networks
  },

  FETCH_FILTERS (state, { filters }) {
    state.filters = filters
  },

  FETCH_CATEGORY (state, { category }) {
    state.category = category
  }

}

// actions
export const actions = {

}