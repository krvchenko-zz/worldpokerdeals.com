<template>
	<div class="bonus-list">
		<table
			class="bonus-table"
			cellspacing="0"
			cellpadding="0"
			border="0"
			width="100%"
		>
			<thead class="bonus-table__header">
				<tr class="bonus-table__header-row">
					<th colspan="2" class="bonus-table__label">Бонус</th>
					<th class="bonus-table__label">Кешбэк</th>
					<th class="bonus-table__label">К депозиту</th>
					<th colspan="5" class="bonus-table__label">Макс Бонус</th>
				</tr>
			</thead>
			<slot />
		</table>
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
	.bonus-table {
		margin-bottom: 30px;
		border-collapse: separate;

		&__header {
			background: #f1efef;
		}

		&__label {
			white-space: nowrap;
			position: sticky;
			top: 80px;
			z-index: 10;
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
			border-bottom: 2px solid #d7d7d7;
			&:first-child {
				border-left: none;
			}
		}
	}
</style>
