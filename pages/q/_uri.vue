<template>
	<Page :questionData="asyncQuestionData"></Page>
</template>

<script>
	import { Question as QuestionModel } from '~/models/Question'
	import Page from "~/components/questions/Page"
	import { VOTE_YES, VOTE_NO } from '~/constants'

  export default {
  	name: 'QuestionPageWrap',
  	components: { Page },
  	asyncData ({ params, error }) {
  		const question = new QuestionModel()
  		return question.loadByUri(params.uri, {detailed: true}).then((resp) => {
  			return {asyncQuestionData: resp}
  		}).catch((e) => {
	      error({ statusCode: 404, message: 'Question not found' })
	    })
	  },

	  head() {
	  	let { title, votes } = this.asyncQuestionData
	  	let descr = title
	  	if (votes.total > 0) {
	  		if (votes.counts[VOTE_YES] >= votes.counts[VOTE_NO]) {
	  			const percent = Math.floor((votes.counts[VOTE_YES] / votes.total) * 100)
	  			descr = `${percent}% says yes on ${title}`
	  		} else {
	  			const percent = Math.floor((votes.counts[VOTE_NO] / votes.total) * 100)
					descr = `${percent}% says no on ${title}`
	  		}
	  	} 
  		return {
  			meta: [{
	  			name: 'keywords',
	  			content: this.asyncQuestionData.keywords.join(' ')
	  		},{
	  			name: 'description',
	  			content: descr
	  		},{
	  			name: 'og:site_name',
	  			content: process.env.APP_NAME
	  		},{
	  			name: 'og:type',
	  			content: 'website'
	  		},{
	  			name: 'og:title',
	  			content: title
	  		},{
	  			name: 'og:description',
	  			content: descr
	  		}, {
	  			name: 'og:url',
	  			content: process.env.SITE_URL + '/q/' + this.asyncQuestionData.uri
	  		}]
  		}
  	}
	}
</script>

<style lang="less" scoped>
</style>
