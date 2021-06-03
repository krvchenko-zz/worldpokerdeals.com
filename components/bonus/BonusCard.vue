<template>
	<div :class="['bonus-card']">
		<div class="bonus-card__header">
			<svg-icon
				class="bonus-card__icon"
				:icon="slug"
				:width="76"
				:height="76"
				view-box="0 0 200 200"
			/>
			<div class="bonus-card__info">
				<rating class="bonus-card__rating" :value="rating" />
				<div class="bonus-card__title">{{ title }}</div>
				<nuxt-link
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="['btn', 'bonus-card__link bonus-card__link_review']"
						:href="href"
						@click="navigate"
						>{{ $t('room_review') }}</a
					>
				</nuxt-link>
			</div>
		</div>

		<div class="bonus-card__footer">
			<div v-if="bonus" class="bonus-card-bonus">
				<svg-icon
					class="bonus-card-bonus__icon"
					icon="room-top-bonus"
					:width="24"
					:height="24"
					:opacity="1"
					:fill="bonus_category_label"
					view-box="-6 -6 24 24"
				/>
				<div
					:style="{ background: bonus_category_label }"
					class="bonus-card-bonus__category"
				>
					{{ bonus_category }}
				</div>
				<div class="bonus-card-bonus__title">{{ bonus }}</div>
			</div>
			<div class="bonus-card__actions">
				<room-action-button
					:style="{
						padding: '9px 20px',
						fontSize: '14px',
						lineHeight: '14px',
					}"
					class="btn-block"
					:slug="review.slug"
					:icon="false"
					type="download"
					:label="$t('room_download')"
				/>
			</div>

			<div class="bonus-card__geo">
				<span
					:class="{
						'bonus-card__avaliable': true,
						[`bonus-card__avaliable_yes`]: !restricted,
						[`bonus-card__avaliable_no`]: restricted,
					}"
				>
					<svg-icon
						class="bonus-card__geo-icon"
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
				type: [String, Number],
				default: 'n/a',
			},

			review: {
				type: Object,
				required: true,
			},

			bonus_category_label: {
				type: String,
			},

			bonus_category: {
				type: String,
			},

			label: {
				type: String,
				default: 'Лучший покер-рум',
			},

			restricted: {
				type: Boolean,
			},

			country: {
				type: Object,
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
	.bonus-card {
		margin-top: 36px;
		margin-left: -128px;
		width: 208px;
		position: sticky;
		top: 130px;
		z-index: 5;
		border-radius: 10px;
		box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
		&__header {
			padding: 50px 28px 34px 28px;
			border-bottom: 0;
			border: 1px solid #e9e9e9;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			position: relative;
			background: linear-gradient(
					180deg,
					#ffffff 0%,
					rgba(255, 255, 255, 0) 100%
				),
				#e9e9e9;
		}
		&__icon {
			border-radius: 50%;
			position: absolute;
			top: -38px;
			left: 50%;
			transform: translateX(-50%);
		}

		&__info {
			text-align: center;
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

		&__link {
			&_review {
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
				&:focus,
				&:visited {
					color: #555555;
					background: rgba(204, 204, 204, 0.7);
				}
			}

			&_download {
				padding: 7px 20px 6px 20px;
			}
		}

		&__footer {
			border: 1px solid #e9e9e9;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 18px 20px;
			background: #ffffff;
		}

		&__geo {
			margin-top: 12px;
			&-icon {
				margin-right: 10px;
			}
		}

		&__avaliable {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
			&_no {
				color: #eb5757;
			}
		}

		&-bonus {
			text-align: center;
			&__category {
				margin-top: 4px;
				margin-bottom: 12px;
				display: inline-block;
				text-align: center;
				border-radius: 20px;
				padding: 3px 12px 2px 12px;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: bold;
				font-size: 12px;
				line-height: 16px;
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
				position: relative;
				margin: -36px auto 0 auto;
				display: block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				border-radius: 50%;
				background: #ffffff;
			}
		}
	}
</style>
