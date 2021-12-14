<template>
	<div :class="['connections-form']">

		<div :class="['connections-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<div class="connections-form-group">
					<label class="form-input__label">{{ $t('form.add_room') }}</label>
					<el-select
						class="el-select-room"
						v-model="form.room_id"
						:loading="loading"
						filterable
						reserve-keyword
					>
						<el-option
							v-for="item in rooms"
							:key="item.id"
							:value="item.id"
							:label="item.title"
						>
							<span>{{ item.title }}</span>
						</el-option>
					</el-select>
				</div>

				<div class="connections-form-group">
					<form-input
						v-model="form.username"
						:label="$t('form.room_username')"
						type="text"
						name="username"
						:loading="form.busy"
						:error="form.errors.has('username')"
					/>
					<transition name="fade">
						<has-error :form="form" field="username" />
					</transition>
				</div>

				<div class="connections-form-group">
					<label class="form-input__label">{{ $t('form.payment_methods') }}</label>
					<el-select
						class="el-select-room"
						v-model="form.method"
						:loading="loading"
						filterable
						reserve-keyword
					>
						<el-option
							v-for="item in methods"
							:key="item.value"
							:value="item.value"
							:label="item.label"
						>
							<span>{{ item.label }}</span>
						</el-option>
					</el-select>
				</div>

				<div class="connections-form-group connections-form-group_flex">

					<div class="connections-form-group__input">
						<div class="connections-form-group">
							<form-input
								v-model="form.payment_email"
								:label="$t('form.wallet')"
								type="text"
								name="payment_email"
								:loading="form.busy"
								:error="form.errors.has('payment_email')"
							/>
							<transition name="fade">
								<has-error :form="form" field="payment_email" />
							</transition>
						</div>
					</div>

					<div class="connections-form-group__select">
						<el-select
							v-model="form.payment_currency"
							placeholder="Select"
						>
							<el-option
								v-for="(item, index) in currencies"
								:key="index"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</div>
				</div>

				<div class="connections-form-group">
					<form-input
						v-model="form.skype"
						label="Skype"
						type="text"
						name="skype"
						:loading="form.busy"
						:error="form.errors.has('skype')"
					/>
					<transition name="fade">
						<has-error :form="form" field="skype" />
					</transition>
				</div>

				<div class="connections-form-group">
					<form-input
						v-model="form.email"
						:label="$t('form.email')"
						type="email"
						name="email"
						:loading="form.busy"
						:error="form.errors.has('email')"
					/>
					<transition name="fade">
						<has-error :form="form" field="email" />
					</transition>
				</div>

				<div class="connections-form-group">
					<form-submit-button
						class="btn-block"
						:label="$t('form.save')"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div :class="['connections-form-footer']"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MyRoomsForm',

		components: {},

		props: {

		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				rooms: 'rooms/rooms',
				connections: 'auth/connections'
			}),
		},

		data: () => ({
			loading: false,
			currencies: [
				{
					value: 0,
					label: '$',
				},
				{
					value: 1,
					label: '€',
				},
			],
			methods: [
				{
					value: 'skrill',
					label: 'Skrill',
				},
				{
					value: 'neteller',
					label: 'Neteller',
				},
			],
			form: new Form({
				room_id: 5,
				user_id: null,
				username: null,
				method: 'skrill',
				payment_email: null,
				payment_currency: 0,
				skype: null,
				email: null,
				locale: 'en'
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

			locale: {
				immediate: true,
				deep: true,
				handler(val) {
					this.form.locale = val
				}
			},
		},


		methods: {

			async action() {
				this.form
					.post(`/my/connections`)
					.then(response => {
						this.form.reset()
					})
					.catch(e => {})

				await this.$axios.get('/my/connections', {
					params: {
						user_id: this.user.id
					}
				})
				.then(response => {
					this.$store.dispatch('auth/updateConnections', response.data)
				})
			},
		},
	}
</script>

<style lang="scss">
	.connections-form {
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

		.el-select-room {
			width: 100%;
			// .el-input__prefix {
			// 	left: 16px;
			// 	align-items: center;
			// 	display: flex;
			// }

			.el-input__inner {
				// padding-left: 52px;
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

		&-header {
			position: relative;
			padding: 24px 28px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 22px;
			line-height: 28px;
			letter-spacing: -0.2px;
			color: #fdfdfd;
			background: #2e87c8;
			&:after {
				content: '';
				top: 28px;
				right: 28px;
				position: absolute;
				width: 48px;
				height: 44px;
				display: block;
				background-size: contain;
			}
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

		&__age {
			width: auto;
		}
	}

	.connection-auth {
		max-width: 326px;
		float: right;
		width: 100%;
		margin-top: -128px;
	}
</style>
