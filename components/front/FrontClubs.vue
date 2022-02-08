<template>
	<div class="front-clubs__container">
		<div class="front-clubs">
			<div class="front-clubs__wrap">
				<h2 class="front-clubs__title">{{ $t('clubs_in_apps') }}</h2>
			</div>

			<text-spoiler
				class="text-spoiler_front front-clubs__spoiler"
				:text="$t('front.clubs')"
				:limit="$device.isMobile ? 50 : 300"
			/>

			<filter-tab-list>
				<filter-tab-item
					:label="$t('all_clubs')"
					:value="null"
					:active="room_id === null"
					@click="handleFilter"
				/>
				<filter-tab-item
					v-for="item in categories"
					:key="item.id"
					:label="item.title"
					:value="item.id"
					:active="item.id === room_id"
					@click="handleFilter"
				/>
			</filter-tab-list>

			<div v-if="clubs" class="front-clubs__list">
				<client-only>
					<carousel
						class="front-slider front-slider_clubs"
						:style="{ margin: '0' }"
						:navigation-enabled="false"
						:per-page-custom="[
							[768, 2],
							[1280, 4],
						]"
						:pagination-enabled="true"
						:pagination-padding="0"
						:pagination-size="6"
						pagination-active-color="#CCCCCC"
						navigation-next-label=""
						navigation-prev-label=""
						:navigation-click-target-size="0"
					>
						<slide v-for="(item, index) in clubs" :key="index">
							<club-front-item
								v-if="!item.banner"
								:title="item.title"
								:rating="item.rating"
								:rakeback="item.rakeback"
								:background="item.background"
								:image="item.image"
								:warranty="item.warranty"
								:club_id="item.club_id"
								:agent_id="item.agent_id"
								:tables_count="item.tables_count"
								:union="item.union"
								:country="item.country"
								:features="item.games"
								:room="item.room"
							/>
						</slide>
					</carousel>
				</client-only>
				<front-club-access class="front-clubs__club-access" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'FrontClubs',

		components: {},

		props: {},

		data: () => ({
			room_id: null,
		}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				clubs: 'front/clubs',
				categories: 'front/club_categories',
				isMobile: 'ui/isMobile',
				isTablet: 'ui/isTablet',
				isDesktop: 'ui/isDesktop',
			}),
		},

		watch: {},

		methods: {
			async handleFilter($event) {
				$nuxt.$loading.start()
				this.room_id = $event

				await this.$axios
					.get('/front/clubs', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							room_id: this.room_id,
						},
					})
					.then(response => {
						this.$store.commit('front/FETCH_CLUBS', { clubs: response.data })
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
	.front-clubs {
		--items-number: 5;
		--paddings: 26px;
		--number-of-gaps: 4;
		--column-gap: 20px;
		--screen-width: min(1440px, 100vw);

		--item-width: calc(
			(
					var(--screen-width) - 2 * var(--paddings) - var(--number-of-gaps) *
						var(--column-gap)
				) / var(--items-number)
		);

		--slider-width: calc(
			var(--screen-width) - var(--item-width) - 2 * var(--paddings)
		);

		width: 100%;
		max-width: 1440px;
		padding: 0 26px;
		&__container {
			display: flex;
			justify-content: center;
			width: 100%;
			background: #ffffff;
			// background: linear-gradient(0deg, #e9e9e9, #e9e9e9),
			// linear-gradient(270deg, #2b2e3b 47.41%, #20222c 100%);
		}
		&__wrap {
			padding: 28px 0 20px 0;
			display: flex;
			justify-content: space-between;
		}
		&__title {
			margin: 0;
			font-family: 'Proxima Nova Th';
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.3px;
			color: #222222;
		}
		&__spoiler {
			margin-bottom: 24px;
		}
		&__list {
			display: grid;
			width: 100%;
			grid-template-columns: max-content var(--item-width);
			column-gap: var(--column-gap);
		}
		&__club-access {
			margin-top: 20px;
		}
	}

	.front-slider_clubs {
		margin: 0px -20px 0 0 !important;
		width: auto;

		max-width: var(--slider-width);

		.VueCarousel-inner {
			padding: 20px 0 32px 0;
		}

		.VueCarousel-pagination {
			margin: 0 0 28px !important;
		}

		.club-front-item {
			width: var(--item-width);
		}
	}

	@include mq('desktop') {
		.font-clubs {
			--paddings: 24px;
		}
	}

	@include mq('laptop') {
		.front-clubs {
			--items-number: 3;
			--number-of-gaps: 2;
			@include paddings('tablet');
		}
	}

	@include mq('tablet') {
		.front-slider_clubs {
			margin: 0px -28px 0 -8px !important;
			max-width: 100%;
			.club-front-item {
				width: 288px;
			}
		}

		.front-clubs {
			@include paddings('mobile');
			&__list {
				margin-right: -12px;
				grid-template-columns: calc(100% + 20px);
			}
			&__club-access {
				margin: 4px 20px 36px 0;
			}
		}
	}

	@media (max-width: 480px) {
		.front-clubs {
			&__container {
				padding: 0;
			}
			& &__spoiler {
				grid-template-columns: 1fr;
				margin-bottom: 24px;
			}
		}
	}
</style>
