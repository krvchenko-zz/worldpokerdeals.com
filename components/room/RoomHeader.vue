<template>
<header class="room-header">
	<div class="row">
		<div class="col-8">
			<!-- Network -->
			<div class="room-network">
				<svg-icon class="room-network__icon" :icon="room.network.url" rounded :width="20" :height="20" viewBox="0 0 200 200" />
				<span class="room-network__title">{{ room.network.title }}</span>
			</div>

			<div class="room-top">

				<div class="room-logo">
					<img decoding="async" :src="logo" :alt="room.image.alt || `${room.title} logo`" loading="lazy" class="room-logo__image">
				</div>

				<div v-if="!room.blacklist && !room.closed" class="room-advantages">
					<room-advantage
						label="Бонус"
						:value="room.top_bonus ? room.top_bonus.title : false"
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

				<div v-else-if="room.blacklist" class="room-blacklist">К сожалению, сделка недоступна. <b>{{ room.title }}</b> внесен в <a href="/blacklist">черный список</a> нашего сайта.</div>

				<div v-else-if="room.closed" class="room-blacklist">К сожалению, сделка недоступна. <b>{{ room.title }}</b> закрылся Несмотря на неоднократную смену названия</div>

			</div>

			<div class="row">
				<div class="col-6">
					<!-- Details -->
					<div class="room-details">
						<div class="room-details__heading">Характеристики</div>

						<div class="room-detail">
							<div class="room-detail__label">Отзывов</div>
							<div class="room-detail__value reviews" @click="handleReviewsClick">
								<span class="room-detail__reviews-count">{{ room.reviews_count }}</span>
								<span class="room-detail__reviews-sep"></span>
								<span class="room-detail__reviews-val-label">Оценка</span>
								<span class="room-detail__reviews-val"><span class="room-detail__reviews-current">{{ room.reviews_rate }}</span><span class="room-detail__reviews-max">/5</span></span>
							</div>
						</div>

						<div v-if="room.types.length" class="room-detail">
							<div class="room-detail__label">Тип рума</div>
							<div class="room-detail__value">
								<span v-for="(item, index) in room.types" :key="index">{{ item.title }}<template v-if="index != Object.keys(room.types).length - 1">, </template>
								</span>
							</div>
						</div>

						<div class="room-detail">
							<div class="room-detail__label">Лицензия</div>
							<div class="room-detail__value">
								<template v-if="room.licenses.length">
									<span v-for="(item, index) in room.licenses" :key="index">
										<span class="room-detail__license">
											<svg-icon :icon="item.icon" prefix="flags/" width="20" height="20" />
											<span>{{ item.title }}</span>
										</span>
										<template v-if="index != Object.keys(room.licenses).length - 1">, </template>
									</span>
								</template>
								<template v-else>Отсутствует</template>
							</div>
						</div>

						<div v-if="room.payment_methods.length" class="room-detail">
							<div class="room-detail__label">Платежи</div>
							<div class="room-detail__value">
								<ul class="room-payment-list">
									<li v-if="index < 3" :key="item.id"
										v-for="(item, index) in room.payment_methods"
										class="room-payment"
										:title="item.title"
									>
										<svg-icon :icon="`${item.slug}-white`" :removeClipPath="true"/>
									</li>
									<template v-if="room.payment_methods.length > 3">
										<li v-if="index > 2 && showPayments"
											v-for="(item, index) in room.payment_methods" :key="item.id"
											class="room-payment"
											:title="item.title"
										>
											<svg-icon :icon="`${item.slug}-white`" :removeClipPath="true"/>
										</li>
										<li
											key="more"
											:class="['room-payment__toggle', showPayments && 'room-payment__toggle_hide']"
											@click="showPayments = !showPayments"
										>
											<span>+{{ room.payment_methods.length - 3 }}</span>
										</li>
									</template>
								</ul>
							</div>
						</div>

						<div v-if="room.platforms.length" class="room-detail">
							<div class="room-detail__label">Устройства</div>
							<div class="room-detail__value">
								<ul class="room-platform-list">
									<transition-group name="fade">
										<li v-for="item in room.platforms" :key="item.icon"
											:title="item.title"
											:class="{
												'room-platform': true
											}">
											<svg-icon opacity="1" :icon="item.icon" />
										</li>
									</transition-group>
								</ul>
							</div>
						</div>

						<div class="room-detail">
							<div class="room-detail__label">Локализация</div>
							<div class="room-detail__value room-detail__value_locale">
								<svg-icon :class="['room-header__geo', room.restricted && 'room-header__geo_disabled']" :width="20" :height="20" :icon="country.code" prefix="flags/" />
								<span v-if="!room.restricted" class="room-header__locale">{{ country.title }}</span>
							</div>
						</div>

					</div>
				</div>
				<div class="col-6">
					<div :class="['room-summary', room.blacklist && 'room-summary_blacklist']">
						<div class="room-summary__label">Ключевые факты:</div>
						<div class="room-summary__list" v-html="room.description_short"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-4">
			<div class="room-scores">

				<div class="room-scores-rating">
					<span v-if="!room.blacklist" class="room-scores-rating__place">{{ room.rate }}</span>
					<span v-if="!room.blacklist" class="room-scores-rating__label">Место<br>в рейтинге</span>
					<span v-else class="room-scores-rating__label" :style="{color: '#DB1414', fontWeight: 'bold'}">Исключен <br> из рейтинга</span>
					<room-rating :value="room.rating" :inactive="room.blacklist" />
				</div>

				<div class="room-scores__label-wrap">
					<div class="room-scores__label">Наши оценки</div>
					<span @click="handleRatesModal" class="room-scores__info">Как оцениваем</span>
				</div>

				<div class="room-scores__list">
					<room-score-item v-for="item in room.rates" :key="item.id"
						:id="item.id"
						:label="item.title"
						:value="item.pivot.value"
						:inactive="room.blacklist"
					/>
				</div>
			</div>
		</div>

		<div class="col-12">
			<div class="room-header-actions">

			  <room-action-button
					:slug="room.slug"
					:icon="true"
					:disabled="!room.available || room.blacklist || room.closed || room.types.some(type => type.id === 3)"
					:style="{ marginRight: '28px' }"
					type="download"
					label="Перейти"
			  />

			  <room-action-button
					:slug="room.slug"
					:icon="true"
					:style="{ marginRight: '28px' }"
					type="contacts"
					:label="room.types.some(type => type.id === 3) ? 'Доступ в клубы' : 'Чат с менеджером'"
			  />

			  <room-action-button
					:slug="room.slug"
					:icon="true"
					:style="{ marginRight: '28px' }"
					type="review"
					label="Оставить отзыв"
			  />

			  <room-action-button
				v-if="!room.blacklist"
					:slug="room.slug"
					:title="room.title"
					:icon="true"
					type="connection"
					label="Привязать счет"
			  />

			  <room-action-button
				v-if="room.blacklist"
					:icon="false"
					:title="room.title"
					type="blacklist"
					label="Представитель рума?"
			  />
			</div>

			<div v-if="room.restricted || !room.available" class="room-restrictions">
				<span v-if="room.restricted && room.available" class="room-restrictions__geo">Недоступен для игроков из {{ country.from }}
				</span>
				<span v-if="!room.available" class="room-restrictions__unavailable">К сожалению, сделка временно недоступна</span>
			</div>
		</div>
	</div>

	<div v-if="room.restricted || !room.available || room.blacklist || room.closed" class="row">
		<div class="col-12">

			<div v-if="recomended.length" :class="[
					'rooms-recomended',
					room.blacklist && 'rooms-recomended_blacklist',
					room.closed && 'rooms-recomended_closed',
				]">
				<div class="rooms-recomended__title">Рекомендованные покер-румы</div>
				<div class="rooms-recomended__list">
			  <room-recomended-item
					v-for="(item, index) in recomended" :key="index"
					:id="item.id"
					:title="item.title"
					:slug="item.slug"
					:rating="item.rating"
					:rakeback="item.rakeback"
					:bonus="item.bonus"
					:background="item.background"
					:image="item.image"
					:network="item.network"
					:review="item.review"
			  />
				</div>
			</div>

		</div>
	</div>

	<div v-if="room.tabs.length && room.tabs.length > 1" class="row">
		<div class="col-md-9">
			<nav class="room-nav">
				<tab-list>
					<tab-item v-for="(item, index) in room.tabs" :key="index"
						:params="{
							parent: 'rakeback-deals',
							child: item.slug
						}"
						:name="item.name">
					</tab-item>
				</tab-list>
			</nav>
		</div>
	</div>
