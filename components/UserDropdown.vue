<template>
	<button @click="active = !active" :class="['user-dropdown']">
		<img
			v-if="avatar"
			width="36px"
			height="36px"
			decoding="async"
			class="user-dropdown__img"
			loading="lazy"
			:src="avatar"
			:alt="user.full_name"
		/>
		<svg-icon
			v-else
			class="user-dropdown__img"
			:width="36"
			:height="36"
			view-box="0 0 36 36"
			icon="user-avatar"
		/>
		<transition name="slide">
			<ul
				v-if="active"
				:class="[
					'user-dropdown-list',
				]"
			>

				<li class="user-dropdown-list__item">
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						prefetch
						:to="{ name: 'my.info' }"
					>
						<a :class="['user-dropdown-list__link']" :href="href" @click="navigate"><span>{{ $t('menu.my_account') }}</span></a>
					</nuxt-link>
				</li>

				<li v-if="checkAffiliate" class="user-dropdown-list__item">
					<a :class="['user-dropdown-list__link']" href="https://affiliate.worldpokerdeals01.com"><span>{{ $t('menu.affiliate_dashboard') }}</span></a>
				</li>

				<li v-if="checkPartner" class="user-dropdown-list__item">
					<a :class="['user-dropdown-list__link']" href="https://partner.worldpokerdeals01.com"><span>{{ $t('menu.partner_dashboard') }}</span></a>
				</li>

				<li class="user-dropdown-list__item">
					<a @click.prevent="handleLogOut" :class="['user-dropdown-list__link']" href="#"><span>{{ $t('menu.logout') }}</span></a>
				</li>

			</ul>
		</transition>
	</button>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'UserDropdown',

		components: {},

		props: {},

		data: () => ({
			active: false
		}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},

			avatar() {
				return this.user.image
					? `${this.mediaUrl}/user-icon/${this.user.image.filename}`
					: null
			},

			checkAffiliate() {
				return this.user.roles.findIndex(item => item.code === 'affiliate');
			},

			checkPartner() {
				return this.user.roles.findIndex(item => item.code === 'referer');
			},
		},

		watch: {},

		methods: {
			handleLogOut() {
				this.$store.dispatch('auth/logout')
			}
		},
	}
</script>

<style lang="scss">

	$ico-arrow-down: url('~assets/i/layout/header/ico-arrow-down.svg?data');

	.user-dropdown {
		position: relative;
		margin-left: 32px;
		padding: 0 15px 0 0;
		background: transparent;
		border: none;
		border-radius: 50%;
		display: flex;
		&:after {
			content: '';
			width: 10px;
			height: 6px;
			display: block;
			position: absolute;
			right: 0px;
			top: 17px;
			background: $ico-arrow-down;
		}
		&__img {
			border: 2px solid rgba(255, 255, 255, 0.1);
			border-radius: 50%;
		}
		&:active,
		&:focus {
			outline: none;
		}
	}

	.user-dropdown-list {
		position: absolute;
		right: 0;
		top: 57px;
		width: auto;
		margin: 0;
		padding: 0;
		list-style: none;
		// border: 1px solid rgba(204, 204, 204, 0.1);
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0px 15px 40px;

		&__item {
			&:focus,
			&:active {
				outline: none;
			}
		}

		&__link {
			cursor: pointer;
			position: relative;
			padding: 11px 16px;
			display: flex;
			align-items: center;
			color: #999999;
			background: #2f323f;
			white-space: nowrap;
			span {
				opacity: 0.8;
				color: #ffffff;
				font-size: 14px;
				line-height: 14px;
				font-style: normal;
				font-family: 'Proxima Nova Sb';
			}
			&:active,
			&:focus,
			&:hover {
				span {
					opacity: 0.5;
					color: #cccccc;
				}
				text-decoration: none;
			}
		}
	}
</style>
