<template>
	<header class="header">
		<div class="header__inner">
			<div class="header__wrap">
				<div class="header__hamburger-menu" @click="showHamburger = true">
					<img :src="hamburgerSrc" />
				</div>

				<div
					class="logo header__logo"
					:class="{ 'header__logo--hide': hideLogoAndGeo }"
				>
					<router-link v-slot="{ href, route, navigate }" to="/">
						<a :href="href" class="logo__link" title="worldpokerdeals.com"
							>worldpokerdeals.com</a
						>
					</router-link>
				</div>

				<div
					class="geo header__geo"
					:class="{ 'header__geo--hide': hideLogoAndGeo }"
				>
					<svg-icon
						key="header"
						:width="24"
						:height="24"
						prefix="flags/"
						:icon="country.code"
					/>
				</div>

				<div
					class="header-nav__wrap"
					:class="{
						'header-nav__wrap--hide': hideNav,
						'header-nav__wrap--opened': showHamburger,
					}"
				>
					<!-- Nav -->
					<nav class="header-nav" :class="{ 'header-nav--hide': hideNav }">
						<ul class="header-nav__list">
							<li class="header-nav__item close-nav-button__wrapper">
								<button class="close-nav-button" @click="showHamburger = false">
									<img
										class="close-nav-button__icon"
										src="~assets/i/ico-modal-close.svg?data"
									/>
								</button>
							</li>
							<li
								class="header-nav__item"
								:class="{
									'header-nav__item--active': openedMenuItem === 'rooms',
								}"
								@click="onMenuItemClick($event, 'rooms')"
							>
								<a class="header-nav__link" href="/rakeback-deals"
									>{{ $t('poker_rooms') }}
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
								<transition name="fade">
									<page-menu
										:width="isDesktop ? 900 : menuWidth"
										:items="menu.rooms"
										:columns="isDesktop ? 2 : 1"
									>
										<template #after>
											<room-top-list
												:label="$t('best_rooms')"
												type="menu"
												:style="{
													flex: '0 0 300px',
													position: 'relative',
													zIndex: '2',
													boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
												}"
											/>
										</template>
									</page-menu>
								</transition>
							</li>
							<li
								class="header-nav__item"
								:class="{
									'header-nav__item--active': openedMenuItem === 'news',
								}"
								@click="onMenuItemClick($event, 'news')"
							>
								<a class="header-nav__link" href="/blog">
									{{ $t('news') }}
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
								<transition name="fade">
									<page-menu :items="menu.posts" />
								</transition>
							</li>
							<li
								class="header-nav__item"
								:class="{
									'header-nav__item--active': openedMenuItem === 'deals',
								}"
								@click="onMenuItemClick($event, 'deals')"
							>
								<a class="header-nav__link" href="/promotions"
									>{{ $t('promotions') }}
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
								<transition name="fade">
									<page-menu
										:items="menu.promotions"
										:width="isDesktop ? 600 : menuWidth"
									>
										<template v-if="isDesktop" #after>
											<payment-menu
												:style="{
													flex: '0 0 300px',
													position: 'relative',
													zIndex: '2',
													boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
												}"
											/>
										</template>
									</page-menu>
								</transition>
							</li>

							<li
								class="header-nav__item"
								:class="{
									'header-nav__item--active': openedMenuItem === 'online-poker',
								}"
								@click="onMenuItemClick($event, 'online-poker')"
							>
								<a class="header-nav__link" href="#"
									>{{ $t('online_poker') }}
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
								<transition name="fade">
									<page-menu
										:items="menu.poker"
										:columns="isDesktop ? 2 : 1"
										:width="isDesktop ? 600 : menuWidth"
									/>
								</transition>
							</li>

							<li
								class="header-nav__item"
								:class="{
									'header-nav__item--active': openedMenuItem === 'about-us',
								}"
								@click="onMenuItemClick($event, 'about-us')"
							>
								<a class="header-nav__link" href="/our-team"
									>{{ $t('about_us') }}
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
								<transition name="fade">
									<page-menu :items="menu.about" />
								</transition>
							</li>

							<li
								class="header-nav__item header-nav__item__lang"
								:class="{
									'header-nav__item--active': openedMenuItem === 'lang',
								}"
								@click="onMenuItemClick($event, 'lang')"
							>
								<a class="header-nav__link" href="/our-team"
									>Change lang
									<img
										class="header-nav__arrow"
										src="~assets/i/layout/header/ico-arrow-down.svg?data"
									/>
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div
					class="search__wrapper"
					:class="{ 'search__wrapper--opened': showSearch }"
				>
					<div v-show="showSearch" class="search header__search">
						<input
							v-model="query"
							:class="{
								search__input: true,
								search__input_loading: searchLoading,
								search__input_focused: searchFocus,
								search__input_dropdown: searchDropdownOpen,
							}"
							type="text"
							name="search"
							autocomplete="off"
							:placeholder="searchPlaceholder"
							@focusin="handleFocusIn"
							@focusout="handleFocusOut"
							@keydown.esc="handleFocusOut"
						/>
						<search-loader :loading="searchLoading" />
						<search-dropdown
							v-if="searchFocus"
							v-model="query"
							@loading="handleLoading($event)"
							@open="searchDropdownOpen = $event"
							@close="searchDropdownOpen = $event"
						/>
					</div>

					<button
						:style="{
							opacity: !searchLoading ? 0.5 : 0,
						}"
						:class="['search-toggle', showSearch && 'search-toggle--active']"
						aria-label="Search"
						@click.prevent="handleSearchClick"
					></button>
				</div>

				<div class="header-buttons">
					<a
						href="/vip"
						class="btn btn-vip"
						title="VIP-сервис"
						aria-label="VIP-сервис"
					></a>

					<!--           <button :class="['lang-switcher']">
            <span :class="[
            'lang-switcher__current',
            `lang-switcher__current_lang_${locale}`
            ]">
              <span>{{ locales[locale] }}</span>
            </span>
          </button> -->

					<lang-switcher />

					<button v-if="user" :class="['user-dropdown']">
						<img
							v-if="avatar"
							width="36px"
							height="36px"
							decoding="async"
							class="user-dropdown__img"
							loading="lazy"
							:src="avatar"
							:alt="user.full_name"
						/>
						<svg-icon
							v-else
							class="user-dropdown__img"
							:width="36"
							:height="36"
							view-box="0 0 36 36"
							icon="user-avatar"
						/>
					</button>

					<button
						v-else
						class="btn btn-md btn-primary btn_login"
						@click="handleAuth"
					>
						{{ $t('sign_in') }}
					</button>
					<button class="header-buttons__login" @click="handleAuth">
						<img :src="loginSrc" />
					</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex'
	// import axios from 'axios'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'PageHeader',

		components: {
			SearchDropdown: () => import('~/components/search/SearchDropdown'),
			SearchLoader: () => import('~/components/search/SearchLoader'),
		},

		props: {},

		data: () => ({
			query: '',
			geoReady: false,
			searchFocus: false,
			searchLoading: false,
			searchDropdownOpen: false,
			showSearch: false,
			openedMenuItem: null,
			isDesktop: true,
			menuWidth: 436,
			showHamburger: false,
		}),

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				locale: 'lang/locale',
				// locales: 'lang/locales',
				country: 'location/country',
				topList: 'rooms/topList',
				menu: 'menu/items',
			}),

			geoSrc() {
				return require(`~/assets/i/flags/${this.country.code}.svg?data`)
			},

			loginSrc() {
				return require('~/assets/icons/ico-login.svg?data')
			},

			hamburgerSrc() {
				return require('~/assets/icons/ico-hamburger-menu.svg?data')
			},

			searchPlaceholder() {
				return this.searchFocus ? '' : 'Найти что-угодно, например: GGPoker'
			},

			avatar() {
				return this.user.image
					? `${this.mediaUrl}/user-icon/${this.user.image.filename}`
					: null
			},

			mediaUrl() {
				return process.env.mediaUrl
			},

			hideLogoAndGeo() {
				return (
					this.showSearch &&
					window.innerWidth <= 1122 &&
					window.innerWidth >= 768
				)
			},

			hideNav() {
				return this.showSearch && window.innerWidth >= 768
			},
		},

		async fetch() {
			await this.$axios
				.get('/menu/list', {
					params: {
						locale: this.locale,
					},
				})
				.then(
					response => {
						this.$store.commit('menu/FETCH_ITEMS', { items: response.data })
					},
					e => {}
				)
		},

		watch: {},

		mounted() {
			this.isDesktop = window.innerWidth >= 1280
			this.menuWidth = window.innerWidth < 436 ? window.innerWidth : 436
		},

		methods: {
			handleAuth() {
				eventBus.$emit('authModal:show', true)
			},

			handleFocusIn() {
				this.searchFocus = true
			},

			handleFocusOut(evt) {
				this.query = ''
				this.searchFocus = false
				evt.target.blur()
			},

			handleLoading($event) {
				this.searchLoading = $event
			},

			handleSearchClick() {
				this.showSearch = !this.showSearch
			},

			onMenuItemClick(event, type) {
				if (window.innerWidth < 1280) {
					event.preventDefault()
					this.openedMenuItem = this.openedMenuItem === type ? null : type
				}
			},
		},
	}
