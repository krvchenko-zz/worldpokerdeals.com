<template>
	<div class="author">
		<div class="author-avatar">
			<img
				class="author-avatar__img"
				:src="avatar"
				:alt="author.full_name"
				loading="lazy"
			/>
		</div>

		<div class="author-info">
			<div class="author-info__label">Автор обзора</div>
			<div class="author-info__name">{{ author.full_name }}</div>
			<div class="author-info__summary"></div>
		</div>

		<div class="author-contacts">
			<div class="author-contacts__label">Контакты автора</div>
			<div class="author-contacts-links">
				<button-contact
					type="fb"
					icon
					size="xs"
					target="_blank"
					:href="author.facebook ? author.facebook : $t('social.facebook')"
				></button-contact>
				<button-contact
					type="vk"
					icon
					size="xs"
					target="_blank"
					:href="author.vk ? author.vk : $t('social.vk')"
				></button-contact>
				<button-contact
					type="twitter"
					icon
					size="xs"
					target="_blank"
					:href="author.twitter ? author.twitter : $t('social.twitter')"
				></button-contact>
				<button-contact
					type="instagram"
					icon
					size="xs"
					target="_blank"
					:href="author.instagram ? author.instagram : 'https://instagram.com/worldpokerdeals'"
				></button-contact>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Author',

		components: {},

		props: {
			author: {
				type: Object,
			},
		},

		data: () => ({}),

		computed: {
			avatar() {
				return `${this.mediaUrl}/manager-small/${this.author.image.filename}`
			},
			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.author {
		margin-top: 24px;
		margin-bottom: 30px;
		padding: 20px;
		border-top: 2px solid #cccccc;
		background: linear-gradient(360deg, #ffffff -1.39%, #f1efef 107.71%);
		display: flex;
		&-avatar {
			margin-right: 20px;
			width: 70px;
			height: 70px;
			&__img {
				width: 70px;
				height: 70px;
				border-radius: 50%;
				border: 2px solid #ffffff;
			}
		}
		&-info {
			flex-grow: 1;
			margin-right: 30px;
			&__label {
				margin-bottom: 5px;
				font-family: 'Proxima Nova Sb';
				font-size: 14px;
				line-height: 18px;
				color: #777777;
			}

			&__name {
				margin-bottom: 10px;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 20px;
				line-height: 22px;
				letter-spacing: -0.2px;
				color: #243238;
			}

			&__summary {
				font-family: 'Proxima Nova';
				font-size: 14px;
				line-height: 18px;
				color: #666666;
			}
		}
		&-contacts {
			&__label {
				margin-bottom: 10px;
				font-family: Proxima Nova;
				font-size: 12px;
				line-height: 18px;
				color: #777777;
			}
			&-links {
				white-space: nowrap;
			}
		}
	}
</style>
