import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

const token = Cookies.get('token')

// state
export const state = () => ({
	category: null,
	categories: null,
	items: null,
	filters: null,
	comments: null,
	promotion: null,
	related: null,
	best: null,
	feed: null,
})

// getters
export const getters = {
	category: state => state.category,
	categories: state => state.categories,
	items: state => state.items,
	filters: state => state.filters,
	comments: state => state.comments,
	promotion: state => state.promotion,
	related: state => state.related,
	best: state => state.best,
	feed: state => state.feed,
}

// mutations
export const mutations = {
	FETCH_CATEGORY(state, { category }) {
		state.category = category
	},

	FETCH_CATEGORIES(state, { categories }) {
		state.categories = categories
	},

	FETCH_ITEMS(state, { items }) {
		state.items = items
	},

	FETCH_FILTERS(state, { filters }) {
		state.filters = filters
	},

	FETCH_COMMENTS(state, { comments }) {
		state.comments = comments
	},

	FETCH_PROMOTION(state, { promotion }) {
		state.promotion = promotion
	},

	FETCH_BEST(state, { best }) {
		state.best = best
	},

	FETCH_FEED(state, { feed }) {
		state.feed = feed
	},

	FETCH_RELATED(state, { related }) {
		state.related = related
	},
}

// actions
export const actions = {
	async fetchCategory({ commit }, { slug }) {
		try {
			const { data } = await axios.get(slug)
			commit('FETCH_CATEGORY', { category: data })
		} catch (e) {}
	},

	async fetchItems({ commit }, payload) {
		return new Promise((resolve, reject) => {
			let url = 'promotion/list'
			if (payload) {
				url += '/?' + querystring.stringify(payload)
			}
			axios.get(url).then(
				response => {
					resolve(response)
				},
				error => {
					reject(error)
				}
			)
		})
	},
}
