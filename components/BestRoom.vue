<template>
	<div class="best-room">
		<div class="best-room__wrap">

			<nuxt-link
				v-if="review"
				v-slot="{ href, route, navigate }"
				:to="{
					name: 'index',
					params: { parent: 'rakeback-deals', child: review.slug },
				}"
			>
				<a
					:style="{ backgroundColor: background }"
					:class="['best-room__item']"
					:href="href"
					@click="navigate">
					<div class="best-room__geo">
						<div class="best-room__geo-label">{{ $t('best_room') }}</div>
						<div class="best-room__geo-wrap">
							<svg-icon
								class="best-room__geo-flag"
								prefix="flags/"
								:icon="country.code"
								:width="20"
								:height="20"
							/>
							<span class="best-room__geo-country">{{ country.title }}</span>
						</div>
					</div>
					<div class="best-room__logo">
						<img
							class="best-room__img"
							decoding="async"
							loading="lazy"
							:src="img"
							:alt="image.alt || `${title} logo`"
						/>
					</div>
					<div class="best-room__action">
						<a
							:class="['btn', 'btn-block', 'btn-border', 'best-room__review']"
							:href="href"
							@click="navigate"
							>{{ $t('review') }}</a
						>
					</div>
				</a>
			</nuxt-link>


<!-- 			<div class="best-room__item" :style="{ backgroundColor: background }">

			</div> -->
			<div class="best-room__item" :style="{ backgroundColor: '#4E5262' }">
				<div class="best-room__description">{{ $t('private_clubs_and_rake_stats_short') }}</div>
				<div class="best-room__action">
					<nuxt-link v-slot="{ href, route, navigate }" to="/register">
						<a
							:class="['btn', 'btn-block', 'btn-action', 'best-room__register']"
							:href="href"
							@click="navigate"
							>{{ $t('join_us') }}</a
						>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'BestRoom',

		components: {},

		props: {
			title: {
				type: String,
				required: true,
			},
			background: {
				type: String,
				default: '#000000',
			},
			image: {
				type: [String, Object],
				required: true,
			},
			review: {
				type: Object,
				required: true,
			},
			country: {
				type: Object,
				required: true,
			},
		},

		data: () => ({}),

		computed: {
			// ...mapGetters({
			//   'topList':
			// }),
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
	.best-room {
		z-index: 10;
		margin: 0 auto;
		max-width: 1440px;
		width: 100%;
		transform: translateY(-50%);
		@include paddings('desktop');
		&__wrap {
			overflow: hidden;
			width: 100%;
			border-radius: 10px;
			display: flex;
			box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
		}
		&__item {
			text-decoration: none;
			padding: 24px 32px 24px 28px;
			width: 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&:hover {
				text-decoration: none;
			}
		}

		&__geo {
			&-label {
				margin-bottom: 4px;
				font-family: 'Proxima Nova Sb';
				font-size: 14px;
				line-height: 16px;
				color: #cccccc;
			}

			&-wrap {
				display: flex;
				align-items: center;
			}

			&-flag {
				margin-right: 8px;
			}

			&-country {
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 18px;
				line-height: 20px;
				color: #ffffff;
			}
		}

		&__description {
			display: flex;
			align-items: center;
			padding-right: 36px;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 18px;
			color: #f1efef;
		}

		&__register {
			padding: 11px 40px 10px 40px;
		}

		&__review {
			padding: 10px 24px 9px 24px;
		}

		&__img {
			height: 40px;
			width: auto;
		}
	}

	@include mq('laptop') {
		.best-room {
			@include paddings('tablet');
			&__wrap {
				flex-direction: column;
				transform: translateY(25%);
			}
			&__item {
				width: 100%;
				padding: 20px 24px;
			}
		}
	}

	@include mq('tablet') {
		.best-room {
			@include paddings('mobile');
			&__review {
				display: none;
			}
			&__item {
				padding: 20px;
				display: flex;
			}
			&__logo {
				margin-left: auto;
			}
			&__register {
				margin-left: auto;
				padding: 12px 20px;
			}
		}
	}
</style>
