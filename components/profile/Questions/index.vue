<template>
	<div class="profile-questions">
		<h2>Your questions</h2>
		<ul v-if="items.length">
			<li v-for="item in items">
				<Link :question="item"></Link>
			</li>
			<a-pagination
				v-if="items.length > pagination.total"
				:v-model="pagination.page"
				:total="pagination.total"
				@change="handlePaginationChange"></a-pagination>
		</ul>
		<EmptyListMessage v-if="isFetched && !items.length"></EmptyListMessage>
		<Spin v-if="isLoading" no-mask></Spin>
	</div>
</template>

<script>
	import queryString from 'query-string'
	import Link from '~/components/questions/Link'
	import EmptyListMessage from '~/components/shared/EmptyListMessage'
	import Spin from '~/components/shared/Spin'
	export default {
		name: "profile-questions",
		components: { EmptyListMessage,Spin,Link },
		data() {
			return {
				isLoading: false,
				isFetched: false,
				items: [],
				pagination: {
					pageSize: 10,
					page: 1,
					total: 0
				}
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.isLoading = true
				this.$http.get('questions/profile?' + queryString.stringify({
					pageSize: this.pagination.pageSize,
					page: this.pagination.page
				})).then((resp) => {
					this.isLoading = false
					this.isFetched = true
					this.items = resp.data.questions
					this.pagination = {
						...this.pagination,
						total: resp.data.count
					}
				}).catch(() => {
					this.isLoading = false
				})
			},
			handlePaginationChange(v) {
				this.pagination.page = v
				this.fetch()
			}
		}
	}
</script>

<style lang="less" scoped>
	.profile-questions { 
		margin-top: 30px;
		position: relative;
		min-height: 150px;
		font-size: 14px;

		h2 {
			margin: 10px 0 10px 0;
			border-bottom: 1px dotted #f8f8f8;
		}

		ul {
			padding: 10px 0;
			li {
				margin-bottom: 15px;
			}
		}
	}
</style>
