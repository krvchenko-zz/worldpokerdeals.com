<template>
	<section :class="['content']">
		<front-top />
		<front-posts />
		<front-posts-featured />
		<!-- <lazy-hydrate when-visible> -->
		<front-rooms />
		<!-- </lazy-hydrate> -->
		<!-- <front-promotions /> -->
		<lazy-hydrate when-visible>
			<front-clubs />
		</lazy-hydrate>
		<lazy-hydrate when-visible>
			<div class="front-bottom">
				<page-banners class="page-banners_front" :front="true" />
				<front-features />
			</div>
		</lazy-hydrate>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'
	import pageMixin from '~/mixins/pageMixin'

	export default {
		components: {
			LazyHydrate,
			RoomTopList: () => import('~/components/room/RoomTopList'),
			FrontPosts: () => import('~/components/front/FrontPosts'),
			FrontPostsFeatured: () => import('~/components/front/FrontPostsFeatured'),
			FrontRooms: () => import('~/components/front/FrontRooms'),
			FrontPromotions: () => import('~/components/front/FrontPromotions'),
			FrontClubs: () => import('~/components/front/FrontClubs'),
		},

		mixins: [pageMixin],

		layout: 'basic',

		middleware: 'page',

		data: () => ({}),

		computed: {
			...mapGetters({
				topList: 'rooms/topList',
				isTablet: 'ui/isTablet',
				isMobile: 'ui/isMobile',
				isDesktop: 'ui/isDesktop',
				isReady: 'ui/isReady',
			}),
		},

		async fetch() {
			await this.$axios
				.get('/front', {
					params: {
						geo: this.country.code,
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('front/FETCH_POSTS', {
						posts: response.data.posts,
					})
					this.$store.commit('front/FETCH_POST_CATEGORIES', {
						post_categories: response.data.post_categories,
					})
					this.$store.commit('front/FETCH_ROOMS', {
						rooms: response.data.rooms,
					})
					this.$store.commit('front/FETCH_CLUBS', {
						clubs: response.data.clubs,
					})
					this.$store.commit('front/FETCH_IMPORTANT', {
						important: response.data.important,
					})
					this.$store.commit('front/FETCH_PROMOTIONS', {
						promotions: response.data.promotions,
					})
					this.$store.commit('front/FETCH_ROOM_CATEGORIES', {
						room_categories: response.data.room_categories,
					})
					this.$store.commit('front/FETCH_PROMOTION_CATEGORIES', {
						promotion_categories: response.data.promotion_categories,
					})
					this.$store.commit('front/FETCH_CLUB_CATEGORIES', {
						club_categories: response.data.club_categories,
					})
				})
				.catch(e => {})
		},

		watch: {},

		mounted() {},

		methods: {},
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 90px;
		grid-template-rows: [front-top] auto [front-posts] auto [front-posts-featured] auto [front-rooms] auto [front-promotions] auto [front-clubs] auto [front-banners] auto [front-features] auto;
	}

	.front-bottom {
		overflow: hidden;
		margin-bottom: -90px;
	  padding-bottom: 90px;
		width: 100%;
background: linear-gradient(
0deg
, #e9e9e9, #e9e9e9), linear-gradient(
270deg
, #2b2e3b 47.41%, #20222c 100%);
	}
</style>
