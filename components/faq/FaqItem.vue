<template>
	<div
		:class="['faq__item', active && 'faq__item_active']"
		@click="active = !active"
	>
		<div class="faq__question" v-html="question"></div>
		<transition name="slide">
			<div v-show="active" class="faq__answer" v-html="answer"></div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'FaqItem',

		props: {
			question: {
				type: String,
				required: true,
			},

			answer: {
				type: String,
				required: true,
			},
		},

		data: () => ({
			active: false,
		}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.faq {
		&__item {
			cursor: pointer;
			padding: 15px 10px;
			border-bottom: 1px solid #e9e9e9;
			&_active {
				padding-bottom: 20px;
			}
		}
		&__question {
			font-family: 'Proxima Nova Sb';
			font-size: 18px;
			line-height: 20px;
			color: #243238;
		}
		&__answer {
			margin-top: 15px;
			font-family: 'Proxima Nova';
			font-size: 17px;
			line-height: 21px;
			color: #555555;
			::v-deep p {
				margin: 0;
			}
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}
</style>
