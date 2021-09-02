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
					label="Только эксклюзивные"
					:true-value="1"
					:false-value="null"
					@change="handleFilterChange"
				/>
			</filter-item>
		</div>

		<filter-dropdown
			v-if="category.is_general"
			:label="category.entity === 'promotion' ? 'Тип акции' : 'Тип бонуса'"
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
			label="По дисциплинам"
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
			label="Формат игры"
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
			label="Лимиты"
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

		<filter-dropdown label="Покер-румы" icon="filter-room">
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

		<filter-dropdown label="Сети" icon="filter-network">
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
