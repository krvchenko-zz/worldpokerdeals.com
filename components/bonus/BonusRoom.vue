<template>
	<div :class="['bonus-room']">
		<div class="bonus-room__wrap">
			<div class="bonus-room__header">
				<svg-icon
					class="bonus-room__icon"
					:icon="slug"
					:width="88"
					:height="88"
					:image="true"
					view-box="0 0 200 200"
				/>
				<div class="bonus-room__info">
					<rating class="bonus-room__rating" :value="rating" />
					<div class="bonus-room__title">{{ title }}</div>
					<nuxt-link
						v-slot="{ href, route, navigate }"
						:to="{
							name: 'index',
							params: { parent: 'rakeback-deals', child: review.slug },
						}"
						custom
					>
						<a
							:class="['btn', 'bonus-room__link bonus-room__link_review']"
							:href="href"
							@click="navigate"
							>{{ $t('room_review') }}</a
						>
					</nuxt-link>
				</div>
			</div>
			<div class="bonus-room__footer">
				<room-score-item
					v-for="item in rates"
					:id="item.id"
					:key="item.id"
					:small="true"
					:label="item.title"
					:value="item.value"
				/>
			</div>
		</div>
		<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<clipPath id="bonus_room_clip" clipPathUnits="objectBoundingBox">
					<path
						d="M1,0.966 c0,0.021,-0.026,0.037,-0.055,0.034 l-0.902,-0.077 c-0.025,-0.002,-0.043,-0.017,-0.043,-0.034 v-0.776 c0,-0.017,0.018,-0.032,0.043,-0.034 l0.902,-0.077 c0.029,-0.003,0.055,0.013,0.055,0.034 v0.931"
					></path>
				</clipPath>
			</defs>
		</svg>
	</div>
</template>

<script>
	import Rating from '~/components/Rating'

	export default {
		name: 'BonusRoom',

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

			url: {
				type: String,
			},

			rating: {
				type: [String, Number],
				required: true,
			},

			rates: {
				type: [Array],
			},

			review: {
				type: Object,
				required: true,
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
	$bg-bonus-room: url('~assets/i/bonus-room-bg.svg?data');

	.bonus-room {
		margin: -52px 0;
		padding: 40px 28px;
		min-width: 326px;
		position: relative;
		filter: drop-shadow(20px 0px 40px rgba(0, 0, 0, 0.15));
		&:after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			clip-path: url(#bonus_room_clip);
			background: radial-gradient(
				179.3% 742.81% at 5.47% 97.16%,
				#f7f7f7 20.31%,
				#cccccc 100%
			);
			top: 0;
			left: 0;
		}
		&__wrap {
			position: relative;
			z-index: 1;
		}

		&__header {
			padding-top: 100px;
			position: relative;
			margin-bottom: 20px;
			display: flex;
			flex-flow: column;
			align-items: center;
		}
		&__icon {
			top: 0;
			position: absolute;
			margin-bottom: 12px;
			border-radius: 50%;
			flex: 0 0 88px;
		}
		&__info {
			text-align: center;
			font-size: 0;
		}
		&__rating {
			justify-content: normal;
			margin-bottom: 8px;
		}

		&__title {
			margin-bottom: 12px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 22px;
			line-height: 24px;
			letter-spacing: -0.1px;
			color: #222222;
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
				line-height: 16px;
				color: #777777;
				&:hover,
				&:active,
				&:focus {
					color: #555555;
					background: rgba(204, 204, 204, 0.7);
				}
			}
		}

		&__footer {
		}
	}
</style>
