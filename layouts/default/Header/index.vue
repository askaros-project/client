<template>
	<a-layout-header class="main-layout-header">
		<nuxt-link to="/" style="text-decoration: none;"><logo></logo></nuxt-link>
		<ul class="controls">
			<li class="search-field">
				<SearchField></SearchField>
			</li>
			<li class="search-icon">
				<a-icon type="search" @click="$mobx.ui.searchModal.show()"></a-icon>
			</li>
			<li class="md-hidden">
				<nuxt-link to="/collection/random">
					<a-button>Random</a-button>
				</nuxt-link>
			</li>
			<li class="md-hidden">
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
					<a-badge :count="$mobx.ui.activityCounter.value"></a-badge>
				</nuxt-link>
			</li>
			<li v-if="$mobx.account.isLoggedIn" class="md-hidden">
				<ProfileButton></ProfileButton>
			</li>
		</ul>
	</a-layout-header>
</template>

<script>
	import { observer } from "mobx-vue"
	import Logo from '~/components/shared/Logo'
	import SearchField from './SearchField'
	import ProfileButton from './ProfileButton'
  export default observer({    

  	components: { Logo, SearchField, ProfileButton },
	  mounted() {
	  	if (this.$mobx.account.isLoggedIn) {
	  		this.$mobx.ui.activityCounter.update()
	  	}
	  },
	  methods: {
			showSignUpModal(e) {
				e.preventDefault()
				this.$mobx.ui.loginModal.show('signup')
			},
			showSignInModal(e) {
				e.preventDefault()
				this.$mobx.ui.loginModal.show('signin')
			}
		}
})
</script>

<style lang="less" scoped>
	.main-layout-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 55px 0 15px;
		background-color: #fff;

		@media @md {
			padding: 0 15px;
		}

    @media @lg {
      padding: 0 50px;
    }

		.controls {
			display: flex;
			flex-direction: row;
			align-items: center;
			li {
				display: inline-block;
				margin-left: 10px;
				@media @sm {
					margin-left: 15px;
				}
				position: relative;

				&.search-field {
					@media @xs_max {
						display: none;
					}
				}

				&.search-icon {
					cursor: pointer;
					opacity: 0.6;
					&:hover {
						opacity: 1;
					}
					@media @xs {
						display: none;
					}
				}
			}
			a.signin {
				white-space: nowrap;
				@media @md {
					margin-left: 15px;
				}
			}
			.ant-badge {
				position: absolute;
				top: 10px;
				right: -10px;
			}
		}
	}
</style>
