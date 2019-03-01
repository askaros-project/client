<template>
	<div class="admin-mail-campaigns">
		<div class="toolbar">
			<a-button @click="toggleEditor()">Create campaign</a-button>
		</div>
		<a-table :columns="columns"
	    :row-key="record => record._id"
	    :data-source="data"
	    :loading="isPending"
	    :scroll="{ x: 850 }"
	  >
	  <template slot="lastSentAt" slot-scope="lastSentAt">
	  	<div v-if="lastSentAt">
	      {{ lastSentAt | formatDateFromNow }}
	    </div>
	    <div v-else>
	    	-
	    </div>
	   </template>
	   <template slot="actions" slot-scope="campaign">
	   		<a-button icon="edit" shape="circle" @click="toggleEditor(campaign)"></a-button>
	   		<a-popconfirm
	   			:title="'Send this campaign immediatly' + (campaign.isTest ? '(TEST)' : '') + '?'"
	    		@confirm="handleSend(campaign)"
	    		ok-text="Yes"
	    		cancel-text="No"
	    		placement="top">
	   		<a-button icon="arrow-right" shape="circle" @click="sendCampaign(campaign)"></a-button>
	   		</a-popconfirm>
	    	<a-popconfirm title="Are you sure delete this campaign?"
	    		@confirm="handleDelete(campaign)"
	    		ok-text="Yes"
	    		cancel-text="No"
	    		placement="top">
	      	<a-button icon="delete" shape="circle"></a-button>
	      </a-popconfirm>
	    </template>	    
	    <template slot="isTest" slot-scope="campaign">
	    	<a-switch :default-checked="campaign.isTest" @change='handleTestChange(campaign)'></a-switch>
	    </template>
	    <template slot="isScheduled" slot-scope="campaign">
	    	<a-switch :default-checked="campaign.isScheduled" @change='handleScheduledChange(campaign)'></a-switch>
	    </template>
	    <template slot="schedule" slot-scope="eachDays">
	    	<div v-if="eachDays">
	    		Send each {{ eachDays}} days
	    	</div>
	    	<div v-else>-</div>
	    </template>
	  </a-table>
	  <Editor
	  	:target="editorTarget"
	  	:visible="isEditorVisible"
	  	:request-close="handleEditorRequestClose"></Editor>
	</div>
</template>

<script>
import moment from 'moment'
import Editor from '~/components/admin/CampaignEditor'
import queryString from 'query-string'
import { message } from "ant-design-vue"

export default {
	name: "admin-mail-campaigns",
	layout: 'admin',
	components: { Editor },
	mounted() {
		this.fetch()
	},
	data() {
		return {
			isPending: false,
			isEditorVisible: false,
			editorTarget: null,
			data: [],
			columns: [{
				title: 'Title',
				dataIndex: 'title',
			  width: 160,
			},{
				title: 'Subject',
				dataIndex: 'subject',
			  width: 160,
			},{
				title: 'Last sent',
				dataIndex: 'lastSentAt',
			  scopedSlots: { customRender: 'lastSentAt' },
			},{
				title: 'Schedule',
				dataIndex: 'eachDays',
			  scopedSlots: { customRender: 'schedule' },
			},{
			  title: 'Test',
			  scopedSlots: { customRender: 'isTest' },
			  width: 120
			},{
			  title: 'Scheduled',
			  scopedSlots: { customRender: 'isScheduled' },
			  width: 120
			},{
				title: 'Actions',
				width: 150,
				fixed: 'right',
				scopedSlots: { customRender: 'actions' },
			}]
		}
	},
	methods: {
		fetch(params = {}) {
			this.isPending = true
			this.$http.get('admin/mail_campaigns')
				.then((resp) => {
					this.isPending = false
					this.data = resp.data.campaigns
				})
				.catch(() => {
					this.isPending = false
				})
		},

		toggleEditor(campaign) {
			this.editorTarget = campaign
			this.isEditorVisible = !this.isEditorVisible
		},

		sendCampaign(campaign) {

		},

		handleEditorRequestClose(isSubmitted) {
			if (isSubmitted) {
				this.fetch()
			}
			this.toggleEditor()
		},

		handleSend(campaign) {
			this.isPending = true
			this.$http.post('admin/mail_campaigns/' + campaign._id + '/send?' + (campaign.isTest ? 'test=1' : ''))
				.then(() => {
					this.isPending = false
					this.fetch()
					message.success('Success!')
				})
				.catch(() => {
					this.isPending = false
				})
		},

		handleDelete(campaign) {
			this.isPending = true
			this.$http.delete('admin/mail_campaigns/' + campaign._id)
				.then(() => {
					this.isPending = false
					this.fetch()
				})
				.catch(() => {
					this.isPending = false
				})
		},

		handleTestChange(campaign) {
			this.isPending = true
			this.$http.put('admin/mail_campaigns/' + campaign._id, {isTest: !campaign.isTest})
				.then(() => {
					this.isPending = false
					this.fetch()
				})
				.catch(() => {
					this.isPending = false
				})
		},

		handleScheduledChange(campaign) {
			this.isPending = true
			this.$http.put('admin/mail_campaigns/' + campaign._id, {isScheduled: !campaign.isScheduled})
				.then(() => {
					this.isPending = false
					this.fetch()
				})
				.catch(() => {
					this.isPending = false
				})
		}
	}
}

</script>

<style lang="less" scoped>
	.admin-mail-campaigns {
		position: relative;
		.toolbar {
			text-align: right;
			padding: 10px;
		}
	}	
</style>
