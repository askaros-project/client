<template>
	<div>
 </div>
</template>

<script>
export default {
	name: "TwitterCallbackPage",
	mounted() {
		if (this.$mobx.account.isLoggedIn) {
			this.$router.push('/')
			return
		}
		this.$mobx.account.loginByTwitter({
			oauth_token: this.$route.query.oauth_token,
			oauth_verifier: this.$route.query.oauth_verifier
		})
	}
}
</script>

<style lang="less" scoped></style>
