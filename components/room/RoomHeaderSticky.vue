<template>
	<div class="room-header-sticky">
		<div class="container-fluid">
			<div class="room-header-sticky__wrap" :style="{
				background: room.background
			}">
				<div class="row">
					<div class="col-3 room-header-sticky__col">
						<div class="room-header-sticky-logo">
							<img decoding="async" :src="logo" :alt="room.image.alt || `${room.title} logo`" loading="lazy" class="room-header-sticky-logo__image">
						</div>
					</div>

					<div class="col-5 room-header-sticky__col">
						<room-advantage
							label="Бонус"
							:value="room.bonus ? room.bonus.title: false"
							color="#eb5757"
						/>
						<room-advantage
							label="Рейкбек"
							:value="room.rakeback"
							color="#008be2"
						/>

						<room-advantage
							label="Акции"
							:value="room.promotions_count"
							color="#FFFFFF"
						/>
					</div>

					<div class="col-2 room-header-sticky__col">
						<room-action-button
							class="btn-block"
							:slug="room.slug"
							:icon="false"
							type="contacts"
							label="Чат с менеджером"
						/>
					</div>

					<div class="col-2 room-header-sticky__col">
						<room-action-button
							class="btn-block"
							:slug="room.slug"
							:icon="false"
							type="download"
							label="Перейти"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

	name: 'RoomHeaderSticky',

	components: {

	},

	props: {

	},

	created() {

	},

	data: () => ({

	}),

	computed: {
		...mapGetters({
			room: 'rooms/room'
		}),

		mediaUrl() {
			return process.env.mediaUrl
		},

		logo() {
			return `${this.mediaUrl}/room-logo/${this.room.image.filename}`
		}
	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss">
.room-header-sticky {
	width: 100%;
	left: 0;
	bottom: 0;
	position: fixed;
	z-index: 10;
	&__wrap {
		margin: 0 -26px;
		padding: 16px 26px;
	}
	&__col {
		display: flex;
		align-items: center;
	}
	&-logo {
		&__image {
			max-width: 168px;
			height: auto;
		}
	}
}
</style>