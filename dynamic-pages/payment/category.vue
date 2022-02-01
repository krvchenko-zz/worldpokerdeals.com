<template>
	<div class="payments-page">
		<div class="payments">

			<div class="payments-header" :style="{
				background: `url(${require('~/assets/i/payments-bg.jpg')}) no-repeat 50%`,
				backgroundSize: 'cover',
			}">
				<div class="payments-header__wrap">
					<breadcrumb-list :white="true" />
					<h1 class="payments__title">{{ pageable.title }}</h1>
					<common-text-spoiler
						:limit="$device.isMobile || $device.isTablet ? 100 : 600"
						class="payments__summary"
						:text="pageable.summary"
					>
						<template v-slot:button>
							<svg-icon icon="spoiler-sep" width="35" height="16" />
						</template>
					</common-text-spoiler>
				</div>
			</div>

			<div class="payments-list">
				<div v-for="(item, index) in payments" :key="index">
					<payment-item
						:title="item.title"
						:icon="item.icon"
						:rooms="item.rooms"
						:vip="item.vip_status"
						:page="item.page"
					>
					</payment-item>
				</div>
			</div>

			<div class="payments__article-container article-container">
				<div class="article-container__toc">
					<toc-list v-if="pageable.toc">
						<template #default="{ inline }">
							<toc-item
								v-for="(item, index) in pageable.toc"
								:key="index"
								:index="index"
								:inline="inline"
								:anchor="item.anchor_id"
								:text="item.text"
							>
							</toc-item>
						</template>
					</toc-list>
				</div>

				<!-- Article -->
				<page-article :text="pageable.text" class="article-container__article">
					<template #footer>
						<!-- Faq -->
						<faq-list
							v-if="pageable.faq && pageable.faq.mainEntity.length"
							:label="$t('faq')"
						>
							<faq-item
								v-for="(item, index) in pageable.faq.mainEntity"
								:key="index"
								:question="item.name"
								:answer="item.acceptedAnswer.text"
							>
							</faq-item>
						</faq-list>
						<!-- Author -->
						<author v-if="pageable.author" :author="pageable.author" />
					</template>
				</page-article>

				<div class="article-container__aside">
					<room-top-list />
					<topic-list v-if="pageable.topics && pageable.topics.length">
						<topic-item
							v-for="(item, index) in pageable.topics"
							:key="index"
							:title="item.title"
							:url="item.url"
							:author="item.author"
							:created="item.created_at"
						/>
					</topic-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PaymentCategory',

		components: {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				category: 'payments/category',
				payments: 'payments/payments',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {
			await this.$axios.get('payments/list').then(response => {
				this.$store.commit('payments/FETCH_PAYMENTS', {
					payments: response.data.map(item => ({
						title: item.title,
						icon: item.icon,
						vip_status: item.vip_status,
						rooms: item.rooms_count,
						page: item.review,
					})),
				})
			})
		},

		watch: {},

		mounted() {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.payments {
		width: 100%;
		&-page {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
		}
		&-header {
			margin: 0 -26px 32px -26px;
			margin-bottom: 32px;
			padding: 0 26px 32px 26px;
			background-size: cover;
		}
		&-list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(262px, 1fr));
			column-gap: 20px;
			margin-bottom: 20px;
		}
		&__title {
			text-align: center;
			margin: 8px 0 16px 0;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}
		&__summary {
			font-family: Proxima Nova;
			font-size: 18px;
			line-height: 24px;
			text-align: center;
			color: #ffffff;
			opacity: 0.8;
		}
	}

	@include mq('laptop') {
		.payments {
			&-list {
				grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			}
		}
		.payments-page {
			@include paddings('laptop');
		}
		.payments-header {
			@include paddings('laptop');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('tablet') {
		.payments {
			&-list {
				grid-template-columns: 100%;
			}
		}
		.payments-page {
			@include paddings('tablet');
		}
		.payments-header {
			@include paddings('tablet');
			margin: 0 -24px 24px -24px;
		}
	}

	@include mq('mobile') {
		.payments-page {
			@include paddings('mobile');
		}
		.payments-header {
			@include paddings('mobile');
			margin: 0 -20px 24px -20px;
		}
	}
</style>
