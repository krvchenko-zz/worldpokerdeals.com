<template>
	<div :class="['payments-form']">

		<div :class="['payments-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div v-if="paymentInfos && paymentInfos.length" class="payments-form-group">
					<label class="form-input__label">{{ $t('form.choose_payment') }}</label>
					<el-select
						class="el-select-payments"
						v-model="form.payment_info_id"
						:loading="loading"
						filterable
						reserve-keyword
						popper-class="el-poper-payments"
						@change="action"
					>
						<template slot="prefix">
							<svg-icon
								:icon="`${paymentInfos[0].method.icon}-color`"
								:width="24"
								:height="24"
								:image="true"
								view-box="0 0 30 30"
							/>
						</template>

						<el-option
							v-for="item in paymentInfos"
							:key="item.id"
							:value="item.id"
							:label="`${item.email}${item.account_private}${item.card_private}`"
						>
							<span style="float: left; margin-right: 12px;">
								<svg-icon
									:icon="`${item.method.icon}-color`"
									:width="24"
									:height="24"
									:image="true"
									view-box="0 0 30 30"
								/>
							</span>
							<span>{{ item.email }}{{ item.account_private }}{{ item.card_private }}</span>
						</el-option>
					</el-select>
				</div>

				<div class="payments-form-group">
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						:to="{ name: 'my.payments.add' }"
					>
						<a :class="[
								'btn',
								'btn-md',
								'btn-primary',
								'btn-payment-add'
							]"
							:href="href"
							@click="navigate"
						>{{ $t('form.add') }}</a>
					</nuxt-link>
				</div>

				<div v-if="paymentInfos && paymentInfos.length" class="payments-form-group">
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
		name: 'MyPaymentsForm',

		components: {},

		props: {

		},

		computed: {
			...mapGetters({
				user: 'auth/user',
				paymentInfos: 'auth/paymentInfos',
			}),
		},

		data: () => ({
			loading: false,
			form: new Form({
				payment_info_id: null,
			}),
		}),

		watch: {
			paymentInfos: {
				immediate: true,
				deep: true,
				handler(data) {
					if (data) {
						this.form.keys().forEach(key => {
							if (key === 'payment_info_id' && data[0]) {
								this.form['payment_info_id'] = data[0].id
							} else {
								this.form[key] = data[key]
							}
						})
					}
				}
			}
		},

		mounted() {

		},

		methods: {

			async action() {
				this.form
					.patch(`/user/${this.user.id}`)
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
	$ico-btn-add: url('~assets/i/ico-btn-add.svg?data');
	// $ico-yes: url('~assets/i/ico-yes.svg?data');
	// $ico-no: url('~assets/i/ico-no.svg?data');
	// $icon-pros-list: url('~assets/i/icon-pros-list.svg?');
	.payments-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px 0 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

		.btn-payment-add {
			padding: 10px 20px 10px 40px;
			position: relative;
			background-image: $ico-btn-add;
			background-repeat: no-repeat;
			background-position: 17px center;
		}

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
			&:last-child {
				margin: 0;
			}
		}
	}
</style>
