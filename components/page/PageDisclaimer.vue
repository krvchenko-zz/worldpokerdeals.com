<template>
	<div class="page-disclaimer">
		<div class="page-disclaimer__wrap">
			<nuxt-link
				v-slot="{ href, navigate }"
				prefetch
				:to="{ name: 'terms' }"
			>
				<p>
					Внимание! Пожалуйста, ознакомьтесь с настоящим
					<a :href="href" @click="navigate">пользовательским соглашением</a>
					до начала использования сайта ru.worldpokerdeals.com и его
					программных средств. Данный сайт не является площадкой для
					проведения азартных игр. Вся информация, размещенная на сайте,
					носит ознакомительный характер.
				</p>
			</nuxt-link>
			<span
				:class="['page-disclaimer__close', 'page-disclaimer__close_gray']"
				@click="handleClose"
			></span>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PageDisclaimer',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		mounted() {},

		computed: {
			...mapGetters({
				disclaimer: 'auth/disclaimer',
			}),
		},

		watch: {},

		methods: {
			handleClose() {
				this.$store.dispatch('auth/setDisclaimer', { disclaimer: true })
			},
		},
	}
</script>

<style lang="scss">
	.page-disclaimer {
		background: #fafafa;
		font-family: Proxima Nova;
		font-size: 14px;
		line-height: 17px;
		color: #555555;
		&__wrap {
			padding: 22px 40px 22px 26px;
			position: relative;
			max-width: 1440px;
			margin: 0 auto;
		}
		p {
			margin: 0;
		}

		&__close {
			cursor: pointer;
			position: absolute;
			display: block;
			float: right;
			width: 20px;
			height: 20px;
			padding: 18px;
			top: 14px;
			right: 0;

			&:before,
			&:after {
				content: '';
				top: 0;
				left: 0;
				position: absolute;
				width: 2px;
				height: 26px;
				display: block;
				background: #000000;
			}

			&:before {
				transform: rotate(45deg) translate(16px, -9px);
			}
			&:after {
				transform: rotate(-45deg) translate(9px, 16px);
			}

			&_gray {
				opacity: 0.5;
				&:before,
				&:after {
					background: #555555;
				}
			}
		}
	}
</style>
