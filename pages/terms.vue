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

				<div v-if="locale === 'en' || locale === 'es'" class="article-container__aside">
					<h3 class="block-title">{{ $t('extra') }}</h3>
					<ul class="terms-extra">
						<li class="terms-extra__item">
							<nuxt-link
								v-slot="{ href, navigate }"
								prefetch
								:to="{ name: 'privacy' }"
							>
								<a class="terms-extra__link" :href="href" @click="navigate"
									>{{ $t('menu.privacy') }}</a
								>
							</nuxt-link>
						</li>

						<li class="terms-extra__item">
							<nuxt-link
								v-slot="{ href, navigate }"
								prefetch
								:to="{ name: 'privacy', hash: '#cookies' }"
							>
								<a class="terms-extra__link" :href="href" @click="navigate"
									>{{ $t('menu.cookie') }}</a
								>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pageMixin from '~/mixins/pageMixin'

	export default {
		name: 'Terms',

		layout: 'basic',

		mixins: [pageMixin],

		components: {},

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
