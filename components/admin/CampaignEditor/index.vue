<template>
  <a-modal
    class="campaign-editor"
    :visible="visible"
    :footer="null"
    destroy-on-close
    @cancel="close">
    <Form v-on:submit="handleFormSubmit" :target="target || {}"></Form>
    <spin v-if="isPending"></spin>
  </a-modal>
</template>

<script>
  import { observer } from "mobx-vue"
  import Spin from '~/components/shared/Spin'
  import Form from './Form'

  export default observer({
    name: 'CampaignEditor',
    components: { Spin, Form },
    props: {
      target: { type: Object },
      visible: { type: Boolean, default: false },
      requestClose: { type: Function }
    },
    data() {
      return {
        isPending: false,
      }
    },

    methods: {
      close() {
        this.requestClose()
      },

      handleFormSubmit(values) {
        let method = 'post'
        let url = 'admin/mail_campaigns'
        if (this.target) {
          method = 'put'
          url += '/' + this.target._id
        }
        this.isPending = true
        this.$http[method](url, values)
          .then((resp) => {
            this.isPending = false
            this.requestClose(true)
          })
          .catch(() => {
            this.isPending = false
          })
      }
    },
    
  })

</script>

<style lang="less">
  .campaign-editor{
    width: 600px !important;
    .ant-modal-body {
      background-color: #fff;
    }
}
</style>
