<template>
	<div class="profile-page">
		<div v-if="account && account.isFetched && !isEdit" class="user-info">
			<ul>
				<li><label>Name:</label> {{ account.user.username }}</li>
				<li>
					<label>Location:</label>
					<span v-if="account.user.place">{{account.user.place.formatted_address}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
				<li>
					<label>Birth year:</label>
					<span v-if="account.user.birthyear">{{account.user.birthyear}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
				<li>
					<label>Sex:</label>
					<span v-if="account.user.sex">{{$messages.SEX[account.user.sex]}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
				<li>
					<label>Education:</label>
					<span v-if="account.user.education">{{$messages.EDUCATION[account.user.education]}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
				<li>
					<label>Income:</label>
					<span v-if="account.user.income">{{$messages.INCOME[account.user.income]}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
				<li>
					<label>Description:</label>
					<span v-if="account.user.descr">{{account.user.descr}}</span>
					<span v-else class="empty-value">not set</span>
				</li>
			</ul>
			<a-button @click="toggleEdit">Edit</a-button>
		</div>
		<Editor
			v-if="isEdit"
			v-on:cancel="toggleEdit"
			v-on:save="handleSave"></Editor>
		<Questions v-show="account && account.isFetched && !isEdit"></Questions>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
  import Spin from "~/components/shared/Spin"
  import Editor from '~/components/profile/Editor'
  import Questions from '~/components/profile/Questions'
  import { message } from "ant-design-vue"
  export default observer({
  	components: { Spin, Editor, Questions },
  	data() {
  		return {
  			account: null,
  			isEdit: false
  		}
  	},
  	mounted() {
  		this.account = this.$mobx.account
  	},
  	methods: {
  		toggleEdit() {
				this.isEdit = !this.isEdit
			},
			handleSave(values) {
				this.$mobx.account.user.save(values).then(() => {
					message.success('Successfully saved!')
					this.isEdit = false
				})
			}
  	}
	})
</script>

<style lang="less" scoped>
	@import "../vars.less";

	.profile-page {
		@media @tabletmin {
			max-width: 600px;
		}
		margin: 0 auto;

		.user-info {
			min-height: 160px;
			ul {
				li {
					margin-bottom: 15px;
					display: flex;
					flex-direction: row;
					label {
						width: 100px;
						font-style: italic;
					}
					> div {
						flex: 1;
					}
					.empty-value {
						color: rgba(0,0,0,0.4);
						font-style: italic;
					}
				}
			}
		}
	}	
</style>
