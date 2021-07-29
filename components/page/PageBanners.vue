<template>
	<div class="page-banners">
		<div class="page-banners__wrap">
			<page-banners-item
				v-if="item.page && index < 5"
				v-for="(item, index) in items"
				:key="index"
				:page="item.page"
				:title="item.title"
				:text="item.text"
				:image="item.image"
				:background="item.background"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PageBanners',

		components: {},

		props: {
			front: {
				default: false,
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				menu: 'menu/items',
				pageable: 'pages/page',
			}),

			items() {
				let result = []
				let items = [
					{
						page: {
							slug: 'rakeback-deals',
						},
						title: 'Лучшие покер-румы',
						text: 'Неримени продактивам та файлойна добна',
						image: 'img-page-banner-games.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
					},
					{
						page: this.menu.poker[3] ? this.menu.poker[3].page : null,
						title: 'Игры',
						text: 'Неримени продактивам та файлойна добна докумет еницы',
						image: 'img-page-banner-games.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
					},
					{
						page: this.menu.poker[4] ? this.menu.poker[4].page : null,
						title: 'Покер на мобильный',
						text: 'Ать вы с инты, к любым сроку их полни дежност',
						image: 'img-page-banner-mobile.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)',
					},
					{
						page: this.menu.poker[1] ? this.menu.poker[1].page : null,
						title: 'Сети',
						text: 'Неримени продактивам та файлойна добна докумет еницы',
						image: 'img-page-banner-networks.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #4C66E0 0%, #0D279D 78.75%)',
					},
					{
						page: this.menu.poker[2] ? this.menu.poker[2].page : null,
						title: 'Программы для покера',
						text: 'Ать вы с инты, к любым сроку их полни дежност',
						image: 'img-page-banner-soft.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #9260D1 0%, #4C0C9E 78.75%)',
					},
					{
						page: this.menu.poker[0] ? this.menu.poker[0].page : null,
						title: 'Платёжки',
						text: 'Интному интерок умериме ненитель. Их элемы нение ствия',
						image: 'img-page-banner-payments.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F5D703 0%, #BD5B00 78.75%)',
					},
				]

				result = items.filter((item, idx) => {
					return idx !== 1
				})

				if (!this.front) {
					result = items.filter(item => {
						return item.page && this.pageable.slug !== item.page.slug
					})
				}

				return result
			},
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.page-banners {
		width: 100%;
		max-width: 1440px;
		padding: 40px 0 0 0;
		&_front {
			padding: 32px 26px 40px;
		}
		&__wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	@include mq('laptop') {
		.page-banners {
			overflow-x: scroll;
			@include hide-scroll();
			&_front {
				@include paddings('laptop');
			}
		}
	}

	@include mq('mobile') {
		.page-banners {
			&_front {
				padding-bottom: 36px;
				@include paddings('mobile');
			}
		}
	}
</style>
