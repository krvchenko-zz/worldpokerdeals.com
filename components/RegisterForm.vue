<template>
	<div :class="['register-form', modal && 'register-form_modal']">
		<div v-if="!modal" class="register-form-header">
			Регистрация нового <br />
			пользователя
		</div>

		<div :class="['register-form-body', modal && 'register-form-body_modal']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<!-- Username -->
				<div class="register-form-group">
					<form-input
						v-model="form.username"
						label="Имя пользователя"
						type="text"
						name="username"
						:loading="form.busy"
						:error="form.errors.has('username')"
					/>
					<transition name="fade">
						<has-error :form="form" field="username" />
					</transition>
				</div>

				<!-- Email -->
				<div class="register-form-group">
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
				<div class="register-form-group">
					<form-input
						v-model="form.password"
						label="Пароль"
						type="password"
						name="password"
						:loading="form.busy"
						:error="form.errors.has('password')"
					/>
					<transition name="fade">
						<has-error :form="form" field="password" />
					</transition>
				</div>

				<div
					v-if="!modal && !connection"
					class="register-form-group register-form-group_flex"
				>
					<form-radio-group label="Пол" label-position="left">
						<form-radio-button
							v-model="form.sex"
							name="sex"
							icon="male"
							size="sm"
							:value="0"
						/>
						<form-radio-button
							v-model="form.sex"
							name="sex"
							icon="female"
							size="sm"
							:value="1"
						/>
					</form-radio-group>
					<form-select
						v-model="form.birthday"
						name="year"
						:options="years"
						label="Год рождения"
						label-position="left"
					/>
				</div>

				<div class="register-form-group">
					<form-submit-button
						class="btn-block"
						label="Зарегистрироваться"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div
			:class="['register-form-footer', modal && 'register-form-footer_modal']"
		>
			<div
				:class="['register-form-action', modal && 'register-form-action_modal']"
			>
				<button
					:class="['register-form__link', modal && 'register-form__link_modal']"
					@click.prevent="toggle"
				>
					Войти в свой аккаунт
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'RegisterForm',

		components: {},
		middleware: 'guest',

		props: {
			modal: {
				type: Boolean,
				default: false,
			},

			connection: {
				type: Boolean,
				default: false,
			},
		},

		computed: {
			...mapGetters({
				country: 'location/country',
			}),

			years() {
				const now = new Date().getUTCFullYear()
				const years = Array(now - (now - 100))
					.fill('')
					.map((v, idx) => ({
						label: now - idx,
						value: now - idx,
					}))

				return years
			},
		},

		data: () => ({
			showPassword: false,
			remember: false,
			form: new Form({
				username: '',
				email: '',
				password: '',
				country_id: null,
				sex: null,
				birthday: 1970,
			}),
		}),

		mounted() {
			this.form.country_id = this.country.id
		},

		methods: {
			toggle() {
				eventBus.$emit('auth:show', true)
				if (!this.connection) {
					eventBus.$emit('authModal:show', true)
				}
			},

			async action() {
				this.form
					.post('auth/register')
					.then(response => {
						const token = response.data.token,
							user = response.data.user

						this.$store.dispatch('auth/saveToken', {
							token: token,
							remember: this.remember,
						})

						this.$store.dispatch('auth/updateUser', user)
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	$ico-register-form: url('~assets/i/ico-register-form.svg?data');
	.register-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

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
				height: 44px;
				display: block;
				background: $ico-register-form no-repeat center;
				background-size: contain;
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
			&_flex {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
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
		}
	}

	.connection-auth {
		max-width: 326px;
		float: right;
		width: 100%;
		margin-top: -128px;
	}
</style>
