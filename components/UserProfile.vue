<template>
	<div class="user-profile">
		<div class="user-profile-header">
			<div class="user-profile__info">
				<div class="user-profile__greeting">Добро пожаловать,</div>
				<div class="user-profile__username">{{ user.full_name }}</div>
				<div class="user-profile__email">{{ user.email }}</div>
			</div>

			<div class="user-profile__avatar">
				<img
					v-if="avatar"
					decoding="async"
					loading="lazy"
					class="user-profile__img"
					width="68px"
					height="68px"
					:src="avatar"
					:alt="user.full_name"
				/>
				<svg-icon
					v-else
					class="user-profile__icon"
					:width="68"
					:height="68"
					view-box="0 0 36 36"
					icon="user-avatar"
				/>
			</div>
		</div>
		<div class="user-profile-body">
			<div class="user-profile-row">
				<span class="user-profile-row__label">Никнейм</span>
				<span class="user-profile-row__sep"></span>
				<span class="user-profile-row__val">{{ user.username }}</span>
			</div>

			<div v-if="user.birthday" class="user-profile-row">
				<span class="user-profile-row__label">Дата рождения</span>
				<span class="user-profile-row__sep"></span>
				<span class="user-profile-row__val">{{
					dateFormat(user.birthday)
				}}</span>
			</div>

			<div v-if="user.country" class="user-profile-row">
				<span class="user-profile-row__label">Страна</span>
				<span class="user-profile-row__sep"></span>
				<span class="user-profile-row__val">{{ user.country.title }}</span>
			</div>

			<div class="user-profile-row">
				<span class="user-profile-row__label">Привязанных счетов</span>
				<span class="user-profile-row__sep"></span>
				<span class="user-profile-row__val">{{ user.connections.length }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'UserProfile',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},

			avatar() {
				return this.user.image
					? `${this.mediaUrl}/user-icon/${this.user.image.filename}`
					: null
			},
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y
			},
		},
	}
</script>

<style lang="scss">
	.user-profile {
		max-width: 326px;
		float: right;
		width: 100%;
		box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
		border-radius: 10px;
		overflow: hidden;

		&-header {
			padding: 28px;
			display: flex;
			justify-content: space-between;
			background: #e9e9e9;
		}

		&-body {
			padding: 24px 28px 28px 28px;
			background: #fafafa;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
		}

		&__info {
			margin-right: 28px;
		}

		&__avatar {
			width: 68px;
		}

		&__img {
			display: block;
			border: 2px solid #e9e9e9;
			border-radius: 50%;
		}

		&__greeting {
			margin-bottom: 4px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 20px;
			color: #777777;
		}

		&__username {
			margin-bottom: 4px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			color: #222222;
		}

		&__email {
			word-break: break-all;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 18px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #008be2;
		}

		&-row {
			margin-bottom: 16px;
			display: flex;
			justify-content: space-between;
			flex-grow: 1;
			position: relative;
			&__label {
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 20px;
				color: #555555;
			}
			&__sep {
				height: 1px;
				background-image: linear-gradient(
					to right,
					#aaaaaa 40%,
					rgba(255, 255, 255, 0) 20%
				);
				background-position: center;
				background-size: 3px 1px;
				background-repeat: repeat-x;
				flex-grow: 1;
				align-self: center;
				margin: 0 12px 0 16px;
			}
			&__val {
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 20px;
				text-align: right;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #222222;
			}
		}
	}
</style>