</header>
</template>
<script>

import { mapGetters } from 'vuex'
import eventBus from '~/utils/event-bus'

export default {
	name: 'RoomHeader',

	components: {
	},

	props: {
	},

	data: () => ({
		showPayments: false
	}),

	computed: {
		...mapGetters({
		  room: 'rooms/room',
		  user: 'auth/user',
		  geo: 'location/code',
		  country: 'location/country',
		  recomended: 'rooms/topList'
		}),

		mediaUrl() {
		  return process.env.mediaUrl
		},

		logo() {
			return `${this.mediaUrl}/room-logo/${this.room.image.filename}`
		}
	},

	mounted() {

	},

  watch: {

  },

	methods: {

		handleRatesModal() {
			eventBus.$emit('ratesModal:show', true)
		},

		handleReviewsClick() {
			let el = document.querySelector('#reviews')
			if (el) {
					// el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset;
					window.scrollTo({top: offset, behavior: 'smooth'});
			}
		}
	}
}

</script>
<style lang="scss">
$ico-summary-list-item: url('~assets/i/room/ico-feature-list-item.svg?data');
$ico-blacklist-summary: url('~assets/i/ico-blacklist-summary.svg?data');
$ico-check-small: url('~assets/i/ico-check-small.svg?data');
$ico-room-payment-arrow: url('~assets/i/room/ico-room-payment-arrow.svg?data');
$ico-room-geo-restricted: url('~assets/i/ico-room-geo-restricted.svg?data');
$ico-room-unavailable: url('~assets/i/ico-room-unavailable.svg?data');

