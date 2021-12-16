<template>
	<div class="network-header">
		<div class="network-header__wrap">
			<div class="network-header__logo">
				<svg-icon
					class="network__icon"
					:icon="network.url"
					:width="$device.isMobile ? 120 : 136"
					:height="$device.isMobile ? 120 : 136"
					:image="true"
					view-box="0 0 200 200"
				/>
			</div>

			<div class="network-header__content">
				<h1 class="network__title">{{ network.heading }}</h1>
				<page-meta
					:author="network.user ? network.user.full_name : null"
					:created="network.created_at"
					:updated="network.updated_at"
					:dark="true"
					class="network-header__meta"
				>
				</page-meta>
				<common-text-spoiler
					:limit="$device.isMobile || $device.isTablet ? 100 : 600"
					class="network__summary"
					:text="network.summary"
				>
					<template v-slot:button>
						<svg-icon icon="spoiler-sep" width="35" height="16" />
					</template>
				</common-text-spoiler>
			</div>

			<room-top
				v-if="rooms && rooms.length"
				:id="rooms[0].id"
				:title="rooms[0].title"
				:slug="rooms[0].slug"
				:url="rooms[0].url"
				:restricted="rooms[0].restricted"
				:country="country"
				:rating="rooms[0].rating"
				:bonus="rooms[0].top_bonus"
				:review="rooms[0].review"
				:label="$t('room_best')"
				class="network__top-room"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'NetworkHeader',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				network: 'networks/network',
				pageable: 'pages/page',
				rooms: 'rooms/rooms',
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
	.network-header {
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background: radial-gradient(
			96.88% 66.11% at 57.43% 2.13%,
			#cccccc 0%,
			#f1f1f1 100%
		);
	}

	.network {
		&-header {
			padding: 28px 60px 0 28px;
			&__wrap {
				display: flex;
				gap: 56px;
				position: relative;
			}

			&__logo {
				padding-left: 28px;
				text-align: right;
			}

			&__meta {
			}
		}

		&__top-room {
			margin: 0 0 26px 0;
			top: 0;
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
			padding-bottom: 40px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}

		&__icon {
			border-radius: 50%;
		}
	}

	@include mq('desktop') {
		.network-header {
			padding: 28px 24px;
			&__wrap {
				gap: 20px;
			}
			&__logo {
				padding-left: 24px;
			}
		}

		.network {
			&__top-room {
				margin-left: 48px;
			}
		}
	}

	@include mq('laptop') {
		.network-header {
			padding-bottom: 32px;
			&__logo {
				padding-left: 21px;
				margin-right: 46px;
			}
		}

		.network {
			&__top-room {
				display: none;
			}
			&__summary {
				padding-bottom: 0;
				p:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	@include mq('tablet') {
		.network-header {
			padding: 24px 20px 32px;
			margin-left: -20px;
			margin-right: -20px;
			&__wrap {
				flex-direction: column;
				align-items: center;
				gap: 20px;
			}
			&__logo {
				padding-left: 0;
				margin-right: 0;
			}
			&__meta {
				justify-content: center;

				/* .page-meta__item {
					margin: 0;
					padding: 0;
				} */
			}
		}

		.network {
			&__title {
				text-align: center;
			}
		}
	}
</style>
