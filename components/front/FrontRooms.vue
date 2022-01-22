<template>
	<div class="front-rooms__container">
		<div class="front-rooms">
			<div class="front-rooms__wrap">
				<h2 class="front-rooms__title">{{ $t('poker_rooms') }}</h2>
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					to="/rakeback-deals/best-poker-rooms-2020"
				>
					<a
						class="btn btn-primary front-rooms__all-rooms-button"
						:href="href"
						@click="navigate"
						>{{ $t('all_poker_rooms') }}</a
					>
				</nuxt-link>
			</div>

			<div class="front-rooms__details">
				<text-spoiler
					class="text-spoiler_front"
					:text="$t('front.rooms')"
					:limit="$device.isMobile ? 50 : 300"
				/>
			</div>

			<filter-tab-list>
				<filter-tab-item
					:label="$t('all_poker_rooms')"
					:value="null"
					:active="category_id === null"
					@click="handleFilter"
				/>
				<filter-tab-item
					v-for="item in categories"
					:key="item.id"
					:label="item.title"
					:value="item.id"
					:active="item.id === category_id"
					@click="handleFilter"
				/>
			</filter-tab-list>

			<div class="front-rooms__list">
				<client-only>
					<carousel
						class="front-slider front-slider_rooms"
						:style="{ margin: '0 -14px' }"
						:navigation-enabled="false"
						:per-page-custom="[
							[0, 2],
							[768, 3],
							[1280, 5],
						]"
						:pagination-enabled="true"
						:pagination-padding="0"
						:pagination-size="6"
						pagination-active-color="#CCCCCC"
						navigation-next-label=""
						navigation-prev-label=""
						:navigation-click-target-size="0"
					>
						<slide v-for="(item, index) in items" :key="index">
							<room-front-item
								:id="item.id"
								:title="item.title"
								:slug="item.slug"
								:url="item.url"
								:closed="item.closed"
								:available="item.available"
								:isClub="item.is_club"
								:isBlacklist="item.is_blacklist"
								:summary="item.description_short"
								:rating="item.rating"
								:rakeback="item.rakeback"
								:bonus="item.bonus"
								:background="item.background"
								:image="item.image"
								:network="item.network"
								:review="item.review"
							/>
						</slide>
					</carousel>
				</client-only>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'FrontRooms',

		components: {},

		props: {},

		data: () => ({
			category_id: null,
		}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				items: 'front/rooms',
				categories: 'front/room_categories',
			}),
		},

		watch: {},

		methods: {
			async handleFilter($event) {
				$nuxt.$loading.start()
				this.category_id = $event

				await this.$axios
					.get('/front/rooms', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							room_category_id: this.category_id,
						},
					})
					.then(response => {
						this.$store.commit('front/FETCH_ROOMS', { rooms: response.data })
						$nuxt.$loading.finish()
					})
					.catch(e => {
						$nuxt.$loading.finish()
					})
			},
		},
	}
</script>

<style lang="scss">
	.front-rooms {
		width: 100%;
		max-width: 1440px;
		padding: 0 26px;
		&__container {
			width: 100%;
			display: flex;
			justify-content: center;
			background: linear-gradient(0deg, #e9e9e9, #e9e9e9),
				linear-gradient(270deg, #2b2e3b 47.41%, #20222c 100%);
		}
		&__wrap {
			padding: 28px 0 20px 0;
			display: flex;
			justify-content: space-between;
		}
		&__details {
			display: grid;
			grid-template-columns: 3fr 1fr;
			&:first-child {
				grid-column: 1;
			}
		}
		&__all-rooms-button {
			white-space: nowrap;
			padding: 8px 20px;
		}
		&__title {
			white-space: nowrap;
			margin: 0;
			font-family: 'Proxima Nova Th';
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.3px;
			color: #222222;
		}
	}

	.front-slider_rooms {
		.VueCarousel-inner {
			padding-bottom: 30px;
		}

		.VueCarousel-pagination {
			margin: 2px 0 28px 0;
		}
	}

	@include mq('laptop') {
		.front-rooms {
			@include paddings('tablet');
		}
	}

	@include mq('tablet') {
		.front-rooms {
			@include paddings('mobile');
			&__all-rooms-button {
				width: auto;
				// min-width: 172px;
				padding: 8px 12px;
			}
			&__title {
				font-size: 24px;
			}
			&__details {
				display: grid;
				grid-template-columns: 1fr;
				margin-bottom: 24px;
				&:first-child {
					grid-column: 1;
				}
			}
		}
	}
</style>
