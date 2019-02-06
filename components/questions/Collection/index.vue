<template>
  <ul class="q-collection">
    <li v-for="item in models">
      <Link :question="item" target="self"></Link>
      <VoteButton :question="item" size="small"></VoteButton>
    </li>
    <EmptyListMessage v-if="models.length === 0"></EmptyListMessage>
  </ul>
</template>

<script>
  import _ from 'lodash'
  import { Question as QuestionModel } from '~/models/Question'
  import VoteButton from '~/components/questions/VoteButton'
  import Link from '~/components/questions/Link'
  import EmptyListMessage from '~/components/shared/EmptyListMessage'
  import queryString from 'query-string'
  import { TAG_UNEXPECTED } from '~/constants'
  export default {
    name: "q-collection",
    components: { VoteButton, EmptyListMessage, Link },
    props: {
      items: Array, default: []
    },
    data(){
      return {
        models: _.map(this.items, (item) => {
          return new QuestionModel(item)
        })
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
    }
  }
</style>
