<template>
	<div :class="['promotion-room']">
		<div
			class="promotion-room__img"
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

		<div class="promotion-room__wrap">
			<div class="promotion-room__network">{{ network.title }}</div>
			<div class="promotion-room__title">{{ title }}</div>

			<div class="promotion-room__rating">
				<rating :value="rating" />
			</div>

			<dl class="promotion-room__details">
				<dt class="promotion-room__dt">Бонус</dt>
				<dd class="promotion-room__dd">{{ bonus || 'n/a' }}</dd>
				<dt class="promotion-room__dt">Рейкбек</dt>
				<dd class="promotion-room__dd">{{ rakeback }}</dd>
			</dl>

			<div class="promotion-room__actions">
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
							'promotion-room__link promotion-room__link_review',
						]"
						:href="href"
						@click="navigate"
						>Обзор</a
					>
				</nuxt-link>

				<nuxt-link
					v-if="review"
					v-slot="{ href, route, navigate }"
					:to="`/rakeback-deals/${slug}/download`"
				>
					<a
						:class="[
							'btn',
							'btn-block',
							'promotion-room__link',
							'promotion-room__link_download',
						]"
						:href="href"
						@click="navigate"
						>Учавствовать</a
					>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Rating from '~/components/Rating'

	export default {
		name: 'PromotionRoomCard',

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

<style scoped lang="scss">
	.promotion-room {
		margin: 0 0 30px 0;
		border: 1px solid #e9e9e9;
		background: #fafafa;
		border-radius: 4px;
		overflow: hidden;
		top: 130px;
		position: sticky;
		transition: border 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;

		&:hover {
			border: 1px solid transparent;
			background: #ffffff;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
		}

		&__img {
			padding: 52px 20px 48px 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				margin: 0;
			}
		}

		&__wrap {
			padding: 0 20px 20px 20px;
		}

		&__title {
			margin: 8px 0 10px 0;
			text-align: center;
			color: #243238;
			letter-spacing: -0.1px;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			font-family: 'Proxima Nova';
		}

		&__network {
			margin-top: -13px;
			border-radius: 50px;
			padding: 4px 10px;
			border: 1px solid #e9e9e9;
			background: #fafafa;
			text-align: center;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
		}

		&__rating {
			margin-bottom: 14px;
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
			margin-bottom: 4px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 12px;
		}

		&__dt {
			color: #555555;
			font-family: Proxima Nova;
			font-weight: normal;
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			flex: 0 0 50%;
		}

		&__dd {
			margin-bottom: 12px;
			color: #243238;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 16px;
			text-align: right;
			flex: 0 0 50%;
		}

		&__link {
			padding: 9px 20px;
			border-radius: 3px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 18px;
			&_review {
				margin-bottom: 12px;
				color: #777777;
				background: #dfe4e6;
			}

			&_download {
				color: #ffffff;
				background: #ff4151;
			}
		}
	}
</style>
