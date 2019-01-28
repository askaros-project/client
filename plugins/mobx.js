import { observable } from 'mobx'
import { UI } from '~/models/UI'
import { Account } from '~/models/Account'

export class Store {
	@observable account = null
	@observable ui = null

	constructor() {
		this.account = new Account()
		this.ui = new UI()
	}
}

export default ({ app }, inject) => {
	inject('mobx', new Store())
}
