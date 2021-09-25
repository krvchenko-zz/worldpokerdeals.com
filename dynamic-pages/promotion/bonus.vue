<template>
	<div class="bonus">
		<div class="bonus__container">
			<breadcrumb-list v-if="pageable" class="bonus__breadcrumbs" />

			<lazy-bonus-header class="bonus__header" />

			<client-only>
				<lazy-bonus-current
					v-if="promotions.length"
					class="bonus__promotions"
				/>
			</client-only>

			<div class="bonus__info-container">
				<lazy-toc-list v-if="promotion.toc" :inline="true" :white="false">
					<template v-slot="{ inline, white }">
						<lazy-toc-item
							v-for="(item, index) in promotion.toc"
							:key="index"
							:index="index"
							:inline="inline"
							:white="white"
							:anchor="item.anchor_id"
							:text="item.text"
						>
						</lazy-toc-item>
						<lazy-toc-item
							:inline="inline"
							:text="`О покер-руме ${promotion.room.title}`"
							anchor="about"
						>
						</lazy-toc-item>
					</template>
				</lazy-toc-list>

				<div class="bonus__info">
					<div class="bonus__card-wrapper">
						<lazy-bonus-card
							:id="promotion.room.id"
							:title="promotion.room.title"
							:slug="promotion.room.slug"
							:restricted="promotion.room.restricted"
							:country="country"
							:rating="promotion.room.rating"
							:bonus="promotion.title"
							:review="promotion.room.review"
							:bonus_category_label="promotion.category.label_color"
							:bonus_category="promotion.category.title"
						/>
					</div>

					<page-article
						:title="false"
						:author="promotion.author.full_name"
						:created="promotion.created_at"
						:updated="promotion.updated_at"
						:text="promotion.text"
						:meta="true"
						class="bonus__article"
					>
						<template v-slot:footer>
							<h2 id="about" class="block-title block-title_lg">
								О покер-руме {{ promotion.room.title }}
							</h2>
							<lazy-room-summary
								:room="promotion.room"
								:id="promotion.room.id"
							/>
							<lazy-hydrate when-visible>
								<faq-list
									v-if="promotion.faq && promotion.faq.mainEntity.length"
									label="FAQ"
								>
									<faq-item
										v-for="(item, index) in promotion.faq.mainEntity"
										:key="index"
										:question="item.name"
										:answer="item.acceptedAnswer.text"
									>
									</faq-item>
								</faq-list>
							</lazy-hydrate>

							<lazy-hydrate when-visible>
								<lazy-telegram-subscribe
									label="Наш Телеграм-канал"
									description="Новости покерных румов мы публикуем в нашем Телеграм-канале. Подпишись, чтобы не упускать EV."
									btn-label="Подписаться"
									url="https://t-do.ru/worldpokerdealsRU"
								/>
							</lazy-hydrate>

							<author v-if="promotion.author" :author="promotion.author" />

							<comments
								commentable_type="App\Promotion"
								:commentable_id="promotion.id"
							/>

							<h2 class="block-title">
								Похожие бонусы
							</h2>
							<lazy-hydrate when-visible>
								<table
									class="promotions-table"
									cellspacing="0"
									cellpadding="0"
									border="0"
									width="100%"
								>
									<lazy-promotion-feed-item
										v-for="(item, index) in related"
										:key="index"
										:title="item.title"
										:slug="item.slug"
										:created="item.created_at"
										:code="item.code"
										:terms="item.terms"
										:room="item.room"
										:page="item.page"
										:category="item.category"
										:min_deposit="item.min_deposit"
										:min_deposit_currency="item.min_deposit_currency"
										:cashback_value="item.cashback_value"
										:max_bonus="item.max_bonus"
										:max_bonus_currency="item.max_bonus_currency"
										:deposit_bonus="item.deposit_bonus"
										:index="index"
									/>
								</table>
							</lazy-hydrate>
						</template>
					</page-article>
				</div>
			</div>

			<page-banners />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	import LazyHydrate from 'vue-lazy-hydration'
	export default {
		layout: 'basic',
		name: 'PromotionPage',
		head() {
			return {
				title: this.promotion.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.promotion.meta_description },
					{ name: 'keywords', content: this.promotion.meta_keywords },
				],
			}
		},
		components: {
			LazyHydrate,
		},
		data: () => ({
			loading: true,
		}),
		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				promotion: 'promotions/promotion',
				promotions: 'promotions/items',
				related: 'promotions/related',
			}),
			img() {
				return `${this.mediaUrl}/promotion-large/${this.promotion.image.filename}`
			},
			mediaUrl() {
				return process.env.mediaUrl
			},
		},
		async fetch() {},
		mounted() {},
		watch: {},
		methods: {
			urlLit(w, v) {
				let tr = 'a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(
					' '
				)
				let ww = ''
				w = w.toLowerCase()
				for (let i = 0; i < w.length; ++i) {
					let cc = w.charCodeAt(i)
					var ch = cc >= 1072 ? tr[cc - 1072] : w[i]
					if (ch && ch.length < 3) ww += ch
					else if (ch) ww += eval(ch)[v]
				}
				return ww
					.replace(/[^a-zA-Z0-9\-]/g, '-')
					.replace(/[-]{2,}/gim, '-')
					.replace(/^\-+/g, '')
					.replace(/\-+$/g, '')
			},
		},
	}
