import eventBus from '~/utils/event-bus'
import { mapGetters } from 'vuex'
import { deepCopy } from '~/utils'

export default {
	props: {
		categories: {
			type: Array,
		},

		disciplines: {
			type: Array,
		},

		limits: {
			type: Array,
		},

		games: {
			type: Array,
		},

		rooms: {
			type: Array,
		},

		networks: {
			type: Array,
		},

		exclusive: {
			type: Object,
		},

		// Rooms
		kycs: {
			type: Array,
		},

		platforms: {
			type: Array,
		},

		tags: {
			type: Array,
		},

		payments: {
			type: Array,
		},

		types: {
			type: Array,
		},

		licenses: {
			type: Array,
		},

		limits: {
			type: Array,
		},

		games: {
			type: Array,
		},

		disciplines: {
			type: Array,
		},

		networks: {
			type: Array,
		},

		huds: {
			type: Array,
		},

		certificates: {
			type: Array,
		},
	},

	data: () => ({
		initial: {},
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
		}),

		flatten() {
			let items = []
			Object.keys(this.selected).forEach(key => {
				if (Array.isArray(this.selected[key]) && this.selected[key].length) {
					for (let i = 0; i < this.selected[key].length; i++) {
						let item = {
							...this.selected[key][i],
							key: key,
						}
						items.push(item)
					}
				}

				if (!Array.isArray(this.selected[key]) && this.selected[key].value) {
					let item = {
						...this.selected[key],
						key: key,
					}
					items.push(item)
				}
			})

			return [].concat.apply([], items)
		},

		values() {
			let items = {}
			Object.keys(this.selected).forEach(key => {
				if (Array.isArray(this.selected[key])) {
					items[key] = [].map.call(this.selected[key], item => {
						return item.value
					})
				}

				if (!Array.isArray(this.selected[key])) {
					items[key] = this.selected[key].value
				}
			})
			return items
		},
	},

	mounted() {
		this.initial = deepCopy(this.selected)

		eventBus.$on('selected:delete', data => {
			this.reset(data, data.clear)

			this.$emit('change', {
				flatten: this.flatten,
				values: this.values,
			})
		})
	},

	methods: {
		reset(data, clear) {
			if (data.clear) {
				this.selected = deepCopy(this.initial)
				return false
			}

			if (Array.isArray(this.selected[data.key])) {
				this.selected[data.key] = this.selected[data.key].filter(item => {
					return item.value !== data.value
				})
			}

			if (!Array.isArray(this.selected[data.key])) {
				this.$set(this.selected[data.key], 'value', null)
			}
		},

		handleFilterChange() {
			this.$emit('change', {
				flatten: this.flatten,
				values: this.values,
			})
		},
	},
}
