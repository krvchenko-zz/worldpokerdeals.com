<template>
	<div class="connection-form-wrap">
		<div class="connection-form-body">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div class="connection-form-group">
					<form-radio-group>
						<form-radio-button
							v-model="form.account_type"
							:disabled="!auth"
							name="account_type"
							:label="$t('form.new_account')"
							value="new"
						/>
						<form-radio-button
							v-model="form.account_type"
							:disabled="!auth"
							name="account_type"
							:label="$t('form.old_account')"
							value="old"
						/>
					</form-radio-group>
				</div>

				<div class="connection-form__desc">{{ $t('form.connection_action_info') }}</div>

				<!-- Username -->
				<div class="connection-form-group row">
					<div class="col-12 col-sm-6">
						<form-input
							v-model="form.name"
							:label="$t('form.login')"
							type="text"
							name="name"
							label-color="#636363"
							:disabled="!auth"
							:required="true"
							:loading="form.busy"
							:error="form.errors.has('name')"
						/>
						<transition name="fade">
							<has-error :form="form" field="name" />
						</transition>
					</div>

					<div class="col-12 col-sm-6">
						<form-input
							v-model="form.email"
							:disabled="!auth"
							:label="$t('form.room_email')"
							type="email"
							name="email"
							label-color="#636363"
							:required="true"
							:loading="form.busy"
							:error="form.errors.has('email')"
						/>
						<transition name="fade">
							<has-error :form="form" field="email" />
						</transition>
					</div>
				</div>

				<!-- Username -->
				<div class="connection-form-group row">
					<div class="col-12 col-sm-6">
						<form-input
							v-model="form.username"
							:disabled="!auth"
							:label="$t('form.room_username')"
							type="text"
							name="username"
							label-color="#636363"
							:loading="form.busy"
							:error="form.errors.has('username')"
						/>
						<transition name="fade">
							<has-error :form="form" field="username" />
						</transition>
					</div>

					<div class="col-12 col-sm-6">
						<form-input
							v-model="form.account_id"
							:disabled="!auth"
							:label="$t('form.account_id')"
							type="text"
							name="account_id"
							label-color="#636363"
							:loading="form.busy"
							:error="form.errors.has('account_id')"
						/>
						<transition name="fade">
							<has-error :form="form" field="account_id" />
						</transition>
					</div>
				</div>

				<div class="connection-form-group">
					<form-checkbox v-model="form.terms" :label="$t('form.accept')">
						<a class="connection-form__link" href="/terms"
							>{{ $t('form.tos') }}</a
						>
					</form-checkbox>
				</div>

				<div class="connection-form-group">
					<form-submit-button
						:disabled="!auth || !form.terms || !form.name || !form.email"
						class="btn-connection-form"
						:label="$t('form.connection_action')"
						:loading="form.busy"
					>
					</form-submit-button>
					<div class="connection-form__info">{{ $t('form.connection_action_text') }}</div>
				</div>
			</form>
		</div>

		<div class="connection-form-footer"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'

	export default {
		name: 'ConnectionForm',

		components: {},

		props: {},

		computed: {
			...mapGetters({
				auth: 'auth/check',
			}),
		},

		data: () => ({
			form: new Form({
				account_type: 'new',
				name: null,
				username: '',
				account_id: '',
				email: null,
				terms: false,
			}),
		}),

		methods: {
			async action() {
				this.form
					.post('connections/create')
					.then(response => {
						if (response.data.submited) {
							this.$emit('submit')
						}
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.connection-form {
		&-wrap {
			margin-right: -36px;
		}

		&__desc {
			margin-bottom: 24px;
			font-family: 'Proxima Nova';
			font-size: 15px;
			line-height: 20px;
			color: #555555;
		}

		&__info {
			max-width: 330px;
			margin-left: 24px;
			display: inline-block;
			vertical-align: middle;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 17px;
			color: #555555;
		}

		&-group {
			position: relative;
			margin-bottom: 24px;
			&:last-child {
				margin: 0;
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
			margin-left: 2px;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 20px;
			text-decoration-line: underline;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #008be2;
		}
	}

	.btn-connection-form {
		padding: 15px 28px;
	}

	@include mq('tablet') {
		.connection-form-wrap {
			margin-right: 0;
			.form-input_type_text {
				margin-bottom: 24px;
			}

			.form-radio-group {
				justify-content: center;
			}
		}

		.connection-form-group {
			.btn-connection-form {
				display: block;
				margin: 0 auto 24px;
			}
		}

		.connection-form__info {
			margin-left: 0;
			max-width: 100%;
		}
	}
</style>
