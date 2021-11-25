<template>
	<div class="container-fluid">
		<form
			class="blacklist-form"
			@submit.prevent="submit"
			@keydown="form.onKeydown($event)"
		>
			<div class="blacklist-form-group">
				<div class="row">
					<div class="col">
						<form-input
							v-model="form.name"
							:label="$t('form.name')"
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
					</div>

					<div class="col">
						<form-input
							v-model="form.representative"
							:label="$t('form.room_representative')"
							type="text"
							name="representative"
							label-color="#636363"
							:required="true"
							:loading="form.busy"
							:error="form.errors.has('representative')"
						/>
						<transition name="fade">
							<has-error :form="form" field="representative" />
						</transition>
					</div>
				</div>
			</div>

			<div class="blacklist-form-group">
				<div class="row">
					<div class="col">
						<form-input
							v-model="form.email"
							:label="$t('form.email')"
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

					<div class="col">
						<form-input
							v-model="form.contact"
							:label="$t('form.how_to_contact')"
							type="text"
							name="contact"
							label-color="#636363"
							:loading="form.busy"
							:error="form.errors.has('contact')"
						>
							<template #prefix>
								<form-select
									v-model="form.contact_type"
									:options="contact_options"
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

			<div class="blacklist-form-group">
				<div class="row">
					<div class="col-12">
						<form-textarea
							v-model="form.comment"
							:label="$t('form.message')"
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

			<div class="blacklist-form-group">
				<div class="row">
					<div class="col-12">
						<form-checkbox v-model="form.terms" :label="$t('form.accept')">
							<a class="blacklist-form__link" href="/terms">{{ $t('form.tos') }}</a>
						</form-checkbox>
					</div>
				</div>
			</div>

			<div class="blacklist-form-group">
				<div class="row">
					<div class="col-12">
						<form-submit-button
							class="btn-block"
							:label="$t('form.send')"
							:disabled="validate"
							:loading="form.busy"
						>
						</form-submit-button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'

	export default {
		name: 'BlacklistForm',

		components: {},

		props: {
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
		},

		computed: {
			...mapGetters({
				auth: 'auth/check',
			}),

			validate() {
				return (
					!this.form.email ||
					!this.form.name ||
					!this.form.representative ||
					!this.form.comment ||
					!this.form.terms
				)
			},
		},

		data: () => ({
			form: new Form({
				email: null,
				name: null,
				representative: null,
				contact_type: 'skype',
				contact: null,
				comment: '',
				terms: false,
			}),
		}),

		methods: {
			async submit() {
				this.form
					.post('/blacklist')
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
	.blacklist-form {
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

	.btn-blacklist-form {
		padding: 10px 28px;
	}
</style>
