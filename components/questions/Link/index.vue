<template>
  <a v-if="target === 'blank'" class="qlink" :href="'/q/' + question.uri" target="_blank">{{ question.title }}</a>
  <router-link v-else class="qlink" :to="'/q/' + question.uri">{{ question.title }}</router-link>
</template>

<script>
  export default {
    name: "q-link",
    props: {
  		question: Object,
  		target: { type: String, default: 'self'}
  	}
  }
</script>

<style lang="less" scoped>
  .qlink {
    display: inline-block;
  }
</style>
