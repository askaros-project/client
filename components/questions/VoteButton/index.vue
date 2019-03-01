<template>
  <div class="vote-button" v-bind:class="{small: size === 'small'}">
    <div class="controls">
      <span class="stats stats-left">{{ question.votes.yesVoted }}%</span>
      <a-button
        v-bind:class="{
          'yes-btn': true,
          'voted': question.votes.selected && question.votes.selected === VOTE_YES,
          'unvoted': question.votes.selected && question.votes.selected === VOTE_NO
        }"
        :type="question.votes.selected ? 'default' : 'primary'"
        :size="size"
        @click="vote(VOTE_YES)"
        >{{ size === 'large' ? 'YES': 'yes' }}</a-button>
      <a-button
        v-bind:class="{
          'no-btn': true,
          'voted': question.votes.selected && question.votes.selected === VOTE_NO,
          'unvoted': question.votes.selected && question.votes.selected === VOTE_YES
        }"
        :type="question.votes.selected ? 'default' : 'primary'"
        :size="size"
        @click="vote(VOTE_NO)"
        >{{ size === 'large' ? 'NO': 'no' }}</a-button>
      <span class="stats stats-right">{{ question.votes.noVoted }}%</span>
    </div>
    <Spin :no-mask="true" v-if="isPending"></Spin>
    <div v-if="withCount && question.votes.items.length" class="count">
      {{ question.votes.items.length }} vote{{ question.votes.items.length > 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import Component from "vue-class-component"
  import { Observer } from "mobx-vue"
  import Spin from "~/components/shared/Spin"
  import { message } from "ant-design-vue"
  import { VOTE_YES, VOTE_NO } from '~/constants'

  @Observer
  @Component({
    components: { Spin },
    props: {
      question: Object,
      size: {
        type: String,
        default: "large"
      },
      withCount: {
        type: Boolean,
        default: false
      }
    }
  })
  export default class VoteButton extends Vue {
    VOTE_YES = VOTE_YES
    VOTE_NO = VOTE_NO
    isPending = false
    get codeTitle() {
      return this.question.votes.selected ? this.question.votes.selected === VOTE_YES ? 'Yes' : 'No' : ''
    }
    vote(code) {
      if (this.$mobx.account.isLoggedIn) {
        this.isPending = true
        this.question.vote(code, {detailed: true}).then(() => {
          this.isPending = false
          message.success('Success!')  
        })
        .catch(() => {
          this.isPending = false
        })
      } else {
        this.$mobx.ui.loginModal.show('signup')
      }
    }
  }
</script>

<style scoped lang="less">
  .vote-button {
    position: relative;
    .controls {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      .ant-btn {
        &.yes-btn {
          border-right-width: 0;
          border-radius: 20px 0 0 20px;
          margin-left: 3px;
        }
        &.no-btn {
          border-left-width: 0;
          border-radius: 0 20px 20px 0;
          margin-right: 3px;
        }
        &.voted {
          color: #52c41a;
          background-color: #fafafa;
        }
        &.unvoted {
          color: rgba(0,0,0,0.3);
          background-color: #fafafa;
        }
        &[disabled] {
          //
        }
      }
      .stats {
        min-width: 40px;
        color: rgba(0, 0, 0, 0.45);
        text-align: center;
        &.stats-left {
          margin-right: 3px;
          text-align: right;
        }
        &.stats-right {
          margin-left: 3px;
          text-align: left;
        }
      }
    }
    .code-title {
      font-size: 14px;
    }
    &.small {
      .stats {
        height: 24px;
        min-width: 25px;
        font-size: 10px;
        padding: 7px 0 0;
        span {
          min-width: 35px;
        }
      }
    }
    .count {
      font-size: 12px;
      text-align: center;
      margin: 5px 0 0 0;
      font-style: italic;
      position: absolute;
      top: -22px;
      left: 0;
      right: 0;
    }
  }
</style>
