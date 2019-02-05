<template>
	<a-table :columns="columns"
    :row-key="record => record._id"
    :data-source="data"
    :loading="isPending"
    :scroll="{ x: 1420 }"
    :pagination="pagination"
    @change="handleTableChange"
  >
  	<div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='Search by name'
        :value="searchText"
        @change="e => searchText = e.target.value"
        @keyup.enter.native="() => handleSearch(confirm)"
      ></a-input>
      <a-button type='primary' @click="() => handleSearch(confirm)">Search</a-button>
      <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='filter' :style="{ color: searchText ? '#108ee9' : '#aaa' }"></a-icon>
    <template slot="createdAt" slot-scope="createdAt">
      {{ formatDate(createdAt) }}
    </template>
    <template slot="descr" slot-scope="descr">
    	<a-tooltip v-if="descr" :title="descr">
      	<div class="ellipsis">{{ descr }}</div>
      </a-tooltip>
    </template>
    <template slot="location" slot-scope="place">
    	<a-tooltip v-if="place" :title="place.formatted_address">
      	<div class="ellipsis">{{ place.formatted_address }}</div>
      </a-tooltip>
    </template>
    <template slot="education" slot-scope="education">
    	{{$messages.EDUCATION[education]}}
    </template>
    <template slot="income" slot-scope="income">
    	{{$messages.INCOME[income]}}
    </template>
    <template slot="isAdmin" slot-scope="account">
    	<a-switch :default-checked="account.isAdmin" @change='handleAdminChange(account)'></a-switch>
    </template>
    <template slot="isSuspended" slot-scope="account">
    	<a-switch :default-checked="account.isSuspended" @change='handleSuspendedChange(account)'></a-switch>
    </template>
  </a-table>
</template>

<script>
import moment from 'moment'
import queryString from 'query-string'

export default {
	name: "AdminUsers",
	layout: 'admin',
	mounted() {
		this.fetch()
	},
	data() {
		return {
			isPending: false,
			data: [],
			searchText: '',
			pagination: {},
			sorter: {},
			columns: [{
				title: 'Created at',
				dataIndex: 'createdAt',
				fixed: 'left',
				key: 'createdAt',
				width: 160,
			  scopedSlots: { customRender: 'createdAt' },
			},{
			  title: 'Name',
			  dataIndex: 'user.username',
			  fixed: 'left',
			  scopedSlots: {
			    filterDropdown: 'filterDropdown',
			    filterIcon: 'filterIcon',
			  },
			  width: 180,
			  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
			  onFilterDropdownVisibleChange: (visible) => {
			    if (visible) {
			      setTimeout(() => {
			        this.$refs.searchInput.focus()
			      })
			    }
			  },
			},{
			  title: 'Location',
			  dataIndex: 'user.place',
			  width: 200,
			  scopedSlots: { customRender: 'location' },
			},{
			  title: 'Birth year',
			  dataIndex: 'user.birthyear',
			  width: 100
			},{
			  title: 'Sex',
			  dataIndex: 'user.sex',
			  width: 100
			},{
			  title: 'Education',
			  dataIndex: 'user.education',
			  scopedSlots: { customRender: 'education' },
			  width: 120
			},{
			  title: 'Income',
			  dataIndex: 'user.income',
			  scopedSlots: { customRender: 'income' },
			  width: 120
			},{
			  title: 'Description',
			  dataIndex: 'user.descr',
			  width: 200,
			  scopedSlots: { customRender: 'descr' },
			},{
			  title: 'Suspended',
			  scopedSlots: { customRender: 'isSuspended' },
			  fixed: 'right',
			  width: 120
			},{
			  title: 'Admin',
			  scopedSlots: { customRender: 'isAdmin' },
			  fixed: 'right',
			  width: 120
			}]
		}
	},
	watch: {
		$route() {
			this.fetch()
		}
	},
	methods: {
		fetch(params = {}) {
			params = {
				uid: queryString.parse(location.search).uid,
				page: this.pagination.current,
				pageSize: this.pagination.pageSize,
				sortField: this.sorter.field,
				sortOrder: this.sorter.order,
				searchText: this.searchText,
				...params
			}
			this.isPending = true
			this.$http.get('admin/accounts?' + queryString.stringify(params))
				.then((resp) => {
					this.isPending = false
					this.data = resp.body.accounts
					const pagination = { ...this.pagination };
        	pagination.total = resp.body.total
        	this.pagination = pagination
				})
				.catch(() => {
					this.isPending = false
				})
		},
		handleTableChange(pagination, filters, sorter) {
			const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.sorter = sorter
      this.fetch({
        pageSize: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
      });
		},
		formatDate(date) {
			return moment(date).format('HH:mm MM/DD/YYYY')
		},
		handleAdminChange(account) {
			this.$http.post('admin/accounts/' + account._id + '/admin')
				.then((resp) => {
					this.fetch()
				})
				.catch(() => {
					//
				})
		},
		handleSuspendedChange(account) {
			this.$http.post('admin/accounts/' + account._id + '/suspended')
				.then((resp) => {
					this.fetch()
				})
				.catch(() => {
					//
				})
		},
		handleSearch (confirm) {
      confirm()
      this.fetch()
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
      this.fetch()
    }
	}
}

</script>

<style lang="less" scoped>
	.ellipsis {
		max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
</style>
