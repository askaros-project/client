<template>
	<div class="comments-editor">
		<wysiwyg v-model="value" :placeholder="placeholder"></wysiwyg>
		<a-button type="primary" @click="handleSubmit">{{ btnText }}</a-button>
	</div>
</template>

<script>
	import Spin from "~/components/shared/Spin"
  export default {
		name: 'CommentsEditor',
		components: { Spin },
		props: {
			placeholder: {type: String, default: "Type your note here..."},
			btnText: {type: String, default: 'Post'}
		},
		data() {
			return {
				value: ''
			}
		},
		methods: {
			handleSubmit() {
				this.$emit('submit', this.value)
				this.value = ''
			}
		}
	}
</script>

<style lang="less">
	.comments-editor {
		display: flex;
		flex-direction: column;
		@media @md {
			flex-direction: row;
			.ant-btn {
				margin-left: 10px;
			}
		}
		.editr {
			flex: 1;
		}
		.editr--toolbar {
			display: none;
		}
		.editr--content {
			background-color: #fff;
		}
		.ant-btn {
			min-width: 100px;
		}
	}
</style>