</script>

<style lang="scss">
	$logo: url('~assets/i/layout/header/logo.svg');
	$ico-vip: url('~assets/i/layout/header/ico-vip.svg?data');
	$ico-search: url('~assets/i/layout/header/ico-search-btn.svg?data');
	$ico-search-close: url('~assets/i/layout/header/ico-search-close.svg?data');
	$ico-arrow-down: url('~assets/i/layout/header/ico-arrow-down.svg?data');

	.header {
		position: sticky;
		top: 0;
		background: linear-gradient(180deg, #2b2e3b 47.41%, #20222c 100%);
		z-index: 110;
		&__inner {
			padding: 0 26px;
			max-width: 1440px;
			margin: 0 auto;
		}
		&__hamburger-menu {
			display: none;
			cursor: pointer;
		}
		&__wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&__geo {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			border: 3px solid rgba(255, 255, 255, 0.1);
			display: flex;
			margin-right: auto;
			&--hide {
				display: none;
			}
		}

		&__logo {
			margin-top: -5px;
			margin-right: 16px;
			&--hide {
				display: none;
			}
		}

		&__search {
			display: block;
			width: 100%;
		}

		&-buttons {
			padding: 22px 0;
			margin-left: 30px;
			display: flex;
			align-items: center;
			&__login {
				display: none;
			}
		}

		&-nav {
			&--hide {
				display: none;
			}
			&__wrap {
				margin-left: 32px;
				position: relative;
				display: flex;
				align-items: center;
				margin-left: auto;
				&--hide {
					position: fixed;
					top: 0;
					left: 0;
				}
			}
			&__list {
				padding: 0;
				margin: 0;
				list-style: none;
				display: flex;
				align-items: center;
			}

			&__item {
				position: relative;
				&__lang {
					display: none;
				}
				&:last-child {
					margin: 0;
				}
			}

			&__arrow {
				display: none;
			}

			&__link {
				white-space: nowrap;
				padding: 30px 24px;
				display: block;
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 20px;
				color: #cccccc;
				text-decoration: none;
				position: relative;
				z-index: 2;
			}

			&__item:hover &__link {
				color: #ffffff;
				text-decoration: none;
				background: #2b2e3b;
				box-shadow: 0px 1px 0px #2b2e3b;
			}
		}
	}

	.close-nav-button {
		padding: 12px;
		@include paddings('laptop');
		margin: 0;
		outline: none;
		border: none;
		background: none;
		&__wrapper {
			display: none;
		}
	}

	.logo {
		width: 208px;
		height: 50px;
		&__link {
			text-indent: -999999px;
			width: 208px;
			height: 50px;
			display: block;
			background: $logo no-repeat center;
		}
	}

	.search {
		&__wrapper {
			display: flex;
			position: relative;
			max-width: 575px;
			margin-right: 32px;
			&--opened {
				width: 100%;
			}
		}
		&__input {
			width: 100%;
			padding: 9px 40px 9px 50px;
			border: 1px solid rgba(204, 204, 204, 0.1);
			border-radius: 4px;
			caret-color: #888888;
			color: #e5e5e5;
			line-height: 20px;
			font-size: 16px;
			font-family: 'Proxima Nova';
			background: #2f323f $ico-search no-repeat 15px center;
			box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.3);
			z-index: 1;
			&:focus,
			&:active {
				outline: none;
			}
			&::-webkit-input-placeholder {
				font: 14px/16px 'Proxima Nova';
			}
			&::-moz-placeholder {
				font: 14px/16px 'Proxima Nova';
			}
			&:-ms-input-placeholder {
				font: 14px/16px 'Proxima Nova';
			}
			&:-moz-placeholder {
				font: 14px/16px 'Proxima Nova';
			}
			&_dropdown {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}

	.btn {
		&-vip {
			padding: 0;
			width: 36px;
			height: 32px;
			background: $ico-vip no-repeat center;
			white-space: nowrap;
		}
	}

	.search-toggle {
		position: relative;
		margin-right: 8px;
		margin-left: 38px;
		padding: 0;
		width: 40px;
		height: 40px;
		outline: none;
		border: none;
		background: $ico-search no-repeat center;
		&:active,
		&:focus {
			outline: none;
			border: none;
		}
		&--active {
			position: absolute;
			right: 0px;
			top: 0px;
			margin: 0;
			padding: 0;
			opacity: 0.5;
			background: $ico-search-close no-repeat center;
		}
	}

	.user-dropdown {
		position: relative;
		margin-left: 32px;
		padding: 0 15px 0 0;
		background: transparent;
		border: none;
		border-radius: 50%;
		display: flex;
		&:after {
			content: '';
			width: 10px;
			height: 6px;
			display: block;
			position: absolute;
			right: 0px;
			top: 17px;
			background: $ico-arrow-down;
		}
		&__img {
			border: 2px solid rgba(255, 255, 255, 0.1);
			border-radius: 50%;
		}
		&:active,
		&:focus {
			outline: none;
		}
	}

	.btn_login {
		margin-left: 32px;
	}

	@include mq('desktop') {
		.search {
			&__wrapper {
				margin-right: 0;
			}
		}

		.btn_login {
			margin-left: 28px;
		}

		.lang-switcher {
			margin-left: 28px;
		}

		.header-nav {
			&__wrap {
				max-width: 655px;
			}
		}
	}

	@include mq('laptop') {
		.header-buttons {
			justify-content: space-between;
		}

		.header {
			&__inner {
				@include paddings('laptop');
			}
			&__geo {
				margin-right: auto;
			}
			&__hamburger-menu {
				display: block;
				margin-right: 16px;
				margin-left: -8px;
			}
		}

		.header-nav {
			width: 100%;
			&__wrap {
				position: fixed;
				top: 0;
				left: -100%;
				&--opened {
					left: 0;
					height: 100vh;
					align-items: flex-start;
				}
				width: 100vw;
				margin-left: 0;
				background: #2b2e3b;
				max-width: 436px;
				z-index: 999;
				box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.5);
			}
			&__list {
				flex-direction: column;
			}
			&__item {
				width: 100%;
				position: relative;
				cursor: pointer;
				&--active {
					.top-rooms {
						display: none;
					}
				}
				&__close-button {
					height: 64px;
				}
				&__lang {
					display: block;
					border-top: 1px solid rgba(#cccccc, 0.1);
				}
				&:nth-last-child(2) {
					margin-bottom: 16px;
				}
				&:nth-last-child(1) {
					padding-top: 16px;
					padding-bottom: 16px;
				}
			}

			&__arrow {
				display: block;
				position: absolute;
				width: 14px;
				height: 8px;
				top: 50%;
				transform: translateY(-50%);
				right: 28px;
			}
			&__item--active &__arrow {
				transform: rotate(180deg);
			}
			&__link {
				font-weight: bold;
				font-size: 20px;
				line-height: 24px;
				color: #ffffff;
				padding-top: 12px;
				padding-bottom: 12px;
				@include paddings('laptop');
			}
		}

		.search-toggle {
			margin-left: auto;
			margin-right: 0;
		}
		.lang-switcher {
			display: none;
		}
		.btn-vip {
			height: 32px;
			widows: auto;
			background-size: contain;
		}
		.close-nav-button {
			&__wrapper {
				display: flex;
				align-items: center;
				height: 64px;
			}
		}
	}

	@include mq('tablet') {
		.header {
			&__inner {
				@include paddings('tablet');
			}
			&__geo {
				display: none;
			}
			&__logo {
				width: 158px;
			}
		}

		.header-buttons__login {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
			padding: 0;
			outline: none;
			background: none;
			border: none;
			margin-left: 30px;
			opacity: 0.7;
		}

		.logo {
			&__link {
				width: 140px;
				background-size: contain;
			}
		}

		.search-toggle {
			width: 16px;
			height: 16px;
			background-size: contain;
			margin-left: 0;
		}

		.btn-vip {
			height: 32px;
			widows: auto;
			background-size: contain;
		}
		.lang-switcher {
			display: none;
		}
		.btn_login {
			display: none;
		}
	}

	@include mq('mobile') {
		.header {
			&__inner {
				@include paddings('mobile');
			}
		}
	}
</style>
