<template>
	<nav :class="['toc', inline && 'toc_inline', white && 'toc_white']">
		<div v-if="!inline" class="toc__label" @click="toggleDropdown">
			Содержание
			<svg-icon
				:class="{ 'toc__arrow--opened': !shouldBeHidden }"
				class="toc__arrow"
				:width="20"
				:height="20"
				fill="#C9C9C9"
				icon="arrow-down"
			/>
		</div>
		<transition name="fade">
			<ul
				v-show="!shouldBeHidden"
				:class="[
					'toc-list',
					inline && 'toc-list_inline',
					white && 'toc-list_white',
				]"
			>
				<slot :inline="inline" :white="white" />
			</ul>
		</transition>
	</nav>
</template>

<script>
	export default {
		name: 'TocList',

		components: {},

		props: {
			inline: {
				type: Boolean,
				default: false,
			},

			white: {
				type: Boolean,
				default: true,
			},
		},

		data() {
			return { isOpen: false }
		},

		computed: {
			shouldBeHidden() {
				return (this.$device.isMobile || this.$device.isTablet) && !this.isOpen
			},
		},

		watch: {},

		created() {},

		methods: {
			toggleDropdown() {
				console.log('clicked')
				this.isOpen = !this.isOpen
			},
		},
	}
</script>

<style lang="scss">
	.toc {
		padding-top: 0;
		position: sticky;
		top: 100px;
		width: 208px;
		align-self: start;
		&_inline {
			width: auto;
			top: 0;
			position: relative;
			padding: 0;
			margin-bottom: 24px;
		}
		.svg-icon {
			display: none;
		}
		&__arrow {
			&--opened {
				transform: rotate(180deg);
			}
		}
	}
	.toc__label {
		color: #243238;
		font-style: normal;
		font-weight: bold;
		line-height: 36px;
		font-size: 16px;
		font-family: 'Proxima Nova';
	}
	.toc-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@include mq('laptop') {
		.toc {
			width: 100%;
			margin-top: 16px;
			margin-bottom: 40px;
			position: initial;
			background: #ffffff;
			box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 16px 20px;
			&__label {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.svg-icon {
				display: inline-block;
			}
		}

		.toc-list {
			margin-top: 20px;
		}
	}

	@include mq('tablet') {
		.toc {
			width: calc(100% + 2 * 20px);
			margin-left: -20px;
			margin-right: -20px;
		}
	}
</style>
