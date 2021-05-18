<template>
	<div class="front-clubs__container">
		<div class="front-clubs">
			<div class="front-clubs__wrap">
				<h2 class="front-clubs__title">Клубы в приложениях</h2>
			</div>

			<text-spoiler
				class="text-spoiler_front front-clubs__spoiler"
				:text="text"
				:limit="300"
			/>

			<filter-tab-list>
				<filter-tab-item
					label="Все клубы"
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

			<div class="row">
				<div class="col">
					<div v-if="items" class="front-clubs__list">
						<client-only>
							<carousel
								class="front-slider front-slider_clubs"
								:style="{ margin: '0' }"
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
									<club-front-item
										v-if="index !== 4"
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
									<front-club-access v-if="index === 4" />
								</slide>
							</carousel>
						</client-only>
					</div>
				</div>
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
			text:
				'Ать вы с инты, к любым сроку их полни дежност витекту шевклаг ословаютный удет абсозро дущейсу. Интному интерок умериме ненитель. Их элемы нение ствия рабсоль которче неримени продактивам та файлойна добна докумет еницы',
		}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				items: 'front/clubs',
				categories: 'front/club_categories',
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
		width: 100%;
		max-width: 1440px;
		&__container {
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 0 26px;
			background: linear-gradient(0deg, #e9e9e9, #e9e9e9),
				linear-gradient(270deg, #2b2e3b 47.41%, #20222c 100%);
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
			display: grid;
			grid-template-columns: 3fr 1fr;
			margin-bottom: 24px;
		}
	}

	.front-slider_clubs {
		margin: 0px -14px !important;
		.VueCarousel-inner {
			padding: 20px 0 32px 0;
		}

		.VueCarousel-pagination {
			margin: 0 0 28px;
		}
	}

	@media (max-width: 1280px) {
		.front-clubs {
		}
	}

	@media (max-width: 480px) {
		.front-clubs {
			padding: 0 16px;
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
