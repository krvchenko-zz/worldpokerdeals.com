<template>
	<section class="content">
		<div class="terms">
			<div class="terms-header">
				<div class="container-fluid">
					<breadcrumb-list />
				</div>
			</div>

			<div class="terms__article-container article-container">
				<div class="article-container__toc">
					<toc-list v-if="page.toc">
						<template #default="{ inline }">
							<toc-item
								v-for="(item, index) in page.toc"
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
				<page-article
					class="article-container__article"
					:meta="true"
					:text="page.text"
					:title="page.title"
					:created="page.created_at"
					:updated="page.updated_at"
				/>

				<div v-if="locale === ('en' || 'es')" class="article-container__aside">
					<h3 class="block-title">Дополнительно</h3>
					<ul class="terms-extra">
						<nuxt-link
							v-slot="{ href, isActive, isExactActive, navigate }"
							prefetch
							:to="{ name: 'terms' }"
						>
							<li v-if="!isExactActive" class="terms-extra__item">
								<a class="terms-extra__link" :href="href" @click="navigate"
									>Пользовательское соглашение</a
								>
							</li>
						</nuxt-link>
						<nuxt-link
							v-slot="{ href, isActive, isExactActive, navigate }"
							prefetch
							:to="{ name: 'privacy' }"
						>
							<li v-if="!isExactActive" class="terms-extra__item">
								<a class="terms-extra__link" :href="href" @click="navigate"
									>Политика приватности</a
								>
							</li>
						</nuxt-link>

						<nuxt-link
							v-slot="{ href, isActive, isExactActive, navigate }"
							prefetch
							:to="{ name: 'privacy', hash: '#cookies' }"
						>
							<li v-if="!isExactActive" class="terms-extra__item">
								<a class="terms-extra__link" :href="href" @click="navigate"
									>Политика куки-файлов</a
								>
							</li>
						</nuxt-link>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Privacy',

		layout: 'basic',

		async middleware({ store, route, $axios }) {
			await $axios
				.get(`pages/${route.fullPath}`, {
					params: {},
				})
				.then(response => {
					store.commit('pages/FETCH_PAGE', { page: response.data })
				})
				.catch(error => {})
		},

		components: {},

		head() {
			return {
				title: this.page.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.page.meta_description },
					{ name: 'keywords', content: this.page.meta_keywords },
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				page: 'pages/page',
			}),
		},

		data: () => ({
			loading: false,
		}),

		async fetch() {},

		watch: {},

		mounted() {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.terms {
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 100%;
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

		&-extra {
			padding: 0;
			margin: 0;
			&__item {
				margin-bottom: 16px;
				list-style: none;
			}

			&__link {
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 16px;
				line-height: 20px;
				text-decoration-line: underline;
				color: #008be2;
				&:hover,
				&:visited,
				&:active {
					color: #008be2;
					text-decoration: none;
				}
			}
		}
	}

	@include mq('laptop') {
		.terms {
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
		.terms {
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
