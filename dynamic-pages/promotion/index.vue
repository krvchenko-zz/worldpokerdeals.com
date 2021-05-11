<template>
<div :class="[promotion.type]">
	<div class="container-fluid">

		<div class="row">
			<div class="col-12">
				<breadcrumb-list v-if="pageable" />
			</div>
		</div>

		<div v-if="promotion.type === 'bonus'" class="row">
			<div class="col-8 offset-md-2">
				<lazy-bonus-header />
			</div>
		</div>

		<div v-if="promotion.type === 'bonus'" class="row">
			<div class="col-8 offset-md-2">
				<client-only>
					<lazy-bonus-current v-if="promotions.length" />
				</client-only>
			</div>
		</div>

		<div class="row">

			<div class="col-2" v-if="promotion.type === 'promotion'">
				<lazy-promotion-room-card
					v-if="promotion"
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
				/>
			</div>

			<div :class="[promotion.type === 'promotion' ? 'col-7' : 'col-8 offset-md-2']">

				<div :class="[`${promotion.type}__wrap`]">

					<lazy-toc-list v-if="promotion.toc && promotion.type === 'bonus'" :inline="true" :white="false">
						<template v-slot="{ inline, white }">
							<lazy-toc-item v-for="(item, index) in promotion.toc" :key="index"
								:index="index"
								:inline="inline"
								:white="white"
								:anchor="item.anchor_id"
								:text="item.text">
							</lazy-toc-item>
							<lazy-toc-item
								:inline="inline"
								:text="`О покер-руме ${promotion.room.title}`"
								anchor="about">
							</lazy-toc-item>
						</template>
					</lazy-toc-list>

					<div class="row">
						<div class="col-1" v-if="promotion.type === 'bonus'">
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
						<div :class="[promotion.type === 'bonus' ? 'col-10' : 'col-12']">
							<page-article
								:title="promotion.type === 'promotion' ? promotion.title : false"
								:author="promotion.author.full_name"
								:created="promotion.created_at"
								:updated="promotion.updated_at"
								:text="promotion.text"
								:meta="true"
							>
								<template v-slot:header>
									<div v-if="promotion.type === 'promotion'" class="promotion__img-wrap">
										<img decoding="async" loading="lazy" :class="['promotion__img']" width="742px" height="234px" :src="img" :alt="promotion.image.alt || promotion.title"/>
									</div>
									<lazy-promotion-summary
										v-if="promotion.type === 'promotion'"
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

								<template v-slot:footer>
									<h3 v-if="promotion.type === 'promotion'" class="block-title">Участвующие румы</h3>
									<lazy-hydrate when-visible>
										<lazy-room
											v-if="promotion.type === 'promotion'"
											v-for="(item, index) in promotion.rooms" :key="index"
											:id="item.id"
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
									</lazy-hydrate>

									<h2 v-if="promotion.type === 'bonus'" id="about" class="block-title block-title_lg">О покер-руме {{ promotion.room.title }}</h2>
									<lazy-room-summary :room="promotion.room" v-if="promotion.type === 'bonus'" :id="promotion.room.id" />
									<lazy-hydrate when-visible>
										<faq-list v-if="promotion.faq && promotion.faq.mainEntity.length" label="FAQ">
											<faq-item v-for="(item, index) in promotion.faq.mainEntity" :key="index"
												:question="item.name"
												:answer="item.acceptedAnswer.text">
											</faq-item>
										</faq-list>
									</lazy-hydrate>

									<lazy-hydrate when-visible>
										<lazy-telegram-subscribe
											v-if="promotion.type === 'bonus'"
											label="Наш Телеграм-канал"
											description="Новости покерных румов мы публикуем в нашем Телеграм-канале. Подпишись, чтобы не упускать EV."
											btn-label="Подписаться"
											url="https://t-do.ru/worldpokerdealsRU"
										/>
									</lazy-hydrate>

									<author v-if="promotion.author" :author="promotion.author" />

									<comments commentable_type="App\Promotion" :commentable_id="promotion.id" />

									<h2 v-if="promotion.type === 'bonus'" class="block-title">Похожие бонусы</h2>
									<lazy-hydrate when-visible>
										<table v-if="promotion.type === 'bonus'" class="promotions-table" cellspacing="0" cellpadding="0" border="0" width="100%">
										  <lazy-promotion-feed-item v-for="(item, index) in related" :key="index"
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

				</div>
			</div>
			<div v-if="promotion.type === 'promotion'" class="col-3">
				<lazy-room-top-list />
				<h3 class="block-title">Последние акции</h3>
				<lazy-hydrate when-visible>
					<lazy-promotion-list>
						<lazy-promotion-item
							v-if="promotion.type === 'promotion'"
							v-for="(item, index) in promotions" :key="index"
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
							:currency="item.currency ? item.currency.symbol: '$'"
							:exclusive="item.exclusive"
						/>
					</lazy-promotion-list>
				</lazy-hydrate>

				<lazy-hydrate when-visible>
					<lazy-room-manager
						v-if="promotion.manager && promotion.type === 'promotion'"
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
	</div>

	<div v-if="promotion.type === 'promotion'" class="container-fluid">
		<h2 class="block-title" :style="{ margin: '0 0 20px 0' }">Похожие акции</h2>
		<lazy-hydrate when-visible>
	    <lazy-promotion-list>
	      <div class="row">
	        <div class="col-3" v-for="(item, index) in related" :key="index">
	          <lazy-promotion-item
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
	        </div>
	      </div>
	    </lazy-promotion-list>
	  </lazy-hydrate>
	</div>

	<page-banners />
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

