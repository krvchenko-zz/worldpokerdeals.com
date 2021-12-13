<template>
	<div :class="['payments-form']">

		<div :class="['payments-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div v-if="payments" class="payments-form-group">
					<label class="form-input__label" style="color: rgb(34, 34, 34);">Выберите метод платежа</label>
					<el-select
						class="el-select-geo"
						v-model="form.payment_method_id"
						:loading="loading"
						filterable
						reserve-keyword
						popper-class="el-poper-geo"
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

		<div :class="['payments-form-footer']"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MyPaymentsFormAdd',

		components: {},

		middleware: 'auth',

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
			user: {
				immediate: true,
				deep: true,
				handler(data) {
					this.form.user_id = data.id
				}
			},
		},

		mounted() {},

		methods: {
			async action() {
				this.form
					.post('/my/paymentinfo')
					.then(response => {

						const paymentInfo = response.data

						this.$store.dispatch('auth/updatePaymentInfo', paymentInfo)

						this.$router.push({ path : '/my/payments' });
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	// $ico-register-form: url('~assets/i/ico-register-form.svg?data');
	.payments-form {
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

		// &-header {
		//  position: relative;
		//  padding: 24px 28px;
		//  font-family: 'Proxima Nova';
		//  font-style: normal;
		//  font-weight: bold;
		//  font-size: 22px;
		//  line-height: 28px;
		//  letter-spacing: -0.2px;
		//  color: #fdfdfd;
		//  background: #2e87c8;
		//  &:after {
		//    content: '';
		//    top: 28px;
		//    right: 28px;
		//    position: absolute;
		//    width: 48px;
		//    height: 44px;
		//    display: block;
		//    background: $ico-register-form no-repeat center;
		//    background-size: contain;
		//  }
		// }

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
	}
</style>
