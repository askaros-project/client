<template>
	<div class="profile-page">
		<div v-if="account && account.isFetched && !isEdit" class="user-info">
			<ul>
				<li><label>Name:</label> {{ account.user.username }}</li>
				<li><label>Location:</label> {{ account.user.location || "Not set" }}</li>
				<li><label>Description:</label> <div>{{ account.user.descr || "Not set" }}</div></li>
				<li><label>Birth year:</label> <div>{{ account.user.birthyear || "Not set" }}</div></li>
				<li><label>Sex:</label> <div>{{ account.user.sex || "Not set" }}</div></li>
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
					}
					> div {
						flex: 1;
					}
				}
			}
		}
	}	
</style>
