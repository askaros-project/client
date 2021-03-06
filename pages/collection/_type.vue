<template>
	<div class="collection-page">
		<Spin v-if="isFetching"></Spin>
		<ul class="list">
			<li v-for="item in items">
				<Link :question="item"></Link>
				<VoteButton :question="item" size="small"></VoteButton>
			</li>
		</ul>
		<EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
		<div class="load-more-indicator" v-if="isLoadingMore">
			<Spin v-if="true" no-mask></Spin>
		</div>
		<div class="load-more-button" v-if="!isLoadingMore && isFetched && fetchMoreTimes % showBtnEveryTimes === 0 && !isNoMoreItems">
			<a-button @click="fetchMore">{{ loadMoreBtnText }}</a-button>
		</div>
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
	import { TAG_UNEXPECTED } from '~/constants'

	export default {
		name: "CollectionPage",
		components: { Spin, Link, VoteButton, EmptyListMessage },
		data: () => {
			return {
				isFetching: false,
				isFetched: false,
				isLoadingMore: false,
				isNoMoreItems: false,
				items: [],
				limit: 25,
				fetchMoreTimes: 1,
				showBtnEveryTimes: 3,
				loadMoreBtnText: "Load more"
			}
		},
		mounted() {
			if (this.$route.params.type === 'random') {
				this.showBtnEveryTimes = 1
				this.loadMoreBtnText = 'Refresh'
			}
			this.$infiniteScroll.addBottomListener(this.tryFetchMore)
			this.isFetching = true
			this.$http.get(this.getCollectionUrl())
				.then((resp) => {
					this.isFetching = false
					this.isFetched = true
					this.isNoMoreItems = resp.data.questions.length === 0
					this.items = _.map(resp.data.questions, (data) => new QuestionModel(data))
					setTimeout(() => {
						if (this.$infiniteScroll.isBottom()) {
							this.tryFetchMore()
						}
					}, 0)
				}).catch(() => {
					this.isFetching = false
				})
		},
		beforeDestroy() {
			this.$infiniteScroll.removeBottomListener(this.tryFetchMore)
		},
		methods: {
			getCollectionUrl() {
				let type = this.$route.params.type
				let params = {
					limit: this.limit,
					offset: this.items.length
				}
				if (type === 'unexpected') {
					type = 'tag'
					params['code'] = TAG_UNEXPECTED
				}
				return `questions/collection/${type}?${queryString.stringify(params)}`
			},
			tryFetchMore() {
				if (this.isFetched && !this.isLoadingMore && !this.isNoMoreItems) {
					if (this.fetchMoreTimes % this.showBtnEveryTimes !== 0) {
						this.fetchMore()
					}
				}
			},
			fetchMore() {
				this.isLoadingMore = true
				this.$http.get(this.getCollectionUrl())
					.then(resp => {
						this.fetchMoreTimes++
						this.isLoadingMore = false
						this.isNoMoreItems = resp.data.questions.length === 0
						if (this.$route.params.type !== 'random') {
							this.items = [].concat(this.items, _.map(resp.data.questions, (data) => new QuestionModel(data)))
						} else {
							this.items = _.map(resp.data.questions, (data) => new QuestionModel(data))
							document.documentElement.scrollTo(0,0)
						}
					})
					.catch(() => {
						this.isLoadingMore = false
					})
			}
		}
}
</script>

<style lang="less" scoped>
	.collection-page {
		.load-more-indicator {
			height: 30px;
			position: relative;
		}

		.load-more-button {
			text-align: center;
		}

		ul.list {
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
