import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

// state
export const state = () => ({
	rooms: null,
	room: null,
	tab: null,
	disciplines: null,
	games: null,
	features: null,
	categories: null,
	category: null,
	topList: null,
	filters: null,
	related: null,
	best: null,
	total: null,
})

// getters
export const getters = {
	user: state => state.user,
	rooms: state => state.rooms,
	room: state => state.room,
	tab: state => state.tab,
	disciplines: state => state.disciplines,
	games: state => state.games,
	features: state => state.features,
	categories: state => state.categories,
	category: state => state.category,
	topList: state => state.topList,
	filters: state => state.filters,
	related: state => state.related,
	best: state => state.best,
	total: state => state.total,
}

// mutations
export const mutations = {
	FETCH_ROOMS(state, { rooms }) {
		state.rooms = rooms
	},

	FETCH_RELATED(state, { related }) {
		state.related = related
	},

	FETCH_ROOM(state, { room }) {
		state.room = room
	},

	FETCH_TAB(state, { tab }) {
		state.tab = tab
	},

	FETCH_TOP_LIST(state, { list }) {
		state.topList = list
	},

	FETCH_DISCIPLINES(state, { disciplines }) {
		state.disciplines = disciplines
	},

	FETCH_GAMES(state, { games }) {
		state.games = games
	},

	FETCH_FEATURES(state, { features }) {
		state.features = features
	},

	FETCH_ROOM_CATEGORIES(state, { categories }) {
		state.categories = categories
	},

	FETCH_ROOM_CATEGORY(state, { category }) {
		state.category = category
	},

	FETCH_FILTERS(state, { filters }) {
		state.filters = filters
	},

	FETCH_BEST(state, { best }) {
		state.best = best
	},

	FETCH_TOTAL(state, { total }) {
		state.total = total
	},
}

// actions
export const actions = {
	// Rooms
	async fetchRooms({ commit }, payload) {
		try {
			const { data } = await axios.get('rooms')

			commit('FETCH_ROOMS', { rooms: data })
		} catch (e) {}
	},

	async fetchRoom({ commit }, { slug }) {
		try {
			const { data } = await axios.get(`rooms/${slug}`)

			commit('FETCH_ROOM', { room: data.room })
		} catch (e) {}
	},

	async fetchTab({ commit }, { slug }) {
		try {
			const { data } = await axios.get(`rooms/tabs/${slug}`)

			commit('FETCH_TAB', { tab: data })
		} catch (e) {}
	},

	async fetchDisciplines({ commit }, payload) {
		try {
			const { data } = await axios.get('disciplines')

			commit('FETCH_DISCIPLINES', { disciplines: data })
		} catch (e) {}
	},

	async fetchGames({ commit }) {
		try {
			const { data } = await axios.get('games')

			commit('FETCH_GAMES', { games: data })
		} catch (e) {}
	},

	async fetchFeatures({ commit }) {
		try {
			const { data } = await axios.get('features')

			commit('FETCH_FEATURES', { features: data })
		} catch (e) {}
	},

	async fetchRoomCategories({ commit }) {
		try {
			const { data } = await axios.get('categories/rooms/list')

			commit('FETCH_ROOM_CATEGORIES', { categories: data })
		} catch (e) {}
	},

	async fetchRoomCategory({ commit }, { room_category_slug }) {
		try {
			const { data } = await axios.get(`categories/rooms/${room_category_slug}`)

			commit('FETCH_ROOM_CATEGORY', { category: data })
		} catch (e) {}
	},

	async redirect({ commit }, { slug }) {
		this.$router.push({ name: 'room.index', params: { room_slug: slug } })
	},
}
