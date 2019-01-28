<template>
  <div class="sign-up-view">
    <h1>Welcome!</h1>
    <div v-if="!showEmailForm">
      <ul>
        <li>
          <LoginButton type="google" title="Sign in with Google"></LoginButton>
        </li>
        <li>
          <LoginButton type="facebook" title="Sign in with Facebook"></LoginButton>
        </li>
        <li>
          <LoginButton type="twitter" title="Sign in with Twitter"></LoginButton>
        </li>
        <li>
          <LoginButton type="email" title="Sign in with Email" v-on:on-click=toggleEmailForm></LoginButton>
        </li>
      </ul>
      <div>
        No account? <a href="#" @click="changeMode" class="sign-in-link">Create one</a>
      </div>
    </div>
    <EmailForm v-if="showEmailForm"></EmailForm>
  </div>
</template>

<script>
  import LoginButton from '../LoginButton'
  import EmailForm from './EmailForm'
  export default {
    name: "signin",
    components: { LoginButton, EmailForm },
    props: {
      forceEmailView: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.forceEmailView) {
        this.showEmailForm = true
      }
    },
    data() {
      return {
        showEmailForm: this.forceEmailView
      }
    },
    methods: {
      changeMode(e) {
        e.preventDefault()
        this.$emit('change-mode')
      },
      toggleEmailForm() {
        this.showEmailForm = true
      }
    }
  }
</script>

<style lang="less">
  .sign-up-view {
    text-align: center;
    h1 {
      font-size: 28px;
    }
    ul {
      margin: 20px 0;
    }
  }
</style>
