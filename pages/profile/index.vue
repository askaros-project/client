<template>
	<div class="profile-page">
		<NoSSR>
			<div v-if="$mobx.account.isFetched && !isEdit" class="user-info">
				<ul>
					<li><label>Name:</label> {{ $mobx.account.user.username }}</li>
					<li>
						<label>Location:</label>
						<span v-if="$mobx.account.user.place">{{$mobx.account.user.place.formatted_address}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
					<li>
						<label>Birth year:</label>
						<span v-if="$mobx.account.user.birthyear">{{$mobx.account.user.birthyear}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
					<li>
						<label>Sex:</label>
						<span v-if="$mobx.account.user.sex">{{$messages.SEX[$mobx.account.user.sex]}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
					<li>
						<label>Education:</label>
						<span v-if="$mobx.account.user.education">{{$messages.EDUCATION[$mobx.account.user.education]}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
					<li>
						<label>Income:</label>
						<span v-if="$mobx.account.user.income">{{$messages.INCOME[$mobx.account.user.income]}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
					<li>
						<label>Description:</label>
						<span v-if="$mobx.account.user.descr">{{$mobx.account.user.descr}}</span>
						<span v-else class="empty-value">not set</span>
					</li>
				</ul>
				<a-button @click="toggleEdit">Edit</a-button>
			</div>
			<Editor
				v-if="isEdit"
				v-on:cancel="toggleEdit"
				v-on:save="handleSave"></Editor>
			<Subscriptions v-if="!isEdit && $mobx.account.isFetched"></Subscriptions>
			<Questions v-show="!isEdit && $mobx.account.isFetched"></Questions>
		</NoSSR>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
	import NoSSR from 'vue-no-ssr'
  import Spin from "~/components/shared/Spin"
  import Editor from '~/components/profile/Editor'
  import Questions from '~/components/profile/Questions'
  import Subscriptions from '~/components/profile/Subscriptions'
  import { message } from "ant-design-vue"
  export default observer({
  	middleware: 'redirect_if_not_auth',
  	components: { NoSSR, Spin, Editor, Questions, Subscriptions },
  	data() {
  		return {
  			isEdit: false
  		}
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
	.profile-page {
		@media @md {
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
