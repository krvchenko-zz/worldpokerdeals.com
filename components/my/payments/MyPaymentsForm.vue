<template>
	<div :class="['payments-form']">

		<div :class="['payments-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div v-if="user.payment_infos && user.payment_infos.length" class="payments-form-group">
					<label class="form-input__label" style="color: rgb(34, 34, 34);">Выберите метод платежа</label>
					<el-select
						class="el-select-geo"
						v-model="form.payment_info_id"
						:loading="loading"
						filterable
						reserve-keyword
						popper-class="el-poper-geo"
						@change="action"
					>
						<template slot="prefix">
							<svg-icon
								:icon="`${user.payment_infos[0].method.icon}-color`"
								:width="24"
								:height="24"
								:image="true"
								view-box="0 0 30 30"
							/>
						</template>

						<el-option
							v-for="item in user.payment_infos"
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
						<a class="btn btn-primary btn-lg" :href="href" @click="navigate">{{ $t('form.add') }}</a>
					</nuxt-link>
				</div>

				<div v-if="user.payment_infos && user.payment_infos.length" class="payments-form-group">
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
		name: 'MyPaymentsForm',

		components: {},

		middleware: 'auth',

		props: {

		},

		computed: {
			...mapGetters({
				user: 'auth/user',
			}),
		},

		data: () => ({
			loading: false,
			// countries: [],
			form: new Form({
				payment_info_id: null,
			}),
		}),

		watch: {
			user: {
				immediate: true,
				deep: true,
				handler(data) {
					this.form.keys().forEach(key => {
						if (key === 'payment_info_id') {
							this.form['payment_info_id'] = data['payment_infos'][0].id
						} else {
							this.form[key] = data[key]
						}
					})
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
		// 	position: relative;
		// 	padding: 24px 28px;
		// 	font-family: 'Proxima Nova';
		// 	font-style: normal;
		// 	font-weight: bold;
		// 	font-size: 22px;
		// 	line-height: 28px;
		// 	letter-spacing: -0.2px;
		// 	color: #fdfdfd;
		// 	background: #2e87c8;
		// 	&:after {
		// 		content: '';
		// 		top: 28px;
		// 		right: 28px;
		// 		position: absolute;
		// 		width: 48px;
		// 		height: 44px;
		// 		display: block;
		// 		background: $ico-register-form no-repeat center;
		// 		background-size: contain;
		// 	}
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
				align-items: center;
				justify-content: space-between;
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
