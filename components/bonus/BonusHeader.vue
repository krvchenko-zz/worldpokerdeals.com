<template>
	<div class="bonus-header">
		<div class="bonus-header__wrap">
			<div class="row">
				<div class="col">
					<div class="bonus__summary">
						<div v-if="promotion.exclusive" class="bonus__exclusive">
							<svg-icon icon="bonus-exclusive" />
						</div>

						<div
							class="bonus__category"
							:style="{
								color: promotion.category.label_color,
							}"
						>
							{{ promotion.category.title }}
						</div>

						<h1 class="bonus__title">{{ promotion.heading }}</h1>
						<div class="bonus-header__row">
							<div class="bonus-header__col">
								<div class="bonus-header__label">{{ $t('status') }}</div>
								<div class="bonus-header__value">
									<span
										:class="[
											'bonus__status',
											promotion.active && 'bonus__status_active',
										]"
									>
										<template v-if="promotion.active">{{
											$t('active')
										}}</template>
										<template v-else>{{ $t('inactive') }}</template>
									</span>
									<span class="bonus__last-update">{{
										$t('last_check_date', {
											date: dateFormat(promotion.updated_at),
										})
									}}</span>
								</div>
							</div>

							<div class="bonus-header__col bonus-header__col_max">
								<div :class="['bonus__max']">
									<div class="bonus-header__label">{{ $t('max_bonus') }}</div>
									<div class="bonus-header__value">
										{{ promotion.max_bonus_currency.symbol
										}}{{ promotion.max_bonus }}
									</div>
								</div>
							</div>

							<div class="bonus-header__col">
								<span
									:class="['bonus__code', codeHovered && 'bonus__code_hover']"
									@mouseover="codeHovered = true"
									@mouseleave="codeHovered = false"
								>
									<span
										:class="[
											'bonus__code-label',
											codeHovered && 'bonus__code-label_hover',
										]"
										>{{ $t('bonus_code') }}</span
									>
									<span class="bonus__code-value">{{ promotion.code }}</span>
								</span>
							</div>
						</div>
						<div class="bonus-header__row">
							<div class="bonus-header__col">
								<div class="bonus__deposit">
									<div class="bonus-header__label">{{ $t('deposit') }}</div>
									<div class="bonus-header__value">
										+{{ promotion.deposit_bonus }}%
									</div>
								</div>
							</div>

							<div class="bonus-header__col">
								<div class="bonus__cashback">
									<div class="bonus-header__label">
										{{ $t('cashback_value') }}
									</div>
									<div class="bonus-header__value">
										{{ promotion.cashback_value }}%
									</div>
								</div>
							</div>

							<div class="bonus-header__col">
								<div class="bonus__min-deposit">
									<div class="bonus-header__label">{{ $t('min_deposit') }}</div>
									<div :class="['bonus-header__value']">
										{{ promotion.min_deposit_currency.symbol
										}}{{ promotion.min_deposit }}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="bonus__geo">
						<span
							:class="{
								bonus__avaliable: true,
								[`bonus__avaliable_yes`]: !promotion.room.restricted,
								[`bonus__avaliable_no`]: promotion.room.restricted,
							}"
						>
							<svg-icon
								class="bonus__geo-icon"
								:width="16"
								:height="16"
								:icon="country.code"
								prefix="flags/"
							/><template v-if="promotion.room.restricted">{{
								$t('room_geo_restricted', { country: country.from })
							}}</template
							><template v-else>{{
								$t('room_geo_allowed', { country: country.from })
							}}</template>
						</span>
					</div>

					<div class="bonus__actions">
						<div class="row">
							<div class="col">
								<room-action-button
									class="btn-block"
									:slug="promotion.room.slug"
									:icon="true"
									type="download"
									:label="$t('get_bonus')"
								/>
							</div>
							<div class="col">
								<room-action-button
									class="btn-block"
									:slug="promotion.room.slug"
									:icon="true"
									type="contacts"
									:label="$t('manager_chat')"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-auto">
					<bonus-room
						:id="promotion.room.id"
						:title="promotion.room.title"
						:slug="promotion.room.slug"
						:rating="promotion.room.rating"
						:review="promotion.room.review"
						:rates="promotion.room.rates"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'BonusHeader',

		components: {},

		props: {},

		data: () => ({
			codeHovered: false,
		}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				promotion: 'promotions/promotion',
			}),
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$ico-bonus-status: url('~assets/i/ico-bonus-status.svg?data');
	$ico-scissors: url('~assets/i/promotion/ico-scissors.svg?data');

	.bonus-header {
		z-index: 2;
		position: relative;
		padding: 32px 28px;
		margin: 0 -28px 44px -28px;
		background: radial-gradient(
			179.3% 811.91% at 1.32% 97.16%,
			#f7f7f7 20.31%,
			#a1a7ac 100%
		);
		box-shadow: 0px -20px 50px rgba(0, 0, 0, 0.25);
		border-radius: 16px;
		&__row {
			justify-content: space-between;
			align-items: baseline;
			display: flex;
			margin-bottom: 16px;
			&:last-child {
				margin: 0;
			}
		}

		&__col {
			margin-right: 70px;
			width: calc(100% / 3);
			&:last-child {
				margin-right: 0;
			}
			&_max {
				padding: 12px 0;
				// margin-top: -24px;
			}
		}

		&__label {
			margin-bottom: 4px;
			font-family: 'Proxima Nova Sb';
			font-size: 12px;
			line-height: 14px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #777777;
		}

		&__value {
			font-family: 'Proxima Nova Th';
			font-size: 18px;
			line-height: 20px;
			color: #333333;
		}
	}

	.bonus {
		&__summary {
			position: relative;
			margin-bottom: 28px;
		}

		&__exclusive {
			position: absolute;
			right: 0;
			top: -4px;
		}
		&__category {
			margin-bottom: 8px;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			letter-spacing: 1px;
			text-transform: uppercase;
		}

		&__title {
			margin-bottom: 12px;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #222222;
		}

		&__status {
			padding-left: 24px;
			margin-bottom: 4px;
			display: block;
			background: $ico-bonus-status no-repeat left center;
		}

		&__last-update {
			display: block;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 16px;
			color: #999999;
		}

		&__max {
			position: relative;
			padding: 12px 20px;
			background: #ffd809;
			border-radius: 8px;
			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 61px;
				height: 12px;
				display: block;
				background: #ffc908;
			}

			&:before {
				right: 10px;
				top: -12px;
				clip-path: polygon(0 0, 10% 100%, 100% 100%);
			}

			&:after {
				left: 10px;
				bottom: -12px;
				clip-path: polygon(0 0, 100% 100%, 90% 0);
			}
		}

		&__code {
			position: relative;
			cursor: pointer;
			display: block;
			min-width: 130px;
			padding: 11px 20px;
			white-space: nowrap;
			background: linear-gradient(0deg, #f6f6f6, #f6f6f6),
				radial-gradient(
					179.3% 742.81% at 97.16% 5.47%,
					#f7f7f7 20.31%,
					#cccccc 100%
				);
			border-radius: 8px;
			border: 1px dashed rgba(119, 119, 119, 0.5);
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&_hover {
				border-color: #008be2;

				&:before {
					content: '';
					top: -12px;
					left: 50%;
					margin-left: -9px;
					position: absolute;
					width: 18px;
					height: 12px;
					display: block;
					background: $ico-scissors no-repeat center;
				}
			}

			&-label {
				margin-bottom: 4px;
				display: block;
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 14px;
				letter-spacing: 0.5px;
				text-transform: uppercase;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #777777;
				transition: background 0.1s ease, border-color 0.1s ease,
					color 0.1s ease;
				&_hover {
					color: #008be2;
				}
			}

			&-value {
				display: block;
				font-family: 'Proxima Nova Th';
				font-size: 18px;
				line-height: 20px;
				letter-spacing: 0.5px;
				color: #777777;
				text-transform: uppercase;
			}
		}

		&__geo {
			margin-bottom: 16px;
			&-icon {
				margin-right: 8px;
			}
		}

		&__avaliable {
			display: flex;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			background-repeat: no-repeat;
			background-size: 16px;
			&_yes {
				color: #777777;
			}
			&_no {
				color: #eb5757;
			}
		}

		&__cashback {
			padding: 0 20px;
		}

		&__min-deposit {
			padding: 0 20px;
		}
	}
</style>
