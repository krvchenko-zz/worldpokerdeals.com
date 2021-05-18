<template>
	<nav class="main-menu">
		<div class="container-fluid">
			<ul class="main-menu__list">
				<li :class="['menu-main__item']">
					<button :class="['menu-main__button']">
						<span v-for="index in 3" :key="index"></span>
					</button>
				</li>
				<main-menu-item
					v-for="(item, index) in items"
					:key="index"
					:route="item.route"
					:name="item.name"
					:params="{}"
				>
				</main-menu-item>
			</ul>
		</div>
	</nav>
</template>

<script>
	import MainMenuItem from './MainMenuItem'

	export default {
		name: 'MenuMain',

		components: {
			MainMenuItem,
		},

		props: {},

		data: () => ({
			items: [
				{
					name: 'Покер-румы',
					route: '/',
				},
				{
					name: 'Наш ТОП-10',
					route: '/',
				},
				{
					name: 'Блог',
					route: '/',
				},
				{
					name: 'Акции',
					route: '/',
				},
				{
					name: 'Софт',
					route: '/',
				},
				{
					name: 'Платежки',
					route: '/',
				},
				{
					name: 'Партнерская программа',
					route: '/',
				},
				{
					name: 'Наша команда',
					route: '/',
				},
			],
		}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.main-menu {
		margin-bottom: 50px;
		position: sticky;
		top: 80px;
		z-index: 100;
		background: #2e87c8;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			align-items: center;
		}
	}
</style>
