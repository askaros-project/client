<template>
  <div class="home-page">
    <div v-if="!$mobx.account.isLoggedIn">
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
      <span v-if="!$mobx.account.isLoggedIn">Ask a question</span></h1>
    <Builder></Builder>
    <div style="padding: 0 10px;">
      <h1>Trending questions</h1>
      <Collection :items="trendingCollection"></Collection>
      <h1>Newest questions</h1>
      <Collection :items="newestCollection"></Collection>
      <h1>Unexpected questions</h1>
      <Collection :items="unexpectedCollection"></Collection>
      <h1>Random questions</h1>
      <Collection :items="randomCollection"></Collection>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as Promise from 'bluebird'
  import Builder from "~/components/questions/Builder"
  import Collection from "~/components/questions/Collection"
  import { TAG_UNEXPECTED } from '~/constants'

  export default {
    name: "home",
    layout: 'default/index',
    components: { Builder, Collection },
    asyncData: ({ params, error }) => {
      return Promise.all([
        Vue.http.get('questions/collection/trending').then((resp) => resp.data.questions),
        Vue.http.get('questions/collection/newest').then((resp) => resp.data.questions),
        Vue.http.get('questions/collection/tag?code=' + TAG_UNEXPECTED).then((resp) => resp.data.questions),
        Vue.http.get('questions/collection/random').then((resp) => resp.data.questions)
      ]).then(([trendingCollection, newestCollection, unexpectedCollection, randomCollection]) => {
        return {trendingCollection, newestCollection, unexpectedCollection, randomCollection}
      }).catch((e) => {
        error({ statusCode: 500, message: 'Some error occured' })
      })
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
