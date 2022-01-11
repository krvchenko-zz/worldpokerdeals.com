<template>
	<div :class="['reset-form', modal && 'reset-form_modal']">
		<div :class="['reset-form-body', modal && 'reset-form-body_modal']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<!-- Email -->
				<div class="reset-form-group">
					<form-input
						v-model="form.email"
						:label="$t('form.password_email_text')"
						type="email"
						name="email"
						:loading="form.busy"
						:error="form.errors.has('email')"
					/>
					<transition name="fade">
						<has-error :form="form" field="email" />
					</transition>
				</div>

				<div class="reset-form-group">
					<form-submit-button
						class="btn-block"
						:label="$t('form.send')"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div :class="['reset-form-footer', modal && 'reset-form-footer_modal']">
			<div :class="['reset-form-action', modal && 'reset-form-action_modal']">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					prefetch
					:to="{ name: 'register' }"
				>
					{{ $t('form.sign_up_text') }}
					<a
						v-if="modal"
						:href="href"
						:class="['auth-form__link', modal && 'auth-form__link_modal']"
						@click="navigate"
						>{{ $t('form.sign_up_action') }}</a
					>
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
		name: 'ResetForm',

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
			form: new Form({
				email: '',
				country_id: null,
			}),
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
					.post('auth/reset')
					.then(response => {
						eventBus.$emit('authModal:show', false)
						eventBus.$emit('reset:show', false)
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.reset-form {
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
	}
</style>
