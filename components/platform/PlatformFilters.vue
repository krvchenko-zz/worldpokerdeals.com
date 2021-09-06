<template>
	<div class="filters">
		<div class="filters__label">
			{{ $t('filters') }}
			<div class="filters__label__icon" @click="handleClose">
				<svg-icon icon="close" />
			</div>
		</div>

		<div v-if="showGeo" class="filters__geo">
			<geo-switcher :value="country.code" :geo="geo" v-on="$listeners" />
		</div>

		<filter-dropdown label="Тип рума" icon="filter-room-type">
			<filter-item
				v-for="(item, index) in types"
				v-if="types.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.types"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown label="Платежки" icon="filter-payments">
			<filter-item
				v-for="(item, index) in payments"
				v-if="payments.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.payments"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>

				<template #icon>
					<svg-icon
						class="filter-item__icon"
						:icon="`${item.slug}-color`"
						:width="28"
						:height="28"
						view-box="0 0 30 30"
					/>
				</template>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown label="Лицензии" icon="filter-licenses">
			<filter-item
				v-for="(item, index) in licenses"
				v-if="licenses.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.licenses"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown label="Верицикация" icon="filter-kyc">
			<filter-item
				v-for="(item, index) in kycs"
				v-if="kycs.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.kyc"
					:value="item.value"
					:label="item.label"
					:true-value="1"
					:false-value="0"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown label="Особенности рума" icon="filter-room-features">
			<filter-item
				v-for="(item, index) in tags"
				v-if="tags.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.tags"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<div class="filters__actions">
			<button class="filters__clear-button btn btn-block" @click="clearFilters">
				Очистить фильтры
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import filterMixin from '~/mixins/filterMixin'

	export default {
		name: 'PlatformFilters',

		components: {},

		mixins: [filterMixin],

		props: {
			geo: {
				required: true,
			},

			kycs: {
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

			showGeo: {
				type: Boolean,
			},
		},

		data: () => ({
			loading: false,
			selected: {
				kyc: [],
				tags: [],
				payments: [],
				types: [],
				licenses: [],
			},
		}),

		updated() {},

		created() {},

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
							const item = this[key].find(
								el => el.value === this.selected[key][i]
							)
							items.push({ ...item, key })
						}
					}
				})

				return items
			},

			values() {
				let items = {}
				Object.keys(this.selected).forEach(key => {
					if (Array.isArray(this.selected[key])) {
						items[key] = this.selected[key]
					}
				})
				return items
			},
		},

		watch: {},

		methods: {
			handleClose() {
				eventBus.$emit('filter:toggle', null)
			},

			clearFilters() {
				eventBus.$emit('selected:delete', {
					clear: true,
					key: null,
					value: null,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
