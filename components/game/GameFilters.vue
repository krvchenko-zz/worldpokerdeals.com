<template>
	<div class="filters">
		<div class="filters__label">{{ $t('filters') }}</div>

		<filter-dropdown :label="$t('room_type')" icon="filter-room-type">
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

		<filter-dropdown :label="$t('payments')" icon="filter-payments">
			<filter-item
				v-for="(item, index) in payments"
				v-if="payments.length"
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

		<filter-dropdown :label="$t('platforms')" icon="filter-platforms">
			<filter-item
				v-for="(item, index) in platforms"
				v-if="platforms.length"
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

		<filter-dropdown :label="$t('licenses')" icon="filter-licenses">
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

		<filter-dropdown :label="$t('verification')" icon="filter-kyc">
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

		<filter-dropdown :label="$t('room_features')" icon="filter-room-features">
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'GameFilters',

		components: {},

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
