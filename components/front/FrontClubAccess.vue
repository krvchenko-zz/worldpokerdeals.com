<template>
	<div class="front-club-access">
		<div class="front-club-access__wrap">
			<div class="front-club-access__title">
				{{ $t('front.clubs_access_title') }}
			</div>
			<div class="front-club-access__info">{{ $t('front.clubs_access_text') }}</div>
			<a
				style="font-weight: bold"
				class="btn btn-block btn-green"
				rel="nofollow noopener"
				target="_blank"
				href="/contact-us"
				>{{ $t('more') }}</a
			>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FrontClubAccess',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');
	$club-access-banner: url('~assets/i/club-access-banner.jpg');

	.front-club-access {
		min-height: 458px;
		max-height: 458px;
		margin: 0;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
		background: $club-access-banner no-repeat center;
		background-size: cover;
		// &__img {
		//   display: block;
		//   width: 100%;
		//   height: auto;
		// }

		&__wrap {
			width: 100%;
			padding: 52px 28px 28px 28px;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
		}

		&__title {
			margin-bottom: 20px;
			padding-top: 68px;
			padding-bottom: 26px;
			position: relative;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 28px;
			line-height: 30px;
			text-align: center;
			letter-spacing: -0.3px;
			color: #ffffff;
			background: $contact-us-logo no-repeat center top;
			&:after {
				content: '';
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				display: block;
				position: absolute;
				height: 2px;
				width: 40px;
				background: #dfe4e6;
			}
		}

		&__info {
			margin-bottom: 16px;
			font-family: Proxima Nova;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
			opacity: 0.9;
		}
	}

	@include mq('tablet') {
		.front-club-access {
			margin-left: 0;
			margin-right: 20px;
			min-height: 304px;
			&__wrap {
				padding: 24px;
			}
		}
	}
</style>
