<template>
	<div :class="['top-room']">
		<div class="top-room__label">
			<div class="top-room__label-wrap">{{ label }}</div>
		</div>

		<div class="top-room__header">
			<svg-icon
				class="top-room__icon"
				:icon="slug"
				:width="88"
				:height="88"
				view-box="0 0 200 200"
			/>
			<div class="top-room__info">
				<rating class="top-room__rating" :value="rating" />
				<div class="top-room__title">{{ title }}</div>
				<nuxt-link
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="['btn', 'top-room__review']"
						:href="href"
						@click="navigate"
						>{{ $t('room_review') }}</a
					>
				</nuxt-link>
			</div>
		</div>

		<div class="top-room__footer">
			<div v-if="bonus" class="top-room-bonus">
				<svg-icon
					class="top-room-bonus__icon"
					icon="room-top-bonus"
					:width="24"
					:height="24"
					:opacity="1"
					:fill="bonus.category.label_color"
					view-box="-6 -6 24 24"
				/>
				<div
					:style="{
						borderColor: bonus.category.label_color,
						color: bonus.category.label_color,
					}"
					class="top-room-bonus__category"
				>
					{{ bonus.category.title }}
				</div>
				<div class="top-room-bonus__title">{{ bonus.title }}</div>
			</div>
			<div class="top-room__actions">
				<room-action-button
					:class="['btn-block', 'top-room__download']"
					type="download"
					:label="$t('go_to_site')"
					:icon="false"
					:slug="slug"
				/>
			</div>

			<div class="top-room__geo">
				<span
					:class="{
						'top-room__avaliable': true,
						[`top-room__avaliable_yes`]: !restricted,
						[`top-room__avaliable_no`]: restricted,
					}"
				>
					<svg-icon
						class="top-room__geo-icon"
						:width="16"
						:height="16"
						:icon="country.code"
						prefix="flags/"
					/><template v-if="restricted">{{
						$t('room_geo_restricted', { country: country.from })
					}}</template
					><template v-else>{{
						$t('room_geo_allowed', { country: country.from })
					}}</template>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Rating from '~/components/Rating'

	export default {
		name: 'TopRoom',

		components: {
			Rating,
		},

		props: {
			id: {
				type: Number,
				required: true,
			},

			title: {
				type: String,
				required: true,
			},

			slug: {
				type: String,
				required: true,
			},

			rating: {
				type: [String, Number],
				required: true,
			},

			bonus: {
				type: Object,
				default: () => {
					return {
						title: 'n/a',
						category: {
							title: 'Отсутствует',
							label_color: '#FF4151',
						},
					}
				},
			},

			review: {
				type: Object,
				required: true,
			},

			label: {
				type: String,
				default: 'Лучший покер-рум',
			},

			restricted: {
				type: Boolean,
			},

			available: {
				type: Boolean,
			},

			country: {
				type: Object,
			},
		},

		data: () => ({}),

		computed: {
			img() {
				return `${this.mediaUrl}/room-card/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style scoped lang="scss">
	$label-bg: url('~assets/i/ico-card-label.svg?data');

	.top-room {
		max-width: 326px;
		width: 100%;
		position: relative;
		&__header {
			z-index: 1;
			position: relative;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			display: flex;
			padding: 28px;
			background: linear-gradient(
					180deg,
					#ffffff 0%,
					rgba(255, 255, 255, 0) 100%
				),
				#e9e9e9;
		}
		&__icon {
			top: 28px;
			left: 28px;
			position: absolute;
			border-radius: 50%;
			display: block;
		}
		&__info {
			z-index: 2;
			position: relative;
			padding-left: 112px;
		}
		&__title {
			margin-bottom: 12px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 21px;
			line-height: 22px;
			letter-spacing: -0.1px;
			color: #222222;
		}
		&__rating {
			justify-content: normal;
			margin-bottom: 8px;
		}

		&__label {
			z-index: 2;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			top: -8px;
			white-space: nowrap;
			padding: 0 20px;
			position: absolute;
			min-height: 24px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #222222;
			&:before {
				content: '';
				top: 0;
				left: 0;
				position: absolute;
				display: block;
				width: 20px;
				height: 24px;
				background: $label-bg no-repeat center;
			}
			&:after {
				content: '';
				top: 0;
				right: 0;
				position: absolute;
				display: block;
				width: 20px;
				height: 24px;
				background: $label-bg no-repeat center;
				transform: matrix(-1, 0, 0, 1, 0, 0);
			}
			&-wrap {
				margin: 0 -1px;
				padding: 4px 11px;
				background: linear-gradient(0deg, #ffc255, #ffc255), #eac24a;
			}
		}

		&__review {
			padding: 4px 12px;
			background: #ffffff;
			border: 1px solid rgba(204, 204, 204, 0.7);
			box-sizing: border-box;
			border-radius: 3px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 14px;
			color: #777777;
			&:hover,
			&:active,
			&:focus {
				color: #555555;
				background: rgba(204, 204, 204, 0.7);
			}
		}

		&__download {
			padding: 12px 24px;
			font-size: 16px;
			line-height: 16px;
		}

		&__footer {
			z-index: 2;
			position: relative;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 28px 28px 16px 28px;
			background: #ffffff;
		}

		&__geo {
			margin-top: 10px;
			&-icon {
				margin-right: 10px;
			}
		}

		&__avaliable {
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
		}

		&-bonus {
			text-align: center;
			font-size: 0;
			&__category {
				margin-bottom: 12px;
				display: inline-block;
				border: 1px solid #ffffff;
				border-radius: 20px;
				padding: 3px 8px 1px 8px;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 11px;
				line-height: 14px;
				letter-spacing: 0.5px;
				color: #fafafa;
				text-transform: uppercase;
			}

			&__title {
				margin-bottom: 12px;
				text-align: center;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: bold;
				font-size: 20px;
				line-height: 24px;
				text-align: center;
				color: #222222;
			}

			&__icon {
				top: -20px;
				left: 50%;
				transform: translateX(-50%);
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				border-radius: 50%;
				background: #ffffff;
			}
		}
	}

	@include mq('desktop') {
		.top-room {
			&__header {
				padding: 28px 20px 36px;
			}
			&__icon {
				left: 20px;
			}
			&__info {
				padding-left: 104px;
			}
			&__footer {
				padding-left: 20px;
				padding-right: 20px;
			}
		}
	}

	@include mq('laptop') {
		.top-room {
			&__header {
				padding: 28px 20px;
			}
		}
	}
</style>
