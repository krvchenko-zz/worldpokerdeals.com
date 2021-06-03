<template>
	<tbody class="bonus-item">
		<tr class="bonus-item__row">
			<td class="bonus-item__col bonus-item__col_icon">
				<svg-icon
					v-if="room"
					class="bonus-item__icon"
					:icon="room.slug"
					:width="42"
					:height="42"
					view-box="0 0 200 200"
				/>
			</td>

			<td class="bonus-item__col bonus-item__col_title">
				<span
					:style="{
						color: category.label_color,
						borderColor: category.label_color,
					}"
					:class="{
						'bonus-item__category': true,
						[`bonus-item__category_${category.id}`]: true,
					}"
					>{{ category.title }}</span
				>
				<span class="bonus-item__title">{{ title }}</span>
			</td>

			<td class="bonus-item__col bonus-item__col_cashback">
				<span class="bonus-item__cashback">{{ cashback_value }}%</span>
			</td>

			<td class="bonus-item__col bonus-item__col_deposit">
				<span class="bonus-item__deposit">+{{ deposit_bonus }}%</span>
			</td>

			<td class="bonus-item__col bonus-item__col_max">
				<span class="bonus-item__max"
					>{{ max_bonus_currency.symbol }}{{ max_bonus }}</span
				>
			</td>

			<td class="bonus-item__col bonus-item__col_bonus">
				<span
					:class="['bonus-item__code', codeHovered && 'bonus-item__code_hover']"
					@mouseover="codeHovered = true"
					@mouseleave="codeHovered = false"
				>
					<span
						:class="[
							'bonus-item__code-label',
							codeHovered && 'bonus-item__code-label_hover',
						]"
						>{{ $t('bonus_code') }}</span
					>
					<span class="bonus-item__code-value">{{ code }}</span>
				</span>
			</td>

			<td class="bonus-item__col bonus-item__col_action">
				<room-action-button
					class="btn-get-bonus"
					:icon="false"
					type="download"
					:label="$t('get')"
					:slug="room.slug"
				/>
			</td>

			<td class="bonus-item__col bonus-item__col_action">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					prefetch
					:to="{
						name: 'index',
						params: {
							parent: page.parent ? page.parent.slug : page.slug,
							child: page.parent ? page.slug : null,
						},
					}"
				>
					<a
						:class="['btn btn-bonus-review']"
						:href="href"
						@click="navigate"
					></a>
				</nuxt-link>
			</td>
		</tr>
		<tr class="bonus-item__row">
			<td
				colspan="8"
				:class="[
					'bonus-item__col',
					'bonus-item__col_info',
					showTerms && 'bonus-item__col_info_expanded',
				]"
			>
				<span
					:class="[
						'bonus-item__terms',
						showTerms && 'bonus-item__terms_expanded',
					]"
				>
					<i class="bonus-item__terms-icon"></i>
					<span
						@click="terms ? (showTerms = !showTerms) : (showTerms = false)"
						>{{ $t('bonus_conditions') }}</span
					>
				</span>

				<span
					:class="{
						'bonus-item__avaliable': true,
						[`bonus-item__avaliable_yes`]: !room.restricted,
						[`bonus-item__avaliable_no`]: room.restricted,
					}"
				>
					<svg-icon
						:width="16"
						:height="16"
						:icon="country.code"
						prefix="flags/"
					/>
					<span v-if="room.restricted">{{
						$t('room_geo_restricted', { country: country.from })
					}}</span>
					<span v-else>{{
						$t('room_geo_allowed', { country: country.from })
					}}</span>
				</span>
			</td>
		</tr>
		<tr v-show="showTerms" class="bonus-item__row">
			<td
				colspan="8"
				class="bonus-item__col bonus-item__col_terms"
				v-html="terms"
			></td>
		</tr>
	</tbody>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'BonusItem',

		components: {},

		props: {
			index: {
				type: [String, Number],
			},

			title: {
				type: String,
				required: true,
			},

			slug: {
				type: String,
				required: true,
			},

			created: {
				type: String,
				required: true,
			},

			code: {
				type: [String, Boolean],
				default: false,
			},

			terms: {
				type: String,
			},

			category: {
				type: Object,
				// default: false
			},

			room: {
				type: Object,
				// default: false
			},

			min_deposit: {
				type: Number,
				default: 0,
			},

			min_deposit_currency: {
				type: [Object, Boolean],
				default: false,
			},

			cashback_value: {
				type: Number,
				default: 0,
			},

			max_bonus: {
				type: Number,
				default: 0,
			},

			max_bonus_currency: {
				type: [Object, Boolean],
				default: false,
			},

			deposit_bonus: {
				type: Number,
				default: 0,
			},

			page: {
				type: Object,
				required: true,
			},
		},

		data: () => ({
			showTerms: false,
			codeHovered: false,
		}),

		created() {},

		mounted() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				locale: 'lang/locale',
				locales: 'lang/locales',
				country: 'location/country',
			}),

			url() {
				return `/promotions/${this.slug}`
			},
		},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-arrow-right: url('~assets/i/promotion/ico-bonus-arrow-right.svg?data');
	$ico-terms: url('~assets/i/promotion/ico-bonus-terms.svg?data');
	$ico-scissors: url('~assets/i/promotion/ico-scissors.svg?data');

	.bonus-item {
		&__table {
			width: 100%;
		}

		&__col {
			padding: 20px;
			vertical-align: middle;
			background: #ffffff;
			&_icon {
				padding: 20px;
				width: 42px;
				border-left: 1px solid #e9e9e9;
			}
			&_title {
				width: 25%;
				padding: 20px 20px 20px 0;
			}

			&_action {
				padding-left: 0;
				&:last-child {
					border-right: 1px solid #e9e9e9;
				}
			}

			&_info {
				padding: 8px 20px;
				background: #fafafa;
				border: 1px solid #e9e9e9;
				border-bottom-width: 2px;
				font-size: 0;
				&_expanded {
					border-bottom: none;
				}
			}

			&_cashback,
			&_deposit,
			&_max {
				position: relative;
				&:before {
					content: '';
					top: calc(50% - (40px / 2));
					left: 0px;
					position: absolute;
					display: block;
					width: 1px;
					height: calc(100% / 2);
					background: #e9e9e9;
				}
			}

			&_terms {
				border: 1px solid #e9e9e9;
				border-top: none;
				background: #fafafa;
				padding: 4px 20px 20px 20px;
				ol,
				ul {
					margin: 0 0 20px 0;
					padding: 0;
					list-style-position: inside;
					&:last-child {
						margin: 0;
					}
					li {
						margin: 0 0 10px 0;
						font-family: 'Proxima Nova';
						font-size: 15px;
						line-height: 18px;
						color: #777777;
						&:last-child {
							margin: 0;
						}
					}
				}

				ol {
					list-style-type: decimal;
					li {
						padding: 0;
						&:before {
							display: none;
						}
					}
				}

				ul {
					list-style: none;
					li {
						padding: 0 0 0 20px;
						&:before {
							top: 7px;
							left: 0px;
						}
					}
				}

				p {
					margin: 0 0 16px 0;
					font-family: 'Proxima Nova';
					font-size: 15px;
					line-height: 18px;
					color: #777777;
					&:last-child {
						margin: 0;
					}
				}
			}
		}

		&__icon {
			border-radius: 4px;
			display: block;
		}

		&__title {
			white-space: nowrap;
			display: block;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 18px;
			line-height: 22px;
			color: #222222;
		}

		&__category {
			white-space: nowrap;
			margin-bottom: 4px;
			padding: 4px 8px 3px 8px;
			display: inline-block;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 11px;
			line-height: 11px;
			letter-spacing: 0.2px;
			border-radius: 100px;
			text-transform: uppercase;
			color: #212529;
			border: 1px solid #212529;
		}

		&__cashback {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
		}

		&__deposit {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
		}

		&__max {
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			color: #243238;
		}

		&__code {
			position: relative;
			cursor: pointer;
			display: block;
			min-width: 130px;
			padding: 8px 0 4px 0;
			background: #fafafa;
			border: 1px dashed rgba(119, 119, 119, 0.5);
			border-radius: 4px;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&_hover {
				border-color: #008be2;

				&:before {
					content: '';
					top: -12px;
					left: 50%;
					margin-left: -9px;
					position: absolute;
					width: 18px;
					height: 12px;
					display: block;
					background: $ico-scissors no-repeat center;
				}
			}

			&-label {
				display: block;
				text-align: center;
				font-family: 'Proxima Nova Sb';
				font-size: 10px;
				line-height: 12px;
				letter-spacing: 0.3px;
				text-transform: uppercase;
				color: #777777;
				transition: background 0.1s ease, border-color 0.1s ease,
					color 0.1s ease;
				&_hover {
					color: #008be2;
				}
			}

			&-value {
				display: block;
				text-align: center;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 16px;
				line-height: 20px;
				letter-spacing: 0.3px;
				color: #555555;
				text-transform: uppercase;
			}
		}

		&__terms {
			margin-right: 40px;
			padding-left: 26px;
			position: relative;
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
			span {
				border-bottom: 1px dashed #aaaaaa;
			}
			&:hover {
				span {
					border: none;
				}
			}
			&-icon {
				left: 0;
				top: 0;
				position: absolute;
				width: 16px;
				height: 16px;
				display: block;
				transition: transform 0.1s ease;
				background: $ico-terms no-repeat center;
			}

			&_expanded {
				.promotion-item__terms-icon {
					transform: rotate(180deg);
				}
			}
		}

		&__avaliable {
			display: inline-block;
			vertical-align: middle;
			font-size: 0;
			span {
				margin-left: 8px;
				vertical-align: middle;
				font-size: 12px;
				line-height: 16px;
				font-family: 'Proxima Nova';
			}
			&_yes {
				color: #777777;
			}
			&_no {
				color: #eb5757;
			}
		}
	}

	.btn-get-bonus {
		display: block;
		padding: 14px 24px 16px 24px;
		font-size: 16px;
		line-height: 16px;
		text-align: center;
		color: #ffffff;
	}

	.btn-bonus-review {
		display: block;
		padding: 0;
		border: 1px solid rgba(119, 119, 119, 0.3);
		border-radius: 3px;
		width: 46px;
		height: 46px;
		background: $ico-arrow-right no-repeat center;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:hover,
		&:active,
		&:focus {
			background: #dddddd $ico-arrow-right no-repeat center;
		}
	}
</style>
