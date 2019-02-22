<template>
	<div class="activity-page">
		<ul class="activity-list"
			v-infinite-scroll="tryFetchMore"
			:infinite-scroll-disabled="isLoadingMore"
			infinite-scroll-distance="10">
			<li v-for="item in items">
				<span class="tag-wrap">
					<span class="time">{{item.createdAt | formatDateFromNow}}</span>
					<router-link v-if="item.question" :to="'/q/' + item.question.uri">
						<a-tag :color="colors[item.type]">{{ $messages.ACTIVITY[item.type] }}</a-tag>
					</router-link>
					<a-tag v-else :color="colors[item.type]">{{ $messages.ACTIVITY[item.type] }}</a-tag>
				</span>
				<router-link v-if="item.question" :to="'/q/' + item.question.uri">{{item.question.title}}</router-link>
				<span v-else class="mark-deleted">deleted</span>
			</li>
		</ul>
		<EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
		<Spin v-if="isFetching"></Spin>
		<div class="load-more-indicator" v-if="isLoadingMore">
			<Spin v-if="true" no-mask></Spin>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import { observer } from "mobx-vue"
	import moment from 'moment'
	import Spin from "~/components/shared/Spin"
	import EmptyListMessage from "~/components/shared/EmptyListMessage"
	import queryString from 'query-string'
	import {
		ACTIVITY_QUESTION,
		ACTIVITY_VOTE,
		ACTIVITY_TAG,
		ACTIVITY_COMMENT,
		ACTIVITY_SOMEONE_VOTE,
		ACTIVITY_SOMEONE_TAG,
		ACTIVITY_SOMEONE_COMMENT,
		ACTIVITY_SOMEONE_REPLY,
		ACTIVITY_OTHERS_VOTE_AS_WELL
	} from '~/constants'

  export default observer({
  	name: 'ActivityPage',
  	components: {Spin, EmptyListMessage},
  	data() {
  		return {
  			isFetching: true,
				isFetched: false,
				isLoadingMore: false,
				items: [],
				pagination: {pageSize: 25, page: 1, total: 0},
				colors: {
					[ACTIVITY_QUESTION]: 'green',
					[ACTIVITY_VOTE]: 'green',
					[ACTIVITY_TAG]: 'green',
					[ACTIVITY_COMMENT]: 'green',
					[ACTIVITY_SOMEONE_VOTE]: 'blue',
					[ACTIVITY_SOMEONE_TAG]: 'blue',
					[ACTIVITY_SOMEONE_COMMENT]: 'blue',
					[ACTIVITY_SOMEONE_REPLY]: 'blue',
					[ACTIVITY_OTHERS_VOTE_AS_WELL]: 'blue',
				}
  		}
  	},
		mounted() {
			this.isFetching = true
			this.$http
				.get("activity?" + queryString.stringify({
					pageSize: this.pagination.pageSize,
					page: this.pagination.page++
				}))
				.then(resp => {
					this.isFetching = false
					this.isFetched = true
					this.items = resp.data.items
					this.pagination.total = resp.data.count
					this.$mobx.ui.activityCounter.update()
				})
				.catch(() => {
					this.isFetching = false
				})
		},

		methods: {
			fetchMore() {
				this.isLoadingMore = true
				this.$http
					.get("activity?" + queryString.stringify({
						pageSize: this.pagination.pageSize,
						page: this.pagination.page++
					}))
					.then(resp => {
						this.isLoadingMore = false
						this.items = [].concat(this.items, resp.data.items)
					})
					.catch(() => {
						this.isLoadingMore = false
					})
			},

			tryFetchMore() {
				if (this.isFetched && !this.isLoadingMore && this.pagination.total > this.items.length) {
					this.fetchMore()
				}
			}
		},
	})
</script>

<style lang="less" scoped>
	.activity-page {
		ul.activity-list {
			height: 100%;
			margin-top: 15px;
			li {
				margin-bottom: 10px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.tag-wrap {
					display: inline-block;
					.ant-tag {
						text-align: center;
						background-color: transparent !important;
					}
					.time {
						font-size: 14px;
						min-width: 115px;
						display: inline-block;
					}
				}
				.mark-deleted {
					font-style: italic;
					color: rgba(0,0,0,0.4);
				}
			}
		}
		.load-more-indicator {
			height: 30px;
			position: relative;
		}
	}	
</style>
