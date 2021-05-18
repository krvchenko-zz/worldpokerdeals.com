import Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'

import axios from 'axios'

export const actions = {
	async nuxtServerInit(
		{ commit },
		{ app, store, req, res, route, params, redirect, error }
	) {
		const token = cookieFromRequest(req, 'token')
		if (token) {
			commit('auth/SET_TOKEN', token)
		}

		const locale = cookieFromRequest(req, 'locale')
		if (locale) {
			commit('lang/SET_LOCALE', { locale })
		}

		const geo = cookieFromRequest(req, 'geo')
		if (geo) {
			commit('location/SET_CODE', { geo })
		}
	},
}
