// state
export const state = () => ({
	posts: null,
	rooms: null,
	clubs: null,
	important: null,
	promotions: null,
	post_categories: null,
	room_categories: null,
	promotion_categories: null,
	club_categories: null,
})

// getters
export const getters = {
	posts: state => state.posts,
	rooms: state => state.rooms,
	clubs: state => state.clubs,
	important: state => state.important,
	promotions: state => state.promotions,
	post_categories: state => state.post_categories,
	room_categories: state => state.room_categories,
	promotion_categories: state => state.promotion_categories,
	club_categories: state => state.club_categories,
}

// mutations
export const mutations = {
	FETCH_POSTS(state, { posts }) {
		state.posts = posts
	},

	FETCH_ROOMS(state, { rooms }) {
		state.rooms = rooms
	},

	FETCH_CLUBS(state, { clubs }) {
		state.clubs = clubs
	},

	FETCH_IMPORTANT(state, { important }) {
		state.important = important
	},

	FETCH_PROMOTIONS(state, { promotions }) {
		state.promotions = promotions
	},

	FETCH_POST_CATEGORIES(state, { post_categories }) {
		state.post_categories = post_categories
	},

	FETCH_ROOM_CATEGORIES(state, { room_categories }) {
		state.room_categories = room_categories
	},

	FETCH_PROMOTION_CATEGORIES(state, { promotion_categories }) {
		state.promotion_categories = promotion_categories
	},

	FETCH_CLUB_CATEGORIES(state, { club_categories }) {
		state.club_categories = club_categories
	},
}

// actions
export const actions = {}
