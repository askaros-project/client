<template>
	<div class="subscriptions-page">
		<NoSSR>
			<div v-if="!$mobx.account.isLoggedIn" class="login-msg-wrap">
				Please <a @click="handleLoginClick">login</a> to edit your subscriptions
			</div>
			<div v-if="$mobx.account.isLoggedIn && $mobx.account.isFetched">
				<h2>Edit your subscriptions</h2>
				<ul v-if="types.length">
					<li v-for="type in types">
						<span class="checkbox-wrap">
							<a-checkbox :checked="isAllowed(type)" @change="handleChange(type)"></a-checkbox>
						</span>
						<label>{{$messages.NOTIF_TYPE[type]}}</label>
					</li>
				</ul>
				<nuxt-link to="/profile" v-if="hasBackToProfileBtn">
					<a-button>Back to profile</a-button>
				</nuxt-link>
			</div>
			<Spin v-if="isPending" noMask/>
		</NoSSR>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
	import NoSSR from 'vue-no-ssr'
  import Spin from "~/components/shared/Spin"
  import { message } from "ant-design-vue"
  import {
		NOTIF_TYPE_TRANDING,
		NOTIF_TYPE_SOMEONE_COMMENT_YOUR_Q,
		NOTIF_TYPE_SOMEONE_COMMENT_SAME_Q
	} from '~/constants'

  export default observer({
  	components: { NoSSR, Spin },
  	data() {
			return {
				isPending: false,
				types: [
					NOTIF_TYPE_TRANDING,
					NOTIF_TYPE_SOMEONE_COMMENT_YOUR_Q,
					NOTIF_TYPE_SOMEONE_COMMENT_SAME_Q
				],
				hasBackToProfileBtn: false
			}
		},
		mounted() {
			this.hasBackToProfileBtn = this.$route.query.from === 'profile'
		},
		methods: {
			isAllowed(type) {
				return this.$mobx.account.user.allowedNotif.indexOf(type) !== -1
			},
			handleChange(type) {
				let method = 'sub'
				if (this.isAllowed(type)) {
					method = 'unsub'
				}
				this.isPending = true
				this.$mobx.account.user[method](type).then(() => {
					message.success('Saved')
				})
				.finally(() => {
					this.isPending = false
				})
			},
			handleLoginClick() {
				this.$mobx.ui.loginModal.show()
			}
		}
	})
</script>

<style lang="less" scoped>
	.subscriptions-page {
		@media @md {
			max-width: 600px;
		}
		margin: 0 auto;

		.login-msg-wrap {
			margin-top: 150px;
			text-align: center;
		}

		ul {
			margin-top: 30px;
			li {
				margin: 20px 0;
				.checkbox-wrap {
					margin-right: 10px;
				}
			}
		}
		.ant-btn {
			margin-top: 10px;
		}
	}	
</style>
