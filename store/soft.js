// state
export const state = () => ({
  soft: null,
  items: null,
  categories: null,
  category: null,
  filters: null,
  tab: null,
  related: null,
  posts: null,
})

// getters
export const getters = {
  soft: state => state.soft,
  items: state => state.items,
  categories: state => state.categories,
  category: state => state.category,
  filters: state => state.filters,
  tab: state => state.tab,
  related: state => state.related,
  posts: state => state.posts
}

// mutations
export const mutations = {

  FETCH_SOFT (state, { soft }) {
    state.soft = soft
  },

  FETCH_TAB (state, { tab }) {
    state.tab = tab
  },

  FETCH_ITEMS (state, { items }) {
    state.items = items
  },

  FETCH_CATEGORIES (state, { categories }) {
    state.categories = categories
  },

  FETCH_CATEGORY (state, { category }) {
    state.category = category
  },

  FETCH_FILTERS (state, { filters }) {
    state.filters = filters
  },

  FETCH_RELATED (state, { related }) {
    state.related = related
  },

  FETCH_POSTS (state, { posts }) {
    state.posts = posts
  }

}

// actions
export const actions = {

}