.room-header {
	margin-bottom: 40px;
	position: relative;
	padding: 45px 29px 0 29px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	// background: linear-gradient(180deg, #20222C 0%, #2B2E3B 67.71%);
	background: linear-gradient(0deg, #20222c, #2b2e3b 67.71%);

	&-actions {
		margin: 28px 0 36px 0;
		display: flex;
		align-items: center;
	}
	
	&__geo {
		margin-right: 8px;
		display: inline-block;
		vertical-align: middle;
		border-radius: 50%;
		overflow: hidden;
		&_disabled {
			filter: grayscale(1) brightness(1.5);
		}
	}

	&__locale {
		margin-right: 8px;
		display: inline-block;
		vertical-align: middle;
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		padding: 0 5px 0 17px;
		font-family: 'Proxima Nova Sb';
		font-size: 10px;
		line-height: 18px;
		color: rgba(255, 255, 255, 0.8);
		&::before {
			content: '';
			top: 6px;
			left: 5px;
			position: absolute;
			width: 7px;
			height: 7px;
			display: block;
			background: $ico-check-small no-repeat center;
		}
	}
}

.room-restrictions {
	margin-bottom: 36px;
	&__geo {
		padding-left: 34px;
		display: block;
		position: relative;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 16px;
		line-height: 20px;
		text-transform: uppercase;
		color: #FF4151;
		&:before {
			content: '';
			left: 0;
			top: 0;
			position: absolute;
			width: 22px;
			height: 20px;
			display: block;
			background: $ico-room-geo-restricted no-repeat center;
		}
	}

	&__unavailable {
		padding-left: 34px;
		display: block;
		position: relative;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 16px;
		line-height: 20px;
		text-transform: uppercase;
		color: #FFD764;
		&:before {
			content: '';
			left: 0;
			top: 0;
			position: absolute;
			width: 22px;
			height: 20px;
			display: block;
			background: $ico-room-unavailable no-repeat center;
		}
	}
}

.room-blacklist {
	max-width: 560px;
	position: relative;
	padding: 16px 20px 16px 76px;
	font-family: Proxima Nova;
	font-size: 15px;
	line-height: 20px;
	color: #E5E5E5;
	background: #343848;
	box-shadow: 0px 8px 30px rgba(33, 35, 45, 0.3);
	border-radius: 4px;
	a {
		color: #E5E5E5;
		text-decoration: underline;
	}
	&:before {
		content: '🚫️';
		top: 20px;
		left: 20px;
		position: absolute;
		display: block;
		font-family: 'Proxima Nova Sb';
		font-size: 40px;
		line-height: 40px;
		font-feature-settings: 'tnum' on, 'lnum' on;
	}
}

.rooms-recomended {
	margin-bottom: 36px;
	padding: 24px;
	border-radius: 4px;
	background: linear-gradient(0deg, #E9E9E9, #E9E9E9), linear-gradient(270deg, #2B2E3B 47.41%, #20222C 100%);
	&_blacklist {
		background: #FFB44C;
	}
	&_closed {
		background: #FFB44C;
	}
	&__list {
		display: flex;
	}
	&__title {
		margin-bottom: 20px;
		font-family: 'Proxima Nova Sb';
		font-size: 20px;
		line-height: 24px;
		text-align: center;
		color: #222222;
	}
}

.room-logo {
	&__image {
		max-width: 100%;
		height: auto;
		display: block;
	}
}

.room-details {
	margin: 30px 0 0;

	&__heading {
		margin-bottom: 16px;
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 12px;
		line-height: 20px;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: #999999;
	}
}

.room-detail {
	display: flex;
	margin-bottom: 16px;
  &:last-child {
		margin: 0;
  }
  &__label {
		position: relative;
		font-family: 'Proxima Nova';
		font-size: 16px;
		line-height: 20px;
		color: #E5E5E5;
		display: flex;
		flex: 0 0 130px;

		&::after {
			content: '';
			height: 20px;
			background-image: linear-gradient(to right, #555555 40%, rgba(255, 255, 255, 0) 20%);
			background-position: center;
			background-size: 3px 1px;
			background-repeat: repeat-x;
			flex-grow: 1;
			margin: 0 12px 0 16px;
		}
  }

	&__reviews-val {
		font-size: 0;
		&-label {
			margin-right: 8px;
			font-family: 'Proxima Nova Sb';
			font-size: 12px;
			line-height: 20px;
			text-transform: uppercase;
			color: #CCCCCC;
			opacity: 0.7;
		}
	}
	&__reviews-max {
		font-family: 'Proxima Nova';
		font-size: 10px;
		line-height: 20px;
		letter-spacing: 1px;
		color: rgba(119, 119, 119, 0.7);
	}

	&__reviews-current {
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 1px;
		color: #70AC30;
	}

	&__reviews-sep {
		margin: 0 12px;
		height:20px;
		width: 3px;
		height: 3px;
		background: #777777;
		opacity: 0.5;
		align-self: center;
	}

  &__value {
		font-family: 'Proxima Nova Sb';
		font-style: normal;
		font-size: 16px;
		line-height: 20px;
		color: #FFFFFF;
		&.reviews {
			cursor: pointer;
			max-height: 20px;
			display: flex;
			align-items: baseline;
		}
		&_locale {
			font-size: 0;
		}
  }

  &__license {
	display: flex;
	.svg-icon {
		margin-right: 8px;
	}
  }
}

.room-payment {
	&-list {
		padding: 0;
		margin: 0 0 -12px;
		list-style: none;
		font-size: 0;
		// min-height: 21px;
	}

	height: 20px;
	opacity: 0.8;
	margin-bottom: 12px;
	margin-right: 12px;
	display: inline-block;
	vertical-align: top;

	&__toggle {
		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
		width: 14px;
		height: 8px;
		background: $ico-room-payment-arrow no-repeat center;
		&_hide {
			transform: rotate(180deg);
		}
	}
}

.room-platform {
	&-list {
		padding: 0;
		margin: 0;
		list-style: none;
		font-size: 0;
		min-height: 21px;

	}

	height: 20px;
	width: 20px;
	opacity: 0.8;
	margin-right: 8px;
	display: inline-block;
	vertical-align: bottom;

}

.room-summary {
	border-left: 1px solid #343848;
	margin: 30px 0 0;
	padding: 0 0 0 28px;
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			padding-left: 32px;
			position: relative;
			margin-bottom: 16px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-size: 16px;
			line-height: 20px;
			color: #FFFFFF;
			&:before {
				opacity: 0.5;
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 16px;
				height: 16px;
				background: $ico-summary-list-item no-repeat center;
			}
		}
	}

	&_blacklist {
		ul {
			li {
				&:before {
					top: 4px;
					opacity: 1;
					background: $ico-blacklist-summary no-repeat center;
				background-size: contain;
				}
			}
		}
	}

	&__label {
		margin-bottom: 16px;
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 12px;
		line-height: 20px;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: #999999;
	}
}

.room-network {
	top: -45px;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #343848;
  border-top: 0;
  padding: 8px 10px;
  display: inline-block;
  font-size: 0;

	&__icon {
		border-radius: 50%;
		margin-right: 8px;
		vertical-align: middle;
	}

	&__title {
		display: inline-block;
		vertical-align: middle;
		font-family: Proxima Nova;
		font-size: 10px;
		line-height: 11px;
		color: #999999;
	}
}

.room-top {
	display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: wrap;
}

.room-advantages {
	display: flex;
  align-items: center;
  flex-flow: wrap;
  flex-grow: 1;
  justify-content: center;
}

.room-parameters {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 0 0 40px 0;
	position: relative;
	background: #2C2F3C;
	&__row {
		padding: 15px 30px 30px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__label {
		color: #FFFFFF;
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
		line-height: 16px;
		font-family: 'Proxima Nova';
	}
	&:after {
		content: '';
		bottom: 0;
		position: absolute;
		display: block;
		width: 100%;
		height: 40px;
		border-radius: 10px;
		transform: matrix(1, 0, 0, -1, 0, 0);
		background: radial-gradient(50.07% 100% at 50% 100%, #22242F 0%, rgba(34, 36, 47, 0) 100%);
	}
}

.room-scores {
	padding: 24px 28px;
  background: #2C2F3C;
  border-radius: 10px;
  &__label {
		&-wrap {
			display: flex;
			justify-content: space-between;
		}
		margin-bottom: 16px;
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 12px;
		line-height: 20px;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: #999999;
  }
  &__info {
		cursor: pointer;
		margin-bottom: 16px;
		font-family: 'Proxima Nova';
		font-size: 14px;
		line-height: 16px;
		color: #008BE2;
		border-bottom: 1px solid #008be24d;
		text-decoration: none;
		&:hover,
		&:active,
		&:focus {
			color: #008BE2;
			text-decoration: none;
		}
  }
  &-rating {
		margin-bottom: 23px;
		padding-bottom: 16px;
		border-bottom: 1px solid #343848;
		display: flex;
		justify-content: space-between;
		&__place {
			margin-right: 12px;
			padding: 1px 8px;
			border: 1px solid #FEB83C;
			border-radius: 2px;
			font-family: 'Proxima Nova Sb';
			font-size: 18px;
			line-height: 22px;
			letter-spacing: 1px;
			color: #FEB83C;
		}

		&__label {
			margin-right: auto;
			font-family: 'Proxima Nova';
			font-size: 10px;
			line-height: 12px;
			letter-spacing: 1px;
			text-transform: uppercase;
			color: #E5E5E5;
		}
  }
}

.room-features {
	padding: 0 0 35px 0;
	&-divider {
		margin: 30px 0 20px 0;
		position: relative;
		height: 1px;
		width: 100%;
		display: block;
		background: #343848;
		&__text {
			padding: 0 20px;
			left: 50%;
			position: absolute;
			color: #f1efef80;
			text-align: center;
			font-size: 14px;
			line-height: 16px;
			font-family: 'Proxima Nova Sb';
			background: #2C2F3C;
			transform: translateX(-50%) translateY(-50%);
		}
	}
}

.room-feature-list {
	margin: 0;
	padding: 0 30px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	list-style: none;
	min-height: 34px;
}

.room-actions__wrap {
	display: flex;
}
</style>