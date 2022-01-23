<template>
	<header id="room-header" class="room-header">
		<!-- Network -->
		<div class="room-network">
			<svg-icon
				class="room-network__icon"
				:icon="room.network.url"
				:width="20"
				:height="20"
				rounded
				:image="true"
			/>
			<span class="room-network__title">{{ room.network.title }}</span>
		</div>

		<div class="room-top">
			<div class="room-logo">
				<img
					decoding="async"
					:src="logo"
					:alt="room.image.alt || `${room.title} logo`"
					loading="lazy"
					class="room-logo__image"
				/>
			</div>

			<div v-if="!room.blacklist && !room.closed" class="room-advantages">
				<room-advantage
					:label="$t('bonus')"
					:value="room.top_bonus ? room.top_bonus.title : false"
					color="#eb5757"
				/>
				<room-advantage
					:label="$t('rakeback')"
					:value="room.rakeback"
					color="#008be2"
				/>

				<room-advantage
					:label="$t('promotions')"
					:value="room.promotions_count"
					color="#FFFFFF"
				/>
			</div>

			<div
				v-else-if="room.blacklist"
				class="room-blacklist"
				v-html="$t('room_blacklisted', { room: room.title })"
			></div>

			<div
				v-else-if="room.closed"
				class="room-blacklist"
				v-html="$t('room_closed', { room: room.title })"
			></div>

			<div class="room-scores-rating">
				<span
					v-if="!room.blacklist && !room.closed"
					class="room-scores-rating__place"
					>{{ room.rate }}</span
				>
				<span
					v-if="!room.blacklist && !room.closed"
					class="room-scores-rating__label"
					v-html="$t('rating_position')"
				>
				</span>
				<span
					v-else
					class="room-scores-rating__label"
					:style="{ color: '#DB1414', fontWeight: 'bold' }"
					v-html="$t('rating_excluded')"
				>
				</span>
				<room-rating
					:value="room.rating"
					:inactive="room.blacklist || room.closed"
				/>
			</div>
		</div>

		<div class="room-header__details-wrapper">
			<!-- Details -->
			<div class="room-details">
				<div class="room-details__heading">{{ $t('characteristics') }}</div>

				<!-- 				<div class="room-detail">
					<div class="room-detail__label">{{ $t('reviews_count') }}</div>
					<div class="room-detail__value reviews" @click="handleReviewsClick">
						<span class="room-detail__reviews-count">{{
							room.reviews_count
						}}</span>
						<span class="room-detail__reviews-sep"></span>
						<span class="room-detail__reviews-val-label">{{
							$t('rating')
						}}</span>
						<span class="room-detail__reviews-val"
							><span class="room-detail__reviews-current">{{
								room.reviews_rate
							}}</span
							><span class="room-detail__reviews-max">/5</span></span
						>
					</div>
				</div> -->

				<div v-if="room.types.length" class="room-detail">
					<div class="room-detail__label">{{ $t('room_type') }}</div>
					<div class="room-detail__value">
						<span v-for="(item, index) in room.types" :key="index"
							>{{ item.title
							}}<template v-if="index != Object.keys(room.types).length - 1"
								>,
							</template>
						</span>
					</div>
				</div>

				<div class="room-detail">
					<div class="room-detail__label">{{ $t('license') }}</div>
					<div class="room-detail__value">
						<template v-if="room.licenses.length">
							<span v-for="(item, index) in room.licenses" :key="index">
								<span class="room-detail__license">
									<svg-icon
										:icon="item.icon"
										:image="true"
										prefix="flags/"
										:width="20"
										:height="20"
									/>
									<span>{{ item.title }}</span>
								</span>
								<template v-if="index != Object.keys(room.licenses).length - 1"
									>,
								</template>
							</span>
						</template>
						<template v-else>{{ $t('not_available') }}</template>
					</div>
				</div>

				<div v-if="room.payment_methods.length" class="room-detail">
					<div class="room-detail__label">{{ $t('payments') }}</div>
					<div class="room-detail__value">
						<ul class="room-payment-list">
							<li
								v-for="(item, index) in room.payment_methods"
								v-if="index < 3"
								:key="item.id"
								class="room-payment"
								:title="item.title"
							>
								<svg-icon
									:icon="`${item.slug}-white`"
									:remove-clip-path="true"
									:image="true"
								/>
							</li>
							<template v-if="room.payment_methods.length > 3">
								<li
									v-for="(item, index) in room.payment_methods"
									v-if="index > 2 && showPayments"
									:key="item.id"
									class="room-payment"
									:title="item.title"
								>
									<svg-icon
										:icon="`${item.slug}-white`"
										:remove-clip-path="true"
										:image="true"
									/>
								</li>
								<li
									key="more"
									:class="[
										'room-payment__toggle',
										showPayments && 'room-payment__toggle_hide',
									]"
									@click="showPayments = !showPayments"
								>
									<span>+{{ room.payment_methods.length - 3 }}</span>
								</li>
							</template>
						</ul>
					</div>
				</div>

				<div v-if="room.platforms.length" class="room-detail">
					<div class="room-detail__label">{{ $t('devices') }}</div>
					<div class="room-detail__value">
						<ul class="room-platform-list">
							<transition-group name="fade">
								<li
									v-for="item in room.platforms"
									:key="item.icon"
									:title="item.title"
									:class="{
										'room-platform': true,
									}"
								>
									<svg-icon
										opacity="1"
										:width="20"
										:height="20"
										:icon="item.icon"
										:image="true"
									/>
								</li>
							</transition-group>
						</ul>
					</div>
				</div>

				<div class="room-detail">
					<div class="room-detail__label">{{ $t('localization') }}</div>
					<div class="room-detail__value room-detail__value_locale">
						<svg-icon
							:class="[
								'room-header__geo',
								room.restricted && 'room-header__geo_disabled',
							]"
							width="20px"
							height="20px"
							:icon="country.code"
							:image="true"
							prefix="flags/"
						/>
						<span v-if="!room.restricted" class="room-header__locale">{{
							country.title
						}}</span>
					</div>
				</div>
			</div>

			<div
				:class="['room-summary', room.blacklist && 'room-summary_blacklist']"
			>
				<div class="room-summary__label">{{ $t('key_facts') }}</div>
				<div class="room-summary__list" v-html="room.description_short"></div>
			</div>
		</div>

		<div class="room-scores">
			<div class="room-scores__label-wrap">
				<div class="room-scores__label">{{ $t('our_ratings') }}</div>
				<span class="room-scores__info" @click="handleRatesModal">{{
					$t('how_we_rate.title')
				}}</span>
			</div>

			<div class="room-scores__list">
				<room-score-item
					v-for="item in room.rates"
					:id="item.id"
					:key="item.id"
					:label="item.title"
					:value="item.pivot.value"
					:inactive="room.blacklist"
				/>
			</div>
		</div>

		<div class="room-header-actions">
			<room-action-button
				:slug="room.slug"
				:url="room.url"
				:icon="true"
				:disabled="
					!room.available ||
						room.blacklist ||
						room.closed
				"
				class="room-header-actions__download"
				type="download"
				:label="$t('room_download')"
			/>

			<room-action-button
				:slug="room.slug"
				:icon="true"
				type="contacts"
				:label="
					room.types.some(type => type.id === 3)
						? $t('club_access')
						: $t('manager_chat')
				"
				class="room-header-actions__contacts"
			/>

			<!-- 			<room-action-button
				:slug="room.slug"
				type="review"
				:label="$t('feedback')"
				@click="handleReviewsClick"
			/> -->

			<room-action-button
				v-if="!room.blacklist"
				:disabled="room.closed || !room.available"
				:slug="room.slug"
				:title="room.title"
				type="connection"
				:label="$t('tag_account')"
			/>

			<room-action-button
				v-if="room.blacklist"
				:icon="false"
				:title="room.title"
				type="blacklist"
				:label="$t('room_representative')"
			/>
		</div>

		<div v-if="room.restricted || !room.available" class="room-restrictions">
			<span
				v-if="room.restricted && room.available"
				class="room-restrictions__geo"
				>{{ $t('room_geo_restricted', { country: country.from }) }}
			</span>
			<span v-if="!room.available" class="room-restrictions__unavailable">{{
				$t('room_unavailable')
			}}</span>
		</div>

		<div
			v-if="
				(!room.available || room.blacklist || room.closed) &&
					recomended.length
			"
			:class="[
				'rooms-recomended',
				room.blacklist && 'rooms-recomended_blacklist',
				room.closed && 'rooms-recomended_closed',
			]"
		>
			<div class="rooms-recomended__title">
				{{ $t('recommended_poker_rooms') }}
			</div>
			<div class="rooms-recomended__list">
				<room-recomended-item
					v-for="(item, index) in recomended"
					:id="item.id"
					:key="index"
					:title="item.title"
					:slug="item.slug"
					:url="item.url"
					:available="item.available"
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

		<nav v-if="room.tabs.length && room.tabs.length > 1" class="room-nav">
			<tab-list>
				<tab-item
					v-for="(item, index) in room.tabs"
					:key="index"
					:name="item.name"
					:params="{
						parent: 'rakeback-deals',
						child: item.slug,
					}"
				>
				</tab-item>
			</tab-list>
		</nav>
	</header>
