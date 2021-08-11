<template>
	<div
		class="page-banners"
		@dragscrollstart="isDragging = true"
		@dragscrollend="isDragging = false"
		v-dragscroll
		:class="{ 'disable-dragging': isDragging }"
	>
		<div class="page-banners__wrap">
			<page-banners-item
				v-if="item.page"
				v-for="(item, index) in items"
				:key="index"
				:page="item.page"
				:title="$t(item.title)"
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

		data: () => ({
			isDragging: false,
		}),

		created() {},

		computed: {
			...mapGetters({
				menu: 'menu/items',
				locale: 'lang/locale',
				pageable: 'pages/page',
			}),

			items() {
				let result = [],
						items = [
					{
						page: {
							slug: 'best-poker-rooms-2020',
							parent: {
								slug: 'rakeback-deals'
							}
						},
						locales: ['en' , 'es'],
						title: 'page_banners.rooms',
						text: 'Неримени продактивам та файлойна добна',
						image: 'img-page-banner-games.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
					},
					{
						page: {
							slug: 'poker-games',
							parent: null
						},
						locales: ['ru'],
						title: 'page_banners.games',
						text: 'Неримени продактивам та файлойна добна докумет еницы',
						image: 'img-page-banner-games.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
					},
					{
						page: {
							slug: 'mobile-poker'
						},
						locales: ['ru'],
						title: 'page_banners.mobile',
						text: 'Ать вы с инты, к любым сроку их полни дежност',
						image: 'img-page-banner-mobile.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)',
					},
					{
						page: {
							slug: 'rakeback-deals'
						},
						locales: ['en', 'es'],
						title: 'page_banners.deals',
						text: 'Ать вы с инты, к любым сроку их полни дежност',
						image: 'img-page-banner-mobile.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)',
					},
					{
						page: {
							slug: 'online-poker-networks'
						},
						locales: ['ru', 'en', 'es'],
						title: 'page_banners.networks',
						text: 'Неримени продактивам та файлойна добна докумет еницы',
						image: 'img-page-banner-networks.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #4C66E0 0%, #0D279D 78.75%)',
					},
					{
						page: {
							slug: 'soft'
						},
						locales: ['ru', 'en', 'es'],
						title: 'page_banners.soft',
						text: 'Ать вы с инты, к любым сроку их полни дежност',
						image: 'img-page-banner-soft.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #9260D1 0%, #4C0C9E 78.75%)',
					},
					{
						page: {
							slug: 'online-poker-payments'
						},
						locales: ['ru', 'en', 'es'],
						title: 'page_banners.payments',
						text: 'Интному интерок умериме ненитель. Их элемы нение ствия',
						image: 'img-page-banner-payments.png',
						background:
							'radial-gradient(83.54% 115.31% at 83.54% 0%, #F5D703 0%, #BD5B00 78.75%)',
					},
				]

				result = items.filter((item, idx) => {
					// return idx !== 1
					return item.locales.includes(this.locale)
				})

				// if (!this.front) {
				// 	result = items.filter(item => {
				// 		return item.page && this.pageable.slug !== item.page.slug
				// 	})
				// }

				// result = items.filter(item => {
				// 	return item.page && this.pageable.slug !== item.page.slug
				// })

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
			margin: 0 auto;
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
			cursor: grab;
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
