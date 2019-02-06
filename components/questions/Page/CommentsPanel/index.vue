<template>
	<div class="comments">
		<Editor v-if="isLoggedIn" v-on:submit="handleAdd"></Editor>
		<div v-else class="login-text">
			<a @click="handleLogin">Log in here </a> to leave a comment
		</div>
		<div v-for="item in comments.items">
			<div v-if="!item.replyTo">
				<Comment
					:text="item.text"
					:owner="item.owner"
					:created-at="item.createdAt"
					:likes="item.marks.likes"
					:is-liked="getIsLiked(item)"
					:is-spammed="getIsSpammed(item)"
					:is-deleted="getIsDeleted(item)"
					v-on:reply="(text) => handleAdd(text, item._id)"
					v-on:mark="(code) => handleMark(item, code)"
				>
				<div slot="reply">
					<div v-for="subitem in getThred(item)">
						<Comment
							:text="subitem.text"
							:owner="subitem.owner"
							:created-at="subitem.createdAt"
							:likes="subitem.marks.likes"
							:is-liked="getIsLiked(subitem)"
							:is-spammed="getIsSpammed(subitem)"
							:is-deleted="getIsDeleted(subitem)"
							:reply-to="getReplyTo(subitem)"
							v-on:reply="(text) => handleAdd(text, subitem._id)"
							v-on:mark="(code) => handleMark(subitem, code)"
						></Comment>
					</div>
				</div>
				</Comment>
			</div>
		</div>
		<Spin v-if="false"></Spin>
	</div>
</template>

<script>
	import _ from 'lodash'
	import { observer } from "mobx-vue"
	import moment from 'moment'
	import { message } from "ant-design-vue"
	import Spin from "~/components/shared/Spin"
	import Comment from "~/components/comments/Comment"
	import Editor from "~/components/comments/Editor"
	import { MARK_LIKE, MARK_SPAM } from '~/constants'

  export default observer({
  	name: 'CommentsPanel',
  	components: { Spin, Editor, Comment },
  	props: {question: Object},

  	data() {
  		return {
  			comments: this.question.comments,
  			replyTo: undefined		
  		}
  	},
  	
		mounted() {
			this.question.comments.load()
		},

		computed: {
			isLoggedIn() {
				return this.$store.state.isLoggedIn
			}
		},

		methods: {
			getThred(item) {
				let collect = (root, acc = []) => {
					for(let i = 0; i < this.comments.items.length; i++) {
						if (this.comments.items[i].replyTo === root._id) {
							acc.push(this.comments.items[i])
							collect(this.comments.items[i], acc)
						}
					}
					return acc.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1)
				}
				return collect(item)
			},
			getReplyTo(item) {
				return _.find(this.comments.items, (c) => c._id === item.replyTo)
			},
			getIsLiked(item) {
				return item.marks[MARK_LIKE]
			},
			getIsSpammed(item) {
				return item.marks[MARK_SPAM]
			},
			getIsDeleted(item) {
				return item.deleted
			},
			handleAdd(text, replyTo) {
				this.question.comments.add(text, replyTo)
			},
			handleMark(item, code) {
				this.question.comments.mark(item._id, code)		
			},
			handleLogin() {
				this.$mobx.ui.loginModal.show('signin')
			}
		}
	})
</script>

<style lang="less" scoped>
	.comments {
		margin-top: 25px;
		padding: 15px;
		background-color: #f8f8f8;
		border-radius: 4px;
		position: relative;

		.login-text {
			background-color: #fff;
			margin-bottom: 5px;
			padding: 15px;
			font-size: 14px;
			opacity: 0.6;
		}
	}
</style>
