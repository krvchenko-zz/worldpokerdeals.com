<template>
	<div class="promotion">
		<breadcrumb-list v-if="pageable" class="promotion__breadcrumbs" />

		<div class="article-container">
			<lazy-promotion-room-card
				:id="promotion.room.id"
				:title="promotion.room.title"
				:slug="promotion.room.slug"
				:rating="promotion.room.rating"
				:rakeback="promotion.room.rakeback"
				:bonus="promotion.room.bonus"
				:background="promotion.room.background"
				:image="promotion.room.image"
				:network="promotion.room.network"
				:review="promotion.room.review"
				class="promotion__room-card article-container__toc"
			/>

			<page-article
				:title="promotion.title"
				:author="promotion.author.full_name"
				:created="promotion.created_at"
				:updated="promotion.updated_at"
				:text="promotion.text"
				:meta="true"
				class="promotion__article article-container__article"
			>
				<template #header>
					<div class="promotion__img-wrap">
						<img
							decoding="async"
							loading="lazy"
							:class="['promotion__img']"
							width="742px"
							height="234px"
							:src="img"
							:alt="promotion.image.alt || promotion.title"
						/>
					</div>
					<lazy-promotion-summary
						:active="promotion.active"
						:type="promotion.category.plural"
						:prize="promotion.prize"
						:currency="promotion.currency ? promotion.currency.symbol : ''"
						:time_left="promotion.time_left"
						:time_before="promotion.time_before"
						:start="promotion.start"
						:end="promotion.end"
						:permanent="promotion.permanent"
						:exclusive="promotion.exclusive"
						:regularity="promotion.regularity"
					/>
				</template>

				<template #footer>
					<h3 class="block-title">
						Участвующие румы
					</h3>
					<!-- <lazy-hydrate when-visible> -->
					<lazy-room
						v-for="(item, index) in promotion.rooms"
						:id="item.id"
						:key="index"
						:title="item.title"
						:slug="item.slug"
						:rating="item.rating"
						:rakeback="item.rakeback"
						:bonus="item.bonus"
						:background="item.background"
						:image="item.image"
						:network="item.network"
						:tags="item.tags"
						:review="item.review"
						:small="true"
					/>
					<!-- </lazy-hydrate> -->

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

					<author v-if="promotion.author" :author="promotion.author" />

					<comments
						commentable_type="App\Promotion"
						:commentable_id="promotion.id"
					/>
				</template>
			</page-article>

			<div class="promotion__aside article-container__aside-content">
				<lazy-room-top-list />
				<h3 class="block-title">Последние акции</h3>
				<lazy-hydrate when-visible>
					<lazy-promotion-list>
						<lazy-promotion-item
							v-for="(item, index) in promotions"
							:key="index"
							:image="item.image"
							:title="item.title"
							:summary="item.summary"
							:page="item.page"
							:author="item.author"
							:created="item.created_at"
							:category="item.category"
							:time_left="item.time_left"
							:time_before="item.time_before"
							:prize="item.prize"
							:currency="item.currency ? item.currency.symbol : '$'"
							:exclusive="item.exclusive"
						/>
					</lazy-promotion-list>
				</lazy-hydrate>

				<lazy-hydrate when-visible>
					<lazy-room-manager
						v-if="promotion.manager"
						:name="promotion.manager.full_name"
						:manager_info="promotion.room.manager_info"
						:position="promotion.manager.position"
						:telegram="promotion.manager.telegram"
						:skype="promotion.manager.skype"
						:whatsapp="promotion.manager.whatsapp"
						:email="promotion.manager.email"
						:image="promotion.manager.image"
					/>
				</lazy-hydrate>
			</div>
		</div>

		<div class="promotion__similar">
			<h2 class="block-title" :style="{ margin: '0 0 20px 0' }">
				Похожие акции
			</h2>
			<lazy-hydrate when-visible>
				<lazy-promotion-list class="promotion__similar__list">
					<lazy-promotion-item
						v-for="(item, index) in related"
						:key="index"
						:image="item.image"
						:title="item.title"
						:summary="item.summary"
						:page="item.page"
						:author="item.author"
						:created="item.created_at"
						:category="item.category"
						:time_left="item.time_left"
						:time_before="item.time_before"
						:regularity="item.regularity"
						:prize="item.prize"
						:currency="item.currency ? item.currency.symbol : ''"
						:exclusive="item.exclusive"
						:active="item.active"
					/>
				</lazy-promotion-list>
			</lazy-hydrate>
		</div>

		<page-banners class="promotion__page-banners" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'PromotionPage',

		components: {
			LazyHydrate,
		},
		layout: 'basic',

		data: () => ({
			loading: true,
		}),

		head() {
			return {
				title: this.promotion.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.promotion.meta_description },
					{ name: 'keywords', content: this.promotion.meta_keywords },
				],

				script: [{ type: 'application/ld+json', json: this.promotion.faq }],
			}
		},

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
				return this.promotion.type === 'promotion'
					? `${this.mediaUrl}/promotion-large/${this.promotion.image.filename}`
					: null
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		async fetch() {},

		watch: {},

		mounted() {},

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

	.promotion {
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 100%;
		@include paddings('desktop');
		&__img {
			border-radius: 10px;
			display: block;
			max-width: 100%;
			height: auto;
			&-wrap {
				margin: 20px 0 30px 0;
			}
		}
		&__room-card {
			align-self: start;
		}
		&__similar {
			&__list {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(326px, max-content));
				column-gap: 26px;
			}
		}
	}

	.bonus {
		background: #2d3141;
		margin-bottom: -90px;
		padding-bottom: 90px;
		&__wrap {
			position: relative;
			z-index: 2;
			margin: 0 -28px;
			background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
			border-radius: 16px;
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
	.promotions-table {
		border: 1px solid #e9e9e9;
		margin: 28px 0 32px 0;
		margin-bottom: 20px !important;
	}

	@include mq('desktop') {
		.promotion {
			&__similar {
				&__list {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(288px, max-content));
					column-gap: 20px;
				}
			}
		}
	}

	@include mq('laptop') {
		.promotion {
			@include paddings('tablet');
			&__room-card {
				display: none;
			}
			&__similar {
				&__list {
					display: grid;
					overflow-x: scroll;
					grid-template-columns: none;
					margin-right: -24px;
					@include hide-scroll();
					grid-auto-columns: calc((100% - 60px) / 3);
					grid-auto-flow: column;
					column-gap: 20px;
					.promotion-item {
						margin-bottom: 0;
					}
				}
			}
			&__page-banners {
				width: initial;
				margin-right: -24px;
				padding-top: 0;
				padding-left: 0;
			}
		}
	}

	@include mq('tablet') {
		.promotion {
			@include paddings('mobile');
			&__similar {
				&__list {
					grid-template-columns: none;
					margin-right: -20px;
					grid-auto-columns: 288px;
					column-gap: 16px;
				}
			}
			&__page-banners {
				margin-right: -20px;
			}
		}
	}
</style>
