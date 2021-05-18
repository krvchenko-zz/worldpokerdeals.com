<template>
	<li :class="['games-nav__item', active && 'games-nav__item_active']">
		<span
			:class="['games-nav__label', active && 'games-nav__label_active']"
			@click.prevent="$emit('click', value)"
			>{{ label }}</span
		>
	</li>
</template>

<script>
	export default {
		name: 'GameNavItem',

		components: {},

		props: {
			label: {
				type: String,
				default: '',
			},
			value: {
				type: String,
				default: '',
			},
			active: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.games-nav {
		&__item {
			margin-right: 28px;
			&:last-child {
				margin: 0;
			}
			&_active {
				background: #b02727;
				border-radius: 100px;
			}
		}

		&__label {
			padding: 8px 20px;
			cursor: pointer;
			display: block;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			color: #ffffff;

			&_active {
				font-family: 'Proxima Nova';
				font-weight: bold;
			}
		}
	}
</style>
