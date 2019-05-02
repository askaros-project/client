<template>
	<div class="question-page">
		<div class="title-wrap">
			<MarksPanel :question="model" />
			<h1>
				{{ model.title }}
			</h1>
			<MoreDropdown :question="model" />
		</div>
		<div class="controls-wrap">
			<ControlsPanel :question="model" :toggle-comments="toggleCommentsVisible"></ControlsPanel>
			<VoteButton class="large-vote-btn" :question="model" :withCount="true"></VoteButton>
			<VoteButton class="small-vote-btn" :question="model" :withCount="true" size="small"></VoteButton>
		</div>
		<div class="separator"></div>
		<h2>The Result Was</h2>
		<TagsPanel
			:question="model"
			v-on:tag="onTag"></TagsPanel>
		<CommentsPanel
			v-if="isCommentsVisible"
			:question="model"></CommentsPanel>
		<div style="min-height: 326px;">
			<h2>Historic Sentiment</h2>
			<NoSSR>
				<SentimentChart :question="model"></SentimentChart>
			</NoSSR>
		</div>
		<div style="min-height: 326px;">
			<h2 style="margin-top: 5px;">Background</h2>
			<NoSSR>
				<StatsChart :question="model"></StatsChart>
			</NoSSR>
		</div>
		<div>
			<h2>You Might Also Like or Dislike</h2>
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
	import MoreDropdown from "./MoreDropdown"
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
  		SentimentChart, StatsChart, Related, Builder, MoreDropdown
  	},
  	props: {
  		questionData: Object, default: null
  	},
  	data() {
  		return {
  			model: new QuestionModel(this.questionData),
  			isCommentsVisible: true,
  			isBuilderVisible: false
  		}
		},
		methods: {
			onTag(code) {
				this.model.tag(code, {detailed: true}).then(() => {
	  			message.success('Success!')
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
		margin: 10px auto 0 auto;

		h2 {
			margin: 50px 0 30px 0;
		}

		.title-wrap {
			position: relative;
			h1 {
				padding-right: 25px;
				margin: 20px 0;
			}
		}

		.controls-wrap {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
			padding: 30px 0 10px 0;
		}

		.separator {
			border: 1px solid #f8f8f8;
			border-width: 1px 0 0 0;
		}

		.large-vote-btn {
			display: none;
			@media screen and (min-width: 420px) {
				display: block;
			}
		}

		.small-vote-btn {
			display: none;
			margin-bottom: 5px;
			@media screen and (max-width:419px) {
				display: block;
			}
		}
	}
</style>
