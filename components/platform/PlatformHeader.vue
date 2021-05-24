<template>
	<div class="platform-header">
		<div class="container-fluid">
			<div class="platform-header__wrap">
				<div class="row">
					<div class="col-2">
						<div class="platform-header__logo">
							<svg-icon
								:icon="`${platform.icon}-large`"
								:width="136"
								:height="136"
								view-box="0 0 88 88"
							/>
						</div>
					</div>
					<div class="col-6">
						<h1 class="platform__title">{{ platform.heading }}</h1>
						<page-meta
							:author="platform.author ? platform.author.full_name : ''"
							:created="platform.created_at"
							:updated="platform.updated_at"
							:dark="true"
						>
						</page-meta>

						<div class="platform__summary" v-html="platform.summary"></div>
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
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PlatformHeader',

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
				platform: 'platforms/platform',
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
	$platform-bg: url('~assets/i/summary-bg.jpg?data');
	.platform-header {
		overflow: hidden;
		position: relative;
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		&:before {
			opacity: 0.5;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $platform-bg no-repeat center;
			background-size: cover;
		}
	}

	.platform {
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