import LazyHydrate from 'vue-lazy-hydration'

export default {

	layout: 'basic',

	name: 'PromotionPage',

	head () {
		return { 
			title: this.promotion.meta_title,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: this.promotion.meta_description },
				{ name: 'keywords', content: this.promotion.meta_keywords }
			],

	      	script: [{ type: 'application/ld+json', json: this.promotion.faq }]
		}
	},

	components: {
		LazyHydrate
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
			related: 'promotions/related'
		}),

		img() {
			return `${this.mediaUrl}/promotion-large/${this.promotion.image.filename}`
		},

		mediaUrl() {
			return process.env.mediaUrl
		}
	},

	async fetch() {
		await this.$axios.get(`promotion/${this.pageable.slug}`, {
			params: {
				locale: this.locale
			}
		})
		.then(response => {
			this.$store.commit('promotions/FETCH_PROMOTION', { promotion: response.data.item })
			this.$store.commit('promotions/FETCH_ITEMS', { items: response.data.latest })
			this.$store.commit('promotions/FETCH_RELATED', { related: response.data.related })
		})
	},

	mounted () {

	},

	watch: {

	},

	methods: {
		urlLit(w,v) {
			let tr='a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(' ')
			let ww=''; w=w.toLowerCase()
			for(let i=0; i<w.length; ++i) {
				let cc=w.charCodeAt(i); var ch=(cc>=1072?tr[cc-1072]:w[i])
				if(ch && ch.length<3) ww+=ch; else if(ch) ww+=eval(ch)[v]
			}
			return(ww.replace(/[^a-zA-Z0-9\-]/g,'-').replace(/[-]{2,}/gim, '-').replace( /^\-+/g, '').replace( /\-+$/g, ''))
		}
	}
}
</script>

<style lang="scss">
$ico-bonus-toc-arrow: url('~assets/i/ico-bonus-toc-arrow.svg?data');

.promotion {
	&__img {
		border-radius: 10px;
		display: block;
		max-width: 100%;
		height: auto;
		&-wrap {
			margin: 20px 0 30px 0;
		}
	}
}

.bonus {
	background: #2D3141;
	margin-bottom: -90px;
	padding-bottom: 90px;
	&__wrap {
		position: relative;
		z-index: 2;
		margin: 0 -28px;
		background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF;
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
			border: none!important;
			text-decoration: none;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 16px;
			color: #008BE2;
		}
	}
}
.promotions-table {
  border: 1px solid #E9E9E9;
  margin: 28px 0 32px 0;
  margin-bottom: 20px!important;
}
</style>