<template>
	<div class="payments">
		<div class="payments-header">
			<div class="container-fluid">
				<breadcrumb-list :white="true" />
				<h1 class="payments__title">{{ category.title }}</h1>
				<div class="payments__summary" v-html="category.summary"></div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="payments-list">
				<div class="row">
					<div v-for="(item, index) in payments" :key="index" class="col-3">
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
			</div>

			<div class="row">
				<div class="col-auto">
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

				<div class="col col-article">
					<!-- Article -->
					<page-article :text="category.text">
						<template #footer>
							<!-- Author -->
							<author v-if="category.author" :author="category.author" />
							<!-- Comments -->
							<comments
								commentable_type="App\PaymentMethodCategory"
								:commentable_id="category.id"
							/>
						</template>
					</page-article>
				</div>

				<div class="col-3">
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PaymentCategory',

		components: {},

		head() {
			return {
				title: this.category.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.category.meta_description },
					{ name: 'keywords', content: this.category.meta_keywords },
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
		&-header {
			margin-bottom: 32px;
			padding: 0 0 32px 0;
			background: $payments-bg no-repeat center;
		}
		&-list {
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
</style>
