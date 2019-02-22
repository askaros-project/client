<template>
  <ul class="q-collection">
    <li v-for="item in models">
      <Link :question="item" target="self"></Link>
      <VoteButton :question="item" size="small"></VoteButton>
    </li>
    <EmptyListMessage v-if="models.length === 0"></EmptyListMessage>
    <li class="footer-wrap">
      <Spin v-if="isFetching" noMask class="loading" />
      <slot name="footer"></slot>
    </li>
  </ul>
</template>

<script>
  import _ from 'lodash'
  import { Question as QuestionModel } from '~/models/Question'
  import VoteButton from '~/components/questions/VoteButton'
  import Link from '~/components/questions/Link'
  import EmptyListMessage from '~/components/shared/EmptyListMessage'
  import Spin from '~/components/shared/Spin'
  import queryString from 'query-string'
  export default {
    name: "q-collection",
    components: { VoteButton, EmptyListMessage, Link, Spin },
    props: {
      type: String,
      pageSize: {Number, default: 15},
      initData: {Object, default: {}}
    },
    data(){
      return {
        isFetching: false,
        total: this.initData.total,
        page: this.initData.pageIndex || 1,
        models: _.map(this.initData.questions, (item) => {
          return new QuestionModel(item)
        })
      }
    },
    methods: {
      hasMore() {
        return this.total >= this.page  * this.pageSize
      },
      fetchMore(callback) {
        if (!this.isFetching && this.hasMore()) {
          this.isFetching = true
          this.$http.get(`questions/collection/${this.type}?limit=${this.pageSize}&offset=${this.page * this.pageSize}`)
            .then((resp) => {
              this.page++
              this.isFetching = false
              this.models = [].concat(this.models, _.map(resp.data.questions, (item) => new QuestionModel(item)))
              if (callback) {
                callback()
              }
            })
            .finally(() => {
              this.isFetching = false
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .q-collection {
    min-height: 100px;
    li {
      margin-bottom: 15px;
      border: 1px dashed #f8f8f8;
      border-width: 0 0 1px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      
      &.footer-wrap {
        position: relative;
        padding: 10px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        .loading {
          padding: 10px;
        }
      }
    }
  }
</style>
