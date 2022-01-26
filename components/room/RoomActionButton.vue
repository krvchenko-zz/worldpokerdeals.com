<template>
	<nuxt-link v-slot="{ href, route, navigate }" :to="to" custom>
		<button
			:disabled="type === 'download' && (disabled || !url || url === '')"
			:class="[
				'btn',
				'btn-room-action',
				type === 'download' && (disabled || !url || url === '') && 'btn-room-action_disabled',
				`btn-room-action_${type}`,
				icon && `btn-room-action_${type}-icon`,
				loading && 'btn-room-action_loading'
			]"
			v-on="
				shouldNavigate
					? { click: type === 'download' ? handleDownload : navigate }
					: { click: handleClick }
			"
		>
			{{ label }}
		</button>
	</nuxt-link>
</template>

<script>
	import eventBus from '~/utils/event-bus'
	import { mapGetters } from 'vuex'
	import VueMeta from 'vue-meta'
	const { generate } = VueMeta

	export default {
		name: 'RoomActionButton',

		components: {},

		props: {
			type: {
				type: String,
				default: 'default',
			},

			label: {
				type: String,
				default: '',
			},

			icon: {
				type: Boolean,
				default: true,
			},

			slug: {
				type: String,
				default: '',
			},

			url: {
				type: String,
				default: '',
			},

			title: {
				type: String,
				default: '',
			},

			color: {
				type: String,
				default: '#FFFFFF',
			},

			disabled: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			loading: false,
		}),

		computed: {
			to() {
				return this.type === 'download'
					? `/rakeback-deals/${this.slug}/play`
					: `/rakeback-deals/${this.slug}`
			},

			shouldNavigate() {
				return this.type === 'download' || this.type === 'default'
					? true
					: false
			},

			...mapGetters({
				country: 'location/country',
			}),
		},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				const data = {
					type: this.type,
					title: this.title,
					slug: this.slug,
				}

				if (this.type === 'contacts') {

					this.loading = true

					const { set } = this.$meta().addApp('jivosite')

					set({
						script: [{
							type: 'text/javascript',
							async: true,
							src: `//code.jivosite.com/script/widget/${this.$t('jivosite')}`
						},{
							type: 'text/javascript',
							innerHTML: 'function jivo_onLoadCallback() { jivo_api.open() }'
						}],
					})

					setTimeout(() => this.loading = false, 1000)
				}

				this.$emit('click', data)
				eventBus.$emit('roomAction:click', data)
			},

			handleDownload() {
				let route = this.$router.resolve({
					name: 'download',
					params: { slug: this.slug },
				})
				return window.open(route.href, '_blank')
			},
		},
	}
</script>

<style lang="scss">
	$ico-btn-chat: url('~assets/i/room/ico-btn-chat.svg?data');
	$ico-btn-action: url('~assets/i/room/ico-btn-action.svg?data');
	$ico-btn-loading: url('~assets/i/ico-btn-loading.svg?data');

	.btn-room-action {
		margin: 0;
		padding: 11px 24px 11px 24px;
		flex-grow: 1;
		font-family: 'Proxima Nova Sb';
		font-size: 18px;
		line-height: 22px;
		white-space: nowrap;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&_download {
			padding: 13px 24px 13px 24px;
			border: 0;
			color: #fff;
			position: relative;
			overflow: hidden;
			background: #ff4151;
			&:hover,
			&:focus {
				background: #ee3c4b;
			}
			&-icon {
				&:after {
					right: 24px;
					top: 50%;
					margin-top: -34px;
					opacity: 0.1;
					content: '';
					width: 72px;
					height: 68px;
					position: absolute;
					background-image: $ico-btn-action;
					background-repeat: no-repeat;
					background-position: right center;
				}
			}
			&[disabled='disabled'] {
				background: #aaaaaa;
				&:hover,
				&:active,
				&:focus {
					background: #aaaaaa;
				}
			}
		}

		&_contacts {
			padding: 13px 24px 13px 24px;
			border: 0;
			position: relative;
			overflow: hidden;
			background: #70ac30;
			color: #ffffff;
			&:hover,
			&:focus {
				background: #6aa42c;
			}
			&-icon {
				&:after {
					right: 24px;
					top: 50%;
					margin-top: -44px;
					opacity: 0.1;
					content: '';
					width: 85px;
					height: 85px;
					position: absolute;
					background-image: $ico-btn-chat;
					background-repeat: no-repeat;
					background-position: right center;
				}
			}
		}

		&_loading {
			transition: none;
			color: transparent;
			background: #70ac30 $ico-btn-loading no-repeat center!important;
			&:hover {
				color: transparent;
				background: #70ac30 $ico-btn-loading no-repeat center!important;
			}
		}

		&_review,
		&_connection,
		&_default {
			color: #ffffff;
			border: 2px solid rgba(229, 229, 229, 0.8);
			background: transparent;
			&:hover,
			&:focus {
				color: #222222;
				background: #ffffff;
				border-color: #ffffff;
			}
			&:hover,
			&:active,
			&:focus {
				color: #222222;
				background: #ffffff;
				border-color: #ffffff;
			}
		}

		&_disabled {
			cursor: not-allowed;
		}

		&_connection {
			&[disabled='disabled'] {
				background: transparent;
				opacity: 0.5;
				&:hover,
				&:active,
				&:focus {
					border: 2px solid rgba(229, 229, 229, 0.8);
					color: #ffffff;
				}
			}
		}

		&_blacklist {
			color: #ea5535;
			border: 2px solid #ea5535;
			background: transparent;
			&:hover,
			&:active,
			&:focus {
				color: #ffffff;
				background: #ea5535;
			}
		}
	}
</style>
