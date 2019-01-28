<template>
  <span class="empty-list-message">
    {{ title }}
  </span>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'No items yet'
      }
    },
    name: "empty-list-message"
  }
</script>

<style scoped>
  .empty-list-message{
    font-size: 14px;
    color: rgba(0,0,0,0.4);
  }
</style>
