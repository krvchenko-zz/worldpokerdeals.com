<template>
	<div class="filters">
		<div class="filters__label">
			{{ $t('filters') }}
			<div class="filters__label__icon" @click="onClick">
				<svg-icon icon="close" />
			</div>
		</div>

		<filter-geo class="filters__geo" v-on="$listeners" :geo="geo" />

		<filter-dropdown
			v-if="types.length"
			:label="$t('room_type')"
			icon="filter-room-type"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in types"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.types"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="payments.length"
			:label="$t('payment_methods')"
			icon="filter-payments"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in payments"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.payments"
					:value="item"
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

		<filter-dropdown
			v-if="platforms.length"
			:label="$t('platforms')"
			icon="filter-platforms"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in platforms"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.platforms"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>

				<template #icon>
					<svg-icon
						class="filter-item__icon"
						:icon="`${item.slug}-square`"
						:width="28"
						:height="28"
						view-box="0 0 40 40"
					/>
				</template>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="licenses.length"
			:label="$t('licenses')"
			icon="filter-licenses"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in licenses"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.licenses"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="kycs.length"
			:label="$t('verification')"
			icon="filter-kyc"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in kycs"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.kyc.value"
					:label="item.label"
					:true-value="1"
					:false-value="null"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="tags.length"
			:label="$t('room_features')"
			icon="filter-room-features"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in tags"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.tags"
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
	import filterMixin from '~/mixins/filterMixin'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'RoomCategoryFilters',

		components: {},

		mixins: [filterMixin],
		props: {
			geo: {
				type: [String, Boolean, Number],
			},
		},

		data: () => ({
			selected: {
				kyc: {
					value: null,
					label: 'Верификация',
				},
				platforms: [],
				tags: [],
				payments: [],
				types: [],
				licenses: [],
				limits: [],
				games: [],
				disciplines: [],
				networks: [],
				hud: [],
				certificates: [],
			},
		}),

		computed: {},

		watch: {},

		mounted() {
			
		},

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
