<template>
	<div v-if="feed">
		<club-feed-item
			v-for="(item, index) in feed"
			:key="index"
			:title="item.title"
			:rating="item.rating"
			:rakeback="item.rakeback"
			:background="item.background"
			:image="item.image"
			:warranty="item.warranty"
			:club_id="item.club_id"
			:agent_id="item.agent_id"
			:tables_count="item.tables_count"
			:union="item.union"
			:country="item.country"
			:features="[...item.disciplines, ...item.games, ...item.tables]"
		/>

		<div v-if="next_page_url" class="promotions-more">
			<button class="btn promotions__more" @click.prevent="handleLoadMore">
				{{ $t('show_more') }} <span>{{ total - per_page }}</span>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PromotionFeed',

		components: {},

		props: {
			room_id: {
				type: [Number, String],
				required: true,
			},
		},

		data: () => ({
			per_page: 4,
			total: null,
			next_page_url: null,
		}),

		async fetch() {
			await this.$axios
				.get('/club/feed', {
					params: {
						per_page: this.per_page,
						room_id: this.room_id,
					},
				})
				.then(response => {
					this.$store.commit('clubs/FETCH_FEED', { feed: response.data.data })
					this.total = response.data.total

					this.next_page_url = response.data.next_page_url
				})
				.catch(e => {})
		},

		created() {},

		computed: {
			...mapGetters({
				country: 'location/country',
				feed: 'clubs/feed',
				room: 'rooms/room',
			}),
		},

		watch: {},

		methods: {
			async handleLoadMore() {
				$nuxt.$loading.start()
				this.per_page = this.total
				await this.$axios
					.get('/club/feed', {
						params: {
							per_page: this.per_page,
							room_id: this.room_id,
						},
					})
					.then(response => {
						this.$store.commit('clubs/FETCH_FEED', { feed: response.data.data })
						$nuxt.$loading.finish()
						this.next_page_url = response.data.next_page_url
					})
					.catch(e => {
						$nuxt.$loading.finish()
					})
			},
		},
	}
</script>

<style lang="scss">
	.promotions-table {
		border: 1px solid #e9e9e9;
		margin: 28px 0 32px 0;
		margin-bottom: 20px !important;
	}

	.promotions {
		&__more {
			padding: 6px 15px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 14px;
			border: 1px solid rgba(0, 139, 226, 0.5);
			background: transparent;
			color: #008be2;
			span {
				margin-left: 5px;
				text-align: center;
				padding: 0 7px;
				min-width: 22px;
				height: 22px;
				border: 1px solid rgba(204, 204, 204, 0.6);
				border-radius: 50px;
				display: inline-block;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 13px;
				line-height: 20px;
				text-align: center;
				color: #aaaaaa;
			}
		}
	}
</style>
