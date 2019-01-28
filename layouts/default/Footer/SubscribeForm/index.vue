<template>
	<a-form :form="form" class="subscribe-form">
    <a-form-item
      v-if="!isDone"
      label=''
      :colon="false">
      <a-input-search
        placeholder="Type your email" @search="onSubscribe"
        v-decorator="[
          'sub_email',
          {rules: [{
            type: 'email',
            message: 'The input is not valid E-mail!'
          },{
            required: true,
            message: 'Please input your email!'
          }]}
        ]">
        <a-button slot="enterButton" :disabled="isPending">
          Subscribe
          <Spin v-if="isPending" :no-mask="true"></Spin>
        </a-button>
      </a-input-search>
    </a-form-item>
    <span v-else class="done-text">Thank you for subscription!</span>
  </a-form>
</template>

<script>
import { message } from "ant-design-vue"
import Spin from '~/components/shared/Spin'
export default {
	name: "subscribe-form",
  components: {Spin},
	data () {
    return {
      isPending: false,
      isDone: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
    }
  },
  methods: {
    onSubscribe() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isPending = true
          this.$http.post('maillist/subscribers', { email: values.sub_email}).then(() => {
            this.isPending = false
            this.isDone = true
            message.success('Successfully!')
            this.form.resetFields()
          }).catch(() => {
            this.isPending = false
          })
        }
      })
    }
  }
}

</script>

<style lang="less">
	.subscribe-form {
    position: relative;
    .ant-form-item {
      width: 300px;
      position: relative;
      margin: 0;
    }
    .ant-form-explain {
      position: absolute;
    }
    .done-text {
      color: rgba(0,0,0,0.4);
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
    }
  }
</style>
