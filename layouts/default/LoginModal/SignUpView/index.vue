<template>
  <div class="sign-up-view">
    <h1>Join {{ appName }}.</h1>
    <div v-if="!showEmailForm">
      <ul>
        <li>
          <LoginButton type="google" title="Sign up with Google"></LoginButton>
        </li>
        <li>
          <LoginButton type="facebook" title="Sign up with Facebook"></LoginButton>
        </li>
        <li>
          <LoginButton type="twitter" title="Sign up with Twitter"></LoginButton>
        </li>
        <li>
          <LoginButton type="email" title="Sign up with Email" v-on:on-click=toggleEmailForm></LoginButton>
        </li>
      </ul>
      <div>
        Already have an account? <a href="#" @click="changeMode" class="sign-in-link">Sign in</a>
      </div>
    </div>
    <EmailForm v-if="showEmailForm"></EmailForm>
  </div>
</template>

<script>
  import LoginButton from '../LoginButton'
  import EmailForm from './EmailForm'
  export default {
    name: "signup",
    components: { LoginButton, EmailForm },
    data() {
      return {
        appName: process.env.APP_NAME,
        showEmailForm: false
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
