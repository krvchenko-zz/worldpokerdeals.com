<template>
	<div class="page">
		<transition name="fade">
			<page-header v-show="!hideHeader" />
		</transition>
		<nuxt />

		<lazy-hydrate when-visible>
			<page-footer />
		</lazy-hydrate>
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
								>Вы представитель рума {{ room.title }}?</span
							>
							<div
								class="modal-header__description"
								:style="{
									color: '#FFFFFF',
									fontSize: '16px',
									lineHeight: '20px',
									fontFamily: 'Proxima Nova Sb',
								}"
							>
								Считаете, что этого не должно здесь быть? <br />
								Заполните форму!
							</div>
						</div>
					</div>
				</template>
				<template #body>
					<lazy-blacklist-form />
				</template>
			</lazy-modal>
		</transition>
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
							view-box="0 0 200 200"
						/>
						<div class="modal-header__info">
							<span class="modal-header__title"
								>Привяжи счет {{ room.title }} <br />
								к WorldPokerDeals!</span
							>
							<div class="modal-header__description">
								Участвуй в наших приватных промо и получи статус <br />
								верифицированного игрока WPD!
							</div>
						</div>
					</div>
				</template>
				<template #body>
					<div class="container-fluid">
						<div class="row">
							<div class="col-7">
								<lazy-connection-form @submit="handleConnectionForm" />
							</div>
							<div class="col-5">
								<transition name="flip">
									<lazy-auth-form
										v-if="!user && auth"
										class="connection-auth"
									/>
									<lazy-register-form
										v-if="!user && register"
										connection
										class="connection-auth"
									/>
									<lazy-user-profile v-if="user" />
								</transition>
							</div>
						</div>
					</div>
				</template>
			</lazy-modal>
		</transition>
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
						Спасибо!
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
						Мы отправим уведомление с результатом привязки на электронную почту
						в течение 3х дней
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
							Закрыть
						</button>
					</div>
				</template>
			</lazy-modal>
		</transition>
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
						Как мы оцениваем
					</div>
				</template>
				<template #body>
					<lazy-modal-rates />
				</template>
			</lazy-modal>
		</transition>

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
					>
						<template v-if="auth">Вход на <br />WorldPokerDeals</template>
						<template v-if="reset"
							>Восстановление пароля на <br />WorldPokerDeals</template
						>
					</span>
				</template>
				<template #body>
					<lazy-auth-form v-if="auth" modal />
					<lazy-reset-form v-if="reset" modal />
				</template>
			</lazy-modal>
		</transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import eventBus from '~/utils/event-bus'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		name: 'BasicLayout',

		components: {
			LazyHydrate,
			// Modal: () => import('~/components/modals/Modal'),
			// AuthForm: () => import('~/components/AuthForm'),
			// BlacklistForm: () => import('~/components/BlacklistForm'),
			// ConnectionForm: () => import('~/components/ConnectionForm'),
			// ModalRates: () => import('~/components/modals/ModalRates')
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
				user: 'auth/user',
				geo: 'location/code',
				page: 'pages/page',
				// room: 'rooms/room',
				topList: 'rooms/topList',
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
		},

		methods: {
			handleConnectionForm() {
				this.connectionModal = false
				this.completeModal = true
			},
		},
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
