<template>
	<div class="filters">
		<div class="filters__label">
			{{ $t('filters') }}
			<div class="filters__label__icon" @click="onClick">
				<svg-icon icon="close" />
			</div>
		</div>

		<filter-geo class="filters__geo" v-on="$listeners" :geo="geo" />

		<div v-if="category.entity === 'promotion'" class="filter">
			<filter-item :count="exclusive.count">
				<checkbox
					v-model="selected.exclusive.value"
					:label="$t('exclusive_only')"
					:true-value="1"
					:false-value="null"
					@change="handleFilterChange"
				/>
			</filter-item>
		</div>

		<filter-dropdown
			v-if="category.is_general"
			:label="category.entity === 'promotion' ? $t('promotion_type') : $t('bonus_type')"
			icon="filter-promotion-category"
			:opened="true"
		>
			<filter-item
				v-for="(item, index) in categories"
				v-if="categories.length"
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

		<filter-dropdown
			v-if="category.entity === 'promotion'"
			:label="$t('by_games')"
			icon="filter-discipline"
		>
			<filter-item
				v-for="(item, index) in disciplines"
				v-if="disciplines.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.disciplines"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="category.entity === 'promotion'"
			:label="$t('game_types')"
			icon="filter-game"
		>
			<filter-item
				v-for="(item, index) in games"
				v-if="games.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.games"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="category.entity === 'promotion'"
			:label="$t('stakes')"
			icon="filter-limit"
		>
			<filter-item
				v-for="(item, index) in limits"
				v-if="limits.length"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.limits"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown :label="$t('rooms')" icon="filter-room">
			<filter-item
				v-for="(item, index) in rooms"
				v-if="rooms.length"
				:key="index"
				:icon="item.slug"
				:count="item.count"
			>
				<checkbox
					v-model="selected.rooms"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown :label="$t('poker_networks')" icon="filter-network">
			<filter-item
				v-for="(item, index) in networks"
				v-if="networks.length"
				:key="index"
				:icon="item.slug"
				:count="item.count"
			>
				<checkbox
					v-model="selected.networks"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<div class="filters__actions">
			<button class="filters__clear-button btn btn-block" @click="clearFilters">
				{{ $t('clear_filters') }}
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import filterMixin from '~/mixins/filterMixin'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'PromotionCategoryFilters',

		components: {},

		mixins: [filterMixin],

		data: () => ({
			selected: {
				exclusive: {
					label: 'Эксклюзивные',
					value: null,
				},
				categories: [],
				disciplines: [],
				limits: [],
				games: [],
				rooms: [],
				networks: [],
			},
		}),
		props: {
			geo: {
				type: [String, Boolean, Number],
			},
		},

		computed: {
			...mapGetters({
				category: 'promotions/category',
			}),
		},

		watch: {},

		mounted() {},

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
