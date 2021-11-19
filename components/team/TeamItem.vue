<template>
	<div
		:class="['team-item', hover && 'team-item_hover']"
		@mouseleave="hover = false"
		@mouseover="hover = true"
	>
		<div class="team-item__wrap">
			<div class="team-item__info">
				<img
					decoding="async"
					loading="lazy"
					:src="src"
					:alt="name"
					:class="['team-item__img', hover && 'team-item__img_hover']"
				/>
				<div class="team-item__name">{{ name }}</div>
				<div class="team-item__position">{{ position }}</div>
			</div>
			<a :href="`mailto:${email}`" class="team-item__email">{{ email }}</a>
			<div class="team-item__contacts">
				<button-contact
					v-if="telegram"
					class="team-item__btn"
					dark
					icon
					size="sm"
					type="telegram"
					:href="telegram"
					rel="nofollow noopener"
				/>
				<button-contact
					v-if="skype"
					class="team-item__btn"
					dark
					icon
					size="sm"
					type="skype"
					:href="skype"
					rel="nofollow noopener"
				/>
				<button-contact
					v-if="whatsapp"
					class="team-item__btn"
					dark
					icon
					size="sm"
					type="whatsapp"
					:href="whatsapp"
					rel="nofollow noopener"
				/>
				<button-contact
					v-if="facebook"
					class="team-item__btn"
					dark
					icon
					size="sm"
					type="fb"
					:href="facebook"
					rel="nofollow noopener"
				/>
			</div>
			<div class="team-item__locales">
				<span v-for="(item, index) in locales" :key="index">{{
					item.short
				}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'TeamItem',

		components: {},

		props: {
			name: {
				type: String,
			},

			position: {
				type: String,
			},

			email: {
				type: String,
			},

			telegram: {
				type: String,
			},

			skype: {
				type: String,
			},

			whatsapp: {
				type: String,
			},

			facebook: {
				type: String,
			},

			locales: {
				type: Array,
			},

			image: {
				type: Object,
			},
		},

		data: () => ({
			hover: false,
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
			src() {
				return `${this.mediaUrl}/manager-small/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.team-item {
		padding: 28px 20px 20px 28px;
		background: radial-gradient(
			173.62% 345.07% at -13.07% 75%,
			#2c2f3e 5.73%,
			#272a38 100%
		);
		box-shadow: -10px 20px 30px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		transition: background 0.2s ease, box-shadow 0.2s ease;
		&_hover {
			background: radial-gradient(
				173.62% 345.07% at -13.07% 75%,
				#3a3e51 5.73%,
				#262937 100%
			);
			box-shadow: -10px 20px 50px rgba(0, 0, 0, 0.2);
		}
		&__info {
			padding-right: 120px;
			position: relative;
		}
		&__img {
			top: -68px;
			right: 0;
			position: absolute;
			display: block;
			border-radius: 50%;
			border: 5px solid #272a38;
			filter: grayscale(1);
			&_hover {
				filter: none;
			}
		}
		&__name {
			margin-bottom: 5px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 24px;
			line-height: 28px;
			color: #ffffff;
		}
		&__position {
			margin-bottom: 16px;
			min-height: 36px;
			font-family: 'Proxima Nova Sb';
			font-size: 15px;
			line-height: 18px;
			letter-spacing: -0.2px;
			color: #cccccc;
			opacity: 0.5;
		}
		&__email {
			margin-bottom: 16px;
			display: inline-block;
			font-family: Proxima Nova;
			font-size: 15px;
			line-height: 18px;
			color: #008be2;
			&:hover {
				color: #008be2;
				text-decoration: none;
			}
		}
		&__contacts {
			display: flex;
			margin-bottom: 20px;
		}
		&__btn {
			margin-right: 12px;
		}
		&__locales {
			display: flex;
			span {
				margin-right: 12px;
				font-family: Proxima Nova;
				font-size: 12px;
				line-height: 16px;
				color: #e5e5e5;
				opacity: 0.25;
			}
		}
	}

	@include mq('laptop') {
		.team-item {
			padding: 24px 20px 20px;
			&__info {
				padding-right: 94px;
			}
			&__img {
				top: -12px;
				width: 70px;
				height: 70px;
			}
		}
	}

	@include mq('tablet') {
		.team-item {
			padding: 29px 28px 27px;
			&__img {
				top: -5px;
				width: 130px;
				height: 130px;
			}
		}
	}
</style>
