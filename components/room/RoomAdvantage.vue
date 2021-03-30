<template>
	<div class="room-advantage" :style="{
		filter: `drop-shadow(-4px 0 0 ${color})`,
		'-webkit-filter': `drop-shadow(-4px 0 0 ${color})`
	}">
		<div class="room-advantage__inner">
			<span class="room-advantage__label">{{ label }}</span>
			<span class="room-advantage__value" :style="{
				color: color
			}">
				<template v-if="value">{{ value }}</template>
				<template v-else>Отсутствует</template>
			</span>
		</div>
	</div>
</template>

<script>

export default {

	name: 'RoomAdvantage',

	components: {

	},

	props: {
		label: {
			type: String,
			default: ''
		},

		value: {
			type: [String, Number, Boolean],
			default: ''
		},

		color: {
			type: String,
			default: '#FFFFFF'
		}
	},

	created() {

	},

	data: () => ({

	}),

	computed: {

	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss">
.room-advantage {
	display: inline-flex;
	&__inner {
		clip-path: polygon(calc(100% - 20px) 0,100% 50%,calc(100% - 20px) 100%,0 100%,20px 50%,0 0);
    background: #343848;
    padding: 9px 28px 9px 40px;
	}

	&__label {
		display: block;
    margin-bottom: 4px;
    font-family: Proxima Nova Sb;
    font-size: 14px;
    line-height: 14px;
    color: #ccc;
	}

	&__value {
		font-family: Proxima Nova;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
	}
}
</style>