<template>
	<div :class="['top-rooms', `top-rooms_${type}`]">
		<div :class="['top-rooms-header', `top-rooms-header_${type}`]">
			<template v-if="type === 'front'">
				<button
					:class="[
						'top-rooms-header__button',
						!showApps && 'top-rooms-header__button_active',
					]"
					:disabled="!showApps"
					@click="handleToggleApps"
				>
					<svg-icon
						:class="[
							'top-rooms-header__flag',
							`top-rooms-header__flag_${type}`,
						]"
						:icon="country.code"
						prefix="flags/"
						:width="24"
						:height="24"
					/>
					<div
						:class="[
							'top-rooms-header__label',
							`top-rooms-header__label_${type}`,
						]"
					>
						{{ $t('top_rooms') }}
					</div>
					<div
						:class="[
							'top-rooms-header__country',
							`top-rooms-header__country_${type}`,
						]"
					>
						{{ $t('for_country', { country: country.from }) }}
					</div>
				</button>
				<button
					:class="[
						'top-rooms-header__button',
						showApps && 'top-rooms-header__button_active',
					]"
					:disabled="showApps"
					@click="handleToggleApps"
				>
					<div
						:class="[
							'top-rooms-header__label',
							`top-rooms-header__label_${type}`,
						]"
					>
						{{ $t('apps') }}
					</div>
					<div
						:class="[
							'top-rooms-header__country',
							`top-rooms-header__country_${type}`,
						]"
					>
						{{ $t('with_private_clubs') }}
					</div>
				</button>
			</template>

			<template v-else-if="type === 'menu'">
				<div
					:class="[
						'top-rooms-header__label',
						`top-rooms-header__label_${type}`,
					]"
				>
					{{ $t('best_rooms') }}
				</div>
			</template>

			<template v-else>
				<svg-icon
					:class="['top-rooms-header__flag', `top-rooms-header__flag_${type}`]"
					:icon="country.code"
					prefix="flags/"
					:width="24"
					:height="24"
				/>
				<div
					:class="[
						'top-rooms-header__label',
						`top-rooms-header__label_${type}`,
					]"
				>
					{{ $t('top_rooms_count', { count: rooms.length }) }}
				</div>
				<div
					:class="[
						'top-rooms-header__country',
						`top-rooms-header__country_${type}`,
					]"
				>
					{{ $t('for_country', { country: country.from }) }}
				</div>
			</template>
		</div>
		<div :class="['top-rooms__list', `top-rooms__list_${type}`]">
			<room-top-item
				v-for="item in items"
				:key="item.id"
				:title="item.title"
				:slug="item.slug"
				:review="item.review"
				:bonus="item.bonus"
				:image="item.image"
				:background="item.background"
				:rakeback="item.rakeback"
				:rating="item.rating"
				:front="front"
				:menu="menu"
				:type="type"
			/>
		</div>

		<div
			v-if="type !== 'menu'"
			:class="['top-rooms__footer', `top-rooms__footer_${type}`]"
		>
			<span
				v-if="type !== 'front'"
				class="top-rooms__footer-more"
				@click.prevent="handleLoadMore"
				>{{ $t('show_more_count', { count: 5 }) }}</span
			>

			<nuxt-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				to="/rakeback-deals/best-poker-rooms-2020"
			>
				<a
					:class="['top-rooms__footer-link', `top-rooms__footer-link_${type}`]"
					:href="href"
					@click="navigate"
				>
					<span
						:class="[
							'top-rooms__footer-text',
							`top-rooms__footer-text_${type}`,
						]"
						>{{ $t('full_rooms_catalogue') }}</span
					>
					<span
						:class="[
							'top-rooms__footer-total',
							`top-rooms__footer-total_${type}`,
						]"
						>{{ $tc('all_poker_sites', total) }}
					</span>
				</a>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomTopList',

		components: {},

		props: {
			label: {
				type: String,
				default: 'Top-5 покер-румов',
			},

			front: {
				type: Boolean,
				default: false,
			},

			menu: {
				type: Boolean,
				default: false,
			},

			type: {
				type: String,
				default: 'default',
			},
		},

		data: () => ({
			per_page: 5,
			showApps: false,
			items: [],
		}),
		
		mounted() {},

		created() {
			this.items = this.rooms
		},

		updated() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				rooms: 'rooms/topList',
				total: 'rooms/total',
			}),
		},

		async fetch() {},

		watch: {},

		methods: {
			async handleLoadMore() {
				$nuxt.$loading.start()
				this.per_page = parseInt(this.per_page) + 5
				await this.$axios
					.get('/rooms/geo/top', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							per_page: this.per_page,
						},
					})
					.then(response => {
						this.items = response.data
						// this.$store.commit('rooms/FETCH_TOP_LIST', { list: response.data })
						$nuxt.$loading.finish()
					})
			},

			async handleToggleApps() {
				this.showApps = !this.showApps
				$nuxt.$loading.start()
				await this.$axios
					.get('/rooms/geo/top', {
						params: {
							geo: this.country.code,
							locale: this.locale,
							per_page: this.per_page,
							type_id: this.showApps ? 3 : null,
						},
					})
					.then(response => {
						this.items = response.data
						// this.$store.commit('rooms/FETCH_TOP_LIST', { list: response.data })
						$nuxt.$loading.finish()
					})
			},

			declOfNum(number, titles) {
				const cases = [2, 0, 1, 1, 1, 2]
				return titles[
					number % 100 > 4 && number % 100 < 20
						? 2
						: cases[number % 10 < 5 ? number % 10 : 5]
				]
			},
		},
	}
</script>

