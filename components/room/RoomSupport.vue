<template>
	<div class="room-params">
		<div class="room-params__label room-params__label_support">
			{{ $t('support') }}
		</div>
		<div class="room-params__list">
			<div class="room-param room-param_languages">
				<span class="room-param__label">{{ $t('language') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value room-param__value_languages">
					<svg-icon
						v-for="(item, index) in languages"
						:key="index"
						class="room-param__language"
						:icon="item.code.toUpperCase()"
						prefix="flags/"
						width="20"
						height="20"
					/>
				</div>
			</div>

			<div class="room-param room-param_email">
				<span class="room-param__label">{{ $t('email') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value">
					<template v-if="email === 'n/a' || email === ''">n/a</template>
					<a v-else :href="`mailto:${email}`" class="room-param__emial">{{
						email
					}}</a>
				</div>
			</div>

			<div class="room-param room-param_phone">
				<span class="room-param__label">{{ $t('phone') }}</span>
				<span class="room-param__sep"></span>
				<div class="room-param__value room-param__value_phone">
					<span class="room-param__phone">{{ phone }}</span>
				</div>
			</div>

			<div class="room-param room-param_trackers">
				<span class="room-param__label">{{ $t('live_chat') }}</span>
				<span class="room-param__sep"></span>
				<span class="room-param__value">
					<span
						:class="{
							'room-param__check': true,
							['room-param__check_yes']: livechat,
							['room-param__check_no']: !livechat,
						}"
					></span>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'RoomSupport',

		components: {},

		props: {
			email: {
				type: String,
				default: 'n/a',
			},

			phone: {
				type: String,
				default: '',
			},

			livechat: {
				type: [Boolean, Number],
				default: false,
			},

			languages: {
				type: Array,
				default() {
					return []
				},
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-livechat: url('~assets/i/room/ico-livechat.svg?data');
	$ico-phone: url('~assets/i/room/ico-phone.svg?data');
	$ico-email: url('~assets/i/room/ico-email.svg?data');
	$ico-languages: url('~assets/i/room/ico-languages.svg?data');
	$ico-room-params-support: url('~assets/i/room/ico-room-params-support.svg?data');

	.room-params {
		&__label {
			&_support {
				&:after {
					background: $ico-room-params-support;
				}
			}
		}
	}
	.room-param {
		&__value {
			&_languages {
				display: flex;
			}
		}
		&__language {
			margin-left: 8px;
			border-radius: 50%;
			&:first-child {
				margin: 0;
			}
		}
		&_email {
			&:before {
				background-image: $ico-email;
			}
		}

		&_phone {
			&:before {
				background-image: $ico-phone;
			}
		}

		&_languages {
			&:before {
				background-image: $ico-languages;
			}
		}

		&_livechat {
			&:before {
				background-image: $ico-livechat;
			}
		}
	}
</style>
