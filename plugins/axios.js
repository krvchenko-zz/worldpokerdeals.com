// import axios from 'axios'
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default function ({ app, store, redirect, req, $axios }, inject) {
  $axios.onRequest(request => {
    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }
    return request
  })
}

// export default ({ app, store, redirect, req, $axios }) => {
//   // axios.defaults.baseURL = process.env.apiUrl

//   // Request interceptor
//   $axios.interceptors.request.use((request) => {
//     // const token = store.getters['auth/token']
//     // if (token) {
//     //   request.headers.common.Authorization = `Bearer ${token}`
//     // }
//     const locale = store.getters['lang/locale']
//     if (locale) {
//       request.headers.common['Accept-Language'] = locale
//     }

//     return request
//   })

//   if (process.server) {
//     return
//   }

//   // Response interceptor
//   $axios.interceptors.response.use(response => response, (error) => {
//     const { status } = error.response || {}

//     if (status >= 500) {
//     }

//     if (status === 401 && store.getters['auth/check']) {
//       store.commit('auth/LOGOUT')
//       redirect({ name: 'login' })
//     }

//     return Promise.reject(error)
//   })
// }
