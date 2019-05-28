<template>
    <a-dropdown class="more-dropdown">
      <a-button shape="circle" icon="ellipsis" />
      <a-menu slot="overlay">
        <a-menu-item>
          <a @click="handleMarkAsBlockNotif">Prevent email notifications</a>
        </a-menu-item>
        <a-menu-item>
          <a @click="handleMarkAsSpam">Mark the question as spam</a>
        </a-menu-item>
        <a-menu-item>
          <a @click="handleMarkAsDeleted">Remove this question</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
</template>

<script>
  import {MARK_SPAM, MARK_BLOCK_NOTIF, MARK_DELETED} from '~/constants'
  import { message } from "ant-design-vue"

  export default {
    props: { question: Object},
    methods: {
      handleMarkAsSpam() {
        if (this.$mobx.account.isLoggedIn) {
          this.question.mark(MARK_SPAM, {detailed: true}).then(() => {
            message.success('Success!')
          })
        } else {
          this.$mobx.ui.loginModal.show('signup')
        }
      },

      handleMarkAsBlockNotif() {
        if (this.$mobx.account.isLoggedIn) {
          this.question.mark(MARK_BLOCK_NOTIF, {detailed: true}).then(() => {
            message.success('Success!')
          })
        } else {
          this.$mobx.ui.loginModal.show('signup')
        }
      },

      handleMarkAsDeleted() {
        if (this.$mobx.account.isLoggedIn) {
          this.question.mark(MARK_DELETED, {detailed: true}).then(() => {
            message.success('Success!')
          })
        } else {
          this.$mobx.ui.loginModal.show('signup')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .more-dropdown {
    transform: rotate(90deg);
    position: absolute;
    right: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
  }
</style>
