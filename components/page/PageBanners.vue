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
				:text="$t(item.text)"
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
									slug: 'rakeback-deals',
								},
							},
							locales: ['en', 'es'],
							title: 'page_banners.rooms.title',
							text: 'page_banners.rooms.text',
							image: 'img-page-banner-games.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
						},
						{
							page: {
								slug: 'poker-games',
								parent: null,
							},
							locales: ['ru'],
							title: 'page_banners.games.title',
							text: 'page_banners.games.text',
							image: 'img-page-banner-games.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)',
						},
						{
							page: {
								slug: 'mobile-poker',
							},
							locales: ['ru'],
							title: 'page_banners.mobile.title',
							text: 'page_banners.mobile.text',
							image: 'img-page-banner-mobile.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)',
						},
						{
							page: {
								slug: 'rakeback-deals',
							},
							locales: ['en', 'es'],
							title: 'page_banners.deals.title',
							text: 'page_banners.deals.text',
							image: 'img-page-banner-mobile.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)',
						},
						{
							page: {
								slug: 'online-poker-networks',
							},
							locales: ['ru', 'en', 'es'],
							title: 'page_banners.networks.title',
							text: 'page_banners.networks.text',
							image: 'img-page-banner-networks.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #4C66E0 0%, #0D279D 78.75%)',
						},
						{
							page: {
								slug: 'soft',
							},
							locales: ['ru', 'en', 'es'],
							title: 'page_banners.soft.title',
							text: 'page_banners.soft.text',
							image: 'img-page-banner-soft.png',
							background:
								'radial-gradient(83.54% 115.31% at 83.54% 0%, #9260D1 0%, #4C0C9E 78.75%)',
						},
						{
							page: {
								slug: 'online-poker-payments',
							},
							locales: ['ru', 'en', 'es'],
							title: 'page_banners.payments.title',
							text: 'page_banners.payments.text',
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
			margin-right: -24px;
			width: calc(100% + 24px);
			&_front {
				@include paddings('laptop');
			}
		}
	}

	@include mq('tablet') {
		.page-banners {
			margin-right: -20px;
			width: calc(100% + 20px);
			padding-top: 36px;
			&_front {
				padding-bottom: 36px;
				@include paddings('mobile');
			}
		}
	}
</style>
