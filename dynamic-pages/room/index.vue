<template>
	<section v-if="room" class="room">

		<breadcrumb-list
			v-if="page"
			:white="false"
			:auto="false"
		>
			<breadcrumb-item
				slug="best-poker-rooms-2020"
				:title="$t('menu.best_rooms')"
				:index="1"
				:parent="{
					slug: 'rakeback-deals'
				}"
				:last="false"
				:white="false"
			></breadcrumb-item>
			<breadcrumb-item
				:slug="page.slug"
				:title="page.title"
				:index="2"
				:parent="{
					slug: 'rakeback-deals'
				}"
				:last="true"
				:white="false"
			></breadcrumb-item>
		</breadcrumb-list>

		<room-header ref="roomHeader" />

		<div class="article-container">
			<toc-list v-if="page.toc" class="room__toc article-container__toc">
				<template #default="{ inline }">
					<toc-item
						:inline="inline"
						:anchor="urlLit(page.title)"
						:text="
							page.is_review ? $t('room_about', { room: room.title }) : page.title
						"
						:offset="anchorOffset"
					>
					</toc-item>
					<toc-item
						v-for="(item, index) in page.toc"
						:key="index"
						:index="index"
						:inline="inline"
						:anchor="item.anchor_id"
						:text="item.text"
						:offset="anchorOffset"
					>
					</toc-item>
					<toc-item
						v-if="page.faq && page.faq.mainEntity.length"
						:inline="inline"
						anchor="faq"
						:text="$t('faq')"
						:offset="anchorOffset"
					>
					</toc-item>
