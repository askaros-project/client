import Vue from 'vue'
import { observable, computed, action } from 'mobx'
import { Question as QuestionModel } from './Question'

class LoginModal {
	@observable mode = 'signin'
	@observable visible = false
	forceEmailView = false

	@action
	show(mode = 'signin', forceEmailView = false) {
		this.mode = mode
		this.forceEmailView = forceEmailView
		this.visible = true
	}

	@action
	hide() {
		this.visible = false
	}

	@action
	setMode(mode) {
		this.mode = mode
	}
}

class ActivityCounter {
	@observable value = 0

	@action
	update() {
		Vue.http.get('activity/count').then(resp => {
			this.value = resp.data.count
		})
	}
}

export class UI {
	constructor() {
		this.loginModal = new LoginModal()
		this.activityCounter = new ActivityCounter()
	}
}
