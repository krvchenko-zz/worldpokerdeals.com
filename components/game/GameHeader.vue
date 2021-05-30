<template>
	<div class="game-header">
		<div class="container-fluid">
			<div class="game-header__wrap">
				<div class="row">
					<div class="col-2">
						<div class="game-header__logo">
							<svg-icon
								:icon="game.icon"
								:width="136"
								:height="136"
								view-box="0 0 200 200"
							/>
						</div>
					</div>
					<div class="col-6">
						<h1 class="game__title">{{ tab.title }}</h1>
						<page-meta
							:author="tab.author ? tab.author.full_name : ''"
							:created="tab.created_at"
							:updated="tab.updated_at"
							:dark="true"
						>
						</page-meta>

						<div class="game__summary" v-html="tab.summary"></div>
					</div>
					<div class="col-4">
						<room-top
							v-if="best"
							:id="best.id"
							:title="best.title"
							:slug="best.slug"
							:restricted="best.restricted"
							:country="country"
							:rating="best.rating"
							:bonus="best.top_bonus"
							:review="best.review"
						/>
					</div>
				</div>

				<div v-if="game.tabs.length > 1" class="row">
					<div class="col-12">
						<tab-list>
							<tab-item
								v-for="(item, index) in game.tabs"
								:key="index"
								:params="{
									parent: 'raznovidnosti-pokera',
									child: item.slug,
								}"
								:name="item.name"
							>
							</tab-item>
						</tab-list>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'GameHeader',

		components: {},

		props: {
			latest: {
				type: [Object, Boolean],
				default: false,
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				game: 'games/game',
				tab: 'games/tab',
				pageable: 'pages/page',
				best: 'rooms/best',
				country: 'location/country',
			}),
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$game-bg: url('~assets/i/summary-bg.jpg?data');
	.game-header {
		overflow: hidden;
		position: relative;
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		margin-left: -26px;
		margin-right: -26px;
		&:before {
			opacity: 0.5;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $game-bg no-repeat center;
			background-size: cover;
		}
	}

	.game {
		&-header {
			&__wrap {
				padding: 30px 30px 0 30px;
				position: relative;
			}

			&__logo {
				text-align: right;
			}
		}

		&__title {
			margin-bottom: 16px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #222222;
		}

		&__summary {
			padding-bottom: 26px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}
	}
</style>
