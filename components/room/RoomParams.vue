<template>
	<div class="room-params">
		<div class="room-params__label">{{ $t('general_info') }}</div>
		<div class="room-params__list">
			<div class="room-param room-param_year">
				<span class="room-param__label">{{ $t('founded_in') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">{{ dateFormat(founded_at) }}</div>
			</div>

			<div class="room-param room-param_network">
				<span class="room-param__label">{{ $t('network') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<nuxt-link
						v-if="network.page && network.page.published"
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						:to="{
							name: 'index',
							params: {
								parent: network.page.parent
									? network.page.parent.slug
									: network.page.slug,
								child: network.page.parent ? network.page.slug : null,
							},
						}"
					>
						<a class="room-param__network" :href="href" @click="navigate">{{
							network.title
						}}</a>
					</nuxt-link>
					<template v-else>{{ network.title }}</template>
				</div>
			</div>

			<div class="room-param room-param_license">
				<span class="room-param__label">{{ $t('license') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<template v-if="licenses.length">
						<span v-for="(item, index) in licenses" :key="index">
							<span class="room-param__license">
								<svg-icon
									:icon="item.icon"
									:image="true"
									prefix="flags/"
									width="20px"
									height="20px"
								/>
								<span>{{ item.title }}</span>
							</span>
							<template v-if="index != Object.keys(licenses).length - 1"
								>,
							</template>
						</span>
					</template>
					<span
						v-if="!licenses.length"
						:class="{
							'room-param__check': true,
							['room-param__check_no']: true,
						}"
					></span>
				</div>
			</div>

			<div class="room-param room-param_cert">
				<span class="room-param__label">{{ $t('rng_check') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<template v-if="certificates.length">
						<span v-for="(item, index) in certificates" :key="index">{{
							item.title
						}}</span>
					</template>
					<span
						v-else
						:class="{
							'room-param__check': true,
							['room-param__check_no']: true,
						}"
					></span>
				</div>
			</div>

			<div class="room-param room-param_peak">
				<span class="room-param__label">{{ $t('players_peak') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<template v-if="players_peak">{{ players_peak }}</template>
					<span
						v-else
						:class="{
							'room-param__check': true,
							['room-param__check_no']: true,
						}"
					></span>
				</div>
			</div>

			<div class="room-param room-param_trackers">
				<span class="room-param__label">{{ $t('trackers') }}</span>
				<span class="room-param__sep"></span>
				<span class="room-param__value">
					<span
						:class="{
							'room-param__check': true,
							['room-param__check_yes']: tracker,
							['room-param__check_no']: !tracker,
						}"
					></span>
				</span>
			</div>

			<div class="room-param room-param_deposit">
				<span class="room-param__label">{{ $t('min_max_deposit') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					{{ min_deposit }}–{{ max_deposit }}$
				</div>
			</div>

			<div v-if="currencies.length" class="room-param room-param_currencies">
				<span class="room-param__label">{{ $t('account_currency') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<span v-for="(item, index) in currencies" :key="index"
						>{{ item.code
						}}<template v-if="index != Object.keys(currencies).length - 1"
							>,
						</template>
					</span>
				</div>
			</div>

			<div v-if="games.length" class="room-param room-param_games">
				<span class="room-param__label">{{ $t('games') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value room-param__value_games">
					<svg-icon
						v-for="(item, index) in games"
						:key="index"
						class="room-param__game"
						remove-clip-path
						:icon="`${item.icon_small}`"
						:width="30"
						:height="30"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'RoomParams',

		components: {},

		props: {
			tracker: {
				type: [Boolean, Number],
				default: false,
			},

			licenses: {
				type: Array,
				default() {
					return []
				},
			},

			network: {
				type: Object,
			},

			founded_at: {
				type: String,
				default: 'n/a',
			},

			certificates: {
				type: Array,
			},

			currencies: {
				type: Array,
			},

			games: {
				type: Array,
			},

			players_peak: {
				type: [String, Number],
				default: 'n/a',
			},

			min_deposit: {
				type: [String, Number],
				default: 0,
			},

			max_deposit: {
				type: [String, Number],
				default: 0,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			getCertSrc(filename) {
				return `/images/license-small/${filename}`
			},

			dateFormat(timestamp) {
				let date = new Date(timestamp),
					y = date.getFullYear()
				return y
			},
		},
	}
</script>

<style lang="scss">
	$ico-check: url('~assets/i/room/ico-rate-yes.svg?data');
	$ico-uncheck: url('~assets/i/room/ico-rate-no.svg?data');
	$ico-year: url('~assets/i/room/ico-year.svg?data');
	$ico-kyc: url('~assets/i/room/ico-kyc.svg?data');
	$ico-license: url('~assets/i/room/ico-license.svg?data');
	$ico-network: url('~assets/i/room/ico-network.svg?data');
	$ico-players-peak: url('~assets/i/room/ico-players-peak.svg?data');
	$ico-certificate: url('~assets/i/room/ico-certificate.svg?data');
	$ico-tracker: url('~assets/i/room/ico-trackers.svg?data');
	$ico-currency: url('~assets/i/room/ico-currency.svg?data');
	$ico-deposits: url('~assets/i/room/ico-deposits.svg?data');
	$ico-games: url('~assets/i/room/ico-games.svg?data');

	$ico-room-general-info: url('~assets/i/room/ico-room-general-info.svg?data');

	.room-param {
		width: 100%;
		margin-bottom: 16px;
		padding-left: 32px;
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
		position: relative;
		&:last-child {
			margin-bottom: 0;
		}
		&__label {
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			color: #555555;
		}

		&__sep {
			height: 1px;
			background-image: linear-gradient(
				to right,
				#aaaaaa 40%,
				rgba(255, 255, 255, 0) 20%
			);
			background-position: center;
			background-size: 3px 1px;
			background-repeat: repeat-x;
			flex-grow: 1;
			align-self: center;
			margin: 0 12px 0 16px;
		}

		&__value {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 20px;
			text-align: right;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #222222;
			white-space: nowrap;
			&_games {
				white-space: normal;
				margin: 0 -4px -4px;
			}
		}

		&__license {
			display: flex;
			svg {
				margin-right: 8px;
			}
		}

		&:before {
			content: '';
			top: 0;
			left: 0;
			position: absolute;
			width: 16px;
			height: 16px;
			display: block;
			background-repeat: no-repeat;
			background-position: center;
		}

		&_year {
			&:before {
				background-image: $ico-year;
			}
		}
		&_network {
			&:before {
				background-image: $ico-network;
			}
		}
		&_license {
			&:before {
				background-image: $ico-license;
			}
		}
		&_cert {
			&:before {
				background-image: $ico-certificate;
			}
		}
		&_peak {
			&:before {
				background-image: $ico-players-peak;
			}
		}
		&_trackers {
			&:before {
				background-image: $ico-tracker;
			}
		}
		&_deposit {
			&:before {
				background-image: $ico-deposits;
			}
		}
		&_currencies {
			&:before {
				background-image: $ico-currency;
			}
		}
		&_games {
			white-space: normal;
			&:before {
				background-image: $ico-games;
			}
		}

		&__game {
			margin-right: 4px;
			margin-bottom: 4px;
		}

		&__check {
			width: 16px;
			height: 16px;
			display: inline-block;
			position: relative;
			border-radius: 50%;
			&:before {
				content: '';
				margin: -4px 0 0 -4px;
				top: 50%;
				left: 50%;
				position: absolute;
				width: 8px;
				height: 8px;
				display: block;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}
			&_yes {
				background: #55bf4f;
				&:before {
					background-image: $ico-check;
				}
			}

			&_no {
				background: #f31112;
				&:before {
					background-image: $ico-uncheck;
				}
			}
		}
	}

	.room-params {
		margin: 40px 0;
		border-radius: 4px;
		overflow: hidden;
		background: #2e3141;
		box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);

		&__label {
			border: 1px solid #2e3141;
			position: relative;
			padding: 20px 24px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 18px;
			line-height: 24px;
			letter-spacing: -0.2px;
			color: #ffffff;
			background: #2e3141;

			&:after {
				right: 20px;
				top: 12px;
				position: absolute;
				content: '';
				width: 40px;
				height: 40px;
				background: $ico-room-general-info;
			}
		}

		&__list {
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			border: 1px solid #e9e9e9;
			background: #fafafa;
			padding: 20px;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:hover,
			&:focus {
				background: #ffffff;
			}
		}
	}
</style>