</template>
<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'RoomHeader',

		components: {},

		props: {},

		data: () => ({
			showPayments: false,
		}),

		computed: {
			...mapGetters({
				room: 'rooms/room',
				user: 'auth/user',
				geo: 'location/code',
				country: 'location/country',
				recomended: 'rooms/topList',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},

			logo() {
				return `${this.mediaUrl}/room-logo/${this.room.image.filename}`
			},
		},

		watch: {},

		methods: {
			handleRatesModal() {
				eventBus.$emit('ratesModal:show', true)
			},

			handleReviewsClick() {
				let el = document.querySelector('#reviews')
				if (el) {
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset
					window.scrollTo({ top: offset, behavior: 'smooth' })
				}
			},
		},
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
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-areas:
			'network .' 'header header' 'details scores' 'buttons buttons' 'restrictions restrictions'
			'recommended-rooms recommended-rooms' 'nav nav';
		margin-bottom: 40px;
		position: relative;
		padding: 0px 28px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background: linear-gradient(0deg, #20222c, #2b2e3b 67.71%);

		&__buttons {
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

		&__details-wrapper {
			grid-area: details;
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-self: start;
			margin-top: 32px;
		}
	}

	.room-nav {
		grid-area: nav;
		@include mq('tablet') {
			margin-top: -2px;
		}
	}

	.room-header-actions {
		grid-area: buttons;
		margin: 28px 0 36px;
		display: flex;
		.btn-room-action {
			margin-right: 28px;
			max-width: 280px;
		}
	}

	.room-restrictions {
		grid-area: restrictions;
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
			color: #ff4151;
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
			color: #ffd764;
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
		grid-area: advantages-or-blacklist;
		max-width: 560px;
		position: relative;
		margin-right: 28px;
		padding: 16px 20px 16px 76px;
		font-family: Proxima Nova;
		font-size: 15px;
		line-height: 20px;
		color: #e5e5e5;
		background: #343848;
		box-shadow: 0px 8px 30px rgba(33, 35, 45, 0.3);
		border-radius: 4px;
		a {
			color: #e5e5e5;
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
		grid-area: recommended-rooms;
		margin-bottom: 36px;
		padding: 24px;
		border-radius: 4px;
		width: 100%;
		background: linear-gradient(0deg, #e9e9e9, #e9e9e9),
			linear-gradient(270deg, #2b2e3b 47.41%, #20222c 100%);
		&_blacklist {
			background: #ffb44c;
		}
		&_closed {
			background: #ffb44c;
		}
		&__list {
			width: 100%;
			display: grid;
			grid-auto-columns: 1fr;
			grid-auto-flow: column;
			overflow-x: scroll;
			gap: 16px;
			@include hide-scroll();
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
		grid-area: top-logo;
		align-self: center;
		max-width: 210px;
		&__image {
			max-width: 100%;
			width: auto;
			height: 60px;
			display: block;
		}
	}

	.room-details {
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
			color: #e5e5e5;
			display: flex;
			flex: 0 0 130px;

			&::after {
				content: '';
				height: 20px;
				background-image: linear-gradient(
					to right,
					#555555 40%,
					rgba(255, 255, 255, 0) 20%
				);
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
				color: #cccccc;
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
			color: #70ac30;
		}

		&__reviews-sep {
			margin: 0 12px;
			height: 20px;
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
			color: #ffffff;
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
				color: #ffffff;
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
		grid-area: network;
		justify-self: start;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border: 1px solid #343848;
		border-top: 0;
		padding: 8px 10px;
		display: inline-block;
		font-size: 0;
		margin-bottom: 12px;

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
		grid-area: header;
		display: grid;
		grid-template-columns: 3fr 5fr 4fr;
		grid-template-areas: 'top-logo advantages-or-blacklist top-rating';
		align-items: end;
	}

	.room-advantages {
		grid-area: advantages-or-blacklist;
		display: flex;
		align-items: center;
		flex-flow: wrap;
		flex-grow: 1;
		justify-content: flex-start;
	}

	.room-parameters {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 0 0 40px 0;
		position: relative;
		background: #2c2f3c;
		&__row {
			padding: 15px 30px 30px 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__label {
			color: #ffffff;
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
			background: radial-gradient(
				50.07% 100% at 50% 100%,
				#22242f 0%,
				rgba(34, 36, 47, 0) 100%
			);
		}
	}

	.room-scores {
		grid-area: scores;
		padding: 24px 28px;
		background: #2c2f3c;
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
			color: #008be2;
			border-bottom: 1px solid #008be24d;
			text-decoration: none;
			&:hover,
			&:active,
			&:focus {
				color: #008be2;
				text-decoration: none;
			}
		}
		&-rating {
			grid-area: top-rating;
			padding: 0 28px 16px 28px;
			border-bottom: 1px solid #343848;
			display: flex;
			justify-content: space-between;
			&__place {
				margin-right: 12px;
				padding: 1px 8px;
				border: 1px solid #feb83c;
				border-radius: 2px;
				font-family: 'Proxima Nova Sb';
				font-size: 18px;
				line-height: 22px;
				letter-spacing: 1px;
				color: #feb83c;
			}

			&__label {
				margin-right: auto;
				font-family: 'Proxima Nova';
				font-size: 10px;
				line-height: 12px;
				letter-spacing: 1px;
				text-transform: uppercase;
				color: #e5e5e5;
				white-space: nowrap;
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
				background: #2c2f3c;
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

	@include mq('desktop') {
		.room-header-actions {
			.btn-room-action {
				margin-right: 24px;
				max-width: 260px;
			}
		}
	}

	@include mq('laptop') {
		.room-header {
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'network .' 'header header' 'details details' 'scores scores' 'restrictions restrictions' 'buttons buttons' 'recommended-rooms recommended-rooms' 'nav nav';
			padding: 0 20px;
		}

		.room-top {
			grid-template-columns: 1fr 2fr;
			grid-template-areas: 'top-logo advantages-or-blacklist' 'top-rating top-rating';
		}

		.room-advantages {
			justify-self: end;
			flex-wrap: nowrap;
		}

		.room-scores-rating {
			margin-top: 28px;
			margin-bottom: 0;
			padding-left: 0;
			padding-right: 0;
		}

		.room-nav {
			margin-left: -20px;
			margin-right: -20px;
		}

		.room-blacklist {
			margin-right: 0;
		}

		.room-scores {
			margin-top: 20px;
			margin-left: -20px;
			margin-right: -20px;
			padding-left: 20px;
			padding-right: 20px;
			&__list {
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 28px;
			}
		}

		.room-header-actions {
			display: grid;
			justify-items: center;
			gap: 20px;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			.btn-room-action {
				margin-right: 0px;
				width: 100%;
				max-width: none;
			}
		}

		.rooms-recomended {
			width: 100vw;
			margin-left: -44px;
			&__list {
				grid-auto-columns: minmax(226px, 1fr);
				gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.room-header {
			grid-template-columns: 100%;
			grid-template-areas: 'network' 'header' 'details' 'scores' 'buttons' 'restrictions' 'recommended-rooms' 'nav';
			padding: 0 20px;
			margin: 0 -20px 0px;
			&__details-wrapper {
				grid-template-columns: 1fr;
				row-gap: 24px;
				justify-items: stretch;
			}
		}

		.room-summary {
			border-top: 1px solid #343848;
			border-left: none;
			padding: 0;
			padding-top: 24px;
		}

		.room-advantages {
			width: calc(100% + 20px);
			margin-right: -20px;
			overflow-x: scroll;
			@include hide-scroll();
		}

		.room-network {
			margin-bottom: 16px;
			margin: 0 auto 16px;
		}
		.room-top {
			grid-template-columns: 1fr;
			grid-template-areas: 'top-logo' 'top-rating' 'advantages-or-blacklist';
			justify-items: center;
			row-gap: 28px;
		}
		.room-scores-rating {
			padding: 0;
			margin-top: 0;
			border-bottom: none;
			padding-bottom: 0;
			justify-self: stretch;
		}
		.room-scores {
			&__list {
				display: block;
			}
		}
		.room-logo {
			max-width: 230px;
		}
		.room-header-actions {
			/* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); */
			grid-template-columns: 1fr;
			grid-template-areas:
				'download'
				'contacts'
				'connections';
			row-gap: 20px;
			&__download {
				grid-area: download;
			}
			&__contacts {
				grid-area: contacts;
			}
			&__connections {
				grid-area: connections;
			}

			.btn-room-action {
				max-width: 100%;
				padding: 12px;
			}
		}

		.room-blacklist {
			margin-left: -20px;
			margin-right: -20px;
		}

		.rooms-recomended {
			width: 100vw;
			margin-left: -20px;
			padding-right: 0;
			margin-bottom: 0;
			&__list {
				grid-auto-columns: minmax(288px, 1fr);
				gap: 16px;
			}
		}
	}
</style>
