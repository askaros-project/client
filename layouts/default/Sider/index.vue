<template>
	<a-layout-sider
      :collapsible="true"
      :collapsed="$mobx.ui.sider.collapsed"
      theme="dark"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      :trigger="null"
    >
    <ul>
    	<li>
    		<a @click="handleRandomClick">
					Random questions
				</a>
    	</li>
    	<li>
    		<a @click="handleNewestClick">
					Newest questions
				</a>
    	</li>
    	<li v-if="$mobx.account.isLoggedIn" class="profile-item">
    		<a @click="handleProfileClick">
    			Profile
    		</a>
    	</li>
    	<li v-if="$mobx.account.isLoggedIn && $mobx.account.isAdmin">
    		<a @click="handleAdminClick">
    			Admin
    		</a>
    	</li>
    	<li v-if="$mobx.account.isLoggedIn" class="logout-item">
    		<a @click="handleLogoutClick">
    			Logout
    		</a>
    	</li>
    </ul>
  </a-layout-sider>
</template>

<script>
import { observer } from "mobx-vue"
export default observer({
	name: "DefaultLayoutSider",
	methods: {
		onCollapse() {
			//
		},
		onBreakpoint() {
			//
		},
		handleRandomClick(e) {
			this.beforeItemClick(e).then(() => {
				this.$router.push('/collection/random')
			})
		},
		handleNewestClick(e) {
			this.beforeItemClick(e).then(() => {
				this.$router.push('/collection/newest')
			})
		},
		handleProfileClick(e) {
			this.beforeItemClick(e).then(() => {
				this.$router.push('/profile')
			})
		},
		handleAdminClick(e) {
			this.beforeItemClick(e).then(() => {
				this.$router.push('/admin')
			})
		},
		handleLogoutClick(e) {
			this.beforeItemClick(e).then(() => {
				this.$mobx.account.logout()
			})
		},
		beforeItemClick(e) {
			e.preventDefault()
			this.$mobx.ui.sider.toggle()
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve()
				},100)
			})
		}
	}
})
</script>

<style lang="less" scoped>
	.ant-layout-sider {
		position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 301;

    ul {
    	width: 200px;
    	padding: 65px 15px 25px 15px;
    	li {
    		margin-bottom: 15px;
		    a {
		    	color: #fff;
		    }
		    &.profile-item {
		    	margin: 35px 0 15px 0; 
		    }
		    &.logout-item {
		    	position: absolute;
		    	bottom: 0px;
		    	left: 15px;
		    }
		  }
    }
	}
</style>
