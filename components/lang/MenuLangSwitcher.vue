<template>
	<div class="menu-lang-switcher">
		<button
			:class="[
				'menu-lang-switcher__button',
				`menu-lang-switcher__button--${locale}`,
			]"
			@click="isOpen = !isOpen"
		>
			<span :class="['menu-lang-switcher__button__current']">
				{{ getLanguageName(locale) }}
			</span>
			<img
				class="menu-lang-switcher__arrow"
				:class="{ 'menu-lang-switcher__arrow--opened': isOpen }"
				src="~assets/i/layout/header/ico-arrow-down.svg?data"
			/>
		</button>

		<transition name="slide">
			<ul
				v-if="isOpen"
				:class="[
					'menu-lang-switcher__dropdown',
					isOpen && 'menu-lang-switcher__dropdown--opened',
				]"
			>
				<template>

					<li
						v-for="(item, index) in locales"
						v-if="index !== locale"
						:key="index"
						class="menu-lang-switcher__dropdown-item"
					>
						<a
							v-if="page.translations.length && page.translations.some(item => {
								return item.locale === index
							})"
							:class="[
								'menu-lang-switcher__dropdown-item__link',
								`menu-lang-switcher__dropdown-item__link--${index}`,
							]"
							:href="`https://${
								index !== 'en' ?
								index + '.' + host + ( mapPages(index).parent ? '/' + mapPages(index).parent.slug + '/' : '/' ) + mapPages(index).slug :
								host + ( mapPages(index).parent ? '/' + mapPages(index).parent.slug + '/' : '/' ) + mapPages(index).slug}`"
							><span>{{ getLanguageName(index) }}</span></a
						>

						<a
							v-else
							:class="[
								'menu-lang-switcher__dropdown-item__link',
								`menu-lang-switcher__dropdown-item__link--${index}`,
							]"
							:href="`https://${index !== 'en' ? index + '.' + host : host}`"
							><span>{{ getLanguageName(index) }}</span></a
						>
					</li>
				</template>
			</ul>
		</transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'MenuLangSwitcher',

		components: {},

		props: {},

		data: () => ({
			isOpen: false,
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				locales: 'lang/locales',
				page: 'pages/page',
			}),

			host() {
				return process.env.hostName
			},
		},

		watch: {},

		methods: {
			getLanguageName(locale) {
				if (locale === 'en') return 'English'
				if (locale === 'ru') return 'Русский'
				if (locale === 'es') return 'Spanish'
			},
			mapPages(locale) {
				return this.page.translations.filter(item => { return item.locale === locale })[0]
			}
		},
	}
</script>

<style lang="scss">
	$ico-lang-ru: url('~assets/i/layout/header/ico-lang-ru.svg?data');
	$ico-lang-en: url('~assets/i/layout/header/ico-lang-en.svg?data');
	$ico-lang-es: url('~assets/i/layout/header/ico-lang-es.svg?data');

	.menu-lang-switcher {
		&__button,
		&__dropdown-item__link {
			display: inline-block;
			height: 44px;
			width: 100%;
			padding: 12px 24px 12px 64px;
			text-align: left;
			position: relative;
			border: 0;
			outline: none;
			color: #cccccc;
			font-size: 16px;
			line-height: 20px;
			background: none;

			&:before {
				content: '';
				position: absolute;
				display: inline-block;
				width: 24px;
				height: 16px;
				top: 50%;
				left: 24px;
				transform: translateY(-50%);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}

			&--ru {
				&:before {
					background-image: $ico-lang-ru;
				}
			}
			&--en {
				&:before {
					background-image: $ico-lang-en;
				}
			}
			&--es {
				&:before {
					background-image: $ico-lang-es;
				}
			}
		}

		&__dropdown-item {
			&:hover,
			&:active,
			&:focus {
				text-decoration: none;
				background: linear-gradient(0deg, #353847, #353847);
				box-shadow: inset 8px 0px 0px #2988c9;
			}
			&__link {
				color: #ccc;
				&:hover,
				&:active,
				&:focus {
					text-decoration: none;
					color: #ccc;
				}
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
			&--opened {
				transform: rotate(180deg);
			}
		}

		&__dropdown {
			margin: 0;
			padding: 0;
			list-style: none;
			display: none;
			&--opened {
				display: block;
			}
		}
	}

	@include mq('tablet') {
		.menu-lang-switcher {
			&__button,
			&__dropdown-item__link {
				padding-left: 60px;
				&:before {
					left: 20px;
				}
			}
		}
	}
</style>
