<template>
	<div v-if="question" class="question-page">
		<div v-if="question.isFetched">
			<div class="title-wrap">
				<h1>
					{{ question.title }}
				</h1>
				<VoteButton :question="question" style="margin: 10px 0;"></VoteButton>
			</div>
			<div class="controls-wrap">
				<MarksPanel :question="question"></MarksPanel>
				<ControlsPanel :question="question" :toggle-comments="toggleCommentsVisible"></ControlsPanel>
			</div>
			<div class="separator"></div>
			<h2>Tag the result</h2>
			<TagsPanel
				:question="question"
				v-on:tag="onTag"></TagsPanel>
		</div>
		<CommentsPanel
			v-if="isCommentsVisible"
			:question="question"></CommentsPanel>
		<div v-if="question.isFetched">
			<h2>Sentiment</h2>
			<Charts :question="question"></Charts>
		</div>
		<div v-if="question.isFetched">
			<h2>Related questions</h2>
			<Related :question="question"></Related>
			<h2>Have a question? <a @click="toggleBuilderVisible">Ask here :)</a></h2>
		</div>
		<Builder
			v-if="isBuilderVisible"
			style="max-width: 600px; margin: 60px auto;"
			:autofocus="true"
			v-on:success="handleQuestionBuildSuccess"></Builder>
		<Spin v-if="question.isPending && !question.isFetched"></Spin>
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
  	data() {
  		return {
		  	question: null,
		  	isCommentsVisible: false,
		  	isBuilderVisible: false
  		}
  	},

		mounted() {
			this.question = new QuestionModel()
			this.question.loadByUri(this.$route.params.uri, {detailed: true})
		},

		watch: {
			$route(to, from) {
				this.question = new QuestionModel()
				this.question.loadByUri(to.params.uri, {detailed: true})
				this.isBuilderVisible = false
				this.isCommentsVisible = false
			}
		},

		methods: {
			onTag(code) {
				this.question.tag(code, {detailed: true}).then(() => {
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
