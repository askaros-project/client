import Vue from 'vue'
import { observable, computed, action } from 'mobx'

export class User {
	@observable isPending = false
	@observable _id
	@observable username
	@observable place
	@observable descr
	@observable birthyear
	@observable sex
	@observable education
	@observable income
	constructor(data) {
		this.update(data)
	}

	@action
	save({
		username,
		place = null,
		descr = '',
		birthyear,
		sex,
		education,
		income
	}) {
		this.isPending = true
		return Vue.http
			.put('user', {
				username,
				place,
				descr,
				birthyear,
				sex,
				education,
				income
			})
			.then(resp => {
				this.isPending = false
				this.update(resp.data.user)
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
		this.place = data.place
		this.descr = data.descr
		this.birthyear = data.birthyear
		this.sex = data.sex
		this.education = data.education
		this.income = data.income
	}
}
