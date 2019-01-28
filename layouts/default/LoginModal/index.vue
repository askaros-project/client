<template>
  <a-modal
    class="login-modal"
    :visible="loginModal.visible && !account.isLoggedIn"
    :mode=loginModal.mode
    :footer="null"
    destroy-on-close
    @cancel="hide">
    <sign-in-view
      v-if="loginModal.mode === 'signin'"
      v-on:change-mode="changeMode('signup')"
      :force-email-view=loginModal.forceEmailView>  
    </sign-in-view>
    <sign-up-view
      v-if="loginModal.mode === 'signup'"
      v-on:change-mode="changeMode('signin')"
      :force-email-view=loginModal.forceEmailView>  
    </sign-up-view>
    <spin v-if="account.isPending"></spin>
  </a-modal>
</template>

<script>
  import Vue from "vue"
  import Component from "vue-class-component"
  import { Observer } from "mobx-vue"
  import Spin from '~/components/shared/Spin'
  import SignInView from './SignInView'
  import SignUpView from './SignUpView'

  @Observer
  @Component({
    components: {
      SignInView,
      SignUpView,
      Spin
    }
  })
  export default class LoginModal extends Vue {
    account = this.$mobx.account
    loginModal = this.$mobx.ui.loginModal

    hide() {
      this.loginModal.hide()
    }

    changeMode(mode) {
      this.loginModal.setMode(mode)
    }

  }

</script>

<style lang="less">
  .login-modal{
    .ant-modal-body {
      background-color: #fff;
      // #E8F3EC
    }
}
</style>
