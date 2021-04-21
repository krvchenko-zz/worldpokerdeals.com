<template>

<form class="payments-form" @submit.prevent="submit" @keydown="form.onKeydown($event)">
		<div v-if="type === 'ecopayz'" class="payments-form-group">
			<div class="row">
				<div class="col-8 offset-md-2">
					<form-radio-group>
						<form-radio
							v-for="(item, index) in account_options" :key="index"
							v-model="form.account_type"
							:label="item.label"
							:value="item.value"
						/>
					</form-radio-group>
				</div>
			</div>
		</div>

		<div class="payments-form-group">
			<div class="row">
				<div class="col-3 offset-md-2">
					<form-input
						v-model="form.email"
						:disabled="!auth"
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

				<div class="col-2">
					<form-input
						v-model="form.account_id"
						placeholder="ID Счета"
						type="text"
						name="account_id"
						label-color="#636363"
						:disabled="!auth"
						:required="true"
						:loading="form.busy"
						:error="form.errors.has('account_id')"
					/>
					<transition name="fade">	
						<has-error :form="form" field="account_id" />
					</transition>
					<a v-if="type === 'skrill'" href="#" class="payments-form__link">Как узнать свой ID?</a>
				</div>

				<div class="col-3">
					<form-input
						v-model="form.contact"
						:disabled="!auth"
						placeholder=""
						type="text"
						name="contact"
						label-color="#636363"
						:required="true"
						:loading="form.busy"
						:error="form.errors.has('contact')"
					>
						<template v-slot:prefix>
							<form-select
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
		</div>

		<div class="payments-form-group">
			<div class="row">
				<div class="col-8 offset-md-2">
					<form-textarea
						v-model="form.comment"
						:disabled="!auth"
						placeholder="Вопросы или комментарии"
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
			</div>
		</div>

		<div class="payments-form-group">
			<div class="row">
				<div class="col-8 offset-md-2">
					<form-checkbox v-model="form.terms" label="Принимаю">
						<a class="payments-form__link" href="#">условия передачи и хранения данных</a>
					</form-checkbox>
				</div>
			</div>
		</div>

		<div class="payments-form-group">
			<div class="row">
				<div class="col-8 offset-md-2">
					<form-submit-button
						:disabled="!form.terms || !form.account_id || !form.contact"
						class="btn-payments-form"
						label="Присоединиться"
						:loading="form.busy">
					</form-submit-button>
				</div>
			</div>
		</div>

</form>

</template>

<script>
import { mapGetters } from 'vuex'
import Form from 'vform'

export default {

	name: 'PaymentsForm',

	props: {
		action: {
			type: String,
			default: ''
		},

		type: {
			type: String,
			default: 'skrill'
		},

		contact_options: {
			type: Array,
			default: () => {
				return [
					{
						label: 'Skype',
						value: 'skype'
					},
					{
						label: 'Email',
						value: 'email'
					}
				]
			}
		},

		account_options: {
			type: Array,
			default: () => {
				return [
					{
						label: 'Создал счет',
						value: 'new'
					},
					{
						label: 'ecoPayz по ссылке Weenax',
						value: 'ref'
					},
					{
						label: 'Уже был счет',
						value: 'old'
					}
				]
			}
		}
	},

	components: {

	},

	computed: {
		...mapGetters({
			auth: 'auth/check',
		})
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

		async submit () {

			this.form.post(this.action).then((response) => {
				if (response.data.submited) {
					this.$emit('submit')
				}
			})
			.catch(e => {
			})
		}
	}
}
</script>

<style lang="scss">

.payments-form {

	margin-bottom: 48px;

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
		color: #008BE2;
	}

	&__contact {

	}
}

.btn-payments-form {
	padding: 10px 28px;
}
</style>