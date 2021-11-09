<template>
	<div v-if="category" class="payments">
		<div class="payments-header">
			<div class="container-fluid">
				<breadcrumb-list :white="true" />
				<h1 class="payments__title">{{ category.title }}</h1>
				<common-text-spoiler
					:limit="$device.isMobile || $device.isTablet ? 100 : 600"
					class="payments__summary"
					:text="category.summary"
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
				<toc-list v-if="category.toc">
					<template #default="{ inline }">
						<toc-item
							v-for="(item, index) in category.toc"
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
			<page-article :text="category.text" class="article-container__article">
				<template #footer>
					<!-- Faq -->
					<faq-list
						v-if="category.faq && category.faq.mainEntity.length"
						:label="$t('faq')"
					>
						<faq-item
							v-for="(item, index) in category.faq.mainEntity"
							:key="index"
							:question="item.name"
							:answer="item.acceptedAnswer.text"
						>
						</faq-item>
					</faq-list>
					<!-- Author -->
					<author v-if="category.author" :author="category.author" />
					<!-- Comments -->
<!-- 					<comments
						commentable_type="App\PaymentMethodCategory"
						:commentable_id="category.id"
					/> -->
				</template>
			</page-article>

			<div class="article-container__aside">
				<room-top-list />
				<topic-list v-if="category.topics">
					<topic-item
						v-for="(item, index) in category.topics"
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
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PaymentCategory',

		components: {},

		head() {
			return {
				title: this.category ? this.category.meta_title : '',
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category ? this.category.meta_description : '' },
					{ name: 'keywords', content: this.category ? this.category.meta_keywords : '' },
				],
			}
		},

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
			await this.$axios
				.get(`payments/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('payments/FETCH_CATEGORY', {
						category: response.data,
					})
				})

			await this.$axios.get('payments/list').then(response => {
				this.$store.commit('payments/FETCH_PAYMENTS', {
					payments: response.data.map(item => ({
						title: item.title,
						icon: item.icon,
						vip_status: item.vip_status,
						rooms: item.rooms_count,
						page: item.page,
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
	$payments-bg: url('~assets/i/payments-bg.jpg');
	.payments {
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 100%;
		&-header {
			margin-bottom: 32px;
			padding: 0 0 32px 0;
			background: $payments-bg no-repeat center;
		}
		&-list {
			display: grid;
			@include paddings('desktop');
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
		&__article-container {
			@include paddings('desktop');
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
				@include paddings('tablet');
				grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			}
			&__article-container {
				@include paddings('tablet');
			}
		}
	}

	@include mq('tablet') {
		.payments {
			&-list {
				@include paddings('mobile');
				grid-template-columns: 100%;
			}
			&__article-container {
				@include paddings('mobile');
			}
		}
	}
</style>
