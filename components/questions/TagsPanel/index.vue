<template>
	<div class="tags">
		<Tag v-for="code in sortedCodes"
			:code="code"
			:title="$messages.TAG[code]"
			:selected="question.tags.selected === code"
			:count="question.tags.counts[code]"
			:is-tagged="question.tags.isTagged"
			v-on:tag="onTag(code)">
		</Tag>
	</div>
</template>

<script>
	import { observer } from "mobx-vue"
	import {
		TAG_UNEXPECTED,
    TAG_CHANGE_IN_FUTURE,
    TAG_UNFAIR,
    TAG_NOT_WHOLE,
    TAG_PRETTY_MUCH_TRUE,
    TAG_WEIRD,
    TAG_EXPECTED } from '~/constants'
	import Tag from "~/components/questions/Tag"

  export default observer({
  	name: 'TagsPanel',
  	components: { Tag },
  	props: {
  		question: { type: Object }
  	},
  	data() {
  		return {
  			codes: [
		  		TAG_UNEXPECTED,
		  		TAG_UNFAIR,
					TAG_WEIRD,
					TAG_CHANGE_IN_FUTURE,
					TAG_NOT_WHOLE,
					TAG_PRETTY_MUCH_TRUE,
		  		TAG_EXPECTED	
		  	]
  		}
  	},

  	methods: {
  		onTag(code) {
	  		this.$emit('tag', code)
	  	}
  	},

  	computed: {
  		sortedCodes() {
	  		return this.codes.sort((a, b) => {
		  		return (this.question.tags.counts[b] || 0) - (this.question.tags.counts[a] || 0)
		  	})
	  	}
  	}
	})
</script>

<style lang="less" scoped>
	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
