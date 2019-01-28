<template>
  <div class="question-mark" v-bind:class="{light: light}">
    <a-icon :type="icon"></a-icon> {{title}}
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      icon: {type: String, default: 'check'},
      light: Boolean,
    }
  }
</script>

<style lang="less" scoped>
  .question-mark {
    display: inline-block;
    font-size: 12px;
    font-style: italic;
    border: 1px solid #f8f8f8;
    border-radius: 4px;
    padding: 3px;
    background-color: rgba(0,0,0,0.65);
    color: #fff;

    &.light {
      background-color: #f8f8f8;
      color: #949494;
    }
  } 
</style>
