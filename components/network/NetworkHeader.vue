<template>
	<div class="network-header">
		<div class="container-fluid">
			<div class="network-header__wrap">
				<div class="row">
					<div class="col-2">
						<div class="network-header__logo">
							<svg-icon
								class="network__icon"
								:icon="network.url"
								:width="136"
								:height="136"
								view-box="0 0 200 200"
							/>
						</div>
					</div>
					<div class="col-6">
						<h1 class="network__title">{{ network.title }}</h1>
						<page-meta
							:author="network.user ? network.user.full_name : null"
							:created="network.created_at"
							:updated="network.updated_at"
							:dark="true"
						>
						</page-meta>
						<div class="network__summary" v-html="network.summary"></div>
					</div>
					<div class="col-4">
						<room-top
							v-if="rooms"
							:id="rooms[0].id"
							:style="{ top: 0, margin: '0 0 26px 0' }"
							:title="rooms[0].title"
							:slug="rooms[0].slug"
							:restricted="rooms[0].restricted"
							:country="country"
							:rating="rooms[0].rating"
							:bonus="rooms[0].top_bonus"
							:review="rooms[0].review"
						/>
					</div>
				</div>
			</div>
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
			&__wrap {
				padding: 30px 30px 0 30px;
				position: relative;
			}

			&__logo {
				text-align: right;
			}

			&__meta {
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
</style>
