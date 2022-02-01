<template>
	<div class="games-page">
		<div class="games">
			<div class="games-header" :style="{
				background: `url(${require('~/assets/i/games-bg.jpg')}) no-repeat 50%`,
				backgroundSize: 'cover',
			}">
				<breadcrumb-list :white="true" />
				<h1 class="games__title">{{ pageable.title }}</h1>
				
				<common-text-spoiler
					:limit="$device.isMobile || $device.isTablet ? 100 : 600"
					class="games__summary"
					:text="pageable.summary"
				>
					<template v-slot:button>
						<svg-icon icon="spoiler-sep" width="35" height="16" />
					</template>
				</common-text-spoiler>

				<game-nav-list>
					<game-nav-item
						v-for="(item, index) in types"
						:key="index"
						:active="item.value === type"
						:label="item.label"
						:value="item.value"
						@click="handleNavClick"
					>
					</game-nav-item>
				</game-nav-list>
			</div>

			<div class="games-list">
				<game-item
					v-for="item in games"
					:key="item.slug"
					:title="item.name || item.title"
					:icon="item.icon"
					:rooms="item.rooms_count"
					:page="item.review"
				>
				</game-item>
			</div>

			<div class="article-container">
				<div class="article-container__toc">
					<toc-list v-if="pageable.toc && pageable.toc.length">
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

				<div class="article-container__article">
					<!-- Article -->
					<page-article :text="pageable.text">
						<template #footer>
							<!-- Author -->
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
							<author v-if="pageable.author" :author="pageable.author" />
						</template>
					</page-article>
				</div>

				<div class="article-container__aside-content">
					<room-top-list />
					<post-list v-if="posts">
						<post-item
							v-for="(item, index) in posts"
							:key="index"
							:image="item.image"
							:title="item.page.title"
							:summary="item.page.summary"
							:slug="item.page.slug"
							:author="item.page.author"
							:created="item.page.created_at"
							:categories="item.categories"
						></post-item>
					</post-list>
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
					<game-search-banner />
				</div>
			</div>

			<page-banners />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'GameCategory',

		components: {
			Background: () => import('~/assets/i/games-bg.jpg'),
		},

		head() {
			return {
				meta: [
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				pageable: 'pages/page',
				games: 'games/games',
				posts: 'posts/posts',
			}),
		},

		data: () => ({
			loading: false,
			type: 'discipline',
			types: [
				{
					label: 'Виды покера',
					value: 'discipline',
				},
				{
					label: 'Дисциплины',
					value: 'game',
				},
				{
					label: 'Тип стола',
					value: 'table',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get('games/list', {
					params: {
						type: this.type,
						locale: this.locale,
					},
				})
				.then(response => {
					this.$store.commit('games/FETCH_GAMES', { games: response.data })
				})

			await this.$axios
				.get('posts/list', {
					params: {
						locale: this.locale,
						per_page: 5,
						order: 'created_at',
						sort: 'desc',
					},
				})
				.then(response => {
					this.$store.commit('posts/FETCH_POSTS', {
						posts: response.data.data,
					})
				})
		},

		watch: {},

		mounted() {},

		created() {},

		methods: {
			handleNavClick($event) {
				$nuxt.$loading.start()
				this.type = $event

				this.$fetch().then(() => {
					$nuxt.$loading.finish()
				})
			},
		},
	}
</script>

<style lang="scss">

	.games {
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
	}

	.games-list {
		margin-bottom: 20px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 20px;
	}

	.games__title {
		text-align: center;
		margin: 0 0 16px 0;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 32px;
		line-height: 36px;
		color: #ffffff;
	}

	.games__summary {
		margin-bottom: 24px;
		font-family: Proxima Nova;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		color: #ffffff;
		opacity: 0.8;
	}

	@include mq('laptop') {
		.games-page {
			@include paddings('laptop');
		}
		.games-header {
			@include paddings('laptop');
			margin: 0 -24px 24px -24px;
		}
		.games {
			.page-banners {
				margin-right: -24px;
				width: calc(100% + 24px);
			}
		}

		.games-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@include mq('tablet') {
		.games {
			.page-banners {
				margin-right: -20px;
				width: calc(100% + 20px);
			}
		}

		.games-page {
			@include paddings('tablet');
		}

		.games-list {
			grid-template-columns: 100%;
			margin-bottom: 8px;
		}

		.games-header {
			@include paddings('tablet');
			margin: 0 -24px 24px -24px;
			.games-nav {
				display: flex;
				justify-content: center;
				&__label {
					white-space: nowrap;
				}
				&__list {
					overflow-x: scroll;
					@include hide-scroll();
					justify-content: flex-start;
				}
				&__item {
					margin-right: 0;
				}
			}
		}
	}

	@include mq('mobile') {
		.games-page {
			@include paddings('mobile');
		}
		.games-header {
			@include paddings('mobile');
			margin: 0 -20px 24px -20px;
		}
	}
</style>
