<template>
	<div class="filters-header">
		<mobile-filter-button v-if="isTouch" :selected="selected" />

		<div v-if="!isTouch" class="filters-header__text">
			{{
				$t('filtered', { total: total, overall: overall, entity: entityLabel })
			}}
		</div>

		<filter-geo v-if="!isTouch && showGeo" v-on="$listeners" :geo="geo" />

		<div class="filters-header__sort">
			<el-select
				:value="sort"
				class="el-select-sort"
				placeholder="Select"
				popper-class="el-poper-sort"
				@change="handleSortChange"
			>
				<template slot="prefix">
					<svg-icon :width="19" :height="16" icon="filter-sort-desc" />
				</template>
				<el-option
					v-for="(item, index) in sortOptions"
					:key="index"
					:label="$t(item.label)"
					:value="item.value"
				/>
			</el-select>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'FilterHeader',

		components: {},

		props: {
			entityLabel: {
				type: String,
				default: '',
			},

			sortOptions: {
				type: Array,
				default: () => {
					return [
						{
							label: 'sort.created_at',
							value: 'created_at',
						},
					]
				},
			},

			sort: {
				type: [String, Boolean, Number],
				default: 'created_at',
			},

			geo: {
				type: [String, Boolean, Number],
				// default: 'created_at'
			},

			total: {
				type: [String, Number],
				default: 0,
			},

			overall: {
				type: [String, Number],
				default: 0,
			},

			selected: {
				type: [String, Number],
			},

			showGeo: {
				type: Boolean,
				default: true,
			},
		},

		data: () => ({
			loading: false,
			countries: [],
		}),

		async fetch() {},

		mounted() {
			this.countries.push({
				label: this.country.from,
				value: this.country.code,
			})
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				isTouch: 'ui/isTouch',
			}),
		},

		watch: {},

		methods: {
			handleSortChange($event) {
				this.$emit('update:sort', $event)
			},
		},
	}
</script>

<style lang="scss">
	.filters-header {
		margin-bottom: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__text {
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 16px;
			color: #222222;
		}
	}

	.el-select {
		.el-input__inner {
			background: #fafafa;
			border: 1px solid #d3d3d3;
			border-radius: 4px;
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #333333;
		}
		.el-input.is-focus .el-input__inner {
			border-color: rgba(0, 139, 226, 0.7);
		}
	}

	.el-select-sort {
		max-width: 195px;
		.el-input__prefix {
			left: 16px;
			align-items: center;
			display: flex;
		}

		.el-input__inner {
			padding-left: 47px;
		}
	}

	.el-poper-sort {
		.el-select-dropdown__item {
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 40px;
			height: 40px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #333333;
		}
	}
</style>
