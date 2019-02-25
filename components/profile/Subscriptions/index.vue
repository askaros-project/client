<template>
	<div class="profile-subscriptions">
		<h2>Your subscriptions</h2>
		<ul v-if="types.length">
			<li v-for="type in types">
				<span class="icon" v-bind:class="{allowed: isAllowed(type)}">
					<a-icon type="check"></a-icon>
				</span>
				<label>{{$messages.NOTIF_TYPE[type]}}</label>
			</li>
		</ul>
		<nuxt-link to="/profile/subscriptions?from=profile">
			<a-button>Edit</a-button>
		</nuxt-link>
	</div>
</template>

<script>
	import {
		NOTIF_TYPE_TRANDING,
		NOTIF_TYPE_SOMEONE_COMMENT_YOUR_Q,
		NOTIF_TYPE_SOMEONE_COMMENT_SAME_Q
	} from '~/constants'

	export default {
		name: "profile-subscriptions",
		data() {
			return {
				types: [
					NOTIF_TYPE_TRANDING,
					NOTIF_TYPE_SOMEONE_COMMENT_YOUR_Q,
					NOTIF_TYPE_SOMEONE_COMMENT_SAME_Q
				]
			}
		},
		methods: {
			isAllowed(notifType) {
				return this.$mobx.account.user.allowedNotif.indexOf(notifType) !== -1
			}
		}
	}
</script>

<style lang="less" scoped>
	.profile-subscriptions { 
		font-size: 14px;
		margin-top: 30px;
		position: relative;
		min-height: 150px;

		h2 {
			margin: 10px 0 10px 0;
			border-bottom: 1px dotted #f8f8f8;
		}

		ul {
			padding: 10px 0;
			li {
				margin-bottom: 15px;

				.icon {
					opacity: 0.2;
					min-width: 20px;
    			display: inline-block;
    			&.allowed {
    				opacity: 1;
    			}
				}
			}
		}
	}
</style>
