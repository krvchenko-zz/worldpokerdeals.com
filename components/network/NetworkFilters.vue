<template>
	<div class="filters">
		<div class="filters__label">{{ $t('filters') }}</div>

		<filter-dropdown
			v-if="types.length"
			:label="$t('room_type')"
			icon="filter-room-type"
		>
			<filter-item
				v-for="(item, index) in types"
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

		<filter-dropdown
			v-if="payments.length"
			:label="$t('payments')"
			icon="filter-payments"
		>
			<filter-item
				v-for="(item, index) in payments"
				:key="index"
				:count="item.count"
				:icon="`${item.slug}-color-square`"
			>
				<checkbox
					v-model="selected.payments"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="platforms.length"
			:label="$t('platforms')"
			icon="filter-platforms"
		>
			<filter-item
				v-for="(item, index) in platforms"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.platforms"
					:value="item.value"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="licenses.length"
			:label="$t('licenses')"
			icon="filter-licenses"
		>
			<filter-item
				v-for="(item, index) in licenses"
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

		<filter-dropdown
			v-if="kycs.length"
			:label="$t('verification')"
			icon="filter-kyc"
		>
			<filter-item
				v-for="(item, index) in kycs"
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

		<filter-dropdown
			v-if="tags.length"
			:label="$t('room_features')"
			icon="filter-room-features"
		>
			<filter-item
				v-for="(item, index) in tags"
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import filterMixin from '~/mixins/filterMixin'
	import { deepCopy } from '~/utils'

	export default {
		components: {},

		mixins: [filterMixin],

		props: {
			geo: {
				required: true,
			},

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
		},

		data: () => ({
			loading: false,
			selected: {
				kyc: [],
				platforms: [],
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

			uniqSelected() {
				return
			},

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
			reset(data, clear) {
				if (data.clear) {
					this.selected = deepCopy(this.initial)
					return false
				}

				if (Array.isArray(this.selected[data.key])) {
					this.selected[data.key] = this.selected[data.key].filter(value => {
						return value !== data.value
					})
				}
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
