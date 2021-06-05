<template>
	<form
		class="payments-form"
		:class="{
			'payments-form--skrill': type === 'skrill',
		}"
		@submit.prevent="submit"
		@keydown="form.onKeydown($event)"
	>
		<div v-if="type === 'ecopayz'" class="payments-form-group">
			<form-radio-group>
				<form-radio
					v-for="(item, index) in account_options"
					:key="index"
					v-model="form.account_type"
					:label="item.label"
					:value="item.value"
				/>
			</form-radio-group>
		</div>

		<div class="payments-form-group payments-form__credentials">
			<div class="payments-form__credentials__email">
				<form-input
					v-model="form.email"
					placeholder="Электронная почта"
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

			<div class="payments-form__credentials__account-id">
				<form-input
					v-model="form.account_id"
					placeholder="ID Счета"
					type="text"
					name="account_id"
					label-color="#636363"
					:required="true"
					:loading="form.busy"
					:error="form.errors.has('account_id')"
				/>
				<transition name="fade">
					<has-error :form="form" field="account_id" />
				</transition>
				<a
					v-if="type === 'skrill'"
					href="#"
					class="payments-form__link payments-form__credentials__id-link"
					>Как узнать свой ID?</a
				>
			</div>

			<div class="payments-form__credentials__contact">
				<form-input
					v-model="form.contact"
					placeholder=""
					type="text"
					name="contact"
					label-color="#636363"
					:required="true"
					:loading="form.busy"
					:error="form.errors.has('contact')"
				>
					<template #prefix>
						<form-select
							class="payments-form__credentials__select"
							v-model="form.contact_type"
							:options="contact_options"
							placeholder="Способ связи"
							name="contact_type"
							label-color="#636363"
							:loading="form.busy"
							:error="form.errors.has('contact_type')"
						/>
					</template>
				</form-input>
				<transition name="fade">
					<has-error :form="form" field="contact_type" />
				</transition>
			</div>
		</div>

		<div class="payments-form-group">
			<form-textarea
				v-model="form.comment"
				placeholder="Вопрос или комментарий"
				name="comment"
				label-color="#636363"
				:required="true"
				:loading="form.busy"
				:error="form.errors.has('comment')"
			/>
			<transition name="fade">
				<has-error :form="form" field="comment" />
			</transition>
		</div>

		<div class="payments-form-group">
			<form-checkbox v-model="form.terms" label="Принимаю">
				<a class="payments-form__link" href="#"
					>условия передачи и хранения данных</a
				>
			</form-checkbox>
		</div>

		<div class="payments-form-group">
			<form-submit-button
				:disabled="!form.terms || !form.account_id || !form.contact"
				class="btn-payments-form"
				label="Присоединиться"
				:loading="form.busy"
			>
			</form-submit-button>
		</div>
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'

	export default {
		name: 'PaymentsForm',

		components: {},

		props: {
			action: {
				type: String,
				default: '',
			},

			type: {
				type: String,
				default: 'skrill',
			},

			contact_options: {
				type: Array,
				default: () => {
					return [
						{
							label: 'Skype',
							value: 'skype',
						},
						{
							label: 'Email',
							value: 'email',
						},
					]
				},
			},

			account_options: {
				type: Array,
				default: () => {
					return [
						{
							label: 'Создал счет',
							value: 'new',
						},
						{
							label: 'ecoPayz по ссылке Weenax',
							value: 'ref',
						},
						{
							label: 'Уже был счет',
							value: 'old',
						},
					]
				},
			},
		},

		computed: {
			...mapGetters({
				auth: 'auth/check',
			}),
		},

		data: () => ({
			form: new Form({
				email: null,
				account_type: null,
				account_id: null,
				contact_type: null,
				contact: null,
				comment: '',
				terms: false,
			}),
		}),

		methods: {
			async submit() {
				this.form
					.post(this.action)
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
	.payments-form {
		margin-bottom: 48px;

		&__credentials {
			display: grid;
			grid-template-columns: 3fr 2fr 3fr;
			grid-template-areas: 'email account-id contact';
			column-gap: 28px;
			&__email {
				grid-area: email;
			}
			&__account-id {
				grid-area: account-id;
			}
			&__contact {
				grid-area: contact;
			}
			&__select {
				width: 100%;
			}
		}

		&-group {
			position: relative;
			margin-bottom: 24px;
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

		&__contact {
		}
	}

	.btn-payments-form {
		padding: 10px 28px;
	}

	@include mq('desktop') {
		.payments-form {
			&__credentials {
				grid-template-columns: 2.5fr 1.5fr 4fr;
				gap: 24px;
				&__account-id {
					display: flex;
					align-items: center;
				}
				&__id-link {
					margin-left: 24px;
				}
			}

			&--skrill &__credentials {
				grid-template-columns: 1fr 1fr;
				grid-template-areas:
					'email account-id'
					'contact .';
			}
		}
	}

	@include mq('laptop') {
		.payments-form {
			&__credentials {
				grid-template-columns: 1fr 1fr;
				gap: 20px;
				grid-template-areas:
					'email account-id'
					'contact contact';
				&__account-id {
					display: block;
				}
				&__id-link {
					margin-left: 0;
				}
				.form-input__prepend {
					width: 25%;
				}
				.form-input__value_prepend {
					width: 75%;
				}
			}

			&--skrill &__credentials {
				grid-template-columns: 1fr 1fr;
				grid-template-areas:
					'email account-id'
					'contact contact';
			}
		}
	}

	@include mq('tablet') {
		.payments-form {
			&__credentials {
				gap: 16px;
				grid-template-columns: 100%;
				grid-template-areas:
					'email'
					'account-id'
					'contact';
				.form-input__prepend {
					width: 35%;
				}
				.form-input__value_prepend {
					width: 65%;
				}
			}
			.btn-payments-form {
				width: 100%;
				height: 44px;
			}

			&--skrill &__credentials {
				grid-template-columns: 100%;
				grid-template-areas:
					'email'
					'account-id'
					'contact';
			}
		}

		.form-radio-group__wrap {
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
