<template>
  <a-form @submit="handleSubmit" :form="form" class="contacts-form">
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
        placeholder='Name'
        v-decorator="[
          'name',
          {rules: [{
            required: true, message: 'Please input your name!'
          }]}
        ]"
      />
      <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
        placeholder='Email'
        v-decorator="[
          'email',
          {rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
           },{
            required: true, message: 'Please input your email!'
          }]}
        ]"
      />
      <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label=''
      :colon="false"
    >
      <a-textarea
        placeholder='Message'
        :rows="5"
        v-decorator="[
          'message',
          {rules: [{ required: true, message: 'Please input your message!' }]}
        ]"
      />
    </a-form-item>
    <a-form-item>
      <vue-recaptcha
        ref="captcha"
        :sitekey="captchaKey"
        v-on:verify="verify"
        v-on:expired="expiredToken"></vue-recaptcha>
      <a-button
        :disabled="disabled"
        type='primary'
        html-type='submit'>
        Send
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: "ContactsForm",
  components: { VueRecaptcha },
  data () {
    return {
      captchaKey: process.env.CAPTCHA_KEY,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      verifyToken: ''
    }
  },
  computed: {
    disabled() {
      return !this.verifyToken
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', {...values, verifyToken: this.verifyToken })
        }
      })
    },
    verify(token) {
      this.verifyToken = token
    },
    expiredToken() {
      this.verifyToken = ''
    },
    reset() {
      this.form.resetFields()
      this.verifyToken = ''
      this.$refs.captcha.reset()
    }
  }
}

</script>

<style lang="less">
  .contacts-form {
    .ant-btn {
      margin-top: 25px;
    }
  }
</style>
