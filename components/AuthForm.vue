<template>
	<transition name="flip">
		<div class="auth-form-wrap" v-show="flipped">

			<div class="auth-form-header">
				<template v-if="type === 'auth'">Вход на <br> WorldPokerDeals</template>
				<template v-else>Регистрация нового <br> пользователя</template>
			</div>

			<div class="auth-form-body">
				<form class="form" @submit.prevent="action" @keydown="form.onKeydown($event)">

					<!-- Username -->
					<div v-if="type === 'register'" class="auth-form-group">
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
						/>
						<transition name="fade">	
							<has-error :form="form" field="password" />
						</transition>
					</div>

					<div class="auth-form-group">
						<form-submit-button
							class="btn-block"
							:label="type === 'auth' ? 'Войти' : 'Зарегистрироваться'"
							:loading="form.busy">
						</form-submit-button>
					</div>
				</form>
			</div>

			<div class="auth-form-footer">
				<div v-if="type === 'auth'" class="auth-form-warning">
					<span class="auth-form-warning__icon">⚠️</span>
					<span class="auth-form-warning__text">Чтобы привязать счет, нужно войти <br> в аккаунт на нашем сайте</span>
				</div>

				<div v-if="type === 'auth'" class="auth-form-action">
					Ещё нет аккаунта? <a href="#" @click.prevent="toggleType('register')" class="form__link">Зарегистрироваться</a>
				</div>

				<div v-if="type === 'register'" class="auth-form-action">
					<a href="#" @click.prevent="toggleType('auth')" class="form__link">Войти в свой эккаунт</a>
				</div>			
			</div>

		</div>
	</transition>

</template>

<script>
import { mapGetters } from 'vuex'
import Form from 'vform'
import FormInput from '~/components/form/FormInput'
import FormSubmitButton from '~/components/form/FormSubmitButton'

export default {
	middleware: 'guest',
	name: 'AuthForm',

	props: {

	},

	components: {
		FormInput
	},

	computed: {
		...mapGetters({
			country: 'location/country',
		})
	},

	data: () => ({
		flipped: true,
		type: 'auth',
		showPassword: false,
		form: new Form({
			username: '',
			email: '',
			password: '',
			country_id: null
		}),
		remember: false
	}),

	mounted() {
		this.form.country_id = this.country.id
	},

	methods: {

		toggleType(type) {
			// this.form.reset()
			// this.form.clear()
			this.type = type
			this.flipped = false
			setTimeout(() => {
				this.flipped = true
			}, 0)
		},

		async action () {

			let url = this.type === 'auth' ? 'auth/login' : 'auth/register'

			this.form.post(url).then((response) => {

				const token = response.data.token,
							user = response.data.user

				this.$store.dispatch('auth/saveToken', {
					token: token,
					remember: this.remember
				})

				this.$store.dispatch('auth/updateUser', user)
			})
			.catch(e => {

			})
		}
	}
}
</script>

<style lang="scss">
$ico-auth-form: url('~assets/i/ico-auth-form.svg?data');
.auth-form {
	&-wrap {
		overflow: hidden;
		background: linear-gradient(0deg, #FAFAFA, #FAFAFA);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
		color: #FDFDFD;
		background: #2E87C8;
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
		border-left: 1px solid #E9E9E9;
    border-right: 1px solid #E9E9E9;
	}

	&-footer {
		padding: 20px 28px 28px 28px;
		border-left: 1px solid #E9E9E9;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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
	}

	&__link {
		font-family: 'Proxima Nova Sb';
		font-size: 14px;
		line-height: 17px;
		text-decoration-line: underline;
		color: #008BE2;
	}
}

.connection-auth {
	max-width: 326px;
	float: right;
	width: 100%;
	margin-top: -128px;
}

.flip-enter-active {
  transition: all 0.8s ease;
}

.flip-leave-active {
  // display: none;
}

.flip-enter, .flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>