</script>

<style lang="scss">
	$ico-bonus-toc-arrow: url('~assets/i/ico-bonus-toc-arrow.svg?data');
	.bonus {
		background: #2d3141;
		width: 100%;
		margin-bottom: -90px;
		padding-bottom: 90px;
		&__container {
			display: flex;
			flex-direction: column;
			align-items: center;
			max-width: 1440px;
			width: 100%;
			margin: 0 auto;
			@include paddings('desktop');
		}
		&__breadcrumbs {
			align-self: flex-start;
		}
		&__header {
			max-width: 972px;
			margin-top: 12px;
		}
		&__promotions {
			max-width: 1028px;
		}
		&__info-container {
			position: relative;
			max-width: 972px;
			width: 100%;
			z-index: 2;
			background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
			border-radius: 16px;
		}
		&__card-wrapper {
			position: absolute;
			top: 116px;
			left: 0;
			height: calc(100% - 116px);
		}
		&__info {
			padding: 28px 28px 40px;
		}
		&__article {
			padding-right: 118px;
			padding-left: 118px;
		}
		.article__wrap {
			padding: 0 62px 32px 62px;
		}
		.toc {
			padding: 28px 28px 0 28px;
			margin: 0;
			&-list {
			}
			&__item {
				position: relative;
				padding: 0 24px 0 0;
				margin: 0 16px 16px 0;
				&:after {
					content: '';
					top: 0;
					right: 0;
					left: auto;
					position: absolute;
					display: block;
					width: 8px;
					height: 16px;
					background: $ico-bonus-toc-arrow no-repeat center;
				}
				&:last-child {
					margin: 0 16px 16px 0;
					&:after {
						display: none;
					}
				}
			}
			&__link {
				border: none !important;
				text-decoration: none;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 14px;
				line-height: 16px;
				color: #008be2;
			}
		}
	}

	@include mq('laptop') {
		.bonus {
			&__container {
				@include paddings('tablet');
			}
			&__card-wrapper {
				display: none;
			}
			&__info {
				padding-left: 20px;
				padding-right: 20px;
			}
			&__article {
				padding-left: 0;
				padding-right: 0;
			}

			.promotions-table {
				margin-left: -20px;
				margin-right: -20px;
				width: calc(100% + 2 * 20px);
			}
			& .room-summary {
				margin-left: -20px;
				margin-right: -20px;
			}
		}
	}

	@include mq('tablet') {
		.bonus {
			&__container {
				@include paddings('mobile');
			}
			&__info-container {
				margin-right: -20px;
				margin-left: -20px;
				width: calc(100% + 40px);

				.toc {
					width: 100%;
				}
			}
		}
	}
</style>