<!-- 					<toc-item
						:inline="inline"
						anchor="reviews"
						:text="$t('room_reviews')"
						:offset="anchorOffset"
					>
					</toc-item> -->
				</template>
			</toc-list>

			<page-article
				v-if="!$fetchState.pending"
				class="room__content article-container__article"
				:title-id="urlLit(page.title)"
				:title="page.title"
				:text="page.text"
				:author="page.author.full_name"
				:created="page.created_at"
				:updated="page.updated_at"
				:meta="true"
			>
				<template #footer>
					<faq-list
						id="faq"
						v-if="page.faq && page.faq.mainEntity.length"
						:label="$t('faq')"
					>
						<faq-item
							v-for="(item, index) in page.faq.mainEntity"
							:key="index"
							:question="item.name"
							:answer="item.acceptedAnswer.text"
						>
						</faq-item>
					</faq-list>

					<telegram-subscribe />

					<author v-if="page.author" :author="page.author" />

					<!-- <reviews id="reviews" :room_id="room.id" :reviews="reviews" /> -->
				</template>
			</page-article>

			<div class="room__side-content article-container__aside-content">
				<aside class="room-aside">
					<div v-if="room.images.length" class="room-screenshots">
						<div class="block-title" :style="{ marginTop: 0 }">{{ $t('screenshots') }}</div>
						<div class="room-screenshots__list">
							<a
								v-for="(item, index) in screenshots"
								:key="index"
								:href="`${mediaUrl}/gallery-large/${item.filename}`"
								:class="[
									'room-screenshot__item lightbox',
									index === 0 && 'room-screenshot__item_big',
								]"
							>
								<template v-if="index === 0">
									<img
										decoding="async"
										loading="lazy"
										class="room-screenshot__img"
										:src="`${mediaUrl}/room-screenshot-medium/${item.filename}`"
										:alt="item.alt"
									/>
								</template>
								<template v-else>
									<img
										decoding="async"
										loading="lazy"
										class="room-screenshot__img"
										:src="`${mediaUrl}/room-screenshot-small/${item.filename}`"
										:alt="item.alt"
									/>
								</template>
							</a>
						</div>
					</div>

					<room-params
						:founded_at="room.founded_at"
						:licenses="room.licenses"
						:certificates="room.certificates"
						:client_software="room.client_software"
						:network="room.network"
						:players_peak="room.players_peak"
						:tracker="room.hud"
						:currencies="room.currencies"
						:min_deposit="room.min_deposit"
						:max_deposit="room.max_deposit"
						:games="room.game_types.filter(item => {return item.type === 'game' || item.type === 'discipline'})"
					/>

					<room-support
						:languages="room.locales"
						:email="room.email"
						:phone="room.phone"
						:livechat="room.livechat"
					/>

					<post-list
						v-if="room.posts.length"
						:label="$t('room_news', {room: room.title})"
					>
						<post-item
							v-for="(item, index) in room.posts"
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
					:image="room.managers[0].image"
				>
				</room-manager>
			</div>
		</div>

		<div class="room__recommended-container">
			<div class="room__recommended">
				<div class="room__recommended__title block-title">
					{{ $t('related_offers') }}
				</div>
				<room
					v-for="(item, index) in related"
					:id="item.id"
					:key="index"
					:title="item.title"
					:slug="item.slug"
					:url="item.url"
					:rating="item.rating"
					:rakeback="item.rakeback"
					:bonus="item.bonus"
					:background="item.background"
					:image="item.image"
					:restricted="item.restricted"
					:available="item.available"
					:blacklist="item.blacklist"
					:network="item.network"
					:tags="item.tags"
					:review="item.review"
				/>
			</div>
		</div>

		<transition name="fade">
			<room-header-sticky v-if="!$device.isMobile && showSticky" />
			<room-bottom-sticky v-if="$device.isMobile && showSticky" />
		</transition>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	export default {
		components: {
			RoomHeaderSticky: () => import('~/components/room/RoomHeaderSticky'),
			RoomBottomSticky: () => import('~/components/room/RoomBottomSticky'),
		},

		layout: 'basic',

		scrollToTop: true,

		data: () => ({
			loading: false,
			showSticky: false,
			anchorOffset: 40,
		}),

		head() {
			return {
				meta: [
					{ hid: 'og:image', name: 'og:image', content: this.room ? this.ogImage : '' },
				],
			}
		},

		computed: {
			...mapGetters({
				room: 'rooms/room',
				features: 'rooms/features',
				locale: 'lang/locale',
				country: 'location/country',
				geo: 'location/code',
				related: 'rooms/related',
				country: 'location/country',
				user: 'auth/user',
				page: 'pages/page',
				reviews: 'reviews/reviews',
			}),

			ogImage() {
				return `${this.mediaUrl}/room-og-image/${this.room.slug}.webp`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},

			screenshots() {
				let items = []

				items = this.room.images.filter(item => {
					return item.pivot.locale === this.locale
				})

				if (!items.length) {
					items = this.room.images.filter(item => {
						return item.pivot.locale === 'ru'
					})
				}

				// items = items.sort(item => {
				// 	return item.pivot.locale === this.locale
				// })

				// return this.room.images.filter(item => {
				// 	return item.pivot.locale === this.locale || item.pivot.locale === 'ru'
				// }).splice(0, 4)

				return items.splice(0, 4)
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		async fetch() {

			await this.$axios
				.get(`rooms/${this.page.slug}`, {
					params: {
						country_id: this.country.id,
						locale: this.locale
					},
				})
				.then(response => {
					this.$store.commit('rooms/FETCH_ROOM', { room: response.data.room })
					this.$store.commit('rooms/FETCH_RELATED', {
						related: response.data.related,
					})
				})
				.catch(e => {})
		},

		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},

		methods: {
			handleScroll(e) {
				let header = this.$refs.roomHeader.$el,
					style = getComputedStyle(header),
					offsetTop = header.offsetTop,
					offsetHeight = header.offsetHeight

				if (window.scrollY > offsetTop + offsetHeight - 80) {
					this.showSticky = true
					eventBus.$emit('pageHeader:hide', true)
				} else {
					this.showSticky = false
					eventBus.$emit('pageHeader:hide', false)
				}
			},

			urlLit(w, v) {
				let tr = 'a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(
					' '
				)
				let ww = ''
				w = w.toLowerCase()
				for (let i = 0; i < w.length; ++i) {
					let cc = w.charCodeAt(i)
					var ch = cc >= 1072 ? tr[cc - 1072] : w[i]
					if (ch && ch.length < 3) ww += ch
					else if (ch) ww += eval(ch)[v]
				}
				return ww
					.replace(/[^a-zA-Z0-9\-]/g, '-')
					.replace(/[-]{2,}/gim, '-')
					.replace(/^\-+/g, '')
					.replace(/\-+$/g, '')
			},
		},
	}
</script>

<style lang="scss">
	.room {
		width: 100%;
		max-width: 1440px;
		@include paddings('desktop');
		&__recommended {
			grid-area: list;
		}
		&__recommended-container {
			display: grid;
			grid-template-columns: auto 742px 326px;
			grid-template-areas: 'list list .';
			column-gap: 56px;
		}
	}

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

	@include mq('desktop') {
		.room {
			&__recommended-container {
				grid-template-columns: minmax(184px, 2fr) minmax(704px, 7fr) minmax(
						288px,
						3fr
					);
				column-gap: 24px;
			}
		}
	}

	@include mq('laptop') {
		.room {
			@include paddings('tablet');
			&__recommended {
				@include paddings('tablet');
				margin: 0 -24px;
			}
			&__recommended-container {
				grid-template-columns: 100%;
				grid-template-areas: 'list';
			}
		}

		.room-screenshots {
			display: none;
		}
	}

	@include mq('tablet') {
		.room {
			@include paddings('mobile');
			&__recommended {
				padding: 0;
				margin: 0 -20px;
				&__title {
					padding-left: 20px;
					&::before {
						left: 20px;
					}
				}
			}
			& &__toc {
				margin-top: 0;
			}
		}
	}
</style>
