<template>
	<form
		class="restricted-form"
		@submit.prevent="submit"
		@keydown="form.onKeydown($event)"
	>
		<div class="restricted-form-group">
			<div class="restricted-form-group__wrap">
				<form-input
					v-model="form.email"
					class="restricted-form__input"
					:placeholder="$t('form.email')"
					type="email"
					name="email"
					label-color="#636363"
					:required="true"
					:loading="form.busy"
					:error="form.errors.has('email')"
				/>
				<form-submit-button
					:disabled="!form.email"
					class="btn-restricted-form"
					:label="$t('form.get_access')"
					:loading="form.busy"
				>
				</form-submit-button>
			</div>
			<transition name="fade">
				<has-error :form="form" field="email" />
			</transition>
		</div>
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'

	export default {
		name: 'RestrictedForm',

		components: {},

		computed: {
			...mapGetters({
				auth: 'auth/check',
				user: 'auth/user',
				room: 'rooms/room',
			}),
		},

		data: () => ({
			form: new Form({
				email: null,
				room_id: null,
				user_id: null,
				type: 'restricted'
			}),
		}),

		watch: {
			user: {
				immediate: true,
				deep: true,
				handler(data) {
				},
			},

			room: {
				immediate: true,
				deep: true,
				handler(data) {
				},
			},
		},

		mounted() {
			if (this.room) {
				this.form.room_id = this.room.id
			}

			if (this.auth) {
				this.form.email = this.user.email
				this.form.name = this.user.username
				this.form.user_id = this.user.id
			}
		},

		methods: {
			async submit() {
				this.form
					.post('/contacts')
					.then(response => {
						this.$emit('submit')
						this.form.reset()
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.restricted-form {
		margin-bottom: 28px;

		&__input {
			flex-grow: 1;
			input {
				border-right: 0;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		&-group {
			position: relative;
			margin-bottom: 24px;
			&__wrap {
				display: flex;
			}
			&:last-child {
				margin: 0;
			}
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

		&__contacts {
		}
	}

	.btn-restricted-form {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		padding: 10px 28px;
		white-space: nowrap;
	}

	@include mq('tablet') {
		.restricted-form {
			&-group {
				&__wrap {
					flex-direction: column;
					.form-input_type_email {
						margin-bottom: 16px;
						.form-input__value {
							border: 1px solid #c9c9c9;
							border-radius: 4px;
						}
					}

					.btn-restricted-form {
						border-radius: 4px;
					}
				}
			}
		}
	}
</style>
