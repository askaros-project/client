<template>
	<div class="email-confirmation">
		<div v-if="isPending">
			<h1>Email confirmation processed...</h1>
		</div>
		<div v-else-if="isConfirmed">
			<h1>Email confirmation successful!</h1>
			Now you can <a href="#" @click=openLoginModal>Login</a> to your account.		</div>
		<div v-else-if="isError">
			<h1>Email confirmation. Oups! Some error occured.</h1>
		</div>
	</div>
</template>

<script>

export default {
	name: "ConfirmationPage",
	data() {
		return {
			isPending: false,
			isConfirmed: false,
			isError: false
		}
	},
	mounted() {
		if (this.$mobx.account.isLoggedIn) {
			this.$router.push('/')
			return
		}
		this.isPending = true
		this.$http.post('account/email/confirmation/' + this.$route.params.cfid)
			.then((resp) => {
				this.isPending = false
				if (resp.body.success) {
					this.isConfirmed = true
				} else {
					this.isError = true
				}
			})
			.catch(() => {
				this.isPending = false
				this.isError = true
			})
	},
	methods: {
		openLoginModal(e) {
			e.preventDefault()
			this.$mobx.ui.loginModal.show('signin', true)
		}
	}
}
</script>

<style lang="less" scoped>
	.email-confirmation {
		margin-top: 100px;
		h1 {
			font-size: 16px;
		}
		line-height: 25px;
		text-align: center;
	}
</style>
