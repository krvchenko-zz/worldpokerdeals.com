// state
export const state = () => ({
  post: null,
  posts: null,
  important: null,
  categories: null
})

// getters
export const getters = {
  post: state => state.post,
  posts: state => state.posts,
  important: state => state.important,
  categories: state => state.categories
}

// mutations
export const mutations = {

  FETCH_POST (state, { post }) {
    state.post = post
  },

  FETCH_POSTS (state, { posts }) {
    state.posts = posts
  },

  FETCH_IMPORTANT (state, { important }) {
    state.important = important
  },

  FETCH_CATEGORIES (state, { categories }) {
    state.categories = categories
  }
}

// actions
export const actions = {

}