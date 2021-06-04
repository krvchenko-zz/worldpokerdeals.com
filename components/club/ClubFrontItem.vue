<template>
	<div :class="['club-front-item', toggled && 'club-front-item_toggled']">
		<div :class="['club-front-item__header']">
			<nuxt-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				prefetch
				:to="{
					name: 'index',
					params: {
						parent: 'rakeback-deals',
						child: room.review ? room.review.slug : null,
					},
				}"
			>
				<a class="club-front-item__room" :href="href" @click="navigate">
					<svg-icon
						class="club-front-item__room-icon"
						view-box="0 0 200 200"
						:icon="room.slug"
						:width="16"
						:height="16"
					/>
					{{ room.title }}
				</a>
			</nuxt-link>
			<div class="club-front-item__info">
				<rating class="club-front-item__rating" :value="room.rating" />
				<div class="club-front-item__title">{{ title }}</div>
				<div class="club-front-item__union">{{ union }}</div>
			</div>
			<div :class="['club-front-item__logo']">
				<img
					:class="['club-front-item__img']"
					decoding="async"
					loading="lazy"
					:src="img"
					:alt="image.alt || `${title} logo`"
				/>
			</div>
		</div>

		<div
			:class="[
				'club-front-item__wrap',
				toggled && 'club-front-item__wrap_toggled',
			]"
		>
			<div class="club-front-item__col">
				<div class="club-front-item__prop-wrap">
					<span class="club-front-item__prop-label">{{ $t('rakeback') }}</span>
					<span class="club-front-item__prop">{{ rakeback }}</span>
				</div>

				<div class="club-front-item__prop-wrap">
					<span class="club-front-item__prop-label">{{ $t('guarantee') }}</span>
					<span class="club-front-item__prop">{{ warranty }}</span>
				</div>

				<div class="club-front-item__prop-wrap">
					<span class="club-front-item__prop-label">{{ $t('country') }}</span>
					<span class="club-front-item__prop">
						<svg-icon
							prefix="flags/"
							:icon="country.code"
							:width="16"
							:height="16"
						/>
					</span>
				</div>
			</div>

			<div style="margin-bottom: 12px;" class="club-front-item__prop-wrap">
				<span class="club-front-item__prop-label">{{ $t('club_id') }}</span>
				<span
					class="club-front-item__prop club-front-item__prop_id"
					@click="handleCopy"
					>{{ club_id }}</span
				>
			</div>

			<div style="margin-bottom: 12px;" class="club-front-item__prop-wrap">
				<span class="club-front-item__prop-label">{{ $t('agent_id') }}</span>
				<span class="club-front-item__prop">{{ agent_id }}</span>
			</div>

			<div style="margin-bottom: 12px;" class="club-front-item__prop-wrap">
				<span class="club-front-item__prop-label">{{ $t('tables') }}</span>
				<span class="club-front-item__prop">{{ tables_count }}</span>
			</div>

			<ul
				:class="[
					'club-front-item__features',
					toggled && 'club-front-item__features_toggled',
				]"
			>
				<li
					v-for="(item, index) in features.filter((item, i) => {
						return i < 4
					})"
					:key="index"
					class="club-front-item__feature"
					:title="item.title"
				>
					<svg-icon
						:icon="item.icon"
						:title="item.title"
						:width="30"
						:height="30"
					/>
				</li>
				<li
					v-for="(item, index) in features.filter((item, i) => {
						return i >= 4
					})"
					v-if="toggled"
					:key="index"
					class="club-front-item__feature"
					:title="item.title"
				>
					<svg-icon
						:icon="item.icon"
						:title="item.title"
						:width="30"
						:height="30"
					/>
				</li>
				<li
					v-if="features.length > 4"
					:class="[
						'club-front-item__toggle',
						toggled && 'club-front-item__toggle_hide',
					]"
					@click="toggled = !toggled"
				>
					<span>+{{ features.length - 4 }}</span>
				</li>
			</ul>

			<div class="club-front-item__actions">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					prefetch
					:to="{ name: 'contacts' }"
				>
					<a
						class="btn btn-block btn-sm btn-primary"
						:href="href"
						@click="navigate"
						>{{ $t('join_club') }}</a
					>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'ClubFrontItem',

		components: {},

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

			room: {
				type: Object,
			},
		},

		data: () => ({
			toggled: false,
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
			},
		},
	}
