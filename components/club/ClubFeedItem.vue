<template>
	<div :class="['club-item']">
		<div
			:class="['club-item__img-wrap']"
			:style="{ backgroundColor: background }"
		>
			<img
				:class="['club-item__img']"
				decoding="async"
				loading="lazy"
				:src="img"
				:alt="image.alt || `${title} logo`"
			/>
		</div>

		<div :class="['club-item__wrap']">
			<div class="club-item__col">
				<rating class="club-item__rating" :value="rating" />
				<div class="club-item__title">{{ title }}</div>
				<div class="club-item__union">{{ union }}</div>

				<div class="club-item__features">
					<svg-icon
						v-for="(item, index) in features.filter((item, i) => {
							return i < 4
						})"
						:key="index"
						class="club-item__feature"
						:icon="`${item.icon_small}`"
						:width="24"
						:height="24"
					/>

					<svg-icon
						v-for="(item, index) in features.filter((item, i) => {
							return i >= 4
						})"
						v-if="toggled"
						:key="index"
						class="club-item__feature"
						:icon="`${item.icon_small}`"
						:width="24"
						:height="24"
					/>

					<div
						v-if="features.length > 4"
						:class="['club-item__toggle', toggled && 'club-item__toggle_hide']"
						@click="toggled = !toggled"
					>
						<template v-if="!toggled">+{{ features.length - 4 }}</template>
						<template v-else>-{{ features.length - 4 }}</template>
					</div>
				</div>
			</div>

			<div class="club-item__col">
				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('club_id') }}</span>
					<span
						class="club-item__prop club-item__prop_id"
						@click="handleCopy">
							{{ club_id }}
							<transition name="fade">
								<span class="club-item-tooltip" v-if="copied">
									<span class="club-item-tooltip__text">Copied to the clipboard!</span>
									<span class="club-item-tooltip__arrow"></span>
								</span>
							</transition>
						</span>
				</div>
				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('agent_id') }}</span>
					<span class="club-item__prop">{{ agent_id }}</span>
				</div>
				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('guarantee') }}</span>
					<span class="club-item__prop">{{ warranty }}</span>
				</div>
				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('country') }}</span>
					<span class="club-item__prop">
						<svg-icon
							prefix="flags/"
							:icon="country.code"
							:width="16"
							height="16"
						/>
					</span>
				</div>
			</div>

			<div class="club-item__col">
				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('rakeback') }}</span>
					<span class="club-item__prop">{{ rakeback }}</span>
				</div>

				<div class="club-item__prop-wrap">
					<span class="club-item__prop-label">{{ $t('tables') }}</span>
					<span class="club-item__prop">{{ tables_count }}</span>
				</div>

				<div class="club-item__actions">
					<a class="btn btn-block btn-border club-item__join" href="#">{{
						$t('join_club')
					}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Rating from '~/components/Rating'

	export default {
		name: 'ClubFeedItem',

		components: {
			Rating,
		},

		props: {
			title: {
				type: String,
				required: true,
			},

			rating: {
				type: [String, Number],
			},

			background: {
				type: String,
				required: true,
			},

			image: {
				type: Object,
			},

			warranty: {
				type: String,
			},

			club_id: {
				type: String,
			},

			agent_id: {
				type: String,
			},

			rakeback: {
				type: [String, Number],
			},

			tables_count: {
				type: String,
			},

			union: {
				type: String,
			},

			features: {
				type: Array,
			},

			country: {
				type: Object,
			},
		},

		data: () => ({
			toggled: false,
			copied: false,
		}),

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				geo: 'location/geo',
			}),

			img() {
				return `${this.mediaUrl}/club-small/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		methods: {
			handleCopy() {
				navigator.clipboard.writeText(this.club_id)
				this.showTooltip()
			},

			showTooltip() {
				this.copied = true
				setTimeout(() => {
					this.copied = false
				}, 600)
			},
		},
	}
</script>

<style lang="scss">
	$ico-copy: url('~assets/i/ico-copy.svg?data');
	$ico-front-club-toggle: url('~assets/i/ico-front-club-toggle.svg?data');
	.club-item {
		margin-bottom: 20px;
		border-radius: 4px;
		// overflow: hidden;
		display: flex;

		&-tooltip {
			display: block;
			position: absolute;
			will-change: transform;
			top: -35px;
			left: 50%;
			background-color: rgba(0, 0, 0, .7);
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			max-width: 320px;
			padding: 6px 10px;
			border-radius: 3px;
			z-index: 100;
			-webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
			box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
			transform: translateX(-50%);
			&__text {
				display: block;
				color: #fff;
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 12px;
				text-align: center;
				white-space: nowrap;
			}
			&__arrow {
				left: 50%;
				transform: translateX(-50%);
				content: "";
				width: 0;
				height: 0;
				border-style: solid;
				position: absolute;
				border-width: 5px 5px 0 5px;
				border-top-color: rgba(0, 0, 0, .7);
				border-bottom-color: transparent!important;
				border-left-color: transparent!important;
				border-right-color: transparent!important;
				bottom: -5px;
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&__img {
			margin: 0 !important;
			flex: 0 0 80px;
			align-items: center;
			justify-content: center;
			&-wrap {
				flex: 0 0 110px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		&__wrap {
			padding: 20px;
			border: 1px solid #e9e9e9;
			border-left: 0;
			flex-grow: 1;
			background: #fafafa;
			display: flex;
		}

		&__col {
			width: calc(100% / 3);
			padding: 0;
			border-right: 1px solid #e9e9e9;
			&:last-child {
				border: 0;
			}
			&:nth-child(1) {
				padding: 0 20px 0 0;
			}
			&:nth-child(2) {
				box-sizing: content-box;
				padding: 0 20px;
			}
			&:nth-child(3) {
				padding: 0 0 0 20px;
			}
		}

		&__prop {
			position: relative;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #243238;
			// width: 50%;
			&-label {
				width: 50%;
				font-family: 'Proxima Nova';
				font-size: 14px;
				line-height: 16px;
				color: #555555;
			}
			&-wrap {
				margin-bottom: 8px;
				display: flex;
				// justify-content: space-between;
				align-items: center;
			}
			&_id {
				padding: 4px 8px 4px 25px;
				margin: -4px 0px;
				cursor: pointer;
				position: relative;
				background: rgba(0, 139, 226, 0.1) $ico-copy no-repeat 8px center;
				border-radius: 50px;
			}
		}

		&__rating {
			margin-top: -3px;
			margin-bottom: 9px;
			justify-content: start;
			.rating__stars {
				margin: 0 10px 0 0;
			}
			.rating__digit {
				margin: 3px 0 0 0;
			}
		}

		&__title {
			margin-bottom: 4px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 18px;
			line-height: 20px;
			letter-spacing: -0.1px;
			color: #222222;
		}

		&__union {
			margin-bottom: 12px;
			font-family: 'Proxima Nova SB';
			font-size: 12px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #777777;
		}

		&__features {
			margin-bottom: -4px;
		}

		&__feature {
			margin: 0 4px 4px 0;
		}

		&__actions {
			margin-top: 24px;
		}

		&__join {
			border-color: #008be280;
			font-size: 14px;
			line-height: 14px;
			color: #3c9be0;
			&:active,
			&:hover,
			&:visited,
			&:link {
				color: #3c9be0;
			}
		}

		&__toggle {
			cursor: pointer;
			text-align: center;
			margin: 0 0 5px 0;
			width: 24px;
			height: 24px;
			display: inline-block;
			vertical-align: middle;
			border: 1px solid #bbbbbb;
			border-radius: 50%;
			background: #ffffff;
			font-family: 'Proxima Nova Sb';
			font-size: 11px;
			line-height: 24px;
			text-indent: -2px;
			color: #999999;
			transition: transform 0.1s ease;
			&_hide {
				transform: rotate(180deg);
				text-indent: -99999px;
				background: $ico-front-club-toggle no-repeat center;
			}
		}
	}

	@include mq('tablet') {
		.club-item {
			&__wrap {
				flex-direction: column;
			}
			&__prop {
				white-space: nowrap;
			}
			&__col {
				width: 100%;
				padding: 0;
				border-right: none;
				&:nth-child(1) {
					padding: 0;
					margin-bottom: 20px;
				}
				&:nth-child(2) {
					padding: 0;
					box-sizing: border-box;
				}
				&:nth-child(3) {
					padding: 0;
				}
			}
			&__prop-wrap {
				justify-content: space-between;
			}
			&__join {
				margin: 0 auto;
				max-width: 290px;
			}
		}
	}
</style>
