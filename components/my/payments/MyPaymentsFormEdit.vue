<template>
	<div :class="['payments-form']">

		<div :class="['payments-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div v-if="payments" class="payments-form-group">
					<label class="form-input__label">{{ $t('form.choose_payment') }}</label>
					<el-select
						class="el-select-payments"
						v-model="form.payment_method_id"
						:loading="loading"
						filterable
						reserve-keyword
						disabled
						popper-class="el-poper-payments"
					>
						<template slot="prefix">
							<svg-icon
								:icon="`${method.icon}-color`"
								:width="24"
								:height="24"
								:image="true"
								view-box="0 0 30 30"
							/>
						</template>

						<el-option
							v-for="item in payments"
							:key="item.id"
							:value="item.id"
							:label="item.title"
						>
							<span style="float: left; margin-right: 12px;">
								<svg-icon
									:icon="`${item.icon}-color`"
									:width="24"
									:height="24"
									:image="true"
									view-box="0 0 30 30"
								/>
							</span>
							<span>{{ item.title }}</span>
						</el-option>
					</el-select>
				</div>

				<div class="payments-form-group payments-form-group_flex">

					<div class="payments-form-group__input">
						
						<form-input
							v-if="method.type === 'email'"
							v-model="form.email"
							:label="$t('form.payment_details')"
							type="email"
							name="email"
							:loading="form.busy"
							:error="form.errors.has('email')"
						/>

						<form-input
							v-if="method.type === 'card'"
							v-model="form.card"
							:label="$t('form.payment_details')"
							type="text"
							name="card"
							:loading="form.busy"
							:error="form.errors.has('card')"
						/>

						<form-input
							v-if="method.type === 'account'"
							v-model="form.account"
							:label="$t('form.payment_details')"
							type="text"
							name="account"
							:loading="form.busy"
							:error="form.errors.has('account')"
						/>

						<transition name="fade">
							<has-error :form="form" :field="method.type" />
						</transition>
					</div>

					<div class="payments-form-group__select">
						<el-select
							v-model="form.currency_id"
							placeholder="Select"
						>
							<el-option
								v-for="(item, index) in currencies.filter(item => {return item.id === 5 || item.id === 6})"
								:key="index"
								:label="item.symbol"
								:value="item.id"
							></el-option>
						</el-select>
					</div>

				</div>

				<div class="payments-form-group">
					<form-submit-button
						class="btn-block"
						:label="$t('form.save')"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MyPaymentsFormEdit',

		components: {},

		props: {
			payments: {
				type: Array,
			},

			currencies: {
				type: Array,
			}
		},

		computed: {
			...mapGetters({
				user: 'auth/user',
				paymentInfo: 'auth/paymentInfo'
			}),

			method() {
				return this.payments.find(item => {
					return item.id === this.form.payment_method_id
				})
			},
		},

		data: () => ({
			loading: false,
			form: new Form({
				email: '',
				card: '',
				account: '',
				default: 0,
				payment_method_id: 3,
				currency_id: 5,
				user_id: null,
			}),
		}),

		watch: {
			paymentInfo: {
				immediate: true,
				deep: true,
				handler(data) {
					this.form.keys().forEach(key => {
						this.form[key] = data[key]
					})
				}
			},
		},

		mounted() {},

		methods: {
			async action() {
				this.form
					.patch(`/my/paymentinfo/${this.paymentInfo.id}`)
					.then(response => {

						this.$store.dispatch('auth/updatePaymentInfo', response.data)

						this.$router.push({ path : '/my/payments' });
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.payments-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px 0 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

		.el-select-payments {
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

		.el-poper-payments {
			.el-select-dropdown__item {
				font-family: 'Proxima Nova Sb';
				font-size: 14px;
				line-height: 40px;
				height: 40px;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #333333;
			}
		}

		&-body {
			padding: 24px 28px;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			&_modal {
				border: 0;
				padding: 0;
			}
		}

		&-group {
			position: relative;
			margin-bottom: 24px;
			&_flex {
				display: flex;
				align-items: end;
				justify-content: space-between;
			}
			&__input {
				flex-grow: 1;
			}
			&__select {
				margin-left: 28px;
			}
			&:last-child {
				margin: 0;
			}
		}
	}
</style>
