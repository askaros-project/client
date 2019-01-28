export default ({ app }) => {
	if (app.$mobx.account.isLoggedIn) {
		app.$mobx.account.load()
	}
}
