<template>
	<div class="payments-card">
		<div class="payments-card__header">Доступные методы</div>

		<div class="payments-card__body">


			<div class="payments-card__table-wrap">
				<table class="payments-card__table">
					<thead>
						<tr>
							<th></th>
							<th>Идентификационные данные</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in user.payment_infos" :key="index">
							<td>
								<svg-icon
									:icon="`${item.method.icon}-color`"
									:width="24"
									:height="24"
									:image="true"
									view-box="0 0 30 30"
								/>
								<span class="payments-card__table-method">{{ item.method.title }}</span>
							</td>
							<td>{{ item.email }}{{ item.card }}{{ item.account }}</td>
							<td>
								<a class="payments-card__table-link" href="#" @click.prevent="remove(item.id)">Удалить</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
<!-- 		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{ name: 'index', params: {} }"
		>
			<a :href="href" @click="navigate"></a>
		</nuxt-link> -->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'MyPaymentsTable',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				locale: 'lang/locale'
			}),
		},

		watch: {},

		methods: {
			async remove(id) {
				await this.$axios.delete(`/my/paymentinfo/${id}`)
				.then(response => {})

				await this.$axios.get('user', {
					params: {
						locale: this.locale,
						with: ['connections', 'paymentInfos.currency', 'paymentInfos.method'],
					}
				}).then(response => {
					this.$store.dispatch('auth/updateUser', response.data)
				})
			}
		},
	}
</script>

<style lang="scss">
	.payments-card {
		margin-top: 32px;
		overflow: hidden;
		background: linear-gradient(0deg, #fafafa, #fafafa);
		box-sizing: border-box;
		box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
		padding: 24px 28px 0 28px;
		border-left: 1px solid #e9e9e9;
		border-right: 1px solid #e9e9e9;
		&__header {
			color: #222222;
			text-decoration: none;
			font-family: 'Proxima Nova';
			font-weight: bold;
			padding-bottom: 28px;
		}

		&__table {
			width: 100% !important;
			table-layout: fixed;
			&:last-child {
				margin-bottom: 0;
			}
			colgroup {
				display: none;
			}
			&-wrap {
				margin: 0 -28px;
			}
			&-method {
				font-weight: bold;
			}
			tr {
				td,
				th {
					padding: 15px 20px;
					border: 1px solid #e9e9e9;
					color: #222222;
					font-weight: normal;
					font-style: normal;
					font-size: 14px;
					line-height: 16px;
					font-family: "Proxima Nova";
					background: linear-gradient(0deg, #fafafa, #fafafa),
						linear-gradient(180deg, #ffffff -1.39%, #f1efef 107.71%);
					&:first-child {
						// border-left: 0!important;
					}
					&:last-child {
						// border-right: 0!important;
					}
				}
			}
			thead {
				tr {
					td,
					th {
						border: 1px solid #dfdede;
						color: #777777;
						font-weight: bold;
						letter-spacing: 0.5px;
						text-transform: uppercase;
						background: #e9e9e9;
				    font-size: 12px;
						&:nth-child(3) {
							width: 20%;
						}
						&:nth-child(1) {
							width: 30%;
						}
					}
				}
			}
			tbody {
				tr {
					th {
						border: 1px solid #dfdede;
						color: #777777;
						font-weight: bold;
						letter-spacing: 0.5px;
						text-transform: uppercase;
						background: #e9e9e9;
					}
				}
			}

			caption {
				padding: 0;
				margin-top: 10px;
				caption-side: bottom;
				color: #999999;
				text-align: center;
				font-style: normal;
				font-weight: normal;
				font-size: 14px;
				line-height: 16px;
				font-family: "Proxima Nova";
			}

			@include mq('tablet') {
				table-layout: auto;
				tr {
					th {
						font-size: 12px;
						line-height: 12px;
						padding: 12px 16px;
					}
					td {
						font-size: 15px;
						line-height: 16px;
						padding: 12px 16px;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
