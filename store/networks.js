// state
export const state = () => ({
  networks: null,
  network: null,
  filters: null,
  category: null,
  related: null,
  posts: null
})

// getters
export const getters = {
  networks: state => state.networks,
  network: state => state.network,
  category: state => state.category,
  filters: state => state.filters,
  related: state => state.related,
  posts: state => state.posts
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
  },

  FETCH_POSTS (state, { posts }) {
    state.posts = posts
  },

  FETCH_RELATED (state, { related }) {
    state.related = related
  }

}

// actions
export const actions = {

}