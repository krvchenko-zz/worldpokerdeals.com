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

<style lang="scss">
	$ico-filters: url('~assets/i/ico-filters.svg?data');

	.filters {
		margin-bottom: 40px;
		border-radius: 4px;
		overflow: hidden;
		background: #2e3141;
		box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
		&__geo {
			display: none;
		}
		&__actions {
			display: none;
		}
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
		&__icon {
			display: none;
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

	@include mq('laptop') {
		.filters {
			overflow-y: scroll;
			@include hide-scroll();
			margin-bottom: 0;
			background: #ffffff;
			box-shadow: -10px 0px 30px rgba(0, 0, 0, 0.2);
			&__geo {
				display: flex;
				flex-direction: column;
				padding: 28px;
			}
			.filters-geo {
				margin-right: 0;
			}

			.filters-geo__text {
				font-size: 14px;
				line-height: 16px;
				margin-bottom: 12px;
			}
			.el-select-geo {
				max-width: none;
			}
			&__actions {
				border-top: 1px solid #e9e9e9;
				display: block;
				padding: 24px 28px;
			}
			&__clear-button {
				border: 1px solid #e9e9e9;
				background: none;
				font-weight: 600;
				font-size: 16px;
				line-height: 16px;
				color: #555555;
			}

			&__label {
				display: flex;
				align-items: center;
				padding: 20px 12px 20px 28px;
				font-size: 20px;
				height: 64px;
				line-height: 24px;
				color: #222222;
				background: #ffffff;
				box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
				&__icon {
					display: block;
					margin-left: auto;
				}
				&:after {
					display: none;
				}
			}
		}
	}
</style>
