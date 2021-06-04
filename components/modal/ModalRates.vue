<template>
	<div class="modal-rates">
		<div
			v-for="(item, index) in items"
			:key="index"
			:class="['modal-rate', `modal-rate_type_${item.icon}`]"
		>
			<div class="modal-rate__wrap">
				<span class="modal-rate__label">{{ $t(item.label) }}</span>
				<span class="modal-rate__text">{{ $t(item.text) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ModalRates',

		data: () => ({
			items: [
				{
					label: 'how_we_rate.reliability.title',
					icon: '2',
					text: 'how_we_rate.reliability.text',
				},
				{
					label: 'how_we_rate.promotions.title',
					icon: '11',
					text: 'how_we_rate.promotions.text',
				},
				{
					label: 'how_we_rate.game_selection.title',
					icon: '13',
					text: 'how_we_rate.game_selection.text',
				},
				{
					label: 'how_we_rate.casual_players.title',
					icon: '6',
					text: 'how_we_rate.casual_players.text',
				},
				{
					label: 'how_we_rate.software.title',
					icon: '3',
					text: 'how_we_rate.software.text',
				},
				{
					label: 'how_we_rate.withdrawal_speed.title',
					icon: '5',
					text: 'how_we_rate.withdrawal_speed.text',
				},
			],
		}),
	}
</script>

<style lang="scss">
	$ico-score-2: url('~assets/i/room/ico-score-2.svg?data');
	$ico-score-3: url('~assets/i/room/ico-score-3.svg?data');
	$ico-score-5: url('~assets/i/room/ico-score-5.svg?data');
	$ico-score-6: url('~assets/i/room/ico-score-6.svg?data');
	$ico-score-11: url('~assets/i/room/ico-score-11.svg?data');
	$ico-score-13: url('~assets/i/room/ico-score-13.svg?data');

	.modal-rate {
		margin-bottom: 16px;
		padding-left: 36px;
		min-height: 20px;
		position: relative;
		&:before {
			display: block;
			left: 0;
			top: 0;
			position: absolute;
			content: '';
			width: 20px;
			height: 20px;
			background-repeat: no-repeat;
			background-position: center;
		}
		&_type_2 {
			&:before {
				background-image: $ico-score-2;
			}
		}

		&_type_3 {
			&:before {
				background-image: $ico-score-3;
			}
		}

		&_type_5 {
			&:before {
				background-image: $ico-score-5;
			}
		}

		&_type_6 {
			&:before {
				background-image: $ico-score-6;
			}
		}

		&_type_11 {
			&:before {
				background-image: $ico-score-11;
			}
		}

		&_type_13 {
			&:before {
				background-image: $ico-score-13;
			}
		}

		&__label {
			margin-bottom: 12px;
			display: block;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			letter-spacing: -0.2px;
			color: #222222;
		}

		&__text {
			font-family: Proxima Nova;
			font-size: 17px;
			line-height: 21px;
			color: #3d3d3d;
		}
	}
</style>
