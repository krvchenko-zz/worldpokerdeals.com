import axios from 'axios'

// state
export const state = () => ({
  country: null,
  code: null,
  remote_addr: null
})

// getters
export const getters = {
  country: state => state.country,
  code: state => state.code,
  remote_addr: state => state.remote_addr,
  check: state => state.country !== null
}

// mutations
export const mutations = {

  FETCH_COUNTRY (state, country) {
		state.country = country
  },

  FETCH_REMOTE_ADDR (state, remote_addr) {
    state.remote_addr = remote_addr
  },

  SET_CODE (state, code) {
    state.code = code
  }
}

// actions
export const actions = {

  async fetchCountry ({ dispatch, commit }) {

    return new Promise((resolve, reject) => {
      axios.get('/country').then(response => {
        resolve(response.data)
      }, error => {
        reject(error);
      })
    })
  },

}