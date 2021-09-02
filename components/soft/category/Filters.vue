<template>
	<div class="filters">
		<div class="filters__label">Фильтры</div>

		<div class="filter">
			<filter-item :count="free.count">
				<checkbox
					v-model="selected.free"
					label="Только бесплатный софт"
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
		>
			<filter-item
				v-for="(item, index) in categories"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.categories"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Filters',

		components: {},

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
				free: null,
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
			handleFilterChange() {
				this.$emit('change', this.selected)
			},
		},
	}
</script>

<style lang="scss"></style>
