<template>
	<div class="bonus-item">
		<div class="bonus-item__content">
			<div class="bonus-item__icon-wrapper">
				<svg-icon
					v-if="room"
					class="bonus-item__icon"
					:icon="room.slug"
					:width="42"
					:height="42"
					view-box="0 0 200 200"
				/>
			</div>

			<div class="bonus-item__text">
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
			</div>

			<div class="bonus-item__params">
				<span class="bonus-item__max"
					><span class="bonus-item__params__title">{{ $t('max_bonus') }}</span
					>{{ max_bonus_currency.symbol }}{{ max_bonus }}</span
				>
				<span class="bonus-item__cashback">
					<span class="bonus-item__params__title">{{ $t('cashback') }}</span
					>{{ cashback_value }}%
				</span>

				<span class="bonus-item__deposit"
					><span class="bonus-item__params__title">{{ $t('deposit') }}</span
					>+{{ deposit_bonus }}%</span
				>
			</div>

			<div class="bonus-item__buttons">
				<span
					:class="[
						'bonus-item__code',
						codeHovered && 'bonus-item__code--hover',
					]"
					@mouseover="codeHovered = true"
					@mouseleave="codeHovered = false"
				>
					<span
						:class="[
							'bonus-item__code-label',
							codeHovered && 'bonus-item__code-label--hover',
						]"
						>{{ $t('bonus_code') }}</span
					>
					<span class="bonus-item__code-value">{{ code }}</span>
				</span>

				<room-action-button
					class="btn-get-bonus bonus-item__action bonus-item__get-button"
					:icon="false"
					type="download"
					:label="$t('get')"
					:slug="room.slug"
					:disabled="room.restricted"
				/>

				<div v-if="hasPage" class="bonus-item__review">
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
							:class="['btn btn-bonus-review bonus-item__review__button']"
							:href="href"
							@click="navigate"
						></a>
					</nuxt-link>
				</div>
			</div>
		</div>

		<div
			:class="['bonus-item__info', showTerms && 'bonus-item__info--expanded']"
		>
			<span
				:class="[
					'bonus-item__terms',
					showTerms && 'bonus-item__terms--expanded',
				]"
			>
				<i class="bonus-item__terms-icon"></i>
				<span @click="terms ? (showTerms = !showTerms) : (showTerms = false)">{{
					$t('bonus_conditions')
				}}</span>
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
		</div>

		<div v-show="showTerms" class="bonus-item__terms-text" v-html="terms"></div>
	</div>
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

			hasPage: {
				type: [Boolean, Number],
				default: true,
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
		display: flex;
		flex-direction: column;
		&__content {
			border-top: 1px solid #e9e9e9;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			display: grid;
			padding: 20px;
			grid-template-columns: 58px 276px 1fr 352px;
			grid-template-areas: 'icon text params buttons';
		}
		&__icon-wrapper {
			grid-area: icon;
			margin-right: 16px;
		}
		&__icon {
			border-radius: 4px;
			display: block;
			width: 42px;
			margin-bottom: auto;
		}
		&__text {
			grid-area: text;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			margin-right: 20px;
		}
		&__params {
			grid-area: params;
			display: flex;
			&__title {
				display: none;
				width: 100%;
				white-space: nowrap;
				font-weight: 600;
				font-size: 12px;
				line-height: 16px;
				letter-spacing: 0.3px;
				text-transform: uppercase;
				color: #777777;
				margin-bottom: 4px;
			}
		}
		&__buttons {
			grid-area: buttons;
			height: 46px;
			display: flex;
		}
		& &__get-button {
			display: block;
			min-width: 120px;
			flex-grow: 0;
			padding: 14px 24px 16px 24px;
			font-size: 16px;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
		}

		&__action {
			padding-left: 0;
			&:last-child {
				border-right: 1px solid #e9e9e9;
			}
		}

		&__info {
			padding: 8px 20px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			font-size: 0;
			&--expanded {
				border-bottom: none;
			}
		}

		&__cashback,
		&__deposit,
		&__max {
			display: flex;
			align-items: center;
			position: relative;
			padding-left: 12px;
			padding-right: 20px;
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			height: 100%;
			border-left: 1px solid #e9e9e9;
		}

		&__cashback {
			grid-area: cashback;
			width: 84px;
			grid-area: cashback;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
		}

		&__deposit {
			grid-area: deposit;
			width: 106px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
		}

		&__max {
			grid-area: max;
			width: 116px;
			color: #243238;
		}

		&__terms-text {
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
					padding: 0;
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

		&__review {
			width: 44px;
			margin-left: 20px;
		}

		&__code {
			width: 128px;
			margin-right: 20px;
			position: relative;
			cursor: pointer;
			display: block;
			min-width: 130px;
			padding: 8px 0 4px 0;
			background: #fafafa;
			border: 1px dashed rgba(119, 119, 119, 0.5);
			border-radius: 4px;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&--hover {
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
				&--hover {
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
			white-space: nowrap;
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

			&--expanded &-icon {
				transform: rotate(180deg);
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

	.btn-bonus-review {
		display: block;
		padding: 0;
		border: 1px solid rgba(119, 119, 119, 0.3);
		border-radius: 3px;
		width: 44px;
		height: 46px;
		background: $ico-arrow-right no-repeat center;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:hover,
		&:active,
		&:focus {
			background: #dddddd $ico-arrow-right no-repeat center;
		}
	}

	@include mq('desktop') {
		.bonus-item {
			&__content {
				padding: 20px;
				grid-template-columns: 58px 200px 1fr 352px;
				grid-template-areas: 'icon text params buttons';
			}
			&__category {
				white-space: break-spaces;
			}
			&__max {
				width: 92px;
			}
			&__cashback {
				width: 79px;
			}
			&__deposit {
				width: 106px;
			}
		}
	}

	@include mq('laptop') {
		.bonus-item {
			&__content {
				grid-template-columns: 58px 1fr 184px;
				grid-template-areas:
					'icon text buttons'
					'icon params buttons';
			}
			&__text {
				margin-right: 0;
				margin-bottom: 16px;
			}
			&__buttons {
				height: 100%;
				flex-wrap: wrap;
			}
			& &__get-button {
				height: 42px;
				flex-grow: 1;
			}
			&__max,
			&__cashback,
			&__deposit {
				flex-wrap: wrap;
				padding-left: 16px;
				padding-right: 16px;
			}
			&__max {
				padding-left: 0;
				border-left: none;
				width: 126px;
			}
			&__cashback {
				width: 122px;
			}
			&__deposit {
				width: auto;
				min-width: 122px;
			}
			&__params {
				&__title {
					display: inline-block;
				}
			}
			&__code {
				width: 100%;
				margin-right: 0;
				margin-bottom: 20px;
			}
			&__review {
				&__button {
					height: 42px;
				}
			}
		}
	}

	@include mq('tablet') {
		.bonus-item {
			&__content {
				grid-template-columns: 58px 1fr;
				grid-template-areas:
					'icon text'
					'icon params'
					'icon buttons';
			}
			&__text {
				margin-bottom: 12px;
			}
			&__params {
				margin-bottom: 20px;
			}
			&__buttons {
				display: grid;
				grid-template-columns: minmax(152px, 1fr) minmax(148px, 1fr) 40px;
				column-gap: 16px;
				align-items: center;
				height: 40px;
				margin-left: 0;
			}
			& &__code {
				min-width: 152px;
				margin-right: 0px;
				margin-bottom: 0;
				padding-bottom: 4px;
				padding-top: 4px;
				height: 40px;
			}
			&__get-button {
				min-width: 148px;
				height: 40px;
			}
			&__review {
				margin-left: 0px;
				&__button {
					height: 40px;
					width: 40px;
				}
			}
		}
	}

	@include mq('mobile') {
		.bonus-item {
			&__content {
				grid-template-columns: 58px 1fr;
				grid-template-areas:
					'icon text'
					'params params'
					'buttons buttons';
			}
			&__buttons {
				grid-template-columns: minmax(140px, 1fr) minmax(120px, 1fr) 40px;
			}
			& &__code {
				min-width: 140px;
			}
			&__get-button {
				min-width: 120px;
			}
			&__info {
				display: flex;
			}
			&__terms {
				margin-right: 16px;
			}
			&__available {
				display: flex;
			}
		}
	}
</style>
