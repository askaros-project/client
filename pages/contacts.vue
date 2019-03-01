<template>
	<div class="contacts-page">
		<div>
			<h1>Contact us</h1>
			<ContactsForm v-on:submit="handleSubmit" ref="form"></ContactsForm>
		</div>
		<Spin v-if="isPending"></Spin>
	</div>
</template>

<script>
	import { message } from "ant-design-vue"
	import Spin from '~/components/shared/Spin'
	import ContactsForm from '~/components/contacts/ContactsForm'
	export default {
		name: "Contacts",
		components: { Spin, ContactsForm },
		data() {
			return {
				isPending: false
			}
		},
		methods: {
			handleSubmit(values) {
				this.isPending = true
				this.$http.post('feedback', values).then(() => {
					this.isPending = false
					message.success('Success!')
					this.$refs.form.form.resetFields()
				})
				.catch(() => {
					this.isPending = false
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.contacts-page {
		width: 350px;
		margin: 20px auto;
		text-align: center;

		h1 {
			margin-bottom: 35px;
		}
	}	
</style>
