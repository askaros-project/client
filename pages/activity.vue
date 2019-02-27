<template>
	<div class="activity-page">
		<ul class="activity-list">
			<li v-for="item in items">
				<span class="tag-wrap">
					<span class="time">{{item.createdAt | formatDateFromNow}}</span>
					<router-link v-if="item.question" :to="'/q/' + item.question.uri">
						<a-tag :color="colors[item.type]">{{ $messages.ACTIVITY[item.type] }}</a-tag>
					</router-link>
					<a-tag v-else :color="colors[item.type]">{{ $messages.ACTIVITY[item.type] }}</a-tag>
				</span>
				<router-link
					class="question-title"
					v-if="item.question" :to="'/q/' + item.question.uri">{{item.question.title}}</router-link>
				<span v-else class="mark-deleted">deleted</span>
			</li>
		</ul>
		<EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
		<Spin v-if="isFetching"></Spin>
		<div class="load-more-indicator" v-if="isLoadingMore">
			<Spin v-if="true" no-mask></Spin>
		</div>
		<div class="load-more-button" v-if="fetchMoreTimes % 3 === 0 && pagination.total > items.length">
			<a-button @click="fetchMore">Load More</a-button>
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
				fetchMoreTimes: 1,
				pagination: {pageSize: 15, page: 1, total: 0},
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
			this.$infiniteScroll.addBottomListener(this.tryFetchMore)
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
					setTimeout(() => {
						if (this.$infiniteScroll.isBottom()) {
							this.tryFetchMore()
						}
					}, 0)
				})
				.catch(() => {
					this.isFetching = false
				})
		},
		beforeDestroy() {
			this.$infiniteScroll.removeBottomListener(this.tryFetchMore)
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
						this.fetchMoreTimes++
						this.isLoadingMore = false
						this.items = [].concat(this.items, resp.data.items)
					})
					.catch(() => {
						this.isLoadingMore = false
					})
			},

			tryFetchMore() {
				if (this.isFetched && !this.isLoadingMore && this.pagination.total > this.items.length) {
					if (this.fetchMoreTimes % 3 !== 0) {
						this.fetchMore()
					}
				}
			}
		},
	})
</script>

<style lang="less" scoped>
	.activity-page {
		ul.activity-list {
			height: 100%;
			// margin-top: 15px;
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
						display: inline-block;
						overflow: hidden;
				    text-overflow: ellipsis;
				    width: 90px;
					}
				}
				.mark-deleted {
					font-style: italic;
					color: rgba(0,0,0,0.4);
				}
				@media @xs_max {
					font-size: 14px;		
				}
			}
		}
		.load-more-indicator {
			height: 30px;
			position: relative;
		}
		.load-more-button {
			margin-top: 10px;
			text-align: center;
		}
	}	
</style>
