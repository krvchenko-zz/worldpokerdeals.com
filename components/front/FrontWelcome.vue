<template>
	<div class="front-welcome">
		<img
			decoding="async"
			loading="lazy"
			src="~assets/i/welcome-banner.jpg"
			alt="Всем привет!"
			class="front-welcome__img"
		/>
		<div class="front-welcome__wrap">
			<div v-html="$t('wpd_front_rodion')"></div>

			<div class="front-welcome__contacts">
				<button-contact
					icon
					type="fb"
					target="_blank"
					href="https://www.facebook.com/worldpokerdealsRu"
				/>
				<button-contact
					icon type="telegram"
					target="_blank"
					href="worldpokerdealsRU" />
				<button-contact
					icon
					type="instagram"
					target="_blank"
					href="https://instagram.com/worldpokerdeals"
				/>
				<button-contact
					icon type="vk"
					target="_blank"
					href="https://vk.com/worldpokerdeals"
				/>
			</div>

			<a href="/our-team" class="btn btn-block btn-border btn-welcome-banner">{{
				$t('more_about_us')
			}}</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FrontWelcome',

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
	.front-welcome {
		margin-bottom: 32px;
		&__img {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			display: block;
			max-width: 100%;
			width: 100%;
			height: auto;
		}

		&__wrap {
			border-top: 0;
			border: 1px solid #e9e9e9;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 20px 28px 28px 28px;
			background: #fafafa;
			h3 {
				margin-bottom: 16px;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 22px;
				line-height: 26px;
				color: #222222;
			}

			p {
				margin-bottom: 10px;
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 17px;
				color: #555555;
			}

			a {
				color: #008be2;
			}
		}

		&__contacts {
			display: flex;
			margin: 28px 0;
			.btn-contact {
				margin-right: 12px;
			}
		}
	}
	.btn-welcome-banner {
		padding: 10px 24px 9px 24px;
		border: 1px solid #2e87c8;
		white-space: nowrap;
		&:focus,
		&:active,
		&:hover {
			color: #ffffff;
			background: #2e87c8;
		}
	}

	@include mq('tablet') {
		.front-welcome {
			margin-top: 32px;
			&__img {
				width: 100%;
			}
			&__wrap {
				display: flex;
				flex-direction: column;
			}
			&__wrap p {
				font-size: 16px;
			}
			&__contacts {
				justify-content: center;
			}
		}

		.btn-welcome-banner {
			width: auto;
			min-width: 283px;
			margin: 0 auto;
		}
	}
</style>
