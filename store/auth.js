import axios from 'axios'
import Cookies from 'js-cookie'

// state
export const state = () => ({
  user: null,
  token: null
})

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },

  FETCH_USER_SUCCESS (state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
  },

  LOGOUT (state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER (state, user) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, { token, remember }) {
    commit('SET_TOKEN', token)

    this.$cookiz.set('token', token, {
      maxAge: 60 * 60 * 24 * 365
    })
    // Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  async fetchUser ({ commit }) {
    try {

      await this.$axios.get('user').then(response => {
        commit('FETCH_USER_SUCCESS', {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          birthday: response.data.birthday,
          full_name: response.data.full_name,
          name: response.data.name,
          second_name: response.data.second_name,
          country: response.data.country ? {
            title: response.data.country.title
          } : null,
          image: response.data.image ? {
            filename: response.data.image.filename
          } : null,
          connections: response.data.connections.map(item => ({
            id: item.id
          }))
        })
      })

    } catch (e) {
      // Cookies.remove('token')
      commit('FETCH_USER_FAILURE')
    }
  },

  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await this.$axios.post('/logout')
    } catch (e) { }

    Cookies.remove('token')

    commit('LOGOUT')
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await this.$axios.post(`/oauth/${provider}`)

    return data.url
  }
}
