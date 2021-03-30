// state
export const state = () => ({
  payment: null,
  payments: null,
  tab: null,
  category: null,
  filters: null
})

// getters
export const getters = {
  payment: state => state.payment,
  payments: state => state.payments,
  tab: state => state.tab,
  category: state => state.category,
  filters: state => state.filters
}

// mutations
export const mutations = {

  FETCH_PAYMENTS (state, { payments }) {
    state.payments = payments
  },

  FETCH_PAYMENT (state, { payment }) {
    state.payment = payment
  },

  FETCH_TAB (state, { tab }) {
    state.tab = tab
  },

  FETCH_CATEGORY (state, { category }) {
    state.category = category
  },

  FETCH_FILTERS (state, { filters }) {
    state.filters = filters
  },
}

// actions
export const actions = {

}