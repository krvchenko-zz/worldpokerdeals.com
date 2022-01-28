<template>
	<div class="page">
		<!-- Disclaimer -->
		<client-only>
			<page-disclaimer v-if="!disclaimer && locale === 'ru'" />
		</client-only>
		<!-- Header -->
		<transition name="fade">
			<page-header v-show="!hideHeader" />
		</transition>
		<!-- Page -->
		<nuxt />
		<!-- Footer -->
		<lazy-hydrate when-visible>
			<page-footer />
		</lazy-hydrate>
		<!-- Black list modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="blacklistModal"
					:show.sync="blacklistModal"
					header-bg="#FF4151"
					close-color="white"
					:width="680"
				>
					<template #header>
						<div class="modal-header__wrap">
							<svg-icon
								class="modal-header__icon"
								:width="86"
								:height="75"
								style="flex: 0 0 86px"
								icon="blacklist-modal"
							/>
							<div class="modal-header__info">
								<span
									class="modal-header__title"
									:style="{
										color: '#FFFFFF',
										fontSize: '24px',
										lineHeight: '28px',
										marginBottom: '4px',
									}"
									>{{ $t('blacklist_modal.title', {room: room.title}) }}</span
								>
								<div
									class="modal-header__description"
									:style="{
										color: '#FFFFFF',
										fontSize: '16px',
										lineHeight: '20px',
										fontFamily: 'Proxima Nova Sb',
									}"
									v-html="$t('blacklist_modal.text')"
								>
								</div>
							</div>
						</div>
					</template>
					<template #body>
						<lazy-blacklist-form />
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- Connection modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="connectionModal"
					:show.sync="connectionModal"
					:width="970"
				>
					<template #header>
						<div class="modal-header__wrap">
							<svg-icon
								class="modal-header__icon"
								:width="76"
								:height="76"
								:icon="room.slug"
								:image="true"
								view-box="0 0 200 200"
							/>
							<div class="modal-header__info">
								<span class="modal-header__title" v-html="$t('connection_modal.title', {room: room.title})"></span>
								<div class="modal-header__description" v-html="$t('connection_modal.text')"></div>
							</div>
						</div>
					</template>
					<template #body>
						<div class="modal-body__connection">
							<div class="modal-body__credentials">
								<lazy-connection-form @submit="handleConnectionForm" />
							</div>
							<div class="modal-body__auth">
								<transition name="flip">
									<lazy-auth-form v-if="!user && auth" class="connection-auth" />
									<lazy-register-form
										v-if="!user && register"
										connection
										class="connection-auth"
									/>
									<lazy-user-profile v-if="user" />
								</transition>
							</div>
						</div>
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- Complete modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="completeModal"
					:show.sync="completeModal"
					:width="686"
					header-bg="linear-gradient(0deg, #70AC30, #70AC30), linear-gradient(180deg, #20222C 0%, #2B2E3B 67.71%)"
				>
					<template #header>
						<div
							:style="{
								marginBottom: '25px',
								textAlign: 'center',
							}"
						>
							<svg-icon icon="connection-complete" />
						</div>
						<div
							:style="{
								fontFamily: 'Proxima Nova',
								fontWeight: 'bold',
								fontSize: '32px',
								lineHeight: '38px',
								textAlign: 'center',
								color: '#FFFFFF',
							}"
						>
							{{ $t('connection_modal.confirm_title') }}
						</div>
					</template>
					<template #body>
						<div
							:style="{
								marginBottom: '30px',
								fontFamily: 'Proxima Nova',
								fontSize: '20px',
								lineHeight: '26px',
								textAlign: 'center',
								color: '#000000',
							}"
						>
							{{ $t('connection_modal.confirm_info') }}
						</div>

						<div
							:style="{
								textAlign: 'center',
							}"
						>
							<button
								class="btn"
								:style="{
									padding: '10px 30px',
									fontFamily: 'Proxima Nova Sb',
									fontStyle: 'normal',
									fontSize: '16px',
									lineHeight: '20px',
									color: '#70AC30',
									background: 'transparent',
									border: '1px solid #70AC30',
								}"
								@click="completeModalShow = false"
							>
								{{ $t('close') }}
							</button>
						</div>
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- How we rate modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="ratesModal"
					:show.sync="ratesModal"
					:width="970"
					header-bg="#FFFFFF"
				>
					<template #header>
						<div
							:style="{
								fontFamily: 'Proxima Nova',
								fontWeight: 'bold',
								fontStyle: 'normal',
								fontSize: '32px',
								lineHeight: '38px',
								textAlign: 'center',
								color: '#222222',
							}"
						>
							{{ $t('how_we_rate.title') }}
						</div>
					</template>
					<template #body>
						<lazy-modal-rates />
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- Auth modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="authModal"
					:show.sync="authModal"
					:width="444"
					header-bg="#2E87C8"
					close-color="white"
				>
					<template #header>
						<span
							class="modal-header__title"
							:style="{
								color: '#FFFFFF',
								fontSize: '22px',
								lineHeight: '28px',
							}"
							v-html="
								auth ? $t('form.sign_in_text') : $t('form.password_reset_text')
							"
						>
						</span>
					</template>
					<template #body>
						<lazy-auth-form v-if="auth" modal />
						<lazy-reset-form v-if="reset" modal />
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- Age confirm modal -->
		<lazy-hydrate when-visible>
			<transition name="fade">
				<lazy-modal
					v-if="age === 'false' || !age"
					:show="age === 'false' || !age"
					:show-close="false"
					:width="530"
					header-bg="#FFFFFF"
				>
					<template #body>
						<age-form />
					</template>
				</lazy-modal>
			</transition>
		</lazy-hydrate>
		<!-- Go top -->
		<client-only v-if="!$device.isMobile" name="fade">
			<lazy-hydrate when-visible>
				<page-top />
			</lazy-hydrate>
		</client-only>
		<!-- Cookie Policy -->
		<client-only v-if="(cookie === 'false' || !cookie) && locale !== 'ru'">
			<lazy-hydrate when-visible>
				<cookie-policy />
			</lazy-hydrate>
		</client-only>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'BasicLayout',

		components: {
			LazyHydrate
		},

		head() {
			return {
				link: [
					{rel: 'preconnect', href: process.env.apiHost},
					{rel: 'dns-prefetch', href: process.env.apiHost},
				],
			}
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				geo: 'location/code',
				page: 'pages/page',
				disclaimer: 'auth/disclaimer',
				topList: 'rooms/topList',
				age: 'auth/age',
				cookie: 'auth/cookie',
				isMobile: 'ui/isMobile',
				isTablet: 'ui/isTablet',
			}),
		},

		data: () => ({
			loading: false,
			hideHeader: false,
			connectionModal: false,
			completeModal: false,
			ratesModal: false,
			blacklistModal: false,
			showSticky: false,
			authModal: false,
			registerModal: false,
			auth: false,
			register: false,
			reset: false,
			room: {
				title: '',
				slug: '',
			},
		}),

		watch: {
			$route() {
				this.connectionModal = false
				this.blacklistModal = false
				this.ratesModal = false
				this.authModal = false
				this.registerModal = false
				this.auth = false
				this.register = false
				this.reset = false
				this.hideHeader = false
				document.body.classList.remove('modal-open')
			},
		},

		mounted() {
			eventBus.$on('roomAction:click', data => {
				this.room = {
					title: data.title,
					slug: data.slug,
				}

				if (data.type === 'connection') {
					this.connectionModal = true
					this.auth = true
				}

				if (data.type === 'blacklist') {
					this.blacklistModal = true
				}
			})

			eventBus.$on('ratesModal:show', event => {
				this.ratesModal = event
			})

			eventBus.$on('authModal:show', event => {
				this.authModal = event
				this.auth = event
				document.body.classList.remove('modal-open')
			})

			eventBus.$on('registerModal:show', event => {
				this.registerModal = event
			})

			eventBus.$on('register:show', event => {
				this.register = event
				this.auth = false
			})

			eventBus.$on('auth:show', event => {
				this.auth = event
				this.register = false
			})

			eventBus.$on('reset:show', event => {
				this.auth = false
				this.reset = event
			})

			eventBus.$on('modal:hide', event => {
				this.auth = event
				this.register = event
				this.reset = event
			})

			eventBus.$on('pageHeader:hide', event => {
				this.hideHeader = event
			})

			eventBus.$on('ageModal:click', event => {
				if (event) {
					document.body.classList.remove('modal-open')
				}
			})

			eventBus.$on('connectionModal:show', event => {
				this.connectionModal = event
			})

			eventBus.$on('blacklistModal:show', event => {
				console.log(event);
				this.blacklistModal = event
			})

			this.setScreenSize()
				window.addEventListener('resize', () => {
				this.setScreenSize()
			})
		},

		methods: {
			handleConnectionForm() {
				this.connectionModal = false
				this.completeModal = true
			},

			setScreenSize() {
				this.$store.commit('ui/SET_IS_MOBILE', {
					value: window.innerWidth < 768,
				})
				this.$store.commit('ui/SET_IS_TABLET', {
					value: window.innerWidth >= 768 && window.innerWidth < 1280,
				})
			},
		},
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 90px;
	}

	.modal-body {
		&__connection {
			display: grid;
			grid-template-columns: 7fr 5fr;
			grid-template-areas: 'credentials auth';
		}

		&__credentials {
			grid-area: credentials;
		}

		&__auth {
			grid-area: auth;
		}
	}

	@include mq('tablet') {
		.modal-body {
			&__connection {
				grid-template-columns: 100%;
				grid-template-areas:
					'auth'
					'credentials';
			}

			&__auth {
				display: flex;
				justify-content: center;
				margin-bottom: 32px;
			}
		}

		.modal-header {
			&__icon {
				min-width: 32px;
			}
			&__title {
				font-size: 24px;
			}
		}
	}
</style>
