<template>
	<form
		class="contacts-form"
		@submit.prevent="submit"
		@keydown="form.onKeydown($event)"
	>
		<div class="contacts-form__contacts contacts-form-group">
			<form-input
				v-model="form.name"
				placeholder="Ваше Имя"
				type="text"
				name="name"
				label-color="#636363"
				:required="true"
				:loading="form.busy"
				:error="form.errors.has('name')"
			/>
			<transition name="fade">
				<has-error :form="form" field="name" />
			</transition>

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

		<div class="contacts-form-group">
			<div class="row">
				<div class="col">
					<form-textarea
						v-model="form.message"
						placeholder="Сообщение или вопрос"
						name="message"
						label-color="#636363"
						:required="true"
						:loading="form.busy"
						:error="form.errors.has('message')"
					/>
					<transition name="fade">
						<has-error :form="form" field="message" />
					</transition>
				</div>
			</div>
		</div>

		<div class="contacts-form-group">
			<div class="row">
				<div class="col">
					<form-checkbox v-model="form.terms">
						<span style="color: #CCCCCC;"
							>С <a class="contacts-form__link" href="/terms">условиями</a> отправки
							и обработки данных согласен</span
						>
					</form-checkbox>
				</div>
			</div>
		</div>

		<div class="contacts-form-group">
			<form-submit-button
				:disabled="!form.terms || !form.email || !form.name || !form.message"
				class="btn-block btn-contacts-form"
				label="Отправить"
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
		name: 'ContactsForm',

		components: {},

		computed: {
			...mapGetters({
				auth: 'auth/check',
				user: 'auth/user',
			}),
		},

		data: () => ({
			form: new Form({
				email: null,
				name: null,
				message: '',
				terms: false,
			}),
		}),

		watch: {
			user: {
				immediate: true,
				deep: true,
				handler(data) {
					if (this.auth) {
						this.form.keys().forEach(key => {
							this.form[key] = data[key]
						})
					}
				},
			},
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
	.contacts-form {
		margin-bottom: 48px;

		&__contacts {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 28px;
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
	}

	.btn-contacts-form {
		padding: 10px 28px;
		max-width: 208px;
		height: 40px;
	}

	@include mq('laptop') {
		.contacts-form {
			&__contacts {
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.contacts-form {
			&__contacts {
				grid-template-columns: 1fr;
				row-gap: 24px;
			}
		}

		.btn-contacts-form {
			max-width: none;
			width: 100%;
		}
	}
</style>
