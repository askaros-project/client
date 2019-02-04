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
      <a-button type='primary' html-type='submit'>
        Send
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
export default {
  name: "ContactsForm",
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
          this.$emit('submit', values)
        }
      })
    }
  }
}

</script>

<style lang="less">
  .contacts-form {
    //
  }
</style>
