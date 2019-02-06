<template>
  <ul class="related-questions">
    <li v-for="item in items">
      <Link :question="item"></Link>
    </li>
    <EmptyListMessage v-if="isFetched && items.length === 0"></EmptyListMessage>
  </ul>
</template>

<script>
  import _ from 'lodash'
  import { Question as QuestionModel } from '~/models/Question'
  import Link from '~/components/questions/Link'
  import EmptyListMessage from '~/components/shared/EmptyListMessage'
  export default {
    name: "RelatedQuestions",
    components: { Link, EmptyListMessage },
    props: {
      question: Object
    },
    data() {
      return {
        items:[],
        isFetched: false
      }
    },
    mounted() {
      this.$http.get(`questions/collection/related?qid=${this.question._id}`).then((resp) => {
        this.isFetched = true
        this.items = _.map(resp.data.questions, (data) => {
          return new QuestionModel(data)
        })
      })
    }
  }
</script>

<style scoped lang="less">
  .related-questions {
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
