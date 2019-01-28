import Vue from 'vue'
import { observable, computed, action } from 'mobx'
import { User } from './User'

const Cookie = process.client ? require('js-cookie') : undefined

let gapiOauth2

export class Account {
	@observable isPending = false
	@observable isFetched = false
	@observable isAdmin = false
	@observable user = null
	@observable token = Cookie ? Cookie.get('auth_token') : ''

	constructor() {
		this.user = new User()
	}

	@computed
	get isLoggedIn() {
		return !!this.token
	}

	@action
	load() {
		this.isPending = true
		Vue.http
			.get('account')
			.then(resp => {
				this.isPending = false
				if (resp.body.success) {
					this.isAdmin = resp.body.account.isAdmin
					this.user.update(resp.body.account.user)
					this.isFetched = true
				}
			})
			.catch(() => {
				this.isPending = false
			})
	}

	@action
	signupByEmail({ email, password, username }, onSuccess) {
		this.isPending = true
		Vue.http
			.post('account/email', { email, password, username })
			.then(resp => {
				this.isPending = false
				if (onSuccess) {
					onSuccess()
				}
			})
			.catch(() => {
				this.isPending = false
			})
	}

	@action
	loginByEmail({ email, password }) {
		this.isPending = true
		Vue.http
			.post('account/email/login', { email, password })
			.then(resp => {
				this.isPending = false
				if (resp.body.success) {
					this.login(resp.body.token)
				}
			})
			.catch(() => {
				this.isPending = false
			})
	}

	@action
	loginByFacebook() {
		FB.login(
			response => {
				if (response && response.authResponse) {
					this.isPending = true
					Vue.http
						.post('account/facebook/login', {
							accessToken: response.authResponse.accessToken,
							fbUserId: response.authResponse.userID
						})
						.then(resp => {
							this.isPending = false
							if (resp.body.success) {
								this.login(resp.body.token)
							}
						})
						.catch(() => {
							this.isPending = false
						})
				}
			},
			{ scope: 'public_profile,email' }
		)
	}

	@action
	loginByGoogle() {
		if (!gapiOauth2) {
			gapiOauth2 = window.gapi.auth2.init({
				client_id: process.env.GOOGLE_CLIENT_ID
			})
		}
		gapiOauth2.grantOfflineAccess().then(resp => {
			this.isPending = true
			Vue.http
				.post('account/google/login', {
					code: resp.code
				})
				.then(resp => {
					this.isPending = false
					if (resp.body.success) {
						this.login(resp.body.token)
					}
				})
				.catch(() => {
					this.isPending = false
				})
		})
	}

	@action
	loginByTwitter({ oauth_token, oauth_verifier } = {}) {
		this.isPending = true
		Vue.http
			.post('account/twitter/login', { oauth_token, oauth_verifier })
			.then(resp => {
				this.isPending = false
				if (resp.body.success) {
					if (resp.body.redirect) {
						window.location = resp.body.redirect
					} else if (resp.body.token) {
						this.login(resp.body.token)
					}
				}
			})
			.catch(() => {
				this.isPending = false
			})
	}

	@action
	login(token) {
		this.token = token
		Cookie.set('auth_token', token)
		window.location.reload()
	}

	@action
	logout() {
		this.token = ''
		Cookie.set('auth_token', '')
		window.location = '/'
	}
}
