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
		path: '/pokernye-akcii/skrill',
		name: 'skrill',
		component: page('skrill.vue'),
	},
	{
		path: '/pokernye-akcii/neteller',
		name: 'neteller',
		component: page('neteller.vue'),
	},
	{
		path: '/pokernye-akcii/ecopayz',
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
		path: '/404',
		name: '404',
		component: page('404.vue'),
	},
	{
		path: '/:parent/:child?',
		name: 'index',
		component: page('index.vue'),
	},
	{
		path: '/rakeback-deals/:slug/download',
		name: 'download',
		component: page('download.vue'),
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
