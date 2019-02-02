<template>
	<a-layout-sider class="admin-layout-aside">
		<a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys=selectedKeys
    >
      <a-menu-item key="1">
        <router-link to="/admin">Users</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/admin/questions">Questions</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/admin/comments">Comments</router-link>
      </a-menu-item>
      <a-sub-menu>
	    	<span slot="title">Mail</span>
	    	<a-menu-item key="4">
	        <router-link to="/admin/mail/lists">Lists</router-link>
	      </a-menu-item>
	      <a-menu-item key="5">
	        <router-link to="/admin/mail/campaigns">Campaigns</router-link>
	      </a-menu-item>
	    </a-sub-menu>
    </a-menu>
    <router-link class="back-to-site" to="/">
    	<a-icon type="left-square"></a-icon>
    	Back to site
    </router-link>
	</a-layout-sider>
</template>

<script>

export default {
	name: "admin-layout-aside",
	data() {
		let selectedKeys = ["1"]
		if (this.$route.path === '/admin/questions') {
			selectedKeys = ["2"]
		} else if (this.$route.path === '/admin/comments') {
			selectedKeys = ["3"]
		} else if (this.$route.path === '/admin/mail_lists') {
			selectedKeys = ["4"]
		} else if (this.$route.path === '/admin/mail_campaigns') {
			selectedKeys = ["5"]
		}
		return {
			selectedKeys
		}
	}
}

</script>
	
<style lang="less" scoped>
	.admin-layout-aside {
		padding: 10px;
		.ant-menu {
			flex: 1;
		}
		.back-to-site {
			position: absolute;
			bottom: 20px;
			left: 35px;
			text-align: center;
      color: rgba(255, 255, 255, 0.65);
			.anticon {
				margin-right: 5px;
			}
		}


	}
</style>
