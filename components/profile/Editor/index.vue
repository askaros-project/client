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
    		:default-value="$mobx.account.user.place ? $mobx.account.user.place.formatted_address : ''"
    		v-on:change="handlePlaceChange"></LocationAutocomplete>
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
        <a-select-option
          v-for="(year, index) in birthyearOptions"
          :key="`birthyear-${index}`"
          :value='year'>{{year}}</a-select-option>
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
        <a-select-option
          v-for="(opt, index) in sexOptions"
          :key="`sex-${index}`"
          :value='opt.type'>{{ opt.label }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label='Education'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
     <a-select
        style="max-width: 200px;"
        v-decorator="[
          'education'
        ]"
        placeholder='Please select a education level'
      >
        <a-select-option v-for="(opt, index) in educationOptions"
          :key="`edu-${index}`"
          :value='opt.type'>{{ opt.label }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label='Income'
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }">
     <a-select
        style="max-width: 200px;"
        v-decorator="[
          'income'
        ]"
        placeholder='Please select an income level'
      >
        <a-select-option v-for="(opt, index) in incomeOptions"
          :key="`income-${index}`"
          :value='opt.type'>{{ opt.label }}</a-select-option>
      </a-select>
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
import {
  SEX_MALE,
  SEX_FEMALE,
  EDUCATION_LEVEL_SPECIALIST,
  EDUCATION_LEVEL_BACHELOR,
  EDUCATION_LEVEL_MASTER,
  EDUCATION_LEVEL_DOCTOR,
  INCOME_LEVEL_MIN,
  INCOME_LEVEL_MIDDLE,
  INCOME_LEVEL_MAX } from '~/constants'
export default {
  name: "profile-editor",
  components: { LocationAutocomplete },
  data () {
    return {
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
            }),
            education: this.$form.createFormField({
              value: this.$mobx.account.user.education
            }),
            income: this.$form.createFormField({
              value: this.$mobx.account.user.income
            })
	        }
	      }
      }),
      changedPlace: '',
      birthyearOptions: (function() {
        let currentYear = new Date().getFullYear()
        let result = [], min = 0
        _.times(110, (i) => result.push(currentYear - min - i))
        return result.reverse()
      }()),
      sexOptions: [
        { type: SEX_MALE, label: this.$messages.SEX[SEX_MALE]},
        { type: SEX_FEMALE, label: this.$messages.SEX[SEX_FEMALE]}
      ],
      educationOptions: [
        { type: EDUCATION_LEVEL_SPECIALIST, label: this.$messages.EDUCATION[EDUCATION_LEVEL_SPECIALIST]},
        { type: EDUCATION_LEVEL_BACHELOR, label: this.$messages.EDUCATION[EDUCATION_LEVEL_BACHELOR]},
        { type: EDUCATION_LEVEL_MASTER, label: this.$messages.EDUCATION[EDUCATION_LEVEL_MASTER]},
        { type: EDUCATION_LEVEL_DOCTOR, label: this.$messages.EDUCATION[EDUCATION_LEVEL_DOCTOR]}
      ],
      incomeOptions: [
        { type: INCOME_LEVEL_MIN, label: this.$messages.INCOME[INCOME_LEVEL_MIN]},
        { type: INCOME_LEVEL_MIDDLE, label: this.$messages.INCOME[INCOME_LEVEL_MIDDLE]},
        { type: INCOME_LEVEL_MAX, label: this.$messages.INCOME[INCOME_LEVEL_MAX]}
      ]
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
        	this.$emit('save', {...values, place: this.changedPlace || this.$mobx.account.user.place})
        }
      })
    },
    cancel() {
    	this.$emit('cancel')
    },
    handlePlaceChange(place) {
    	this.changedPlace = _.pick(place, ['formatted_address', 'address_components'])
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
