<template>
<div class="front-top">
	<div class="container-fluid">
		<div class="row">
			<div class="col-8">
				<div class="front-top__wrap">
					<h1 class="front-top__title">Больше, чем <br> покерный аффилейт</h1>
					<div class="front-top__summary">
						<p><b>Экспертно</b> об онлайн-покере, рейкбек в <b>100+ покер-румах</b> <br> и экзотических комнатах, проактивное комьюнити <br> и <b>умные решения</b> для игроков</p>
					</div>
					<div class="front-top__buttons">
						<nuxt-link :to="{ name: 'index', params: { parent: 'rakeback-deals', child: null}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a class="btn btn-lg btn-primary" style="margin-right: 32px;" :href="href" @click="navigate">Выбрать покер-рум</a>
						</nuxt-link>
						<nuxt-link :to="{ name: 'index', params: { parent: 'rakeback-deals', child: null}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a class="btn btn-lg btn-border" style="margin-right: 32px;" :href="href" @click="navigate">VIP-сервисы</a>
						</nuxt-link>
						<nuxt-link :to="{ name: 'contacts' }" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a class="btn btn-lg btn-border" :href="href" @click="navigate">Написать нам</a>
						</nuxt-link>
					</div>
					<p class="front-top__awards-title">Наши аффилиатские заносы и знаки доверия от игорных-сообществ:</p>
					<div class="front-top-awards">
						<a class="front-top-awards__item" href="https://www.igbaffiliate.com/awards/igb-affiliate-awards" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" src="/badge-best-site.svg" alt="Best poker site"/>
						</a>
						<a class="front-top-awards__item" href="https://www.igbaffiliate.com/awards/igb-affiliate-awards" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" src="/badge-best-affiliate.svg" alt="Best affiliate"/>
						</a>
						<a class="front-top-awards__item" href="https://gaffg.com/webmasters/worldpokerdeals/" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" src="/badge-gaffg.svg" alt="GAFFG"/>
						</a>
						<a class="front-top-awards__item" href="https://certify.gpwa.org/verify/ru/worldpokerdeals.com/" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" src="/badge-gpwa.svg" alt="GPWA"/>
						</a>
						<a class="front-top-awards__item" href="http://www.gamblersanonymous.org/ga/node/1" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" alt="Gamblers Anonymous" src="/gamblers-anonymous.svg">
						</a>
						<a class="front-top-awards__item" href="https://www.apcw.org/" target="_blank">
							<img class="front-top-awards__img" decoding="async" loading="lazy" src="/badge-apcw.svg" alt="APCW"/>
						</a>
					</div>
				</div>
			</div>
			<div class="col-4">
				<lazy-hydrate when-visible>
					<room-top-list type="front" />
				</lazy-hydrate>
			</div>
		</div>
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
		RoomTopList: () => import('~/components/room/RoomTopList')
	},

	props: {

	},

	created() {

	},

	data: () => ({

	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			geo: 'location/code',
			page: 'pages/page',
			topList: 'rooms/topList'
		}),
	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss">
$front-top-bg: url('~assets/i/front-bg.jpg');
.front-top {
	margin-bottom: 40px;
	padding: 32px 0 32px 0;
	min-height: 519px;
	background: $front-top-bg no-repeat center top;
	// background: #1d202b $front-top-bg no-repeat center;
	background-size: auto 519px;
	&__wrap {
		padding-left: 62px;
	}
	&__title {
		margin: 28px 0 24px 0;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 42px;
		line-height: 52px;
		letter-spacing: -0.1px;
		color: #FFFFFF;
	}
	&__summary {
		margin-bottom: 36px;
		font-family: Proxima Nova;
		font-size: 20px;
		line-height: 26px;
		color: #CCCCCC;
	}

	&__buttons {
		margin-bottom: 56px;
		display: flex;
	}

	&__awards {
		&-title {
			margin-bottom: 20px;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			color: #CCCCCC;
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
}
</style>