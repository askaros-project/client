export default ({ app, redirect }) => {
	if (!app.$mobx.account.isLoggedIn) {
		redirect('/')
	}
}