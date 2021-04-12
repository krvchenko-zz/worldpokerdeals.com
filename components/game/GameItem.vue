<template>
<div class="game-item">
  <nuxt-link prefetch :to="{name: 'index', params: {
  	parent: page.parent ? page.parent.slug : page.slug,
  	child: page.parent ? page.slug : null
  }}" v-slot="{ href, route, navigate, isActive, isExactActive }">
	<a :class="['game-item__wrap']" :href="href" @click="navigate">
			<div class="game-item__icon-wrap">
				<svg-icon class="game-item__icon" :icon="icon" :width="88" :height="88" viewBox="0 0 200 200" />
			</div>
			<div class="game-item__title">{{ title }}</div>
			<div class="game-item__rooms">{{ rooms }} покер-румов</div>
		</a>
	</nuxt-link>
</div>
</template>

<script>

export default {
	name: 'GameItem',

	components: {

	},

	props: {
		title: {
			type: String
		},
		icon: {
			type: String
		},
		page: {
			type: Object
		},
		rooms: {
			type: [String, Number]
		},
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
$ico-network-more: url('~assets/i/ico-network-more.svg?data');
.game-item {
	margin: 20px 0;
	background: #FAFAFA;
	border: 1px solid #E9E9E9;
	border-radius: 4px;
	&__wrap {
		position: relative;
		display: block;
		padding: 24px 20px 24px 24px;
		&:hover,
		&:active,
		&:visited {
			text-decoration: none;
		}
	}
	&__title {
		padding-right: 100px;
		min-height: 48px;
		margin-bottom: 12px;
		font-family: 'Proxima Nova';
		font-weight: bold;
		font-size: 20px;
		line-height: 24px;
		color: #222222;
	}
	&__icon {
		&-wrap {
			margin-top: -24px;
			right: 20px;
			top: 0;
			position: absolute;
		}
		border-radius: 50%;
	}
	&__rooms {
		position: relative;
		font-family: 'Proxima Nova Sb';
		font-size: 14px;
		line-height: 16px;
		color: #AAAAAA;
		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 3px;
			width: 28px;
			height: 12px;
			display: block;
			background: $ico-network-more no-repeat center;
		}
	}
}
</style>