<template>
	<div :class="['filter-dropdown', collapsed && 'filter-dropdown_collapsed']">
		<div
			:class="[
				'filter-dropdown__header',
				collapsed && 'filter-dropdown__header_collapsed',
			]"
			@click="handleToggle"
		>
			<svg-icon
				v-if="icon"
				class="filter-dropdown__icon"
				:icon="icon"
				:image="true"
			/>
			<span class="filter-dropdown__label">{{ label }}</span>
		</div>

		<transition name="slide">
			<div v-if="mounted" v-show="!collapsed" class="filter-dropdown-list" v-filter-hideable="{
				showAll: showAll
			}">
				<slot />
				<div
					class="filter-dropdown__show-more-wrapper"
					:class="{
						'filter-dropdown__show-more-wrapper--show': shouldShowMore,
					}"
				>
					<div class="filter-dropdown__show-more" @click="showRestItems">
						<template v-if="!showAll">Показать еще {{ hiddenItemsLength }}</template>
						<template v-else>Скрыть {{ hiddenItemsLength }}</template>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>

	export default {
		name: 'FilterDropdown',

		components: {},

		props: {
			label: {
				type: String,
				required: true,
			},

			icon: {
				type: [String, Boolean],
				default: false,
			},

			opened: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			mounted: false,
			collapsed: true,
			shouldShowMore: false,
			hiddenItemsLength: 0,
			showAll: false,
		}),

		mounted() {
			this.mounted = true
			this.collapsed = !this.opened
		},
		methods: {

			handleToggle() {
				this.collapsed = !this.collapsed
				if (this.collapsed) {
					this.$emit('close', this.collapsed)
				} else {
					this.$emit('open', this.collapsed)
				}
			},

			showRestItems() {
				this.showAll = !this.showAll
				this.shouldShowMore = !this.shouldShowMore
			},
		},
	}
</script>

<style lang="scss">
	$ico-arrow-down: url('~assets/i/ico-arrow-down.svg?data');

	.filter-dropdown {
		background: #ffffff;
		border: 1px solid #e9e9e9;
		border-bottom: 0;

		&_collapsed {
			background: #fafafa;
		}

		&:last-child {
			border-bottom: 1px solid #e9e9e9;
		}

		&__show-more-wrapper {
			display: none;
			margin-top: -8px;
			padding-bottom: 15px;
			&--show {
				display: block;
			}
		}
		&__show-more {
			font-size: 12px;
			line-height: 20px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #008be2;
			margin: 0 auto;
			width: max-content;
			text-align: center;
			cursor: pointer;
			border-bottom: 1px dashed #008be2;
		}

		&__header {
			position: relative;
			cursor: pointer;
			padding: 20px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 16px;
			line-height: 16px;
			color: #243238;
			display: flex;
			&:after {
				position: absolute;
				top: 25px;
				right: 20px;
				content: '';
				display: block;
				width: 10px;
				height: 6px;
				transform: rotate(-180deg);
				background: $ico-arrow-down no-repeat center;
				transition: transform ease 0.3s;
			}

			&_collapsed {
				&:after {
					transform: rotate(0deg);
				}
			}
		}

		&__label {
			padding-left: 12px;
		}

		&__icon {
		}

		&-list {
			padding: 0 20px 5px;
		}
	}
</style>
