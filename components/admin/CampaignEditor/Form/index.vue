<template>
  <a-form :form="form" class="campaign-form" @submit="handleSubmit">
    <a-form-item
      label='Title'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
      <a-input
        placeholder='Title'
        v-decorator="[
          'title',
          {rules: [{
            required: true, message: 'Please input campaign title!'
          }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label='Subject'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
      <a-input
        placeholder='Subject'
        v-decorator="[
          'subject',
          {rules: [{
            required: true, message: 'Please input campaign subject!'
          }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label='Testers'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
      <a-select mode="tags"
        v-decorator="[
          'testTo'
        ]">
      </a-select>
    </a-form-item>
    <a-form-item
      label='Send each days'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
      <a-input
        placeholder='Send each days'
        v-decorator="[
          'eachDays'
        ]"
      />
    </a-form-item>
    <a-form-item
      label='HTML'>
      <wysiwyg v-model="html_content" placeholder="Html content"></wysiwyg>
    </a-form-item>
    <a-form-item class="footer"
    >
      <a-button type='primary' html-type='submit' class="submit-btn">
        Save
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: "campaign-form",
  props: {
    target: {type: Object}
  },
  data () {
    return {
      html_content: this.target.html_content || '<h1>Hello!</h1>',
      form: this.$form.createForm(this, {
        mapPropsToFields: () => {
          return {
            title: this.$form.createFormField({
              value: this.target.title
            }),
            subject: this.$form.createFormField({
              value: this.target.subject
            }),
            testTo: this.$form.createFormField({
              value: this.target.testTo || []
            }),
            eachDays: this.$form.createFormField({
              value: this.target.eachDays || ''
            })
          }
        }
      })
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', {...values, html_content: this.html_content})
        }
      })
    }
  }
}

</script>

<style lang="less">
  .campaign-form {
    padding: 10px;
    .footer {
      text-align: right;
    }
  }
</style>
