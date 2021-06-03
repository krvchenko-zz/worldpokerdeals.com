<template>
	<div class="platform-header">
		<div class="platform-header__logo">
			<svg-icon
				:icon="`${platform.icon}-large`"
				:width="136"
				:height="136"
				view-box="0 0 88 88"
			/>
		</div>

		<div class="platform-header__content">
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

		<room-top
			class="platform-header__room-top"
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
		display: flex;
		gap: 56px;
		padding: 28px 60px 0px;
		position: relative;
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
			z-index: -1;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $platform-bg no-repeat center;
			background-size: cover;
		}
		&__room-top {
			flex-shrink: 0;
		}
	}

	.platform {
		&-header {
			&__logo {
				text-align: center;
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
			padding-bottom: 32px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}
	}

	@include mq('desktop') {
		.platform-header {
			display: flex;
			gap: 24px;
			padding: 28px 24px 0;
			&__room-top {
				padding-left: 38px;
				max-width: 288px;
			}
			&__logo {
				padding-left: 24px;
			}
		}
	}

	@include mq('laptop') {
		.platform-header {
			gap: 66px;
			&__room-top {
				display: none;
			}
		}

		.platform__summary {
			margin-bottom: 0;
		}
	}

	@include mq('tablet') {
		.platform-header {
			gap: 0;
			flex-direction: column;
			align-items: center;
			margin-left: -20px;
			margin-right: -20px;
			@include paddings('mobile');
			&__logo {
				padding-left: 0;
				text-align: center;
				margin-bottom: 20px;
			}
		}

		.platform__title {
			text-align: center;
		}
	}
</style>
