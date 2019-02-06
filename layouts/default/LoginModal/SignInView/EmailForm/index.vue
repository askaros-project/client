<template>
  <a-form @submit="handleSubmit" :form="form" class="signin-email-form">
    <a-form-item
      label=''
      :colon="false"
    >
      <a-input
        placeholder='Email'
        v-decorator="[
          'email',
          {rules: [{
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
        Sign in
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
  export default {
    name: "signin-email-form",
    data () {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this)
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$mobx.account.loginByEmail(values)
          }
        })
      }
    }
  }

</script>

<style lang="less">
  .signin-email-form {
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
</style>
