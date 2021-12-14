import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
	{
		path: '/',
		name: 'front',
		component: page('front.vue'),
	},
	{
		path: '/vip-skrill',
		name: 'skrill',
		component: page('skrill.vue'),
	},
	{
		path: '/vip-neteller',
		name: 'neteller',
		component: page('neteller.vue'),
	},
	{
		path: '/vip-ecopayz',
		name: 'ecopayz',
		component: page('ecopayz.vue'),
	},
	{
		path: '/contact-us',
		name: 'contacts',
		component: page('contacts.vue'),
	},
	{
		path: '/our-team',
		name: 'team',
		component: page('team.vue'),
	},
	{
		path: '/restricted',
		name: 'restricted',
		component: page('restricted.vue'),
	},
	{
		path: '/vip',
		name: 'vip',
		component: page('vip.vue'),
	},
	{
		path: '/register',
		name: 'register',
		component: page('register.vue'),
	},
	{
		path: '/terms',
		name: 'terms',
		component: page('terms.vue'),
	},
	{
		path: '/privacy',
		name: 'privacy',
		component: page('privacy.vue'),
	},
	{
		path: '/404',
		name: '404',
		component: page('404.vue'),
	},
	{
		path: '/my',
		name: 'my',
		component: page('my/index.vue'),
		redirect: { name: 'my.info' },
		children: [
			{
				path: 'info',
				name: 'my.info',
				component: page('my/info.vue')
			},
			{
				path: 'connections',
				name: 'my.connections',
				component: page('my/connections.vue')
			},
			{
				path: 'payments',
				name: 'my.payments',
				component: page('my/payments/index.vue'),
			},
			{
				path: 'payments/add',
				name: 'my.payments.add',
				component: page('my/payments/add.vue')
			},
			{
				path: 'payments/:id/edit',
				name: 'my.payments.edit',
				component: page('my/payments/edit.vue')
			},
			{
				path: 'password',
				name: 'my.password',
				component: page('my/password.vue')
			},
		]
	},
	{
		path: '/:parent/:child?',
		name: 'index',
		component: page('index.vue'),
	},
	{
		path: '/:parent/page/:page?',
		name: 'index.paged',
		component: page('index.vue'),
	},
	{
		path: '/rakeback-deals/:slug/download',
		name: 'download',
		component: page('download.vue'),
	},
	{
		path: '/soft/:id/download',
		name: 'soft',
		component: page('soft.vue'),
	},
	{
		path: '*',
		name: '404',
		component: page('404.vue'),
	},
]

export function createRouter() {
	return new Router({
		routes,
		scrollBehavior,
		mode: 'history',
	})
}
