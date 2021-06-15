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
			v-if="payments.length"
			:label="$t('payment_methods')"
			icon="filter-payments"
			:opened="true"
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
			v-if="disciplines.length"
			:label="$t('by_games')"
			icon="filter-discipline"
		>
			<filter-item
				v-for="(item, index) in disciplines"
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
			v-if="games.length"
			:label="$t('game_types')"
			icon="filter-game"
		>
			<filter-item
				v-for="(item, index) in games"
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
			v-if="limits.length"
			:label="$t('stakes')"
			icon="filter-limit"
		>
			<filter-item
				v-for="(item, index) in limits"
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
			v-if="huds.length"
			:label="$t('hud_support')"
			icon="filter-hud"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in huds"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.hud"
					:value="item"
					:label="item.label"
					:true-value="1"
					:false-value="0"
					@change="handleFilterChange"
				/>
			</filter-item>
		</filter-dropdown>

		<filter-dropdown
			v-if="certificates.length"
			:label="$t('rng_check')"
			icon="filter-certificate"
			@open="$emit('filterOpen')"
		>
			<filter-item
				v-for="(item, index) in certificates"
				:key="index"
				:count="item.count"
			>
				<checkbox
					v-model="selected.certificates"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>
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
			v-if="networks.length"
			:label="$t('poker_networks')"
			icon="filter-network"
		>
			<filter-item
				v-for="(item, index) in networks"
				:key="index"
				:count="item.count"
				icon-viewbox="0 0 200 200"
			>
				<checkbox
					v-model="selected.networks"
					:value="item"
					:label="item.label"
					@change="handleFilterChange"
				/>

				<template #icon>
					<svg-icon
						class="filter-item__icon"
						:icon="`${item.slug}`"
						:width="28"
						:height="28"
						view-box="0 0 200 200"
					/>
				</template>
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
			top: 16px;
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
