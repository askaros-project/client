<template>
  <div class="logo">
    <span>{{ appName }}</span>
  </div>
</template>

<script>
  export default {
    name: "logo",
    data() {
      return {
        appName: process.env.APP_NAME
      }
    }
  }
</script>

<style scoped>
.logo{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    line-height: initial;
    font-weight: 400;
    font-size: 24px;
    font-style: italic;
    cursor: pointer;
}
</style>
