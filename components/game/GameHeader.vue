<template>
	<div class="game-header">
		<div class="game-header__logo">
			<svg-icon
				:icon="game.icon"
				:width="136"
				:height="136"
				view-box="0 0 200 200"
			/>
		</div>

		<div class="game-header__content">
			<h1 class="game__title">{{ tab.title }}</h1>
			<page-meta
				:author="tab.author ? tab.author.full_name : ''"
				:created="tab.created_at"
				:updated="tab.updated_at"
				:dark="true"
			>
			</page-meta>

			<common-text-spoiler
				:limit="$device.isMobile || $device.isTablet ? 100 : 600"
				class="game__summary"
				:text="tab.summary"
			>
				<template v-slot:button>
					<svg-icon icon="spoiler-sep" width="35" height="16" />
				</template>
			</common-text-spoiler>
		</div>

		<room-top
			class="game-header__room-top"
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

		<div v-if="game.tabs.length > 1" class="game-header__nav">
			<tab-list>
				<tab-item
					v-for="(item, index) in game.tabs"
					:key="index"
					:params="{
						parent: item.page.parent ? item.page.parent.slug : item.page.slug,
						child: item.page.parent ? item.page.slug : null,
					}"
					:name="item.name"
				>
				</tab-item>
			</tab-list>
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
		display: grid;
		grid-template-columns: 172px 1fr 326px;
		grid-template-areas:
			'logo content room-top'
			'nav nav nav';
		column-gap: 56px;
		overflow: hidden;
		position: relative;
		padding-top: 28px;
		@include paddings('desktop');
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		&:before {
			opacity: 0.5;
			left: 0;
			top: 0;
			z-index: -1;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $game-bg no-repeat center;
			background-size: cover;
		}
		&__content {
			grid-area: content;
		}
		&__room-top {
			grid-area: room-top;
		}
		&__nav {
			grid-area: nav;
		}
	}

	.game {
		&-header {
			&__wrap {
				padding: 30px 30px 0 30px;
				position: relative;
			}

			&__logo {
				grid-area: logo;
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

	@include mq('laptop') {
		.game-header {
			grid-template-columns: 24px 157px 66px 1fr 24px;
			grid-template-areas:
				'. logo . content .'
				'nav nav nav nav nav';
			column-gap: 0;
			padding-left: 0;
			padding-right: 0;
			&__room-top {
				display: none;
			}
		}
	}

	@include mq('tablet') {
		.game-header {
			margin-left: -20px;
			margin-right: -20px;
			grid-template-columns: 20px 1fr 20px;
			grid-template-areas:
				'. logo .'
				'. content .'
				'nav nav nav';
			&__logo {
				text-align: center;
				margin-bottom: 20px;
			}
			&__summary {
				padding-bottom: 20px;
			}
			&__nav {
				width: 100%;
			}
		}
	}
</style>
