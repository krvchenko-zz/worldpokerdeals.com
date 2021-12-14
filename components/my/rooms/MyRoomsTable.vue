<template>
	<div class="connections-card">
		<div class="connections-card__header">{{ $t('form.rooms_connected') }}</div>

		<div class="connections-card__body">


			<div class="connections-card__table-wrap">
				<table class="connections-card__table">
					<thead>
						<tr>
							<th>{{ $t('form.room_name') }}</th>
							<th>{{ $t('form.identity_data') }}</th>
							<th>{{ $t('form.date') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in connections" :key="index">
							<td>
								<span class="connections-card__room-logo" :style="{
									background: item.room.background
								}">
									<img 
										class="connections-card__room-img"
										:src="`${mediaUrl}/room-card/${item.room.image.filename}`"
										:alt="item.room.title"
									/>
								</span>
								<span class="connections-card__table-method">{{ item.room.title }}</span>
							</td>
							<td>
								<span :class="[
									'connections-card__status',
									item.status === 0 && 'connections-card__status_new',
									item.status === 1 && 'connections-card__status_confirmed',
									item.status === 2 && 'connections-card__status_canceled'
								]">{{ item.username }}</span>
							</td>
							<td>{{ dateFormat(item.created_at) }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'MyRoomsTable',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				locale: 'lang/locale',
				connections: 'auth/connections'
			}),
			img() {
				return `${this.mediaUrl}/room-card/${this.image.filename}`
			},
			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				var t = timestamp.split(/[- :]/);

				let date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$ico-yes: url('~assets/i/ico-yes.svg?data');
	$ico-no: url('~assets/i/ico-no.svg?data');
	.connections-card {
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

		&__room-logo {
			position: relative;
			display: inline-block;
			height: 50px;
			width: 100px;
			vertical-align: middle;
			margin: -15px 10px -15px -20px;
		}

		&__room-img {
			position: absolute;
			top: 0;
			margin: auto;
			right: 0;
			max-width: 80%;
			max-height: 80%;
			bottom: 0;
			left: 0;
		}

		&__status {
			position: relative;
			display: inline-block;
			min-height: 20px;
			padding-left: 30px;
			line-height: 20px;
			&:before {
				border-radius: 50%;
				content: '';
				width: 20px;
				height: 20px;
				position: absolute;
				left: 0;
				top: 0;
			}
			&_new {
				&:before {
					background: #f39c12;
				}
				&:after {
					border-radius: 50%;
					content: '';
					width: 14px;
					height: 14px;
					position: absolute;
					left: 3px;
					top: 3px;
					background: #ffffff;
				}
			}
			&_confirmed {
				&:before {
					background: #55bf4f $ico-yes no-repeat center;
				}
			}
			&_canceled {
				&:before {
					background: #f31112 $ico-no no-repeat center;
				}
			}
		}

		&__table {
			min-width: 100%;
			table-layout: fixed;
			&:last-child {
				margin-bottom: 0;
			}
			colgroup {
				display: none;
			}
			&-wrap {
				margin: 0 -28px;
				overflow-x: scroll;
				@include hide-scroll();
			}
			&-link {
				line-height: 24px;
			}

			&-method {
				font-weight: bold;
			}
			tr {
				td,
				th {
					position: relative;
					padding: 15px 20px;
					border: 1px solid #e9e9e9;
					color: #222222;
					white-space: nowrap;
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
