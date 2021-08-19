<template>
	<footer class="footer">
		<best-room
			v-if="topList"
			:title="topList[0].title"
			:background="topList[0].background"
			:image="topList[0].image"
			:review="topList[0].review"
			:country="country"
		/>
		<div class="footer__top">
			<div class="footer__top__inner">
				<div class="footer__info">
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
					<div class="footer__text">{{ $t('rakeback_deals_and_safe_access') }}</div>
					<div class="footer__credentials" v-html="credentials"></div>
					<div class="footer__address">{{ address }}</div>
					<div class="footer__info__buttons">
						<div class="footer-livechat">
							<button-contact size="md" type="chat" block
								>{{ $t('live_chat') }}</button-contact
							>
						</div>
						<div class="footer-social">
							<a
								href="https://instagram.com/worldpokerdeals"
								class="footer-social__link footer-social__link-instagram"
								target="_blank"
								rel="nofollow"
							></a>
							<a
								href="https://twitter.com/worldpokerdeals"
								class="footer-social__link footer-social__link-twitter"
								target="_blank"
								rel="nofollow"
							></a>
							<a
								href="https://vk.com/worldpokerdeals"
								class="footer-social__link footer-social__link-vk"
								target="_blank"
								rel="nofollow"
							></a>
							<a
								href="https://www.facebook.com/worldpokerdealsRu"
								class="footer-social__link footer-social__link-fb"
								target="_blank"
								rel="nofollow"
							></a>
						</div>
					</div>
				</div>

				<div class="footer-rooms">
					<div class="footer-rooms__header">
						<div class="footer-rooms__label">{{ $t('rooms_best') }}</div>
						<ul
							class="footer-rooms__list"
							@dragscrollstart="isDraggingTopRooms = true"
							@dragscrollend="isDraggingTopRooms = false"
							:class="{ 'disable-dragging': isDraggingTopRooms }"
							v-dragscroll
						>
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
								<li class="footer-rooms__item">
									<a
										:class="['footer-rooms__item__link']"
										:href="href"
										@click="navigate"
										>{{ item.title }}</a
									>
								</li>
							</nuxt-link>
						</ul>
					</div>

					<div class="footer-categories">
						<div
							v-if="menu && menu.rooms"
							class="footer-category footer-categories__rooms"
							:class="{ 'footer-category--active': activeCategory === 'rooms' }"
						>
							<div
								class="footer-category__label"
								@click="onCategoryItemClick('rooms')"
							>
								{{ $t('menu.rooms') }}
								<svg-icon
									class="footer-category__arrow"
									:width="20"
									:height="20"
									icon="arrow-down"
								/>
							</div>
							<div class="footer-category__list">
								<page-footer-menu-item
									v-for="(item, index) in menu.rooms"
									:key="index"
									:page="item.page"
									:name="item.name"
									:icon="item.icon"
								/>
							</div>
						</div>

						<div
							v-if="menu && menu.posts"
							class="footer-category footer-categories__news"
							:class="{ 'footer-category--active': activeCategory === 'news' }"
						>
							<div
								class="footer-category__label"
								@click="onCategoryItemClick('news')"
							>
								{{ $t('menu.news') }}
								<svg-icon
									class="footer-category__arrow"
									:width="20"
									:height="20"
									icon="arrow-down"
								/>
							</div>
							<div class="footer-category__list">
								<page-footer-menu-item
									v-for="(item, index) in menu.posts"
									:key="index"
									:page="item.page"
									:name="item.name"
									:icon="item.icon"
								/>
							</div>
						</div>

						<div
							v-if="menu && menu.promotions"
							class="footer-category footer-categories__promotions"
							:class="{
								'footer-category--active': activeCategory === 'promotions',
							}"
						>
							<div
								class="footer-category__label"
								@click="onCategoryItemClick('promotions')"
							>
								{{ $t('menu.promotions') }}
								<svg-icon
									class="footer-category__arrow"
									:width="20"
									:height="20"
									icon="arrow-down"
								/>
							</div>
							<div class="footer-category__list">
								<page-footer-menu-item
									v-for="(item, index) in menu.promotions"
									:key="index"
									:page="item.page"
									:name="item.name"
									:icon="item.icon"
								/>
							</div>
						</div>

						<div
							v-if="menu && menu.poker"
							class="footer-category footer-categories__poker"
							:class="{ 'footer-category--active': activeCategory === 'poker' }"
						>
							<div
								class="footer-category__label"
								@click="onCategoryItemClick('poker')"
							>
								{{ $t('menu.online_poker') }}
								<svg-icon
									class="footer-category__arrow"
									:width="20"
									:height="20"
									icon="arrow-down"
								/>
							</div>
							<div class="footer-category__list">
								<page-footer-menu-item
									v-for="(item, index) in menu.poker"
									:key="index"
									:page="item.page"
									:name="item.name"
									:icon="item.icon"
								/>
							</div>
						</div>

						<div
							v-if="menu && menu.about"
							class="footer-category footer-categories__about-us"
							:class="{
								'footer-category--active': activeCategory === 'about-us',
							}"
						>
							<div
								class="footer-category__label"
								@click="onCategoryItemClick('about-us')"
							>
								{{ $t('menu.about') }}
								<svg-icon
									class="footer-category__arrow"
									:width="20"
									:height="20"
									icon="arrow-down"
								/>
							</div>
							<div class="footer-category__list">
								<page-footer-menu-item
									v-for="(item, index) in menu.about"
									:key="index"
									:page="item.page"
									:name="item.name"
									:icon="item.icon"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="footer__bottom">
			<div class="footer__bottom__inner">
				<div class="footer-awards">
					<div class="footer-awards__label">{{ $t('trusted_by') }}</div>
					<div class="footer-awards__links">
						<a
							id="GPWASeal"
							class="footer-awards__item"
							rel="nofollow"
							href="https://certify.gpwa.org/verify/ru/worldpokerdeals.com/"
						>
							<img decoding="async" loading="lazy" src="/gpwa.svg" />
						</a>
						<a
							class="footer-awards__item"
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
							class="footer-awards__item"
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
							class="footer-awards__item"
							rel="nofollow"
							href="http://www.apcw.org/"
						>
							<img decoding="async" loading="lazy" alt="APCW" src="/apcw.svg" />
						</a>
						<a
							class="footer-awards__item"
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
							class="footer-awards__item"
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
							class="footer-awards__item"
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
							class="footer-awards__item"
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

				<div class="footer-links__wrapper">
					<div class="footer-links">
						<!-- <a class="footer-links__link" href="#"><span>Дисклеймер</span></a> -->
						<a class="footer-links__link" href="/terms"
							><span>{{ $t('menu.terms') }}</span></a
						>
						<a v-if="locale !== 'ru'" class="footer-links__link" href="/privacy"
							><span>{{ $t('menu.privacy') }}</span></a
						>
						<a
							target="_blank"
							v-if="locale !== 'ru'"
							class="footer-links__link"
							href="/privacy#cookies"
							><span>{{ $t('menu.cookie') }}</span></a
						>
					</div>
					<svg-icon
						class="footer-links__wrapper__icon"
						:width="24"
						:height="24"
						icon="18plus"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	import SvgIcon from '../SvgIcon.vue'

	export default {
		name: 'PageFooter',

		components: {},

		props: {
			SvgIcon,
		},

		data: () => ({
			info:
				'Рейкбек-сделки, безопасный доступ ко всем покерным сетям и комплексные решения для игроков',
			address: 'G2 4JR, 272 Bath Street, Glasgow, United Kingdom',
			credentials: '2006–2021 © Bosslike gaming LP. <br/> All rights reserved',
			activeCategory: null,
			isDraggingTopRooms: false,
		}),

		created() {},

		computed: {
			...mapGetters({
				country: 'location/country',
				topList: 'rooms/topList',
				menu: 'menu/items',
				locale: 'lang/locale',
			}),
		},

		async fetch() {
			// await this.$axios.get('/menu/list').then((response) => {
			//   this.$store.commit('menu/FETCH_ITEMS', { items: response.data })
			// }, (e) => {
			// })
		},

		watch: {},

		methods: {
			onCategoryItemClick(type) {
				if (window.innerWidth < 768) {
					this.activeCategory = this.activeCategory === type ? null : type
				}
			},
		},
	}
