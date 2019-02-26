<template>
	<a-layout-header class="main-layout-header">
		<nuxt-link to="/" style="text-decoration: none;"><logo></logo></nuxt-link>
		<ul class="controls">
			<li>
				<SearchField></SearchField>
			</li>
			<li>
				<nuxt-link to="/collection/random">
					<a-button>Random</a-button>
				</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/collection/newest" style="white-space: nowrap;">Newest questions</nuxt-link>
			</li>
			<li v-if="!$mobx.account.isLoggedIn">
				<a href="#" @click="showSignInModal" class="signin">
					Sign in
				</a>
			</li>
			<li v-if="!$mobx.account.isLoggedIn">
				<a-button @click="showSignUpModal">
					Get started
				</a-button>
			</li>
			<li v-if="$mobx.account.isLoggedIn">
				<nuxt-link to="/activity">Activity
					<a-badge :count="activityCounter.value"></a-badge>
				</nuxt-link>
			</li>
			<li v-if="$mobx.account.isLoggedIn">
				<ProfileButton></ProfileButton>
			</li>
		</ul>
	</a-layout-header>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import { Observer } from "mobx-vue"
import Logo from '~/components/shared/Logo'
import SearchField from './SearchField'
import ProfileButton from './ProfileButton'

	@Observer
  @Component({components: { Logo, SearchField, ProfileButton }})
  export default class MainLayoutHeader extends Vue {

    activityCounter = this.$mobx.ui.activityCounter
    
	  mounted() {
	  	if (this.$mobx.account.isLoggedIn) {
	  		this.$mobx.ui.activityCounter.update()
	  	}
	  }
		showSignUpModal(e) {
			e.preventDefault()
			this.$mobx.ui.loginModal.show('signup')
		}
		showSignInModal(e) {
			e.preventDefault()
			this.$mobx.ui.loginModal.show('signin')
		}
}
</script>

<style lang="less" scoped>
	.main-layout-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

    @media @tabletmax {
      padding: 0 15px;
    }

		.controls {
			display: flex;
			flex-direction: row;
			align-items: center;
			li {
				display: inline-block;
				margin-left: 20px;
				position: relative;
			}
			a.signin {
				white-space: nowrap;
				margin-left: 15px;
			}
			.ant-badge {
				position: absolute;
				top: 10px;
				right: -10px;
			}
		}
	}
</style>
