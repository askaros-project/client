import _ from 'lodash'
import Vue from 'vue'
import { AUTH_TOKEN_COOKIE_NAME } from '~/constants'
import { message } from 'ant-design-vue'

const debouncedErrorMsg = _.debounce(msg => {
	message.error(msg)
}, 250)

export default ({ app, $axios, redirect }) => {
	Vue.use(vue => {
		vue.http = $axios
		vue.prototype.$http = $axios
	})

	if (app.$cookies.get(AUTH_TOKEN_COOKIE_NAME)) {
		$axios.setToken(app.$cookies.get(AUTH_TOKEN_COOKIE_NAME), 'JWT')
	}

	$axios.onRequest(config => {
		config.url = process.env.API_URL + '/' + config.url
	})

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status)
		if (code === 401) {
			app.$cookies.remove(AUTH_TOKEN_COOKIE_NAME)
		}
		if (process.client) {
			let msg = 'Internal server error',
				redirectTo = ''
			if (code === 401) {
				msg = 'Unauthorized'
				redirectTo = '/'
			} else if (code === 403) {
				msg = 'Forbidden'
				redirectTo = '/'
			} else if (code === 404) {
				msg = 'Not found'
			} else if (code === 500) {
				if (
					error.response &&
					error.response.data &&
					error.response.data.error &&
					error.response.data.error.type
				) {
					msg = error.response.data.error.type
				}
			}
			debouncedErrorMsg(msg)
			if (redirectTo) {
				if (window.location.pathname === redirectTo) {
					window.location.reload()
				} else {
					redirect(redirectTo)
				}
			}
		}
	})
}
