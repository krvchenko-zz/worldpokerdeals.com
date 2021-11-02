<template>
	<div class="bonus-list">
		<div class="bonus-list__header">
			<div class="bonus-list__label bonus-list__label-bonus">
				{{ $t('bonus') }}
			</div>
			<div class="bonus-list__label">
				{{ $t('max_bonus') }}
			</div>
			<div class="bonus-list__label">{{ $t('cashback') }}</div>
			<div class="bonus-list__label">{{ $t('deposit') }}</div>
		</div>
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'BonusList',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.bonus-list {
		grid-area: list;
		display: flex;
		flex-direction: column;
		margin-bottom: 28px;

		&__header {
			display: grid;
			grid-template-columns: 354px 116px 83px 1fr;
			background: #f1efef;
			position: sticky;
			top: 80px;
			z-index: 10;
		}

		&__label {
			white-space: nowrap;
			padding: 16px 20px 14px 20px;
			display: table-cell;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.3px;
			text-transform: uppercase;
			color: #777777;
			background: #f1efef;
			border-left: 1px solid #e9e9e9;
			border-bottom: 1px solid #d7d7d7;
			&:first-child {
				border-left: none;
			}
		}
	}

	@include mq('desktop') {
		.bonus-list {
			&__header {
				grid-template-columns: 278px 92px 79px 1fr;
			}
			&__label {
				padding-left: 8px;
				&-bonus {
					padding-left: 20px;
				}
			}
		}
	}

	@include mq('laptop') {
		.bonus-list {
			&__header {
				display: none;
			}
		}
	}

	@include mq('tablet') {
		.bonus-list {
			margin-left: -20px;
			margin-right: -20px;
		}
	}
</style>
