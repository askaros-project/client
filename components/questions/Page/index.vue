<template>
	<div class="question-page">
		<div class="title-wrap">
			<h1>
				{{ model.title }}
			</h1>
			<VoteButton :question="model" style="margin: 10px 0;"></VoteButton>
		</div>
		<div class="controls-wrap">
			<MarksPanel :question="model"></MarksPanel>
			<ControlsPanel :question="model" :toggle-comments="toggleCommentsVisible"></ControlsPanel>
		</div>
		<div class="separator"></div>
		<h2>Tag the result</h2>
		<TagsPanel
			:question="model"
			v-on:tag="onTag"></TagsPanel>
		<CommentsPanel
			v-if="isCommentsVisible"
			:question="model"></CommentsPanel>
		<div style="min-height: 326px;">
			<h2>Sentiment</h2>
			<NoSSR>
				<SentimentChart :question="model"></SentimentChart>
			</NoSSR>
		</div>
		<div style="min-height: 326px;">
			<h2 style="margin-top: 5px;">Stats</h2>
			<NoSSR>
				<StatsChart :question="model"></StatsChart>
			</NoSSR>
		</div>
		<div>
			<h2>Related questions</h2>
			<Related :question="model"></Related>
			<h2>Have a question? <a @click="toggleBuilderVisible">Ask here :)</a></h2>
		</div>
		<Builder
			v-if="isBuilderVisible"
			style="max-width: 600px; margin: 60px auto;"
			:autofocus="true"
			v-on:success="handleQuestionBuildSuccess"></Builder>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
	import { Question as QuestionModel } from '~/models/Question'
	import { message } from 'ant-design-vue'
	import NoSSR from 'vue-no-ssr'
	import Builder from "~/components/questions/Builder"
	import VoteButton from "~/components/questions/VoteButton"
	import TagsPanel from "./TagsPanel"
	import ControlsPanel from "./ControlsPanel"
	import MarksPanel from "./MarksPanel"
	import CommentsPanel from "./CommentsPanel"
	import SentimentChart from "./SentimentChart"
	import StatsChart from "./StatsChart"
	import Related from "./Related"

  export default observer({
  	name: 'QuestionPage',
  	components: {
  		NoSSR,
  		VoteButton, TagsPanel, ControlsPanel, MarksPanel, CommentsPanel,
  		SentimentChart, StatsChart, Related, Builder
  	},
  	props: {
  		questionData: Object, default: null
  	},
  	data() {
  		return {
  			model: new QuestionModel(this.questionData),
  			isCommentsVisible: false,
  			isBuilderVisible: false
  		}
		},
		methods: {
			onTag(code) {
				this.model.tag(code, {detailed: true}).then(() => {
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
			margin: 50px 0 30px 0;
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
