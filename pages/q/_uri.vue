<template>
	<div class="question-page">
		<div v-if="q.model.isFetched">
			<div class="title-wrap">
				<h1>
					{{ q.model.title }}
				</h1>
				<VoteButton :question="q.model" style="margin: 10px 0;"></VoteButton>
			</div>
			<div class="controls-wrap">
				<MarksPanel :question="q.model"></MarksPanel>
				<ControlsPanel :question="q.model" :toggle-comments="toggleCommentsVisible"></ControlsPanel>
			</div>
			<div class="separator"></div>
			<h2>Tag the result</h2>
			<TagsPanel
				:question="q.model"
				v-on:tag="onTag"></TagsPanel>
		</div>
		<CommentsPanel
			v-if="isCommentsVisible"
			:question="q.model"></CommentsPanel>
		<div v-if="q.model.isFetched">
			<h2>Sentiment</h2>
			<Charts :question="q.model"></Charts>
		</div>
		<div v-if="q.model.isFetched">
			<h2>Related questions</h2>
			<Related :question="q.model"></Related>
			<h2>Have a question? <a @click="toggleBuilderVisible">Ask here :)</a></h2>
		</div>
		<Builder
			v-if="isBuilderVisible"
			style="max-width: 600px; margin: 60px auto;"
			:autofocus="true"
			v-on:success="handleQuestionBuildSuccess"></Builder>
		<Spin v-if="q.model.isPending"></Spin>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
	import { Question as QuestionModel } from '~/models/Question'
	import moment from 'moment'
	import { message } from "ant-design-vue"
	import Spin from "~/components/shared/Spin"
	import VoteButton from "~/components/questions/VoteButton"
	import Builder from "~/components/questions/Builder"
	import TagsPanel from "~/components/questions/TagsPanel"
	import ControlsPanel from "~/components/questions/ControlsPanel"
	import MarksPanel from "~/components/questions/MarksPanel"
	import CommentsPanel from "~/components/questions/CommentsPanel"
	import Related from "~/components/questions/Related"
	import Charts from "~/components/questions/Charts"

  export default observer({
  	name: 'QuestionPage',
  	components: { Spin, VoteButton, Builder, TagsPanel, ControlsPanel, MarksPanel, CommentsPanel, Related, Charts },

  	asyncData ({ params }) {
  		const question = new QuestionModel()
  		return question.loadByUri(params.uri, {detailed: false}).then((resp) => {
  			return {asyncQuestionData: resp}
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
  	},

  	data() {
  		return {
  			q: {model: new QuestionModel()},
		  	isCommentsVisible: false,
		  	isBuilderVisible: false
  		}
  	},

  	mounted() {
  		this.q.model.loadByUri(this.$route.params.uri, {detailed: true})
  	},

		// watch: {
		// 	$route(to, from) {
		// 		this.q.model = new QuestionModel()
		// 		this.q.model.loadByUri(to.params.uri, {detailed: true})
		// 		this.isBuilderVisible = false
		// 		this.isCommentsVisible = false
		// 	}
		// },

		methods: {
			onTag(code) {
				this.q.model.tag(code, {detailed: true}).then(() => {
	  			message.success('Successfully!')
	  		})
			},

			toggleCommentsVisible() {
				this.isCommentsVisible = !this.isCommentsVisible
			},

			toggleBuilderVisible(e){
				e.preventDefault()
				this.isBuilderVisible = !this.isBuilderVisible
				setTimeout(() => {
					window.scrollTo(0,document.body.scrollHeight)
				},0)
			},

			handleQuestionBuildSuccess() {
				window.scrollTo(0, 0)
			}
		}
	})
</script>

<style lang="less" scoped>
	.question-page {
		max-width: 900px;
		margin: 10px auto 0 auto;

		h2 {
			margin: 45px 0 30px 0;
		}

		.title-wrap {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;

			h1 {
				padding-right: 10px;
			}
		}

		.controls-wrap {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}

		.separator {
			border: 1px solid #f8f8f8;
			border-width: 1px 0 0 0;
		}
	}
</style>
