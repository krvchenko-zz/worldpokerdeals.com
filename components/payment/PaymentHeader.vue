<template>
	<div class="payment-header">
		<div class="payment-header__wrap">
			<div class="payment-header__logo">
				<svg-icon
					:icon="payment.icon"
					:image="true"
					width="136px"
					height="136px"
				/>
			</div>

			<div class="payment__content">
				<h1 class="payment__title">{{ page.title }}</h1>
				<page-meta
					:author="page.author ? page.author.full_name : ''"
					:created="page.created_at"
					:updated="page.updated_at"
					:dark="true"
					class="payment__meta"
				>
				</page-meta>

				<div v-if="payment.vip_status" class="payment__actions">
					<payment-action-button
						class="payment__actions__button"
						:label="$t('open_acconut')"
						type="register"
						:url="payment.partner_url"
						:background="payment.btn_color"
					/>
					<payment-action-button
						class="payment__actions__button"
						:label="$t('manager_chat')"
						type="default"
						background="#70AC30"
					/>
					<payment-action-button
						class="payment__actions__button"
						:label="$t('vip_status')"
						type="internal"
						:vip-url="payment.vip_url"
						background="#F5A200"
					/>
				</div>

				<common-text-spoiler
					:limit="$device.isMobile || $device.isTablet ? 100 : 600"
					class="payment__summary"
					:text="page.summary"
				>
					<template v-slot:button>
						<svg-icon icon="spoiler-sep" width="35" height="16" />
					</template>
				</common-text-spoiler>
			</div>

			<room-top
				v-if="rooms"
				:id="rooms[0].id"
				:style="{ top: 0 }"
				:title="rooms[0].title"
				:slug="rooms[0].slug"
				:url="rooms[0].url"
				:restricted="rooms[0].restricted"
				:country="country"
				:rating="rooms[0].rating"
				:bonus="rooms[0].top_bonus"
				:review="rooms[0].review"
				:label="$t('room_best')"
				class="payment__top-room"
			/>
		</div>
		<div v-if="payment.tabs.length > 1" class="payment-header__nav">
			<tab-list>
				<tab-item
					v-for="(item, index) in payment.tabs"
					:key="index"
					:params="{
						parent: item.parent ? item.parent.slug : item.slug,
						child: item.parent ? item.slug : null,
					}"
					:name="item.name"
				>
				</tab-item>
			</tab-list>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PaymentHeader',

		components: {},

		props: {},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				payment: 'payments/payment',
				topList: 'rooms/topList',
				country: 'location/country',
				payment: 'payments/payment',
				rooms: 'rooms/rooms',
				page: 'pages/page',
			}),
		},

		watch: {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$payment-bg: url('~assets/i/summary-bg.jpg?data');
	.payment-header {
		overflow: hidden;
		position: relative;
		margin-bottom: 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		&:before {
			opacity: 0.5;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background: $payment-bg no-repeat center;
			background-size: cover;
		}
	}

	.payment {
		&-header {
			padding: 28px 28px 0;
			&__wrap {
				display: flex;
				gap: 56px;
				position: relative;
			}

			&__logo {
				padding-left: 44px;
				text-align: right;
			}
		}

		&__title {
			margin-bottom: 16px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 32px;
			line-height: 36px;
			color: #222222;
		}

		&__summary {
			padding-bottom: 40px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 22px;
			color: #222222;
			opacity: 0.8;
		}

		&__top-room {
			margin-left: 56px;
			width: 100%;
		}

		&__actions {
			margin-bottom: 32px;
			display: flex;
			align-items: center;
			&__button {
				flex: 0 0 180px;
			}
		}
	}

	@include mq('desktop') {
		.payment-header {
			&__logo {
				padding-left: 22px;
			}
		}

		.payment {
			&__top-room {
				margin-left: 48px;
			}
		}
	}

	@include mq('laptop') {
		.payment-header {
			padding: 28px 22px 0 0;
			&__logo {
				padding-left: 45px;
			}
		}

		.payment {
			&__top-room {
				display: none;
			}
			&__actions {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 20px 16px;

				.btn-payment-action {
					margin: 0;
				}
			}
		}
	}

	@include mq('tablet') {
		.payment-header {
			padding: 24px 20px 0;
			margin-left: -20px;
			margin-right: -20px;
			&__wrap {
				flex-direction: column;
				align-items: center;
				gap: 20px;
			}
			&__logo {
				padding-left: 0;
			}
		}

		.payment {
			&__title {
				text-align: center;
			}
			&__meta {
				justify-content: center;
			}
			&__actions {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 16px 20px;

				.btn-payment-action {
					margin: 0;
					white-space: nowrap;
					&:first-child {
						grid-column: span 2;
					}
				}
			}
		}
	}
</style>
