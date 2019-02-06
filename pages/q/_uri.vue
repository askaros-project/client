<template>
	<Page :questionData="asyncQuestionData"></Page>
</template>

<script>
	import { Question as QuestionModel } from '~/models/Question'
	import Page from "~/components/questions/Page"

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
  		return {
  			meta: [{
	  			name: 'og:site_name',
	  			content: process.env.APP_NAME
	  		},{
	  			name: 'og:type',
	  			content: 'website'
	  		},{
	  			name: 'og:title',
	  			content: this.asyncQuestionData.title
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
