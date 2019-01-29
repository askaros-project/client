<template>
  <a-form @submit="handleSubmit" :form="form" class="profile-editor">
    <a-form-item
      label='Name'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-input
        placeholder='Name'
        v-decorator="[
          'username',
          {
          	rules: [{ required: true, message: 'Please input your name!' }]
          }
        ]"
      ></a-input>
      <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label='Location'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
    	<LocationAutocomplete
    		:default-value="user.location"
    		v-on:change="handleLocationChange"></LocationAutocomplete>
    </a-form-item>
    <a-form-item
      label='Description'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-textarea
        placeholder='Description'
        v-decorator="[
          'descr'
        ]"
        :rows="4"
      />
      <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
    </a-form-item>
    <a-form-item
      label='Birth year'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
     <a-select
      style="max-width: 200px;"
        v-decorator="[
          'birthyear'
        ]"
        placeholder='Please select a birth year'
      >
        <a-select-option v-for="year in birthyearOptions" :value='year'>{{year}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label='Sex'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
     <a-select
        style="max-width: 200px;"
        v-decorator="[
          'sex'
        ]"
        placeholder='Please select a sex'
      >
        <a-select-option value='Male'>Male</a-select-option>
        <a-select-option value='Female'>Female</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-button type='primary' @click="handleSubmit"  style="margin-right: 10px;">
        Save
      </a-button>
      <a-button @click="cancel">
        Cancel
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import _ from 'lodash'
import LocationAutocomplete from "~/components/shared/LocationAutocomplete"
export default {
  name: "profile-editor",
  components: { LocationAutocomplete },
  data () {
    return {
    	user: this.$mobx.account.user,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
      	mapPropsToFields: () => {
	        return {
	          username: this.$form.createFormField({
	            value: this.$mobx.account.user.username
	          }),
	          descr: this.$form.createFormField({
	            value: this.$mobx.account.user.descr
	          }),
            birthyear: this.$form.createFormField({
              value: this.$mobx.account.user.birthyear
            }),
            sex: this.$form.createFormField({
              value: this.$mobx.account.user.sex
            })
	        }
	      }
      }),
      changedLocation: '',
      birthyearOptions: (function() {
        let currentYear = new Date().getFullYear()
        let result = [], min = 0
        _.times(110, (i) => result.push(currentYear - min - i))
        return result.reverse()
      }())
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
        	this.$emit('save', {...values, location: this.changedLocation || this.user.location})
        }
      })
    },
    cancel() {
    	this.$emit('cancel')
    },
    handleLocationChange(value) {
    	this.changedLocation = value
    }
  }
}

</script>

<style lang="less">
  .profile-editor {
    // margin: 30px auto !important;
    max-width: 500px;
  }
</style>
