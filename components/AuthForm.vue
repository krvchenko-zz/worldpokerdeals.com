<template>
	<div :class="['auth-form', modal && 'auth-form_modal']">
		<div v-if="!modal" class="auth-form-header">
			Вход на <br />
			WorldPokerDeals
		</div>

		<div :class="['auth-form-body', modal && 'auth-form-body_modal']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<!-- Email -->
				<div class="auth-form-group">
					<form-input
						v-model="form.email"
						label="Электронная почта"
						type="email"
						name="email"
						:loading="form.busy"
						:error="form.errors.has('email')"
					/>
					<transition name="fade">
						<has-error :form="form" field="email" />
					</transition>
				</div>

				<!-- Password -->
				<div class="auth-form-group">
					<form-input
						v-model="form.password"
						label="Пароль"
						type="password"
						name="password"
						:loading="form.busy"
						:error="form.errors.has('password')"
					>
						<template #label>
							<button
								class="auth-form__link auth-form__link_right"
								@click.prevent="handleReset"
							>
								Забыли пароль?
							</button>
						</template>
					</form-input>
					<transition name="fade">
						<has-error :form="form" field="password" />
					</transition>
				</div>

				<div class="auth-form-group">
					<form-submit-button
						class="btn-block"
						label="Войти"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div :class="['auth-form-footer', modal && 'auth-form-footer_modal']">
			<div v-if="!modal" class="auth-form-warning">
				<span class="auth-form-warning__icon">⚠️</span>
				<span class="auth-form-warning__text"
					>Чтобы привязать счет, нужно войти <br />
					в аккаунт на нашем сайте</span
				>
			</div>

			<div v-if="modal" class="auth-form-social">
				<div class="auth-form-social__label">
					Войти при помощи социальных сетей
				</div>
				<div class="auth-form-social__actions">
					<form-social type="fb" style="margin-right: 10px;" />
					<form-social type="vk" style="margin-left: 10px;" />
				</div>
			</div>

			<div :class="['auth-form-action', modal && 'auth-form-action_modal']">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					prefetch
					:to="{ name: 'register' }"
				>
					Ещё нет аккаунта?
					<a
						v-if="modal"
						:href="href"
						:class="['auth-form__link', modal && 'auth-form__link_modal']"
						@click="navigate"
						>Зарегистрируйся</a
					>
					<button
						v-else
						:class="['auth-form__link', modal && 'auth-form__link_modal']"
						@click="toggle"
					>
						Зарегистрируйся
					</button>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'AuthForm',

		components: {},
		middleware: 'guest',

		props: {
			modal: {
				type: Boolean,
				default: false,
			},
		},

		computed: {
			...mapGetters({
				country: 'location/country',
			}),
		},

		data: () => ({
			showPassword: false,

			form: new Form({
				username: '',
				email: '',
				password: '',
				country_id: null,
			}),
			remember: false,
		}),

		mounted() {
			this.form.country_id = this.country.id
		},

		methods: {
			toggle() {
				eventBus.$emit('register:show', true)
			},

			handleReset() {
				eventBus.$emit('reset:show', true)
			},

			async action() {
				this.form
					.post('auth/login')
					.then(response => {
						const token = response.data.token,
							user = response.data.user

						this.$store.dispatch('auth/saveToken', {
							token: token,
							remember: this.remember,
						})

						this.$store.dispatch('auth/updateUser', user)

						eventBus.$emit('authModal:show', false)
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	$ico-auth-form: url('~assets/i/ico-auth-form.svg?data');

	.auth-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		&_modal {
			background: transparent;
			box-shadow: none;
			border-radius: 0;
		}

		&-header {
			position: relative;
			padding: 24px 28px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 22px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #fdfdfd;
			background: #2e87c8;
			&:after {
				content: '';
				top: 28px;
				right: 28px;
				position: absolute;
				width: 48px;
				height: 48px;
				display: block;
				background: $ico-auth-form no-repeat center;
			}
		}

		&-body {
			padding: 24px 28px 0 28px;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			&_modal {
				border: 0;
				padding: 0;
			}
		}

		&-footer {
			padding: 20px 28px 28px 28px;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			border-bottom: 1px solid #e9e9e9;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			&_modal {
				border-radius: 0;
				border: 0;
				padding: 28px 0 0 0;
			}
		}

		&-group {
			position: relative;
			margin-bottom: 24px;
			&:last-child {
				margin: 0;
			}
		}

		&-warning {
			margin-bottom: 28px;
			display: flex;
			&__icon {
				margin-right: 16px;
				font-size: 30px;
				line-height: 32px;
			}
			&__text {
				font-family: 'Proxima Nova';
				font-size: 13px;
				line-height: 16px;
				color: #555555;
			}
		}

		&-action {
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 17px;
			text-align: center;
			color: #555555;
			&_modal {
				font-size: 16px;
				line-height: 16px;
			}
		}

		&__link {
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 17px;
			text-decoration-line: underline;
			color: #008be2;
			background: transparent;
			padding: 0;
			border: 0;
			&:focus {
				outline: none;
			}
			&_modal {
				font-size: 16px;
				line-height: 16px;
			}
			&_right {
				float: right;
			}
		}

		&-social {
			margin-bottom: 32px;
			&__label {
				margin-bottom: 16px;
				text-align: center;
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 16px;
				color: #555555;
			}

			&__actions {
				justify-content: center;
				display: flex;
			}
		}
	}

	.connection-auth {
		max-width: 326px;
		float: right;
		width: 100%;
		margin-top: -128px;
	}
</style>
