import { observable, reaction } from 'mobx'
import { UI } from '~/models/UI'
import { Account } from '~/models/Account'
import { AUTH_TOKEN_COOKIE_NAME } from '~/constants'

export default ({ app }, inject) => {
	class Store {
		@observable account = null
		@observable ui = null

		constructor() {
			this.account = new Account(app.$cookies.get(AUTH_TOKEN_COOKIE_NAME))
			this.ui = new UI()
		}
	}

	const store = new Store()
	reaction(
		() => store.account.token,
		token => {
			if (token) {
				app.$cookies.set(AUTH_TOKEN_COOKIE_NAME, token)
			} else {
				app.$cookies.remove(AUTH_TOKEN_COOKIE_NAME)
			}
		}
	)
	inject('mobx', store)
}
