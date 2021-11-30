<template>
	<section class="content content_register">
		<div class="register">
			<div class="register__content">
				<h1 class="register__title">{{ $t('register.title') }}</h1>
				<ul class="register-list">
					<li
						v-for="(item, index) in features"
						:key="index"
						class="register-list__item"
					>
						<svg-icon class="register-list__icon" :icon="item.icon" />
						<span class="register-list__title">{{ $t(item.title) }}</span>
					</li>
				</ul>

				<div class="register__info">{{ $t('register.info') }}</div>

				<div class="register-info">
					<p>{{ $t('register.form_title') }}</p>
					<div class="register-info__buttons">
						<button-contact
							size="md"
							type="chat"
							:style="{
								padding: '0 40px',
							}"
							>{{ $t('start_chat') }}</button-contact
						>
						<button-contact
							icon
							size="md"
							type="telegram"
							:href="manager.telegram"
							rel="nofollow noopener"
						/>
						<button-contact icon size="md" type="skype" :href="manager.skype" rel="nofollow noopener" />
						<button-contact
							icon
							size="md"
							type="whatsapp"
							:href="manager.whatsapp"
							rel="nofollow noopener"
						/>
						<button-contact icon size="md" type="email" :href="manager.email" rel="nofollow noopener" />
					</div>
				</div>
			</div>

			<div class="register__form-container">
				<register-form />
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pageMixin from '~/mixins/pageMixin'

	export default {
		components: {},

		layout: 'basic',

		mixins: [pageMixin],

		async middleware({ store, redirect, params, $axios }) {

			if (store.getters['auth/check']) {
				return redirect('/')
			}

			await $axios
				.get('pages/register')
				.then(response => {
					store.commit('pages/FETCH_PAGE', { page: response.data })
				})
				.catch(error => {})
		},

		props: {},

		data: () => ({
			manager: null,

			features: [
				{
					icon: 'register-access',
					title: 'register.items.0.text',
				},
				{
					icon: 'register-news',
					title: 'register.items.1.text',
				},
				{
					icon: 'register-other',
					title: 'register.items.2.text',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: 502,
					},
				})
				.then(response => {
					this.manager = {
						name: response.data.name,
						position: response.data.position,
						telegram: response.data.telegram,
						skype: response.data.skype,
						whatsapp: response.data.whatsapp,
						email: response.data.email,
						fb: response.data.fb,
						vk: response.data.vk,
						instagram: response.data.instagram,
					}
				})
		},

		created() {},

		computed: {
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$register-bg: url('~assets/i/register-bg.jpg');

	.content_register {
		background: $register-bg no-repeat center;
		background-size: cover;
	}

	.register {
		display: grid;
		max-width: 1440px;
		width: 100%;
		margin: 0 auto;
		@include paddings('desktop');
		grid-template-columns: 562px 444px;
		grid-template-areas: 'content form';
		column-gap: 146px;
		padding-top: 40px;
		justify-content: center;
		&__content {
			grid-area: content;
		}
		&__form-container {
			grid-area: form;
		}
		&__content {
			padding-top: 32px;
		}
		&__title {
			margin-bottom: 40px;
			font-family: 'Proxima Nova Sb';
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&-list {
			margin: 0 0 32px;
			padding: 0;
			list-style: none;
			&__item {
				margin-bottom: 24px;
				display: flex;
				&:last-child {
					margin: 0;
				}
			}

			&__icon {
				margin-right: 28px;
				flex: 0 0 60px;
			}

			&__title {
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 22px;
				color: #e5e5e5;
			}
		}

		&-info {
			margin-top: 36px;
			padding: 24px 28px;
			background: linear-gradient(0deg, #2e3141, #2e3141);
			border-radius: 10px;
			p {
				margin-bottom: 24px;
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 20px;
				color: #e5e5e5;
			}

			&__buttons {
				display: flex;
				.btn-contact {
					margin-right: 16px;
				}
			}
		}

		&__info {
			padding-left: 21px;
			position: relative;
			font-family: Proxima Nova;
			font-size: 15px;
			line-height: 18px;
			color: #777777;
			&:before {
				font-size: 25px;
				width: 9px;
				height: 9px;
				left: 0;
				top: 4px;
				position: absolute;
				content: '*';
				display: block;
			}
		}
	}

	@include mq('laptop') {
		.register {
			grid-template-columns: 472px;
			grid-template-areas:
				'form'
				'content';
			column-gap: 0;
			row-gap: 44px;
		}
	}

	@include mq('tablet') {
		.register {
			grid-template-columns: 100%;
			@include paddings('mobile');
		}

		.register-info:last-child {
			margin-left: -20px;
			margin-right: -20px;
		}
	}
</style>