</script>

<style lang="scss">
	$ico-copy: url('~assets/i/ico-copy.svg?data');
	$ico-front-club-toggle: url('~assets/i/ico-front-club-toggle.svg?data');

	.club-front-item {
		margin: 0 10px;
		border-radius: 4px;
		&_toggled {
			margin-top: -8px;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
		}
		&:hover {
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
		}
		&__header {
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			position: relative;
			padding: 24px 20px 20px 20px;
			background: #dddddd;
			display: flex;
		}
		&__info {
			margin-right: 10px;
			flex-grow: 1;
		}
		&__logo {
			border-radius: 4px;
			flex: 0 0 60px;
		}
		&__img {
			border-radius: 4px;
			display: block;
			max-width: 60px;
			height: auto;
		}

		&__wrap {
			position: relative;
			padding: 20px;
			background: #fafafa;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
			&_toggled {
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				margin-top: -35px;
				justify-content: left;
			}
		}

		&__col {
			margin-bottom: 20px;
			border-bottom: 1px solid #dfdede;
		}

		&__prop {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #243238;
			&-label {
				width: 50%;
				font-family: 'Proxima Nova';
				font-size: 14px;
				line-height: 16px;
				color: #555555;
			}
			&-wrap {
				margin-bottom: 16px;
				display: flex;
				justify-content: space-between;
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
			height: 48px;
			margin-bottom: 4px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			color: #222222;
		}

		&__union {
			font-family: 'Proxima Nova SB';
			font-size: 12px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #555555;
		}

		&__features {
			padding: 0 20px 15px 20px;
			margin: 0 -20px;
			list-style: none;
			display: flex;
			flex-flow: wrap;
			justify-content: center;
			&_toggled {
				justify-content: left;
				position: relative;
				padding-bottom: 51px;
				&:after {
					content: '';
					left: 0;
					bottom: 0;
					position: absolute;
					display: block;
					height: 36px;
					width: 100%;
					background: linear-gradient(
						180deg,
						rgba(250, 250, 250, 0) 0%,
						#e9e9e9 100%
					);
					transform: matrix(1, 0, 0, -1, 0, 0);
				}
			}
		}

		&__feature {
			margin: 0 5px 5px 0;
		}

		&__toggle {
			cursor: pointer;
			text-align: center;
			margin: 0 0 5px 0;
			width: 30px;
			height: 30px;
			display: inline-block;
			vertical-align: middle;
			border: 1px solid #bbbbbb;
			border-radius: 50%;
			background: #ffffff;
			span {
				font-family: 'Proxima Nova Sb';
				font-size: 11px;
				color: #999999;
			}

			&_hide {
				position: absolute;
				bottom: 20px;
				margin: 0 !important;
				left: 50%;
				z-index: 1;
				transform: translateX(-50%);
				background: #ffffff $ico-front-club-toggle no-repeat center;
				span {
					display: none;
				}
			}
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

		&__room {
			padding: 3px 8px 3px 28px;
			top: -12px;
			left: 12px;
			position: absolute;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			border-radius: 50px;
			font-family: Proxima Nova;
			font-size: 12px;
			line-height: 16px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #777777;
			text-decoration: none;
			&:hover {
				color: #777777;
				text-decoration: none;
			}
			&-icon {
				position: absolute;
				top: 3px;
				left: 8px;
				border-radius: 50%;
			}
		}
	}
</style>
