<template>

	<div class="soft">

		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" />
			<soft-header />
		</div>

		<div class="container-fluid">

			<div class="row">
				<div class="col-auto">
					<toc-list v-if="tab.toc">
						<toc-item v-for="(item, index) in tab.toc" :key="index"
							:index="index"
							:anchor="item.anchor_id"
							:text="item.text">
						</toc-item>
					</toc-list>
				</div>

				<div class="col">
					<!-- Article -->
					<page-article :text="tab.text">
						<template v-slot:footer>
							<!-- Faq -->
							<faq-list v-if="tab.faq && tab.faq.mainEntity.length" label="FAQ">
								<faq-item v-for="(item, index) in tab.faq.mainEntity" :key="index"
									:question="item.name"
									:answer="item.acceptedAnswer.text">
								</faq-item>
							</faq-list>
							<!-- Author -->
							<author v-if="tab.author" :author="tab.author" />
							<!-- Comments -->
							<comments commentable_type="App\Tab" :commentable_id="tab.id" />
						</template>
					</page-article>
				</div>

				<div class="col-3">
					<room-top-list />

					<post-list v-if="soft.posts.length">
						<post-item
							v-for="(item, index) in soft.posts" :key="index"
							:image="item.image"
							:title="item.title"
							:summary="item.summary"
							:slug="item.slug"
							:author="item.user"
							:created="item.created_at"
							:categories="item.categories"
						></post-item>
					</post-list>

					<topic-list v-if="tab.topics.length">
						<topic-item
							v-for="(item, index) in tab.topics" :key="index"
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
import axios from 'axios'

export default {

	name: 'SoftPage',

	head () {
		return { 
			title: this.tab.meta_title,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: this.tab.meta_description },
				{ name: 'keywords', content: this.tab.meta_keywords }
			],
		}
	},

	components: {
	},

	data: () => ({
		loading: false
	}),

	computed: {
		...mapGetters({
			locale: 'lang/locale',
			country: 'location/country',
			user: 'auth/user',
			pageable: 'pages/page',
			soft: 'soft/soft',
			tab: 'soft/tab'
		}),

		mediaUrl() {
			return process.env.mediaUrl
		},
	},

	async fetch() {

		await axios.get(`soft/${this.pageable.slug}`).then((response) => {
			this.$store.commit('soft/FETCH_SOFT', { soft: response.data.soft })
			this.$store.commit('soft/FETCH_TAB', { tab: response.data.tab })
		})
	},

	mounted() {

	},

	created () {
	},

	watch: {

	},

	methods: {
	}
}
</script>

<style lang="scss">
.soft {
	&__title {
		margin-bottom: 20px;
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 30px;
		line-height: 36px;
		letter-spacing: -0.3px;
		color: #222222;
	}

	&__wrap {
		padding: 0 30px;
	}
}
</style>