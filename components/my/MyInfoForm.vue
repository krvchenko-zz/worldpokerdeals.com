<template>
	<div :class="['register-form']">

		<div :class="['register-form-body']">
			<form
				class="form"
				@submit.prevent="action"
				@keydown="form.onKeydown($event)"
			>
				<!-- Username -->
				<div class="register-form-group">
					<form-input
						v-model="form.username"
						:label="$t('form.username')"
						type="text"
						name="username"
						:loading="form.busy"
						:error="form.errors.has('username')"
					/>
					<transition name="fade">
						<has-error :form="form" field="username" />
					</transition>
				</div>

				<!-- Email -->
				<div class="register-form-group">
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

				<div class="register-form-group">
					<form-input
						v-model="form.name"
						:label="$t('form.name')"
						type="text"
						name="name"
						:loading="form.busy"
						:error="form.errors.has('name')"
					/>
					<transition name="fade">
						<has-error :form="form" field="name" />
					</transition>
				</div>

				<div class="register-form-group">
					<form-input
						v-model="form.second_name"
						:label="$t('form.second_name')"
						type="text"
						name="second_name"
						:loading="form.busy"
						:error="form.errors.has('second_name')"
					/>
					<transition name="fade">
						<has-error :form="form" field="second_name" />
					</transition>
				</div>

				<!-- Password -->
<!-- 				<div class="register-form-group">
					<form-input
						v-model="form.password"
						:label="$t('form.password')"
						type="password"
						name="password"
						:loading="form.busy"
						:error="form.errors.has('password')"
					/>
					<transition name="fade">
						<has-error :form="form" field="password" />
					</transition>
				</div> -->

				<div class="register-form-group">
					<label class="form-input__label" style="color: rgb(34, 34, 34);">Страна</label>
					<el-select
						class="el-select-geo"
						v-model="form.country_id"
						:loading="loading"
						filterable
						reserve-keyword
						popper-class="el-poper-geo"
						@focus="fetchCountries"
						@change="action"
					>
						<template slot="prefix">
							<svg-icon :width="24" height="24" prefix="flags/" :icon="user.country.code" />
						</template>
						<el-option
							v-for="item in countries"
							:key="item.value"
							:value="item.value"
							:label="item.label"
						>
							<span style="float: left; margin-right: 12px;">
								<svg-icon
									:width="24"
									height="24"
									prefix="flags/"
									:icon="item.code"
								/>
							</span>
							<span>{{ item.label }}</span>
						</el-option>
					</el-select>
				</div>

				<div class="register-form-group register-form-group_flex">
					<form-radio-group :label="$t('form.sex')" label-position="left">
						<form-radio-button
							v-model="form.sex"
							name="sex"
							icon="male"
							size="sm"
							:value="0"
						/>
						<form-radio-button
							v-model="form.sex"
							name="sex"
							icon="female"
							size="sm"
							:value="1"
						/>
					</form-radio-group>
					<form-select
						v-model="form.birthday"
						class="register-form__age"
						name="year"
						:options="years"
						:label="$t('form.year')"
						label-position="left"
					/>
				</div>

				<div class="register-form-group">
					<form-submit-button
						class="btn-block"
						:label="$t('form.save')"
						:loading="form.busy"
					>
					</form-submit-button>
				</div>
			</form>
		</div>

		<div :class="['register-form-footer']"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'MyInfoForm',

		components: {},

		middleware: 'auth',

		props: {

		},

		computed: {
			...mapGetters({
				country: 'location/country',
				user: 'auth/user',
			}),

			years() {
				const now = new Date().getUTCFullYear()
				const years = Array(now - (now - 100))
					.fill('')
					.map((v, idx) => ({
						label: now - idx,
						value: `${now-idx}-01-01 00:00:00`,
					}))

				return years
			},
		},

		data: () => ({
			loading: false,
			countries: [],
			form: new Form({
				username: '',
				email: '',
				name: '',
				second_name: '',
				sex: null,
				country_id: null,
				birthday: 1970,
			}),
		}),

		watch: {
			user: {
				immediate: true,
				deep: true,
				handler(data) {
					this.form.keys().forEach(key => {
						this.form[key] = data[key]
					})
				}
			}
		},

		mounted() {
			this.countries.push({
				label: this.user.country.title,
				value: this.user.country.id,
				code: this.user.country.code
			})
		},

		methods: {

			async fetchCountries() {
				if (this.countries.length > 1) {
					return false
				}
				this.loading = true
				await this.$axios.get('countries', {
					params: {
						locale: this.locale,
					}
				}).then(response => {
					this.countries = response.data.map(item => {
						return {
							value: item.id,
							label: item.title,
							code: item.code,
						}
					})
					this.loading = false
				})
			},

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
	$ico-register-form: url('~assets/i/ico-register-form.svg?data');
	.register-form {
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
				background: $ico-register-form no-repeat center;
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
