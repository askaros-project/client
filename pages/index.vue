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
      <Collection
        ref="collection"
        type="trending"
        :initData="collectionData">
          <div slot="footer">
            <a-button v-if="loadMode === 'button'" @click="loadMoreClick">Load more</a-button>
          </div>
        </Collection>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as Promise from 'bluebird'
  import Builder from "~/components/questions/Builder"
  import Collection from "~/components/questions/Collection"

  export default {
    name: "home",
    layout: 'default/index',
    components: { Builder, Collection },
    asyncData: ({ params, error }) => {
      return Promise.all([
        Vue.http.get('questions/collection/trending?limit=15').then((resp) => resp.data)
      ]).then(([collectionData]) => {
        return {collectionData}
      }).catch((e) => {
        error({ statusCode: 500, message: 'Some error occured' })
      })
    },
    data() {
      return {
        loadMode: 'auto'
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScrollListener)
      if (this.isBottom()) {
        this.handleSrollToBottom()
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScrollListener)
    },
    methods: {
      isBottom() {
        const layoutInnerEl = document.getElementById('__layout').children[0]
        return document.documentElement.scrollTop + window.innerHeight > layoutInnerEl.offsetHeight - 10
      },
      onScrollListener() {
        if (this.isBottom()) {
          this.handleSrollToBottom()
        }
      },
      handleSrollToBottom() {
        if (this.loadMode !== 'button') {
          this.$refs.collection.fetchMore(() => {
            if (this.$refs.collection.page % 3 === 0 && this.$refs.collection.hasMore()) {
              this.loadMode = 'button'
            }
          })
        }
      },
      loadMoreClick() {
        this.$refs.collection.fetchMore(() => {
          this.loadMode = 'auto'
        })
      }
    }
    
}
</script>

<style lang="less" scoped>
  .home-page {
    max-width: 700px;
    margin: -45px auto 0 auto;
    h1 {
      margin: 75px 0 35px 0;
    }
    .list-wrap {
      display: flex;
      flex-direction: row;
      @media screen and (max-width: 450px) {
        font-size: 14px;
      }
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
