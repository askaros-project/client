import Vue from 'vue'
import { observable, computed, action } from 'mobx'

export class User {
	@observable isPending = false
	@observable _id
	@observable username
	@observable location
	@observable descr
	@observable birthyear
	@observable sex
	constructor(data) {
		this.update(data)
	}

	@action
	save({ username, location = '', descr = '', birthyear, sex }) {
		this.isPending = true
		return Vue.http
			.put('user', { username, location, descr, birthyear, sex })
			.then(resp => {
				this.isPending = false
				this.update(resp.body.user)
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	update(data = {}) {
		this._id = data._id
		this.username = data.username
		this.location = data.location
		this.descr = data.descr
		this.birthyear = data.birthyear
		this.sex = data.sex
	}
}
