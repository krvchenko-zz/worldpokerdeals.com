<template>

<div class="cookie-policy">
	<div class="cookie-policy__wrap">
		<span @click="handleClose" class="cookie-policy__close cookie-policy__close_gray"></span>
		<h4>Important Update:<br>Privacy Policy (GDPR) and T&C</h4>
		<div v-if="!opened" class="cookie-policy__more">
			<a href="#" @click.prevent="opened = true">Show more</a>
		</div>
		<transition name="fade">
			<div v-if="opened" class="cookie-policy__text">
				<p>Our big data neuro-network super cookie thing may store information about your personal data including location, age, gender, bb/100, food habits, and others which are now available in our
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						to="/privacy"
					>
						<a :href="href" @click="navigate">Privacy Policy</a>.
					</nuxt-link>
				</p>
				<p>We ask you to kindly take the time and read those two documents. Your continued use of our services will constitute acceptance of
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						to="/terms"
					>
						<a :href="href" @click="navigate">Terms and Conditions</a>
					</nuxt-link>
					and
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						to="/privacy"
					>
						<a :href="href" @click="navigate">Privacy Policy</a>.
					</nuxt-link>
				</p>
				<p>By clicking “Agree to terms” you give us a right to do nothing but make this box disappear, just like all other sites do.</p>
				<p>Please do not hesitate to
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						to="/contact-us"
					>
						<a :href="href" @click="navigate">contact us</a>
					</nuxt-link>
					if you have any question.
				</p>
			</div>
		</transition>
		<a @click.prevent="handleClose" class="btn btn-primary" href="#">Agree to terms</a>
	</div>
</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'CookiePolicy',

		components: {},

		props: {},

		data: () => ({
			opened: false,
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {
			handleClose() {
				this.$store.dispatch('auth/setCookie', { cookie: true })
			},
		},
	}
</script>

<style lang="scss">
	.cookie-policy {
		box-shadow: 0 -6px 40px 8px rgba(0, 0, 0, .25);
		width: 475px;
		position: fixed;
		bottom: 0;
		background: #FAFAFA;
		right: 140px;
		z-index: 100;

		h4 {
			font-family: 'Proxima Nova';
			font-size: 20px;
			color: #243238;
			line-height: 24px;
			font-weight: bold;
		}

		p {
			font-family: 'Proxima Nova';
			line-height: 17px;
			font-size: 14px;
			margin: 0 0 12px;
		}

		&__wrap {
			border-top: 5px solid #2E87C8;
			padding: 25px 30px 30px;
			position: relative;
		}

		&__more {
			margin-bottom: 25px;
		}

		&__close {
			cursor: pointer;
			position: absolute;
			display: block;
			float: right;
			width: 20px;
			height: 20px;
			padding: 18px;
			top: 15px;
			right: 15px;

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

		&__text {
			margin-bottom: 20px;
		}

		&__btn {
			text-transform: uppercase;
			color: #fff;
			text-decoration: none;
			display: inline-block;
			padding: 14px 30px 12px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 14px;
			letter-spacing: .3px;
			text-align: center;
			line-height: 14px;
			background: #2E87C8;
			border-radius: 3px;
		}
	}

	@include mq('tablet') {
		.cookie-policy {
			width: calc(100% - 20px);
			right: 15px;
		}
	}
</style>
