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

<style lang="scss">
	$ico-filters: url('~assets/i/ico-filters.svg?data');

	.filters {
		margin-bottom: 40px;
		border-radius: 4px;
		overflow: hidden;
		background: #2e3141;
		box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
	}

	.filters__label {
		position: relative;
		padding: 20px 24px;
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: bold;
		font-size: 18px;
		line-height: 24px;
		letter-spacing: -0.2px;
		color: #ffffff;
		background: #2e3141;
		&:after {
			right: 20px;
			top: 12px;
			position: absolute;
			content: '';
			width: 33px;
			height: 34px;
			background: $ico-filters no-repeat center;
		}
	}

	.filter {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border: 1px solid #e9e9e9;
		border-bottom: 0;
		background: #fafafa;
		padding: 20px;
		.filter-item {
			padding: 0;
		}
	}
</style>
