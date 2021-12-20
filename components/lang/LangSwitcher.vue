<template>
	<div class="lang-switcher">
		<button :class="['lang-switcher-btn']">
			<span
				:class="[
					'lang-switcher-btn__current',
					`lang-switcher-btn__current_lang_${locale}`,
					active && 'lang-switcher-btn__current_active',
				]"
				@click.prevent="active = !active"
			>
				<span>{{ locales[locale] }}</span>
			</span>
		</button>

		<transition name="slide">
			<ul
				v-if="active"
				:class="[
					'lang-switcher-dropdown',
					active && 'lang-switcher-dropdown_active',
				]"
			>
				<template>

					<li
						v-for="(item, index) in locales"
						v-if="index !== locale"
						:key="index"
						class="lang-switcher-dropdown__item"
					>
						<a
							v-if="page.translations.length && page.translations.some(item => {
								return item.locale === index
							})"
							:class="[
								'lang-switcher-dropdown__link',
								`lang-switcher-dropdown__link_${index}`,
							]"
							:href="`https://${
								index !== 'en' ?
								index + '.' + host + ( mapPages(index).parent ? '/' + mapPages(index).parent.slug + '/' : '/' ) + mapPages(index).slug :
								host + ( mapPages(index).parent ? '/' + mapPages(index).parent.slug + '/' : '/' ) + mapPages(index).slug}`"
							><span>{{ item }}</span></a
						>

						<a
							v-else
							:class="[
								'lang-switcher-dropdown__link',
								`lang-switcher-dropdown__link_${index}`,
							]"
							:href="`https://${index !== 'en' ? index + '.' + host : host}`"
							><span>{{ item }}</span></a
						>
					</li>

				</template>

<!-- 				<template v-else>
					<li
						v-for="(item, index) in locales"
						v-if="index !== locale"
						:key="index"
						class="lang-switcher-dropdown__item"
					>
						<a
							:class="[
								'lang-switcher-dropdown__link',
								`lang-switcher-dropdown__link_${index}`,
							]"
							:href="`https://${
								index !== 'en' ?
								index + '.' + host + $route.fullPath :
								host + $route.fullPath}`"
							><span>{{ item }}</span></a
						>
					</li>
				</template> -->
			</ul>
		</transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'LangSwitcher',

		components: {},

		props: {},

		data: () => ({
			active: false,
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

	.lang-switcher {
		margin: 0 0 0 32px;
		vertical-align: middle;
		position: relative;
	}
	.lang-switcher-btn {
		margin: 0;
		padding: 0;
		background: transparent;
		border: none;
		white-space: nowrap;
		&:active,
		&:focus {
			outline: none;
		}
		&__list {
			padding: 0;
		}

		&__current {
			cursor: pointer;
			position: relative;
			padding: 11px 12px;
			display: flex;
			align-items: center;
			color: #999999;
			background: #2f323f;
			border: 1px solid rgba(204, 204, 204, 0.1);
			border-radius: 4px;
			span {
				opacity: 0.5;
				color: #cccccc;
				font-size: 12px;
				line-height: 12px;
				font-style: normal;
				font-family: 'Proxima Nova Sb';
			}

			&_active {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

			&:focus,
			&:active {
				outline: none;
			}
			&:before {
				content: '';
				margin-right: 10px;
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				height: 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}
			&_lang {
				&_ru {
					&:before {
						background-image: $ico-lang-ru;
					}
				}
				&_en {
					&:before {
						background-image: $ico-lang-en;
					}
				}
				&_es {
					&:before {
						background-image: $ico-lang-es;
					}
				}
			}
		}
	}

	.lang-switcher-dropdown {
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		// border: 1px solid rgba(204, 204, 204, 0.1);
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0px 15px 40px;

		&_active {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			z-index: 2;
			border-top: 0;
		}
		&__item {
			&:focus,
			&:active {
				outline: none;
			}
		}

		&__link {
			cursor: pointer;
			position: relative;
			padding: 11px 12px;
			display: flex;
			align-items: center;
			color: #999999;
			background: #2f323f;
			span {
				opacity: 0.8;
				color: #ffffff;
				font-size: 12px;
				line-height: 12px;
				font-style: normal;
				font-family: 'Proxima Nova Sb';
			}
			&:active,
			&:focus,
			&:hover {
				span {
					opacity: 0.5;
					color: #cccccc;
				}
				text-decoration: none;
			}

			&:before {
				content: '';
				margin-right: 10px;
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				height: 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}

			&_ru {
				&:before {
					background-image: $ico-lang-ru;
				}
			}
			&_en {
				&:before {
					background-image: $ico-lang-en;
				}
			}
			&_es {
				&:before {
					background-image: $ico-lang-es;
				}
			}
		}
	}
</style>
