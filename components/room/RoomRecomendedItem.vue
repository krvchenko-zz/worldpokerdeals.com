<template>
	<div :class="['room-recomended']">
		<div
			class="room-recomended__img"
			:style="{
				backgroundColor: background,
			}"
		>
			<img
				decoding="async"
				loading="lazy"
				:src="img"
				:alt="image.alt || `${title} logo`"
			/>
		</div>

		<div class="room-recomended__wrap">
			<div class="room-recomended__network">{{ network.title }}</div>
			<div class="room-recomended__title">{{ title }}</div>

			<div class="room-recomended__rating">
				<rating
					:style="{
						alignItems: 'baseline',
						justifyContent: 'center',
					}"
					:value="rating"
				/>
			</div>

			<dl class="room-recomended__details">
				<dt class="room-recomended__dt">{{ $t('bonus') }}</dt>
				<dd class="room-recomended__dd">{{ bonus ? bonus.title : 'n/a' }}</dd>
				<dt class="room-recomended__dt">{{ $t('rakeback') }}</dt>
				<dd class="room-recomended__dd">{{ rakeback }}</dd>
			</dl>

			<div class="room-recomended__actions">
				<nuxt-link
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="[
							'btn',
							'btn-block',
							'room-recomended__link room-recomended__link_review',
						]"
						:href="href"
						@click="navigate"
						>{{ $t('review') }}</a
					>
				</nuxt-link>

				<nuxt-link
					v-if="review"
					v-slot="{ href, route, navigate }"
					:to="`/rakeback-deals/${slug}/play`"
				>
					<a
						:class="[
							'btn',
							'btn-block',
							'room-recomended__link',
							'room-recomended__link_download',
						]"
						:href="href"
						@click="navigate"
						>{{ $t('room_download') }}</a
					>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomRecomendedItem',

		components: {},

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

			summary: {
				type: [String, Boolean],
				default: true,
			},

			rating: {
				type: [String, Number],
				required: true,
			},

			rakeback: {
				type: [String, Number],
				default: 'n/a',
			},

			bonus: {
				type: [String, Number],
				default: 'n/a',
			},

			background: {
				type: String,
				default: '#000000',
			},

			image: {
				type: [String, Object],
				required: true,
			},

			network: {
				type: [String, Object],
				required: true,
			},

			review: {
				type: Object,
				required: true,
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

<style lang="scss">
	.room-recomended {
		width: 100%;
		margin: 0;
		background: #fafafa;
		border-radius: 4px;
		overflow: hidden;

		&__img {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 125px;
			img {
				max-width: 100%;
				height: auto;
				margin: 0;
			}
		}

		&__wrap {
			padding: 0 20px 20px 20px;
			text-align: center;
			font-size: 0;
		}

		&__title {
			height: 24px;
			margin: 8px 0 10px 0;
			overflow: hidden;
			text-align: center;
			color: #243238;
			letter-spacing: -0.1px;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			font-family: 'Proxima Nova';
		}

		&__network {
			margin-top: -12px;
			border-radius: 50px;
			padding: 3px 10px;
			border: 1px solid #e9e9e9;
			background: #fafafa;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
			display: inline-flex;
		}

		&__label {
			color: #777777;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			&_restricted {
				color: #ff4151;
			}
		}

		&__details {
			text-align: left;
			margin-bottom: 12px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		&__dt {
			color: #555555;
			font-family: Proxima Nova;
			font-weight: normal;
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			flex: 0 0 30%;
		}

		&__dd {
			margin-bottom: 12px;
			color: #243238;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 16px;
			text-align: right;
			flex: 0 0 70%;
			&:last-child {
				margin: 0;
			}
		}

		&__actions {
			display: flex;
		}

		&__link {
			padding: 9px 17px;
			border-radius: 3px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 14px;
			&_review {
				margin-right: 10px;
				color: #777777;
				background: #dfe4e6;
				&:hover,
				&:active,
				&:focus {
					color: #555555;
					background: #dddddd;
				}
			}

			&_download {
				margin-left: 10px;
				color: #ffffff;
				background: #ff4151;
				&:hover,
				&:active,
				&:focus {
					color: #ffffff;
					background: #ee3c4b;
				}
			}
		}
	}
</style>
