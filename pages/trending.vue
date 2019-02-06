<template>
	<div class="trending-page">
		<Spin v-if="isFetching"></Spin>
		<ul class="trending-list"
			v-infinite-scroll="tryFetchMore"
			:infinite-scroll-disabled="isLoadingMore"
			infinite-scroll-distance="10">
			<li v-for="item in items">
				<Link :question="item"></Link>
				<VoteButton :question="item" size="small"></VoteButton>
			</li>
			<EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
			<div class="load-more-indicator" v-if="isLoadingMore">
				<Spin v-if="true" no-mask></Spin>
			</div>
		</ul>
	</div>
</template>

<script>
	import _ from 'lodash'
	import Spin from "~/components/shared/Spin"
	import Link from "~/components/questions/Link"
	import VoteButton from '~/components/questions/VoteButton'
	import EmptyListMessage from '~/components/shared/EmptyListMessage'
	import { Question as QuestionModel } from '~/models/Question'
	import queryString from 'query-string'
	export default {
		name: "trending",
		components: { Spin, Link, VoteButton, EmptyListMessage },
		data: () => {
			return {
				isFetching: false,
				isFetched: false,
				isLoadingMore: false,
				isNoMoreItems: false,
				items: [],
				limit: 25
			}
		},
		mounted() {
			this.isFetching = true
			this.$http.get('questions/collection/trending?' + queryString.stringify({ limit: this.limit}))
				.then((resp) => {
					this.isFetching = false
					this.isFetched = true
					this.isNoMoreItems = resp.data.questions.length === 0
					this.items = _.map(resp.data.questions, (data) => new QuestionModel(data))
				}).catch(() => {
					this.isFetching = false
				})
		},
		methods: {
			tryFetchMore() {
				if (this.isFetched && !this.isLoadingMore && !this.isNoMoreItems) {
					this.fetchMore()
				}
			},
			fetchMore() {
				this.isLoadingMore = true
				this.$http.get(
					'questions/collection/trending?'
					+ queryString.stringify({ limit: this.limit, offset: this.items.length }))
					.then(resp => {
						this.isLoadingMore = false
						this.isNoMoreItems = resp.data.questions.length === 0
						this.items = [].concat(this.items, _.map(resp.data.questions, (data) => new QuestionModel(data)))
					})
					.catch(() => {
						this.isLoadingMore = false
					})
			}
		}
}
</script>

<style lang="less" scoped>
	.trending-page {
		.load-more-indicator {
			height: 30px;
			position: relative;
		}

		ul.trending-list {
			li {
				margin-bottom: 15px;
	      border: 1px dashed #f8f8f8;
	      border-width: 0 0 1px 0;
	      display: flex;
	      flex-direction: row;
	      justify-content: space-between;
	      align-items: center;
			}
		}
	}	
</style>