<style lang="scss">
	$ico-link: url('~assets/i/ico-room-top-link.svg?data');

	.top-rooms {
		margin: 0 0 40px 0;
		&_front {
			margin: 0;
		}
		&_menu {
			margin: 0;
		}
		&__list {
			&_front {
				margin: 0;
				background: #292c38;
			}
		}
		&-header {
			padding: 20px 20px 20px 60px;
			position: relative;
			background: #f1efef;
			box-shadow: 0px -2px 0px #feb83c;
			&__flag {
				position: absolute;
				left: 20px;
				top: 20px;
			}

			&__label {
				margin-bottom: 4px;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 20px;
				line-height: 21px;
				color: #222222;
				&_front {
					color: #ffffff;
				}
				&_menu {
					font-family: Proxima Nova;
					font-weight: bold;
					font-size: 12px;
					line-height: 20px;
					letter-spacing: 1px;
					text-transform: uppercase;
					color: #999999;
				}
			}

			&__country {
				font-family: 'Proxima Nova';
				font-weight: normal;
				font-size: 14px;
				line-height: 14px;
				color: #777777;
				&_front {
					color: #cccccc;
				}
			}

			&_front {
				padding: 2px 0 0 0;
				background: transparent;
				display: flex;
				box-shadow: none;
			}

			&_menu {
				padding: 24px 24px 4px 24px;
				background: #353847;
				box-shadow: none;
			}

			&__button {
				text-align: left;
				padding: 20px;
				position: relative;
				border: 0;
				outline: none;
				flex: 0 0 50%;
				background: linear-gradient(180deg, #292c38 59.9%, #191b23 100%);
				transition: background 0.1s ease, border-color 0.1s ease,
					color 0.1s ease;
				&:first-child {
					padding: 20px 20px 20px 60px;
				}
				&:focus,
				&:active,
				&_active {
					outline: none;
					background: #292c38;
					box-shadow: 0px -2px 0px #feb83c;
				}
			}
		}

		&_front {
			border-radius: 8px;
			box-shadow: -20px -10px 50px rgba(0, 0, 0, 0.3);
		}

		&__list {
			&_menu {
				background: #353847;
				padding: 0 0 15px 0;
			}
		}

		&__footer {
			text-align: center;
			margin-top: -36px;
			padding: 20px;
			background: #f1efef;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
			&_front {
				margin-top: 0;
				background: #292c38;
			}
			&-link {
				position: relative;
				text-align: left;
				display: block;
				text-decoration: none;
				&:hover,
				&:active,
				&:visited {
					text-decoration: none;
				}
				&:after {
					content: '';
					width: 32px;
					height: 30px;
					position: absolute;
					right: 0;
					top: 0;
					background: $ico-link no-repeat center;
				}

				&_front {
					display: block;
					margin: 0 auto -50px auto;
					max-width: 316px;
					padding: 15px 76px 15px 20px;
					background: #292c38;
					border-radius: 4px;
					transition: background 0.1s ease, border-color 0.1s ease,
						color 0.1s ease;
					&:after {
						opacity: 0.2;
						top: 50%;
						transform: translate3d(-16px, -50%, 0);
					}
					&:hover,
					&:active,
					&:focus {
						background: #2e87c8;
					}
				}
			}
			&-text {
				display: block;
				margin-bottom: 4px;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 14px;
				line-height: 14px;
				color: #008be2;
				&_front {
					color: #ffffff;
				}
			}
			&-total {
				display: block;
				font-family: 'Proxima Nova';
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 12px;
				color: #777777;
				&_front {
					color: #ffffff;
				}
			}
			&-more {
				position: relative;
				margin-bottom: 16px;
				padding: 8px 12px;
				display: inline-block;
				background: #fafafa;
				border: 1px solid #dfdede;
				border-radius: 24px;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 12px;
				line-height: 12px;
				text-align: center;
				cursor: pointer;
				color: #777777;
			}
		}
	}

	@include mq('laptop') {
		.top-rooms_front {
			max-width: 720px;
			width: 100%;
			box-shadow: 0px -30px 50px rgba(0, 0, 0, 0.3);
		}
	}

	@include mq('tablet') {
		.top-rooms {
			.top-rooms-header_front {
				.top-rooms-header {
					&__button {
						width: 50%;
						font-size: 20px;
						line-height: 21px;
						white-space: nowrap;
						background: linear-gradient(180deg, #fafafa 59.9%, #dfdede 100%);
						&:focus,
						&:active,
						&_active {
							background: #fafafa;
							box-shadow: 0px -4px 0px #feb83c;
						}
						&:nth-child(2) {
							padding-left: 20px;
						}
					}

					&__label {
						color: #222222;
					}
					&__country {
						color: #777777;
					}
				}
			}

			.top-rooms__item {
				&_front {
					background: #fafafa;
				}
				&-title_front {
					color: #222222;
				}
				&-rating-label {
					color: #555555;
				}
				&-rakeback-label {
					color: #555555;
				}
				&-rakeback-val {
					color: #222222;
				}
				&-link {
					// background: #e9e9e9;
					// color: #777777;
				}
			}

			.top-rooms__footer {
				&_front {
					background: #f1efef;
				}
				&-link_front {
					max-width: none;
					background: #2e87c8;
					border-radius: 4px;
				}
				&-text_front {
					font-size: 16px;
					line-height: 20px;
				}
				&-total_front {
					font-size: 14px;
					line-height: 16px;
					color: #ffffff;
					opacity: 0.8;
				}
			}
		}
	}

	@media (max-width: 400px) {
		.top-rooms-header_front {
			.top-rooms-header {
				&__button {
					padding: 16px 16px 16px 40px;
				}
			}
		}
	}
	.top-rooms-header__flag_front {
		left: 10px;
	}
</style>
