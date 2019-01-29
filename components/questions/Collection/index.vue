<template>
  <ul class="q-collection">
    <li v-for="item in items">
      <Link :question="item" target="self"></Link>
      <VoteButton :question="item" size="small"></VoteButton>
    </li>
    <EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
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
      type: String
    },
    data() {
      return {
        items:[],
        isFetched: false
      }
    },
    mounted() {
      let type = this.type, params = {}
      if (type === 'unexpected') {
        type = 'tag'
        params.code = TAG_UNEXPECTED
      }
      this.$http.get('questions/collection/' + type + '?' + queryString.stringify(params))
      .then((resp) => {
        this.isFetched = true
        let models = _.map(resp.body.questions, (data) => {
          return new QuestionModel(data)
        })
        this.items = models
      })
    },
    methods: {
      
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
