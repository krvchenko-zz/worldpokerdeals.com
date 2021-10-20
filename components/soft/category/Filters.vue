<template>
	<div class="filters">
		<div class="filters__label">
			{{ $t('filters') }}
			<div class="filters__label__icon" @click="onClick">
				<svg-icon icon="close" />
			</div>
		</div>

		<div class="filter">
			<filter-item :count="free.count">

				<checkbox
					v-model="selected.free.value"
					label="iТолько бесплатный софт"
					:true-value="true"
					:false-value="null"
					@change="handleFilterChange"
				/>

			</filter-item>

		</div>

		<filter-dropdown
			v-if="categories.length"
			label="Тип софта"
			icon="filter-discipline"
			:opened="true"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in categories"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.categories"
					:value="item"
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
		name: 'Filters',

		components: {},

		mixins: [filterMixin],

		props: {
			geo: {
				required: true,
			},

			categories: {
				type: Array,
			},

			free: {
				type: [Array, Object],
			},
		},

		data: () => ({
			loading: false,
			selected: {
				categories: [],
				free: {
					value: null,
					label: 'Только бесплатный софт',
				}
			},
		}),

		updated() {},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
			}),
		},

		watch: {},

		methods: {
			onClick() {
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
