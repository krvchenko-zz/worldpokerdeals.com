<template>
	<div class="content content_my">
		<div class="container-fluid">
			<breadcrumb-list
				:white="false"
				:auto="false"
			>
			<breadcrumb-item
				:slug="null"
				:title="$t('form.password_reset_text')"
				:index="1"
				:parent="null"
				:last="true"
				:white="false"
			></breadcrumb-item>
			</breadcrumb-list>
		</div>
	 <div class="container-fluid">
		<div class="row">
			<div class="col-3">
			</div>
			<div class="col-6">
				<div class="reset-form">
					<div class="reset-form-header">{{$t('form.password_reset_text')}}</div>
					<div :class="['reset-form-body']">
						<form
							class="form"
							@submit.prevent="reset"
							@keydown="form.onKeydown($event)"
						>
							<!-- Email -->
							<div class="reset-form-group">
								<form-input
									v-model="form.email"
									:label="$t('form.email')"
									type="email"
									name="email"
									:loading="form.busy"
									:error="form.errors.has('email')"
								/>
								<transition name="fade">
									<has-error :form="form" field="email" />
								</transition>
							</div>

							<!-- New Password -->
							<div class="reset-form-group">
								<form-input
									v-model="form.password"
									:label="$t('form.new_password')"
									type="password"
									name="password"
									:loading="form.busy"
									:error="form.errors.has('password')"
								/>
								<transition name="fade">
									<has-error :form="form" field="password" />
								</transition>
							</div>

							<!-- Password confirmation -->
							<div class="reset-form-group">
								<form-input
									v-model="form.password_confirmation"
									:label="$t('form.new_password_confirm')"
									type="password"
									name="password_confirmation"
									:loading="form.busy"
									:error="form.errors.has('password_confirmation')"
								/>
								<transition name="fade">
									<has-error :form="form" field="password_confirmation" />
								</transition>
							</div>

							<div class="reset-form-group">
								<form-submit-button
									class="btn-block"
									:label="$t('form.save')"
									:loading="form.busy"
								>
								</form-submit-button>
							</div>
						</form>
					</div>
					<div class="reset-form-footer"></div>
				</div>
			</div>
			<div class="col-3">
				<room-top-list />
			</div>
		</div>
	 </div>
 </div>
</template>

<script>
	import Form from 'vform'
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',
		middleware: 'guest',

		data: () => ({
			loading: false,
			form: new Form({
				token: '',
				email: '',
				password: '',
				password_confirmation: '',
			}),
			remember: true,
		}),

		created() {
			this.form.token = this.$route.params.token
		},

		methods: {
			async reset() {
				this.loading = true
				await this.form
					.post('/auth/password/reset')
					.then(response => {
						const token = response.data.token,
									user = response.data.user

						this.$store.dispatch('auth/saveToken', {
							token: token,
							remember: this.remember,
						})

						this.$store.dispatch('auth/updateUser', user)

						this.loading = false
					})
					.catch(error => {
						this.loading = false
					})
				this.form.reset()
				this.$router.push('/my/info')
			},
		},
	}
</script>
<style lang="scss">
	$ico-password-form: url('~assets/i/ico-auth-form.svg?data');
	.reset-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

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
				background: $ico-password-form no-repeat center;
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

		&__age {
			width: auto;
		}
	}
</style>
