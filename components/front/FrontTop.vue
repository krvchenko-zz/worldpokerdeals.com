<template>
	<div class="front-top">
		<div class="front-top__wrap">
			<h1 class="front-top__title" v-html="$t('wpd_front_title')"></h1>
			<div class="front-top__summary" v-html="$t('wpd_front_info')"></div>
			<div class="front-top__buttons">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: 'best-poker-rooms-2020' },
					}"
				>
					<a
						class="btn btn-primary front-top__buttons__choose"
						style="margin-right: 32px;"
						:href="href"
						@click="navigate"
						>{{ $t('choose_poker_room') }}</a
					>
				</nuxt-link>
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					:to="{ name: 'contacts' }"
				>
					<a
						class="btn btn-border front-top__buttons__support"
						:href="href"
						@click="navigate"
						>{{ $t('contact_us') }}</a
					>
				</nuxt-link>
			</div>
			<p class="front-top__awards-title">
				{{ $t('our_awards') }}
			</p>
			<div class="front-top-awards">
				<a
					class="front-top-awards__item"
					href="https://www.igbaffiliate.com/awards/igb-affiliate-awards"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						src="/badge-best-site.svg"
						alt="Best poker site"
					/>
				</a>
				<a
					class="front-top-awards__item"
					href="https://www.igbaffiliate.com/awards/igb-affiliate-awards"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						src="/badge-best-affiliate.svg"
						alt="Best affiliate"
					/>
				</a>
				<a
					class="front-top-awards__item"
					href="https://gaffg.com/webmasters/worldpokerdeals/"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						src="/badge-gaffg.svg"
						alt="GAFFG"
					/>
				</a>
				<a
					class="front-top-awards__item"
					href="https://certify.gpwa.org/verify/ru/worldpokerdeals.com/"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						src="/badge-gpwa.svg"
						alt="GPWA"
					/>
				</a>
				<a
					class="front-top-awards__item"
					href="http://www.gamblersanonymous.org/ga/node/1"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						alt="Gamblers Anonymous"
						src="/gamblers-anonymous.svg"
					/>
				</a>
				<a
					class="front-top-awards__item"
					href="https://www.apcw.org/"
					target="_blank"
				>
					<img
						class="front-top-awards__img"
						decoding="async"
						loading="lazy"
						src="/badge-apcw.svg"
						alt="APCW"
					/>
				</a>
			</div>
		</div>
		<div class="front-top__top-rooms-wrapper">
			<lazy-hydrate when-visible>
				<room-top-list type="front" />
			</lazy-hydrate>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'FrontTop',

		components: {
			LazyHydrate,
			RoomTopList: () => import('~/components/room/RoomTopList'),
		},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				page: 'pages/page',
				topList: 'rooms/topList',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$front-top-bg: url('~assets/i/front-bg.jpg');
	.front-top {
		display: grid;
		width: 100%;
		max-width: 1440px;
		grid-template-columns: [text] 1fr [top-rooms] 496px;
		margin-bottom: 40px;
		@include paddings('desktop');
		padding-top: 32px;
		padding-bottom: 32px;
		min-height: 519px;
		background: $front-top-bg no-repeat center top;
		background-size: auto 519px;
		&__wrap {
			padding-left: 68px;
			grid-column: text;
		}
		&__title {
			margin: 28px 0 24px 0;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 42px;
			line-height: 52px;
			letter-spacing: -0.1px;
			color: #ffffff;
		}
		&__summary {
			margin-bottom: 36px;
			font-family: Proxima Nova;
			font-size: 20px;
			line-height: 26px;
			color: #cccccc;
		}

		&__buttons {
			margin-bottom: 56px;
			display: flex;
			&__choose,
			&__support {
				padding: 16px 32px;
				font-size: 18px;
				line-height: 18px;
			}
		}

		&__awards {
			&-title {
				margin-bottom: 20px;
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 20px;
				color: #cccccc;
			}
		}

		&-awards {
			display: flex;
			&__item {
				display: block;
				margin-right: 20px;
				filter: grayscale(1);
				&:hover {
					filter: none;
				}
			}
			&__img {
				display: block;
			}
		}

		&__top-rooms-wrapper {
			margin-left: 26px;
			grid-column: top-rooms;
		}

		@media (min-width: 1280px) and (max-width: 1380px) {
			&-awards {
				&__item {
					margin-right: 15px;
				}
			}
			&__wrap {
				padding-left: 0px;
			}
		}

		@include mq('laptop') {
			padding: 0;
			grid-template-columns: 100vw;
			grid-template-rows: [summary] 1fr [top-rooms] 1fr;
			&__title {
				margin-top: 0;
			}
			&__wrap {
				grid-column: 1;
				@include paddings('tablet');
				padding-bottom: 36px;
				padding-top: 40px;
			}
			&__top-rooms-wrapper {
				grid-column: 1;
				margin-left: 0;
				display: flex;
				justify-content: center;
				background: #383b4c;
				padding-bottom: 58px;
			}
			&__buttons {
				margin-bottom: 36px;
			}
			&-awards {
				overflow-x: scroll;
				@include hide-scroll();
			}
		}

		@include mq('tablet') {
			grid-template-columns: 100vw;
			grid-template-rows: [summary] 1fr [top-rooms] auto;
			background: none;
			&__buttons {
				white-space: nowrap;
				&__choose,
				&__support {
					padding: 16px;
					font-size: 16px;
					line-height: 16px;
				}
			}
			&__wrap {
				@include paddings('mobile');
				padding-right: 0;
				grid-column: 1;
				grid-row: summary;
				background: linear-gradient(
					180deg,
					rgba(31, 32, 44, 0) 0%,
					#21222e 7.81%,
					#373b4c 100%
				);
				background: $front-top-bg no-repeat center top;
				background-size: auto 100%;
			}
			&__top-rooms-wrapper {
				grid-column: 1;
				grid-row: top-rooms;
				margin: 0;
			}
			&__title {
				font-size: 32px;
				line-height: 40px;
			}
			&__summary {
				font-size: 20px;
				line-height: 26px;
				max-width: 364px;
			}
			&__awards-title {
				font-size: 14px;
				line-height: 20px;
			}
		}

		@include mq('mobile') {
			&__top-rooms-wrapper {
				background: none;
				padding-bottom: 30px;
			}
		}
	}
</style>
