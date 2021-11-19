<template>
	<div class="help-banner">
		<div class="help-banner__title" v-html="$t('let_us_help')"></div>
		<img
			class="help-banner__img"
			decoding="async"
			loading="lazy"
			src="~assets/i/room-category-banner.svg"
			:alt="$t('let_us_help')"
		/>
		<p class="help-banner__text" v-html="$t('assistance_text')"></p>
		<div class="help-banner__actions">
			<button-contact block size="md" type="chat">{{
				$t('start_chat')
			}}</button-contact>
			<div class="help-banner__messengers">
				<button-contact
					class="help-banner__btn"
					icon
					size="sm"
					type="telegram"
					target="_blank"
					rel="nofollow noopener"
					:href="$t('social.telegram')"
				></button-contact>
				<button-contact
					class="help-banner__btn"
					icon
					size="sm"
					type="skype"
					target="_blank"
					rel="nofollow noopener"
					:href="skype"
				></button-contact>
				<button-contact
					class="help-banner__btn"
					icon
					size="sm"
					type="whatsapp"
					target="_blank"
					rel="nofollow noopener"
					:href="whatsapp"
				></button-contact>
				<button-contact
					class="help-banner__btn"
					icon
					size="sm"
					type="email"
					target="_blank"
					rel="nofollow noopener"
					:href="email"
				></button-contact>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomCategoryBanner',

		components: {},

		props: {},

		data: () => ({
			telegram: 'worldpokerdealsRU',
			skype: 'anton.wpd',
			whatsapp: '+66956396293',
			email: 'antonio@worldpokerdeals.com',
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.help-banner {
		display: grid;
		grid-template-columns: [title] 2fr [image] 2fr [text] 3fr [buttons] 188px;
		grid-template-areas: 'title image text buttons';
		column-gap: 24px;
		align-items: center;
		position: relative;
		margin: 20px 0;
		padding: 24px 20px 20px 40px;
		background: linear-gradient(90deg, #3191d7 0%, #243238 100%),
			linear-gradient(0deg, #135382, #222222), #222222;
		border-radius: 10px;

		&__title {
			grid-area: title;
			white-space: nowrap;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 24px;
			line-height: 28px;
			color: #ffffff;
			min-width: 237px;
		}

		&__text {
			grid-area: text;
			position: relative;
			margin: 0;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 20px;
			color: #ffffff;
		}

		&__img {
			grid-area: image;
			left: 0;
			position: absolute;
			bottom: -20px;
			display: block;
		}

		&__actions {
			grid-area: buttons;
			max-width: 188px;
		}

		&__messengers {
			margin-top: 16px;
			display: flex;
			justify-content: center;
		}

		&__btn {
			margin-right: 16px;
			&:last-child {
				margin: 0;
			}
		}
	}

	@include mq('laptop') {
		.help-banner {
			display: grid;
			grid-template-columns: minmax(0, 2.5fr) minmax(0, 1fr);
			row-gap: 16px;
			column-gap: 0;
			@include paddings('laptop');
			grid-template-areas:
				'title image'
				'text image'
				'buttons image';
			&__actions {
				display: flex;
				width: auto;
				align-items: center;
			}
			&__messengers {
				margin-left: 16px;
				margin-top: 0;
			}
			&__img {
				right: 0;
			}
			&__title {
				white-space: nowrap;
			}
		}
	}

	@include mq('laptop') {
		.help-banner {
			overflow: hidden;
			grid-template-columns: 3.5fr 2.5fr;
			grid-template-areas:
				'title image'
				'text image'
				'buttons buttons';
			@include paddings('laptop');
		}
	}

	@include mq('mobile') {
		.help-banner {
			@include paddings('mobile');
		}
	}
</style>
