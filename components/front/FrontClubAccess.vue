<template>
	<div class="front-club-access">
		<!-- <img decoding="async" loading="lazy" src="~assets/i/club-access-banner.jpg" alt="Вестник Бамхантера" class="front-club-access__img"> -->
		<div class="front-club-access__wrap">
			<div class="front-club-access__title">
				{{ $t('safe_access_to_clubs') }}
			</div>
			<div class="front-club-access__info">
				Ать вы с инты, к любым сроку их полни дежност витекту шевклаг
			</div>
			<a
				style="font-weight: bold"
				class="btn btn-block btn-green"
				rel="nofollow"
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
		// width: 262px;
		margin: 0 20px 0 0;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
		min-height: 459px;
		background: $club-access-banner no-repeat center;
		background-size: cover;
		// &__img {
		//   display: block;
		//   width: 100%;
		//   height: auto;
		// }

		&__wrap {
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
			margin: 0 16px 0 0;
		}
	}
</style>
