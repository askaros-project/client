<template>
	<ul class="question-marks">
		<li v-if="question.marks.isSpam">
			<Mark title="Marked as spam"></Mark>
		</li>
		<li v-if="question.marks.isNotifBlocked">
			<Mark title="Blocked notifications"></Mark>
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
		padding: 0;
		margin: 0;

		li {
			display: inline-block;
		}
	}
</style>
