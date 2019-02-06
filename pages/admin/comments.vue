<template>
	<a-table :columns="columns"
    :row-key="record => record._id"
    :data-source="data"
    :loading="isPending"
    :scroll="{ x: 1150 }"
    :pagination="pagination"
    @change="handleTableChange"
  >
	  <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='Search by text'
        :value="searchText"
        @change="e => searchText = e.target.value"
        @keyup.enter.native="() => handleSearch(confirm)"
      ></a-input>
      <a-button type='primary' @click="() => handleSearch(confirm)">Search</a-button>
      <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='filter' :style="{ color: searchText ? '#108ee9' : '#aaa' }"></a-icon>

    <div slot="filterDropdown2" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput2"
        placeholder='Search by user'
        :value="searchText2"
        @change="e => searchText2 = e.target.value"
        @keyup.enter.native="() => handleSearch(confirm)"
      ></a-input>
      <a-button type='primary' @click="() => handleSearch(confirm)">Search</a-button>
      <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
    </div>
    <a-icon slot="filterIcon2" slot-scope="filtered" type='filter' :style="{ color: searchText2 ? '#108ee9' : '#aaa' }"></a-icon>

    <div slot="filterDropdown3" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput3"
        placeholder='Search by question'
        :value="searchText3"
        @change="e => searchText3 = e.target.value"
        @keyup.enter.native="() => handleSearch(confirm)"
      ></a-input>
      <a-button type='primary' @click="() => handleSearch(confirm)">Search</a-button>
      <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
    </div>
    <a-icon slot="filterIcon3" slot-scope="filtered" type='filter' :style="{ color: searchText3 ? '#108ee9' : '#aaa' }"></a-icon>

    <template slot="createdAt" slot-scope="createdAt">
      {{ formatDate(createdAt) }}
    </template>	    
    <template slot="user" slot-scope="user">
      <router-link :to="'/admin/users?uid='+user._id" >{{ user.username }}</router-link>
    </template>	    
    <template slot="question" slot-scope="question">
    	<div class="question-title">
      	<router-link :to="'/admin/questions?qid='+question._id" >{{ question.title }}</router-link>
      </div>
    </template>	    
    <template slot="text" slot-scope="text">
      <div v-html="text"></div>
    </template>	    
    <template slot="number" slot-scope="number">
      {{ number ? number : '-' }}
    </template>	    
    <template slot="actions" slot-scope="comment">
    	<a-popconfirm title="Are you sure delete this comment?"
    		@confirm="handleDeleteComment(comment)"
    		ok-text="Yes"
    		cancel-text="No"
    		placement="top">
      	<a-button icon="delete" shape="circle"></a-button>
      </a-popconfirm>
    </template>	    
  </a-table>
</template>

<script>
import moment from 'moment'
import queryString from 'query-string'

export default {
	name: "AdminComments",
	layout: 'admin',
	mounted() {
		this.fetch()
	},
	data() {
		return {
			isPending: false,
			searchText: '',
			searchText2: '',
			searchText3: '',
			data: [],
			columns: [{
				title: 'Created at',
				dataIndex: 'createdAt',
				key: 'createdAt',
			  scopedSlots: { customRender: 'createdAt' },
			  width: 160,
			},{
			  title: 'User',
			  dataIndex: 'owner',
			  width: 200,
			  scopedSlots: {
			    filterDropdown: 'filterDropdown2',
			    filterIcon: 'filterIcon2',
			    customRender: 'user'
			  },
			  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
			  onFilterDropdownVisibleChange: (visible) => {
			    if (visible) {
			      setTimeout(() => {
			        this.$refs.searchInput2.focus()
			      })
			    }
			  },
			},{
			  title: 'Question',
			  dataIndex: 'question',
			  width: 250,
			  scopedSlots: {
			    filterDropdown: 'filterDropdown3',
			    filterIcon: 'filterIcon3',
			    customRender: 'question',
			  },
			  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
			  onFilterDropdownVisibleChange: (visible) => {
			    if (visible) {
			      setTimeout(() => {
			        this.$refs.searchInput3.focus()
			      })
			    }
			  },
			},{
			  title: 'Text',
			  dataIndex: 'text',
			  scopedSlots: {
			    filterDropdown: 'filterDropdown',
			    filterIcon: 'filterIcon',
			    customRender: 'text',
			  },
			  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
			  onFilterDropdownVisibleChange: (visible) => {
			    if (visible) {
			      setTimeout(() => {
			        this.$refs.searchInput.focus()
			      })
			    }
			  },
			},{
			  title: 'Likes',
			  dataIndex: 'counters.like_mark',
			  scopedSlots: { customRender: 'number' },
			  sorter: true,
			  width: 90
			},{
			  title: 'Spam',
			  dataIndex: 'counters.spam_mark',
			  scopedSlots: { customRender: 'number' },
			  sorter: true,
			  width: 90
			},{
				title: 'Actions',
				width: 100,
				fixed: 'right',
				scopedSlots: { customRender: 'actions' },
			}],
			pagination: {},
			sorter: {}
		}
	},
	methods: {
		fetch(params = {}) {
			params = {
				page: this.pagination.current,
				pageSize: this.pagination.pageSize,
				sortField: this.sorter.field,
				sortOrder: this.sorter.order,
				searchText: this.searchText,
				searchTextOwner: this.searchText2,
				searchTextQuestion: this.searchText3,
				...params
			}
			this.isPending = true
			this.$http.get('admin/comments?' + queryString.stringify(params))
				.then((resp) => {
					this.isPending = false
					this.data = resp.data.comments
					const pagination = { ...this.pagination };
        	pagination.total = resp.data.total
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
		handleDeleteComment(comment) {
			this.isPending = true
			this.$http.delete('admin/comments/' + comment._id).then(() => {
				this.fetch()
			}).catch(() => {
				this.isPending = false
			})
		},
		handleSearch (confirm) {
      confirm()
      this.fetch()
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
      this.searchText2 = ''
      this.fetch()
    }
	}
}

</script>

<style lang="less" scoped>
	.question-title {
		max-height: 60px;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
</style>
