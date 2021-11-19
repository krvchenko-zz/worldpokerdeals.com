<template>
	<div v-if="category" class="games">
		<div class="games-header">
			<breadcrumb-list :white="true" />
			<h1 class="games__title">{{ category.title }}</h1>
			
			<common-text-spoiler
				:limit="$device.isMobile || $device.isTablet ? 100 : 600"
				class="games__summary"
				:text="category.summary"
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
				:rooms="item.rooms"
				:page="item.page"
			>
			</game-item>
		</div>

		<div class="article-container">
			<div class="article-container__toc">
				<toc-list v-if="category.toc && category.toc.length">
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

			<div class="article-container__article">
				<!-- Article -->
				<page-article :text="category.text">
					<template #footer>
						<!-- Author -->
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
						<author v-if="category.author" :author="category.author" />
						<!-- Comments -->
<!-- 						<comments
							commentable_type="App\GameCategory"
							:commentable_id="category.id"
						/> -->
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
						:title="item.title"
						:summary="item.summary"
						:slug="item.slug"
						:author="item.user"
						:created="item.created_at"
						:categories="item.categories"
					></post-item>
				</post-list>
				<topic-list v-if="category.topics && category.topics.length">
					<topic-item
						v-for="(item, index) in category.topics"
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
				category: 'games/category',
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
				.get(`games/category/${this.pageable.slug}`)
				.then(response => {
					this.$store.commit('games/FETCH_CATEGORY', {
						category: response.data,
					})
				})
				.then()

			await this.$axios
				.get('games/list', {
					params: {
						type: this.type,
					},
				})
				.then(response => {
					this.$store.commit('games/FETCH_GAMES', {
						games: response.data.map(item => ({
							title: item.title,
							name: item.name,
							icon: item.icon,
							page: item.page,
							rooms: item.rooms_count,
						})),
					})
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
						posts: response.data.data.map(item => ({
							image: item.image,
							title: item.title,
							summary: item.summary,
							slug: item.slug,
							user: {
								image: item.user.image,
								full_name: item.user.full_name,
							},
							created_at: item.created_at,
							categories: item.categories,
						})),
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
	$games-bg: url('~assets/i/games-bg.jpg');

	.games {
		width: 100%;
		max-width: 1440px;
		@include paddings('desktop');
	}

	.games-header {
		margin-bottom: 32px;
		padding: 0 0 32px 0;
		// background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #BA2B2B 0%, #5A0101 100%);
		background: $games-bg no-repeat center;
		background-size: cover;
		margin-left: -26px;
		margin-right: -26px;
		width: calc(100% + 2 * 26px);
		@include paddings('desktop');
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
		.games {
			@include paddings('tablet');

			.page-banners {
				margin-right: -24px;
				width: calc(100% + 24px);
			}
		}

		.games-header {
			@include paddings('tablet');
			margin-left: -24px;
			margin-right: -24px;
			width: calc(100% + 2 * 24px);
		}

		.games-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@include mq('tablet') {
		.games {
			@include paddings('mobile');

			.page-banners {
				margin-right: -20px;
				width: calc(100% + 20px);
			}
		}

		.games-list {
			grid-template-columns: 100%;
			margin-bottom: 8px;
		}

		.games-header {
			@include paddings('mobile');
			margin-left: -20px;
			margin-right: -20px;
			margin-bottom: 24px;
			width: calc(100% + 2 * 20px);

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
</style>
