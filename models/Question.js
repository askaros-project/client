import _ from 'lodash'
import Vue from 'vue'
import { observable, computed, action } from 'mobx'
import {
	VOTE_YES,
	VOTE_NO,
	TAG_UNEXPECTED,
	TAG_CHANGE_IN_FUTURE,
	TAG_UNFAIR,
	TAG_NOT_WHOLE,
	TAG_PRETTY_MUCH_TRUE,
	TAG_WEIRD,
	TAG_EXPECTED,
	MARK_SPAM
} from '~/constants'

class QuestionVotes {
	@observable total = 0
	@observable counts = { [VOTE_YES]: 0, [VOTE_NO]: 0 }
	@observable selected = null
	@observable items = []

	@computed
	get isVoted() {
		return !!this.selected
	}

	@computed
	get yesVoted() {
		if (!this.total) return 0
		return Math.floor((this.counts[VOTE_YES] / this.total) * 100)
	}

	@computed
	get noVoted() {
		if (!this.total) return 0
		return Math.floor((this.counts[VOTE_NO] / this.total) * 100)
	}

	@computed
	get sentiment() {
		if (this.counts[VOTE_YES] > this.counts[VOTE_NO]) {
			return VOTE_YES
		} else if (this.counts[VOTE_NO] > this.counts[VOTE_YES]) {
			return VOTE_NO
		} else {
			return undefined
		}
	}

	@action
	update(data) {
		this.total = data.total
		this.counts = data.counts
		this.selected = data.selected
		this.items = data.items
	}
}

class QuestionTags {
	@observable counts = {}
	@observable selected = null

	@computed
	get isTagged() {
		return !!this.selected
	}

	@action
	update({ counts = {}, selected = null } = {}) {
		this.counts = counts
		this.selected = selected
	}
}

class QuestionMarks {
	@observable items = []

	@computed
	get isSpam() {
		return this.items.some(m => m.code === MARK_SPAM)
	}

	@action
	update(data) {
		if (data && data.items.length) {
			this.items = data.items
		}
	}
}

class QuestionComments {
	@observable isLoading = false
	@observable isPending = false
	@observable total = 0
	@observable items = []

	question = null

	constructor(question) {
		this.question = question
	}

	// @computed
	// get isSpam() {
	// 	return this.items.some(m => m.code === MARK_SPAM)
	// }

	@action
	load() {
		this.isLoading = true
		return Vue.http
			.get('comments/' + this.question._id)
			.then(resp => {
				this.isLoading = false
				this.update(resp.body)
			})
			.catch(err => {
				this.isLoading = false
				return Promise.reject(err)
			})
	}

	@action
	add(text, replyTo) {
		this.isPending = true
		return Vue.http
			.post('comments', {
				qid: this.question._id,
				text,
				replyTo
			})
			.then(resp => {
				this.isPending = false
				this.items = [].concat(this.items, resp.body.comment)
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	mark(cid, code) {
		this.isPending = true
		return Vue.http
			.put('comments/' + cid + '/marks/' + code)
			.then(resp => {
				this.isPending = false
				this.items = _.map(this.items, item => {
					if (item._id === resp.body.comment._id) {
						return resp.body.comment
					} else {
						return item
					}
				})
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	update({ items, total } = {}) {
		this.items = items || this.items
		this.total = total ? total : this.items.length
	}
}

export class Question {
	@observable isPending = false
	@observable isFetched = false
	@observable _id = ''
	@observable title = ''
	@observable uri = ''
	@observable createdAt = ''

	votes = null
	tags = null
	marks = null
	comments = null

	constructor(data) {
		this.votes = new QuestionVotes(this)
		this.tags = new QuestionTags(this)
		this.marks = new QuestionMarks(this)
		this.comments = new QuestionComments(this)
		if (data) {
			this.update(data)
		}
	}

	@action
	loadByUri(uri, { detailed = false } = {}) {
		this.isPending = true
		return Vue.http
			.get(`questions/${uri}?${detailed ? 'detailed=true' : ''}`)
			.then(resp => {
				this.isPending = false
				this.update(resp.body.question)
				this.isFetched = true
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	vote(code, { detailed = false } = {}) {
		this.isPending = true
		return Vue.http
			.post(`questions/${this._id}/vote?${detailed ? 'detailed=true' : ''}`, {
				code
			})
			.then(resp => {
				this.isPending = false
				this.update(resp.body.question)
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	tag(code, { detailed = false } = {}) {
		this.isPending = true
		return Vue.http
			.post(`questions/${this._id}/tag?${detailed ? 'detailed=true' : ''}`, {
				code
			})
			.then(resp => {
				this.isPending = false
				this.update(resp.body.question)
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	mark(code, { detailed = false } = {}) {
		this.isPending = true
		return Vue.http
			.post(`questions/${this._id}/mark?${detailed ? 'detailed=true' : ''}`, {
				code
			})
			.then(resp => {
				this.isPending = false
				this.update(resp.body.question)
			})
			.catch(err => {
				this.isPending = false
				return Promise.reject(err)
			})
	}

	@action
	update(data) {
		this._id = data._id
		this.title = data.title
		this.uri = data.uri
		this.createdAt = data.createdAt
		if (data.votes) {
			this.votes.update(data.votes)
		}
		if (data.tags) {
			this.tags.update(data.tags)
		}
		if (data.marks) {
			this.marks.update(data.marks)
		}
		if (data.comments) {
			this.comments.update(data.comments)
		}
	}
}
