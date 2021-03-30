<template>
	<section v-if="room" class="room">

		<div class="container-fluid">
			<breadcrumb-list v-if="pageable" :white="false" />
		</div>

		<div class="container-fluid">
			<room-header />

			<div class="row">

				<div class="col-9">

					<div class="row">
						<div class="col-auto">
							<toc-list v-if="tab.toc">
								<template v-slot="{ inline }">
									<toc-item
										:inline="inline"
										anchor="#about"
										:text="`О ${room.title}`">
									</toc-item>
									<toc-item v-for="(item, index) in tab.toc" :key="index"
										:index="index"
										:inline="inline"
										:anchor="item.anchor_id"
										:text="item.text">
									</toc-item>
								</template>
							</toc-list>
						</div>

						<div class="col">
							<page-article
								title-id="#about"
								:title="tab.title"
								:text="tab.text"
								:author="tab.author.full_name"
								:created="tab.created_at"
								:updated="tab.updated_at"
								:meta="true"
							>
								<template v-slot:footer>
									<faq-list v-if="tab.faq && tab.faq.mainEntity.length" label="FAQ">
										<faq-item v-for="(item, index) in tab.faq.mainEntity" :key="index"
										:question="item.name"
										:answer="item.acceptedAnswer.text">
										</faq-item>
									</faq-list>

									<telegram-subscribe
										label="Наш Телеграм-канал"
										description="Новости покерных румов мы публикуем в нашем Телеграм-канале. Подпишись, чтобы не упускать EV."
										btn-label="Подписаться"
										url="https://t-do.ru/worldpokerdealsRU"
									/>
									<reviews :room_id="room.id" :reviews="reviews" />
								</template>

							</page-article>
						</div>

						<div class="col">
							<div class="block-title">Похожие предложения</div>
							<room
								v-for="(item, index) in related" :key="index"
								:id="item.id"
								:title="item.title"
								:slug="item.slug"
								:rating="item.rating"
								:rakeback="item.rakeback"
								:bonus="item.bonus"
								:background="item.background"
								:image="item.image"
								:restricted="item.restricted"
								:network="item.network"
								:tags="item.tags"
								:review="item.review"
							/>
						</div>
					</div>

				</div>

				<div class="col-md-3">
					<aside class="room-aside">

						<div v-if="room.images.length" class="room-screenshots">
							<div class="block-title" :style="{marginTop: 0}">Скриншоты</div>
							<div class="room-screenshots__list">
								<a v-for="(item, index) in room.images" :key="index" :href="`${mediaUrl}/gallery-large/${item.filename}`"
									:class="['room-screenshot__item lightbox', index === 0 && 'room-screenshot__item_big']">
									<template v-if="index === 0">
										<img class="room-screenshot__img" :src="`${mediaUrl}/room-screenshot-medium/${item.filename}`" :alt="item.alt">
									</template>
									<template v-else>
										<img class="room-screenshot__img" :src="`${mediaUrl}/room-screenshot-small/${item.filename}`" :alt="item.alt">
									</template>
								</a>
							</div>
						</div>

						<room-params
							:founded_at="room.founded_at"
							:licenses="room.licenses"
							:certificates="room.certificates"
							:client_software="room.client_software"
							:network="room.network.title"
							:players_peak="room.players_peak"
							:tracker="false"
							:currencies="room.currencies"
							:min_deposit="room.min_deposit"
							:max_deposit="room.max_deposit"
							:games="[
								...room.disciplines,
								...room.games,
								// ...room.tables,
								// ...room.limits,
							]"
						/>

						<room-support
							:languages="room.locales"
							:email="room.email"
							:phone="room.phone"
							:livechat="room.livechat"
						/>
						
						<post-list v-if="room.posts.length">
							<post-item
								v-for="(item, index) in room.posts" :key="index"
								:image="item.image"
								:title="item.title"
								:summary="item.summary"
								:slug="item.slug"
								:author="item.user"
								:created="item.created_at"
								:categories="item.categories"
							></post-item>
						</post-list>
					</aside>

					<room-manager
						v-if="room.managers && room.managers.length"
						:name="room.managers[0].full_name"
						:manager_info="room.manager_info"
						:position="room.managers[0].position"
						:telegram="room.managers[0].telegram"
						:skype="room.managers[0].skype"
						:whatsapp="room.managers[0].whatsapp"
						:email="room.managers[0].email"
						:image="room.managers[0].image">  
					</room-manager>
				</div>

			</div>
		</div>
		<transition name="fade">
			<room-header-sticky v-if="showSticky"/>
		</transition>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import Room from '~/components/cards/Room'
import Reviews from '~/components/reviews/Reviews'

export default {
	layout: 'basic',

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

	scrollToTop: true,

	components: {
		RoomHeaderSticky: () => import('~/components/room/RoomHeaderSticky'),
		Reviews,
		Room
	},

	data: () => ({
		loading: false,
		showSticky: false
	}),

	computed: {
		...mapGetters({
			room: 'rooms/room',
			features: 'rooms/features',
			locale: 'lang/locale',
			country: 'location/country',
			geo: 'location/code',
			tab: 'rooms/tab',
			related: 'rooms/related',
			country: 'location/country',
			user: 'auth/user',
			pageable: 'pages/page',
			reviews: 'reviews/reviews',
		}),

		mediaUrl() {
			return process.env.mediaUrl
		},
	},

	async fetch() {

		await axios.get(`rooms/${this.pageable.slug}`).then((response) => {
			this.$store.commit('rooms/FETCH_ROOM', { room: response.data.room })
			this.$store.commit('rooms/FETCH_TAB', { tab: response.data.tab })
		}).catch(e => {

		})

		await axios.get('/rooms/related', {
			params: {
				id: this.room.id
			}
		}).then((response) => {
			this.$store.commit('rooms/FETCH_RELATED', { related: response.data })
		}).catch((e) => {

		})

		await axios.get('reviews/list', {
			params: {
				per_page: 5,
				sort: 'created_at',
				order: 'desc',
				room_id: this.room.id,
			}
		})
		.then((response) => {
			this.$store.commit('reviews/FETCH_REVIEWS', { reviews: response.data })
		})
		.catch((e) => {
		})
	},

	mounted() {
		window.addEventListener('scroll', this.handleScroll)
	},

	methods: {
		handleScroll(e) {
			let header = document.getElementsByClassName('room-header')[0],
					style = getComputedStyle(header),
					// margin = parseInt(style.marginBottom),
					offsetTop = header.offsetTop,
					offsetHeight = header.offsetHeight

			if (window.scrollY > offsetTop + offsetHeight - 80) {
				this.showSticky = true
			} else {
				this.showSticky = false
			}
		}
	}
}
</script>

<style lang="scss">

	.room-screenshots__list {
		display: flex;
		flex-flow: wrap;
		margin-bottom: -12px;
	}

	.room-screenshot__item {
		min-width: 100px;
		overflow: hidden;
		border-radius: 4px;
		margin-bottom: 12px;
		margin-right: 12px;
		display: block;
		&:last-child {
			margin-right: 0;
		}
		&_big {
			margin-right: 0;
			flex-grow: 1;
		}
	}

	.room-screenshot__img {
		display: block;
		width: 100%;
		height: auto;
	}
</style>