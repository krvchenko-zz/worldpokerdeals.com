<template>
	<div :class="['manager', pattern && 'manager_pattern']">
		<div v-if="label" class="manager__label">{{ label }}</div>
		<div v-if="description" class="manager__description">{{ description }}</div>

		<div class="manager__img-wrap">
			<img
				decoding="async"
				loading="lazy"
				class="manager__img"
				:src="avatar"
				:alt="name"
			/>
		</div>
		<div class="manager__info">
			<div class="manager__name">
				{{ name }}
				<span v-if="status" class="manager__badge_green">онлайн</span>
			</div>
			<div class="manager__messengers">
				<button-contact size="sm" type="chat">Начать чат</button-contact>
				<button-contact size="sm" type="telegram" :href="telegram"
					>Telegram</button-contact
				>
				<button-contact size="sm" type="skype" :href="skype"
					>Skype</button-contact
				>
				<button-contact size="sm" type="whatsapp" :href="whatsapp"
					>WhatsApp</button-contact
				>
				<button-contact size="sm" type="email" :href="email"
					>E-mail</button-contact
				>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Manager',

		components: {},

		props: {
			image: {
				type: Object,
				required: true,
			},

			name: {
				type: String,
				required: true,
			},

			position: {
				type: String,
				required: true,
			},

			telegram: {
				type: String,
				required: true,
			},

			skype: {
				type: String,
				required: true,
			},

			whatsapp: {
				type: String,
				required: true,
			},

			email: {
				type: String,
				required: true,
			},

			status: {
				type: Boolean,
				default: true,
			},

			pattern: {
				type: Boolean,
				default: false,
			},

			label: {
				type: [String, Boolean],
				default: false,
			},

			description: {
				type: [String, Boolean],
				default: false,
			},
		},

		data: () => ({}),

		computed: {
			mediaUrl() {
				return process.env.mediaUrl
			},

			avatar() {
				return `${this.mediaUrl}/manager-card/${this.image.filename}`
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$manager-pattern: url('~assets/i/manager-pattern.svg?data');

	.manager {
		position: relative;
		margin: 20px 0 40px 0;
		padding: 20px;
		background: #fafafa;
		border: 1px solid #e9e9e9;
		border-radius: 4px;
		display: flex;
		flex-flow: wrap;
		&_pattern {
			padding-top: 24px;
			background: linear-gradient(0deg, #f2f0f0, #f2f0f0),
				radial-gradient(61.16% 100% at 61.16% 0%, #9d2777 0%, #731a56 61.46%);
			&:before {
				content: '';
				left: 0;
				top: 0;
				position: absolute;
				width: 100%;
				height: 4px;
				display: block;
				background: $manager-pattern repeat-x left top;
			}
		}
		&__label {
			margin-bottom: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 24px;
			line-height: 28px;
			flex: 0 0 100%;
		}
		&__description {
			margin-bottom: 24px;
			font-family: Proxima Nova;
			font-size: 17px;
			line-height: 21px;
			color: #555555;
			flex: 0 0 100%;
		}
		&__info {
			flex-grow: 1;
		}
		&__badge {
			&_green {
				top: 2px;
				margin-left: 25px;
				display: inline-block;
				vertical-align: top;
				position: relative;
				padding: 2px 5px 2px 5px;
				background: #70ac30;
				border-radius: 30px;
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 12px;
				color: #ffffff;
			}
		}
		&__name {
			margin-bottom: 10px;
			color: #243238;
			letter-spacing: -0.2px;
			font-weight: bold;
			line-height: 22px;
			font-size: 20px;
			font-family: Proxima Nova;
		}

		&__img {
			width: 64px;
			height: 64px;
			margin: 0;
			border: 2px solid #ffffff;
			border-radius: 10px;
			&-wrap {
				margin-right: 15px;
				width: 64px;
				height: 64px;
			}
		}

		&__messengers {
			margin-bottom: -10px;
			font-size: 0;
			.btn {
				margin: 0 10px 10px 0;
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>
