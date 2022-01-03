<template>
	<div :class="['password-form']">

		<div :class="['password-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<!-- Old Password -->
				<div class="password-form-group">
					<form-input
						v-model="form.old_password"
						:label="$t('form.old_password')"
						type="password"
						name="old_password"
						:loading="form.busy"
						:error="form.errors.has('old_password')"
					/>
					<transition name="fade">
						<has-error :form="form" field="old_password" />
					</transition>
				</div>

				<!-- Old Password -->
				<div class="password-form-group">
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

				<!-- Old Password -->
				<div class="password-form-group">
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

				<div class="password-form-group">
					<form-submit-button
						class="btn-block"
						:label="$t('form.save')"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div :class="['password-form-footer']"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MyPasswordForm',

		components: {},

		props: {

		},

		computed: {
			...mapGetters({
				user: 'auth/user',
			}),
		},

		data: () => ({
			loading: false,
			form: new Form({
				old_password: null,
				password: null,
				password_confirmation: null,
			}),
		}),

		watch: {
			user: {
				immediate: true,
				deep: true,
				handler(data) {
					this.form.keys().forEach(key => {
						this.form[key] = data[key]
					})
				}
			}
		},

		mounted() {
			
		},

		methods: {
			async action() {
				this.form
					.patch(`/user`, {
						params: {
							user_id: this.user.id
						}
					})
					.then(response => {
						const user = response.data
						this.$store.dispatch('auth/updateUser', user)
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	$ico-password-form: url('~assets/i/ico-register-form.svg?data');
	.password-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

		.el-select-geo {
			width: 100%;
			.el-input__prefix {
				left: 16px;
				align-items: center;
				display: flex;
			}

			.el-input__inner {
				padding-left: 52px;
			}
		}

		.el-poper-geo {
			.el-select-dropdown__item {
				font-family: 'Proxima Nova Sb';
				font-size: 14px;
				line-height: 40px;
				height: 40px;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #333333;
			}
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

	.connection-auth {
		max-width: 326px;
		float: right;
		width: 100%;
		margin-top: -128px;
	}
</style>
