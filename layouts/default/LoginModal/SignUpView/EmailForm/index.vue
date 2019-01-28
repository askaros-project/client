<template>
	<a-form @submit="handleSubmit" :form="form" v-if="!isWaitConfirmation" class="signup-email-form">
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
      	placeholder='Username'
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name!' }]}
        ]"
      />
      <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
      	placeholder='Email'
        v-decorator="[
          'email',
          {rules: [{ required: true, message: 'Please input your email!' }]}
        ]"
      />
      <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
      	placeholder='Password'
      	type='password'
        v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your password!' }]}
        ]"
      />
      <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-button type='primary' html-type='submit'>
        Join
      </a-button>
    </a-form-item>
  </a-form>
  <div v-else-if="isWaitConfirmation" class="email-confirmation">
  	We just emailed a confirmation link to your email. Click the link, and you’ll be signed in.
  </div>
	</div>
</template>

<script>
export default {
	name: "signup-email-form",
	data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      isWaitConfirmation: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$mobx.account.signupByEmail(values, () => {
            this.isWaitConfirmation = true
          })
        }
      })
    }
  }
}

</script>

<style lang="less">
	.signup-email-form {
    margin: 30px auto !important;
	  width: 250px;

    .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
      border-right-width: 0 !important;
    }

    input {
      background-color: transparent !important;
      border-width: 0 0 1px 0 !important;
      border-radius: 0;
      border-right-color: transparent !important;
    }
    input:hover {
      border-right-width: 0 !important;
      border-color: #d9d9d9 !important;
    }
    input:focus {
      box-shadow: none;
      border-right-width: 0 !important;
    }
	}
  .email-confirmation {
      margin: 30px;
    }
</style>
