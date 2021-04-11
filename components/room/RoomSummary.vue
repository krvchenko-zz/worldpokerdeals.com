<template>
<div v-if="room" class="room-summary">

	<div class="room-summary__header">
		<div class="row align-items-center">
			<div class="col-6">
				<div class="room-logo">
					<img decoding="async" :src="logo" :alt="room.image.alt || `${room.title} logo`" loading="lazy" class="room-logo__image">
				</div>
			</div>
			<div class="col-6">				
				<div class="room-scores-rating">
					<span class="room-scores-rating__place">{{ room.rate }}</span>
					<span class="room-scores-rating__label">Место<br>в рейтинге</span>
					<room-rating :value="room.rating" />
				</div>
			</div>
		</div>
	</div>

	<div class="room-summary__body">
		<div class="row">
			<div class="col-6">
				<!-- Details -->
				<div class="room-details">
					<div class="room-details__heading">Характеристики</div>

					<div class="room-detail">
						<div class="room-detail__label">Отзывов</div>
						<div class="room-detail__value reviews">
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
						<div v-if="room.licenses.length" class="room-detail__value room-detail__value_licenses">
							<span class="room-detail__license" v-for="(item, index) in room.licenses" :key="index">
								<svg-icon :icon="item.icon" prefix="flags/" width="20" height="20" />
								<span>{{ item.title }}</span>
							</span>
						</div>
						<span v-else class="room-detail__value">Отсутствует</span>
					</div>

					<div v-if="room.payment_methods.length" class="room-detail">
						<div class="room-detail__label">Платежи</div>
						<div class="room-detail__value">
							<ul class="room-payment-list">
								<li v-if="index < 2" :key="item.id"
									v-for="(item, index) in room.payment_methods"
									class="room-payment"
									:title="item.title"
								>
									<svg-icon :icon="`${item.icon}-white`" :removeClipPath="true"/>
								</li>
								<template v-if="room.payment_methods.length > 2">
									<li v-if="index > 1 && showMorePayments"
										v-for="(item, index) in room.payment_methods" :key="item.id"
										class="room-payment"
										:title="item.title"
									>
										<svg-icon :icon="`${item.icon}-white`" :removeClipPath="true"/>
									</li>
									<li
										key="more"
										:class="['room-payment__toggle', showMorePayments && 'room-payment__toggle_hide']"
										@click="showMorePayments = !showMorePayments"
									>
										<span>+{{ room.payment_methods.length - 2 }}</span>
									</li>
								</template>
							</ul>
						</div>
					</div>

					<div v-if="room.platforms.length" class="room-detail">
						<div class="room-detail__label">Устройства</div>
						<div class="room-detail__value">
							<ul class="room-platform-list">
								<li v-for="item in room.platforms" :key="item.id"
									:title="item.title"
									:class="{
										'room-platform': true
									}">
									<svg-icon opacity="1" :icon="item.icon" />
								</li>
							</ul>
						</div>
					</div>

					<div class="room-detail">
						<div class="room-detail__label">Локализация</div>
						<div class="room-detail__value room-detail__value_locale">
							<svg-icon class="room-detail__geo" :width="20" :height="20" :icon="country.code" prefix="flags/" />
							<span class="room-detail__locale">{{ country.title }}</span>
						</div>
					</div>

				</div>
					<room-action-button
					  :style="{
						padding: '9px 24px',
						fontSize: '16px'
					  }"
						class="btn-block"
						:slug="room.slug"
						:icon="false"
						type="download"
						label="Перейти"
					/>
			</div>
			<div class="col-6">
				<div class="room-scores">

					<div class="room-scores__label-wrap">
						<div class="room-scores__label">Наши оценки</div>
						<span @click="handleRatesModal" class="room-scores__info">Как оцениваем</span>
					</div>

					<div class="room-scores__list">
						<room-score-item v-for="item in room.rates" :key="item.id"
							:id="item.id"
							:label="item.title"
							:value="item.value"
						/>
					</div>
				</div>

			  <room-action-button
				  :style="{
						padding: '7px 24px',
						fontSize: '16px'
				  }"
				  class="btn-block"
					:slug="room.review.slug"
					type="default"
					:label="`Обзор ${room.title}`"
			  />
			</div>
		</div>		
	</div>

</div>
</template>

<script>

import { mapGetters } from 'vuex'
import eventBus from '~/utils/event-bus'
import axios from 'axios'

export default {

	name: 'RoomSummary',

	components: {

	},

	props: {
		room: {
			type: Object
		}
	},

	data: () => ({
		showPayments: false,
		showPlatforms: false,
		showMorePayments: false,
	}),

	computed: {
		...mapGetters({
			user: 'auth/user',
			geo: 'location/code',
			country: 'location/country'
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
		}
	}
}
</script>

<style scoped lang="scss">
$ico-room-payment-arrow: url('~assets/i/room/ico-room-payment-arrow.svg?data');
$ico-check-small: url('~assets/i/ico-check-small.svg?data');

.room-summary {
	margin: 20px -28px 40px -28px;
	border-radius: 10px;
	overflow: hidden;
	&__header {
		padding: 30px 28px;
		background: linear-gradient(180deg, #20222C 0%, #2B2E3B 67.71%);
	}

	&__body {
		padding: 24px 28px 32px 28px;
		// background: radial-gradient(189.6% 133.3% at 57.43% 2.13%, #3A3E51 0%, #21232D 100%);
		background: radial-gradient(133.3% 189.6% at 57.43% 2.13%, #3A3E51 0%, #21232D 100%);
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
	margin-bottom: 32px;
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

	&__geo {
		margin-right: 8px;
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
		flex-grow: 1;
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
		&_licenses {
			margin-bottom: -12px;
		}
	}

	&__license {
		margin: 0 12px 12px 0;
		display: inline-flex;
		white-space: nowrap;
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

.room-scores {
	margin-bottom: 32px;
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
		// margin-bottom: 23px;
		// padding-bottom: 16px;
		// border-bottom: 1px solid #343848;
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
</style>