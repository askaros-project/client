<template>
	<a-dropdown class="profile-button">
    <a-button shape="circle" icon="user" type="primary"></a-button>
    <a-menu slot="overlay" class="profile-menu">
      <a-menu-item>
        <router-link to="/profile">Profile</router-link>
      </a-menu-item>
      <a-menu-item v-if="account.isAdmin">
        <router-link to="/admin">Admin</router-link>
      </a-menu-item>
      <a-menu-divider></a-menu-divider>
      <a-menu-item>
        <a href="#" @click="onLogout">Logout</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
	import Vue from "vue"
	import Component from "vue-class-component"
	import { Observer } from "mobx-vue"
	@Observer
  @Component
  export default class ProfileButton extends Vue {
		account = this.$mobx.account
		onLogout(e) {
			e.preventDefault()
			this.$mobx.account.logout()
		}
	}

</script>

<style lang="less">
	.profile-button {
		.anticon {
			font-size: 20px !important;
		}
	}
	.profile-menu {
		padding: 10px !important;
	}
</style>