</script>

<style lang="scss">
	$logo: url('~assets/i/layout/header/logo.svg');

	$ico-footer-instagram: url('~assets/i/ico-footer-instagram.svg?data');
	$ico-footer-twitter: url('~assets/i/ico-footer-twitter.svg?data');
	$ico-footer-vk: url('~assets/i/ico-footer-vk.svg?data');
	$ico-footer-fb: url('~assets/i/ico-footer-fb.svg?data');

	.footer {
		display: flex;
		flex-direction: column;
		background: #2b2e3b;
		position: relative;
		&__top {
			padding-bottom: 32px;
			background: #2b2e3b;
		}
		&__top__inner {
			display: grid;
			max-width: 1440px;
			margin: 0 auto;
			grid-template-columns: 1fr minmax(0, 3fr);
			grid-template-areas: 'info rooms';
			column-gap: 28px;
			@include paddings('desktop');
		}
		&__info {
			grid-area: info;
			margin-top: -10px;
			&__buttons {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}
		}
		&__bottom {
			background: #20222c;
			padding-top: 20px;
			padding-bottom: 28px;
		}
		&__bottom__inner {
			display: flex;
			max-width: 1440px;
			margin: 0 auto;
			flex-direction: column;
			@include paddings('desktop');
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
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 18px;
			color: #dedede;
		}
	}

	.footer-logo-container {
		margin-bottom: 28px;
		display: flex;
		align-items: center;
	}

	.footer-livechat {
		margin-top: 28px;
		margin-bottom: 24px;
		max-width: 230px;
	}

	.footer-categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-areas: 'rooms news promotions poker about-us';
		&__rooms {
			grid-area: rooms;
		}
		&__news {
			grid-area: news;
		}
		&__promotions {
			grid-area: promotions;
		}
		&__poker {
			grid-area: poker;
		}
		&__about-us {
			grid-area: about-us;
		}
	}

	.footer-category {
		&__label {
			margin-bottom: 11px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: 800;
			font-size: 16px;
			line-height: 16px;
			color: #ffffff;
		}
		& &__arrow {
			display: none;
		}

		&__list {
			margin: 0;
			padding: 0;
		}
	}

	.footer-rooms {
		grid-area: rooms;
		display: flex;
		flex-direction: column;
		background: #2b2e3b;
		&__header {
			margin-bottom: 28px;
		}
		&__label {
			font-family: 'Proxima Nova';
			font-style: normal;
			padding-bottom: 16px;
			font-weight: 800;
			font-size: 16px;
			line-height: 16px;
			color: #ffffff;
		}
		&__list {
			display: flex;
			margin: 0;
			padding: 0;
		}
		&__item {
			margin-right: 12px;
			list-style: none;
			display: inline-block;
			&__link {
				display: block;
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

	.footer-awards {
		grid-area: awards;
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

	.footer-links {
		font-size: 0;
		background: #20222c;
		&__wrapper {
			grid-area: links;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 24px;
			&__icon {
				flex-shrink: 0;
			}
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
	}

	.footer-social {
		display: flex;
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
			&-instagram {
				background-image: $ico-footer-instagram;
			}
			&-twitter {
				background-image: $ico-footer-twitter;
			}
			&-vk {
				background-image: $ico-footer-vk;
			}
			&-fb {
				background-image: $ico-footer-fb;
			}
		}
	}

	@include mq('laptop') {
		.footer {
			&__top__inner {
				@include paddings('tablet');
			}
			&__bottom__inner {
				@include paddings('tablet');
			}
		}
		.footer-awards {
			&__links {
				flex-wrap: wrap;
				gap: 20px;
			}
			&__item {
				margin-right: 0;
			}
		}

		.footer-rooms {
			&__item {
				white-space: nowrap;
			}
			&__list {
				overflow-x: scroll;
				@include hide-scroll();
				cursor: grab;
				margin-right: -24px;
			}
		}

		.footer-categories {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-areas: 'rooms news promotions' '. poker about-us';
			&__poker {
				margin-top: -20%;
			}
			&__about-us {
				margin-top: -20%;
			}
		}
	}

	@include mq('tablet') {
		.footer {
			&__top__inner {
				display: grid;
				grid-template-columns: 100%;
				grid-template-areas: 'info' 'rooms';
				@include paddings('mobile');
			}
			&__info {
				&__buttons {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
				}
			}
			&__bottom__inner {
				@include paddings('mobile');
			}
		}
		.footer-rooms {
			&__header {
				display: none;
			}
		}

		.footer-awards {
			&__item {
				img {
					height: 36px;
				}
			}
		}

		.footer-categories {
			display: grid;
			grid-template-columns: 100%;
			grid-template-areas: 'rooms' 'news' 'promotions' 'poker' 'about-us';
			&__poker {
				margin-top: 0;
			}
			&__about-us {
				margin-top: 0;
			}
		}

		.footer-category {
			&__label {
				position: relative;
				cursor: pointer;
				margin: 0;
				padding: 12px 0;
			}
			& &__arrow {
				display: block;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
			}
			&--active & {
				&__list {
					display: block;
				}
				&__arrow {
					transform: translateY(-50%) rotate(180deg);
				}
			}

			&__list {
				display: none;
				margin-top: 10px;
			}
		}
	}
</style>
