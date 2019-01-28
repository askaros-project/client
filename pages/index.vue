<template>
  <div class="home-page">
    <div v-if="!account.isLoggedIn">
      <h1>The service WHY</h1>
      <div class="list-wrap">
      <ul>
        <li>Get a simple answer to a simple question</li>
        <li>Dont waste time</li>
        <li>Understand trends</li>
        <li>What is in and out</li>
      </ul>
      <ul>
        <li>Explore what is changing</li>
        <li>Erase doubtness</li>
        <li>Know more</li>
      </ul>
    </div>
    </div>
    <h1>
      <span v-if="!account.isLoggedIn">Ask a question</span></h1>
    <Builder></Builder>
    <div style="padding: 0 10px;">
      <h1>Trending questions</h1>
      <Collection type="trending"></Collection>
      <h1>Newest questions</h1>
      <Collection type="newest"></Collection>
      <h1>Unexpected questions</h1>
      <Collection type="unexpected"></Collection>
      <h1>Random questions</h1>
      <Collection type="random"></Collection>
    </div>
  </div>
</template>

<script>
  import Builder from "~/components/questions/Builder"
  import Collection from "~/components/questions/Collection"

  export default {
    name: "home",
    layout: 'default/index',
    components: { Builder, Collection },
    data() {
      return {
        account: this.$mobx.account
      }
    }
}
</script>

<style lang="less" scoped>
  @import "../vars.less";
  .home-page {
    max-width: 700px;
    margin: -45px auto 0 auto;
    h1 {
      margin: 75px 0 35px 0;
    }
    .list-wrap {
      display: flex;
      flex-direction: row;
      ul {
        flex: 1;
        list-style: outside;
        padding: 0 0 0 15px;
        li {
          line-height: 25px;
          font-style: italic;
        }
      }
    }
  } 
</style>
