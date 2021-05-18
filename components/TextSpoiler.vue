<template>
	<div class="text-spoiler">
		<span class="text-spoiler__wrap" v-html="opened ? text : strLimit"></span>
		<i v-if="text.length > limit && !opened" class="text-spoiler__sep"></i>
		<button
			v-if="text.length > limit && !opened"
			class="btn text-spoiler__more"
			@click="handleClick"
		>
			Читать дальше
		</button>
	</div>
</template>

<script>
	export default {
		name: 'TextSpoiler',

		components: {},

		props: {
			text: {
				type: String,
				required: true,
			},

			limit: {
				type: Number,
				required: true,
			},
		},

		data: () => ({
			opened: false,
		}),

		computed: {
			strLimit() {
				return this.text.length > this.limit
					? this.text.substring(0, this.limit)
					: this.text
			},
		},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				this.opened = !this.opened
			},
		},
	}
</script>

<style lang="scss">
	$ico-text-spoiler-sep: url('~assets/i/ico-text-spoiler-sep.svg?data');
	.text-spoiler {
		font-size: 0;
		&__wrap {
			display: inline;
			vertical-align: middle;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			color: #555555;
		}

		&__more {
			text-transform: uppercase;
			border: 1px solid rgba(0, 139, 226, 0.5);
			border-radius: 4px;
			padding: 3px 5px 2px 5px;
			display: inline-block;
			vertical-align: middle;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 11px;
			line-height: 11px;
			color: rgba(0, 139, 226, 0.7);
			background: #ffffff;
		}

		&__sep {
			margin: 0 8px;
			position: relative;
			display: inline-block;
			vertical-align: middle;
			width: 12px;
			height: 18px;
			background: $ico-text-spoiler-sep no-repeat center;
		}

		&_front {
			margin-bottom: 20px;
		}
	}

	@media (max-width: 480px) {
		.text-spoiler {
			&_front {
				margin-bottom: 0px;
			}
		}
	}
</style>
