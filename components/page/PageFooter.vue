<template>
	<footer class="footer">
		<div class="footer-top">
			<div class="container-fluid">
				<div class="row">
					<div class="col-3">
						<div class="footer-logo-container">
							<div class="footer__logo"></div>
							<svg-icon
								class="footer__geo"
								prefix="flags/"
								:geo="country.code"
								:width="24"
								:height="24"
							/>
						</div>
						<div class="footer-info">
							<div class="footer__text">{{ info }}</div>
							<div class="footer__credentials" v-html="credentials"></div>
							<div class="footer__address">{{ address }}</div>
							<div class="footer-links">
								<a class="footer__link" href="#"><span>Дисклеймер</span></a>
								<a class="footer__link" href="#"
									><span>Условия и положения</span></a
								>
								<a class="footer__link" href="#"
									><span>Политика конфиденциальности</span></a
								>
								<a class="footer__link" href="#"
									><span>Политика использования файлов cookie</span></a
								>
							</div>
						</div>
					</div>
					<div class="col-9">
						<div class="footer-rooms">
							<div class="footer-rooms__label">Лучшие покер-румы</div>
							<ul class="footer-rooms-list">
								<nuxt-link
									v-for="(item, index) in topList"
									:key="index"
									v-slot="{ href, route, navigate, isActive, isExactActive }"
									prefetch
									:to="{
										name: 'index',
										params: {
											parent: 'rakeback-deals',
											child: item.review.url,
										},
									}"
								>
									<li class="footer-rooms-item">
										<a
											:class="['footer-rooms-item__link']"
											:href="href"
											@click="navigate"
											>{{ item.title }}</a
										>
									</li>
								</nuxt-link>
							</ul>
						</div>

						<div class="footer-categories">
							<div v-if="menu && menu.rooms" class="footer-category">
								<div class="footer-category__label">Покер-румы</div>
								<div class="footer-category-list">
									<page-footer-menu-item
										v-for="(item, index) in menu.rooms"
										:key="index"
										:page="item.page"
										:name="item.name"
									/>
								</div>
							</div>

							<div v-if="menu && menu.posts" class="footer-category">
								<div class="footer-category__label">Новости</div>
								<div class="footer-category-list">
									<page-footer-menu-item
										v-for="(item, index) in menu.promotions"
										:key="index"
										:page="item.page"
										:name="item.name"
									/>
								</div>
							</div>

							<div v-if="menu && menu.promotions" class="footer-category">
								<div class="footer-category__label">Акции</div>
								<div class="footer-category-list">
									<page-footer-menu-item
										v-for="(item, index) in menu.promotions"
										:key="index"
										:page="item.page"
										:name="item.name"
									/>
								</div>
							</div>

							<div v-if="menu && menu.poker" class="footer-category">
								<div class="footer-category__label">Онлайн покер</div>
								<div class="footer-category-list">
									<page-footer-menu-item
										v-for="(item, index) in menu.poker"
										:key="index"
										:page="item.page"
										:name="item.name"
									/>
								</div>
							</div>

							<div v-if="menu && menu.about" class="footer-category">
								<div class="footer-category__label">О нас</div>
								<div class="footer-category-list">
									<page-footer-menu-item
										v-for="(item, index) in menu.about"
										:key="index"
										:page="item.page"
										:name="item.name"
									/>
								</div>
								<div class="footer-livechat">
									<button-contact size="md" type="chat" block
										>Начать лайв-чат</button-contact
									>
								</div>
								<div class="footer-social">
									<a
										href="#"
										class="footer-social__link footer-social__link_instagram"
										target="_blank"
										rel="nofollow"
									></a>
									<a
										href="#"
										class="footer-social__link footer-social__link_twitter"
										target="_blank"
										rel="nofollow"
									></a>
									<a
										href="#"
										class="footer-social__link footer-social__link_vk"
										target="_blank"
										rel="nofollow"
									></a>
									<a
										href="#"
										class="footer-social__link footer-social__link_fb"
										target="_blank"
										rel="nofollow"
									></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container-fluid">
				<div class="footer-trusted">
					<div class="footer-trusted__label">Нам доверяют</div>
					<div class="footer-trusted__links">
						<a
							id="GPWASeal"
							class="footer-trusted__item"
							rel="nofollow"
							href="https://certify.gpwa.org/verify/ru/worldpokerdeals.com/"
						>
							<img decoding="async" loading="lazy" src="/gpwa.svg" />
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="http://www.gamblersanonymous.org/ga/node/1"
							target="_blank"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="Gamblers Anonymous"
								src="/gamblers-anonymous.svg"
							/>
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="http://gaffg.com/webmasters/worldpokerdeals/"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="GAFFG"
								src="/gaffg.svg"
							/>
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="http://www.apcw.org/"
						>
							<img decoding="async" loading="lazy" alt="APCW" src="/apcw.svg" />
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="https://www.igbaffiliate.com/awards/igb-affiliate-awards"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="iGB Awards Shortlisted"
								src="/igb-best-affiliate.svg"
							/>
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="https://www.igbaffiliate.com/awards/igb-affiliate-awards"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="iGB Awards Shortlisted"
								src="/igb-best-poker-website.svg"
							/>
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="https://www.gamcare.org.uk/"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="Problem Gambling Support"
								src="/gamcare.svg"
							/>
						</a>
						<a
							class="footer-trusted__item"
							rel="nofollow"
							href="https://www.begambleaware.org/"
						>
							<img
								decoding="async"
								loading="lazy"
								alt="Be Gamble Aware"
								src="/begambleaware.svg"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'PageFooter',

		components: {},

		props: {},

		data: () => ({
			info:
				'Рейкбек-сделки, безопасный доступ ко всем покерным сетям и комплексные решения для игроков',
			address: 'G2 4JR, 272 Bath Street, Glasgow, United Kingdom',
			credentials: '2006–2020 © Bosslike gaming LP. <br/> All rights reserved',
		}),

		created() {},

		computed: {
			...mapGetters({
				country: 'location/country',
				topList: 'rooms/topList',
				menu: 'menu/items',
			}),
		},

		async fetch() {
			// await this.$axios.get('/menu/list').then((response) => {
			//   this.$store.commit('menu/FETCH_ITEMS', { items: response.data })
			// }, (e) => {
			// })
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$logo: url('~assets/i/layout/header/logo.svg');

	$ico-footer-instagram: url('~assets/i/ico-footer-instagram.svg?data');
	$ico-footer-twitter: url('~assets/i/ico-footer-twitter.svg?data');
	$ico-footer-vk: url('~assets/i/ico-footer-vk.svg?data');
	$ico-footer-fb: url('~assets/i/ico-footer-fb.svg?data');
	$ico-18plus: url('~assets/i/ico-18plus.svg?data');

	.footer {
		// padding-top: 90px;
		&-top {
			padding-top: 86px;
			padding-bottom: 32px;
			background: #2b2e3b;
		}
		&-bottom {
			padding: 20px 0 30px 0;
			background: #20222c;
		}
		&-logo-container {
			margin-bottom: 28px;
			display: flex;
			align-items: center;
		}
		&__logo {
			margin-right: 18px;
			width: 208px;
			height: 50px;
			background: $logo no-repeat center;
		}
		&__geo {
			width: 24px;
			height: 24px;
			border: 3px solid rgba(255, 255, 255, 0.1);
			box-sizing: content-box;
			border-radius: 50%;
		}

		&__text {
			margin-bottom: 20px;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 18px;
			color: #dedede;
		}
		&__credentials {
			margin-bottom: 10px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 14px;
			line-height: 18px;
			color: #dedede;
		}
		&__address {
			margin-bottom: 20px;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 18px;
			color: #dedede;
		}

		&-info {
			padding-bottom: 44px;
			position: relative;
			&:after {
				bottom: 0;
				left: 0;
				content: '';
				display: block;
				position: absolute;
				width: 24px;
				height: 24px;
				background: $ico-18plus no-repeat center;
			}
		}

		&-links {
			font-size: 0;
		}

		&__link {
			text-decoration: none;
			span {
				color: #aaaaaa;
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 18px;
				text-decoration: underline;
			}

			&:hover,
			&:focus,
			&:visited,
			&:link {
				color: #aaaaaa;
				text-decoration: none;
			}

			&:after {
				content: '∙';
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 18px;
				color: #aaaaaa;
				text-decoration: none;
				padding: 0 10px;
				font-weight: bold;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}
		}

		&-rooms {
			margin-bottom: 28px;
			&__label {
				margin-top: 12px;
				margin-bottom: 16px;
				font-family: 'Proxima Nova';
				font-style: normal;
				font-weight: 800;
				font-size: 16px;
				line-height: 16px;
				color: #ffffff;
			}
			&-list {
				margin: 0;
				padding: 0;
			}
			&-item {
				margin-right: 12px;
				list-style: none;
				display: inline-block;
				&__link {
					border: 1px solid rgba(255, 255, 255, 0.3);
					border-radius: 2px;
					padding: 6px 10px;
					font-family: 'Proxima Nova Sb';
					font-size: 14px;
					line-height: 16px;
					color: #ffffff;
					&:hover,
					&:focus,
					&:visited,
					&:link {
						color: #ffffff;
						text-decoration: none;
					}
				}
			}
		}

		&-categories {
			display: flex;
			justify-content: space-between;
		}

		&-category {
			flex-grow: 1;
			&:last-child {
				flex-grow: 0;
			}
			&__label {
				margin-bottom: 11px;
				font-family: 'Proxima Nova';
				font-style: normal;
				font-weight: 800;
				font-size: 16px;
				line-height: 16px;
				color: #ffffff;
			}

			&-list {
				margin: 0;
				padding: 0;
			}
		}

		&-social {
			display: flex;
			justify-content: space-between;
			&__link {
				margin-right: 20px;
				width: 32px;
				height: 32px;
				display: inline-block;
				background-repeat: no-repeat;
				background-position: center;
				&:last-child {
					margin: 0;
				}
				&_instagram {
					background-image: $ico-footer-instagram;
				}
				&_twitter {
					background-image: $ico-footer-twitter;
				}
				&_vk {
					background-image: $ico-footer-vk;
				}
				&_fb {
					background-image: $ico-footer-fb;
				}
			}
		}

		&-livechat {
			margin-top: 28px;
			margin-bottom: 24px;
		}

		&-trusted {
			&__label {
				margin-bottom: 16px;
				font-family: 'Proxima Nova';
				font-size: 14px;
				line-height: 16px;
				color: #aaaaaa;
			}

			&__links {
				display: flex;
			}

			&__item {
				display: inline-block;
				margin-right: 20px;
			}
		}
	}
</style>
