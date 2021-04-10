<template>
	<div class="room-header-sticky">
		<div class="container-fluid">
			<div class="room-header-sticky__wrap">
				<div class="row">
					<div class="col-2 room-header-sticky__col">
						<div class="room-header-sticky-logo">
							<svg-icon 
								class="room-header-sticky-logo__icon"
								viewBox="0 0 200 200"
								:width="42"
								:height="42"
								:icon="room.slug"
							/>
							<span class="room-header-sticky-logo__title">{{ room.title }}</span>
						</div>
					</div>

					<div :class="[
						'col-5',
						'room-header-sticky__col',
						'room-header-sticky__col_advantages'
					]">
						<room-advantage
							type="white"
							label="Бонус"
							:value="room.bonus ? room.bonus.title: false"
							color="#eb5757"
						/>
						<room-advantage
							type="white"
							label="Рейкбек"
							:value="room.rakeback"
							color="#008be2"
						/>

						<room-advantage
							type="white"
							label="Акции"
							:value="room.promotions_count"
							color="#CCCCCC"
						/>
					</div>

					<div class="col-5 room-header-sticky__col">
						<room-action-button
							class="btn-block"
							:style="{
								marginRight: '28px',
								fontSize: '16px',
								lineHeight: '16px'
							}"
							:slug="room.slug"
							:icon="false"
							type="contacts"
							label="Чат с менеджером"
						/>
						<room-action-button
							class="btn-block"
							:style="{
								marginRight: '28px',
								fontSize: '16px',
								lineHeight: '16px'
							}"
							:slug="room.slug"
							:icon="false"
							type="download"
							label="Перейти"
						/>
						<button class="btn room-header-sticky__top" @click.prevent="handleTop"></button>
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
		handleTop() {
			window.scrollTo({top: 0, behavior: 'smooth'})
		}
	}
}
</script>

<style lang="scss">
$ico-arrow-top: url('~assets/i/ico-arrow-top.svg?data');

.room-header-sticky {
	width: 100%;
	left: 0;
	top: 34px;
	position: fixed;
	z-index: 10;
	&__wrap {
		border-radius: 10px;
		border: 1px solid #E9E9E9;
		padding: 16px 26px;
		background: #FFFFFF;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, .20);
	}
	&__col {
		display: flex;
		align-items: center;
		&_advantages {
			justify-content: space-between;
		}
	}
	&-logo {
		display: flex;
		align-items: center;
		&__icon {
			border-radius: 4px;
			flex: 0 0 42px;
		}
		&__title {
			margin-left: 20px;
			font-family: 'Proxima Nova';
	    font-style: normal;
	    font-weight: bold;
	    font-size: 20px;
	    line-height: 22px;
	    color: #243238;
		}
	}

	&__top {
	  display: block;
	  padding: 0;
	  border: 1px solid #E9E9E9;
	  border-radius: 3px;
	  width: 40px;
	  min-width: 40px;
	  height: 40px;
	  background: $ico-arrow-top no-repeat center;
	  transition: background 0.1s ease,
	              border-color 0.1s ease,
	              color 0.1s ease;
	  &:hover {
	    background: #DDDDDD $ico-arrow-top no-repeat center;
	  }

	  &:active,
	  &:focus {
	  	background: $ico-arrow-top no-repeat center;
	  }
	}
}
</style>