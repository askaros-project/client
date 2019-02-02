<template>
	<a-table :columns="columns"
    :row-key="record => record._id"
    :data-source="data"
    :loading="isPending"
  >
  </a-table>
</template>

<script>
import moment from 'moment'
import queryString from 'query-string'

export default {
	name: "AdminMailLists",
	layout: 'admin',
	mounted() {
		this.fetch()
	},
	data() {
		return {
			isPending: false,
			data: [],
			columns: [{
				title: 'Type',
				dataIndex: 'type',
			  width: 160,
			},{
			  title: 'name',
			  dataIndex: 'name',
			  width: 200,
			}, {
				title: 'Recipients',
				dataIndex: 'recipient_count',
				width: 200
			}]
		}
	},
	methods: {
		fetch(params = {}) {
			this.isPending = true
			this.$http.get('admin/mail_lists')
				.then((resp) => {
					this.isPending = false
					this.data = resp.body.lists
				})
				.catch(() => {
					this.isPending = false
				})
		}
	}
}

</script>

<style lang="less" scoped>
	
</style>
