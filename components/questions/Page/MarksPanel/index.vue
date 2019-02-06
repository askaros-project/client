<template>
	<ul class="question-marks">
		<li v-if="question.marks.isSpam">
			<Mark title="Marked as spam"></Mark>
		</li>
	</ul>
</template>

<script>
	import { observer } from "mobx-vue"
	import { message } from "ant-design-vue"
	import Mark from '~/components/questions/Mark'
  export default observer ({
		props: { question: Object },
		components: {Mark}
	})
</script>

<style lang="less" scoped>
	.question-marks {
		padding: 0 0 5px 0;
	}	
</style>
