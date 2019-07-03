<template>
	<a-popconfirm v-if="$mobx.account.isLoggedIn" v-on:submit="handleDeleteQuestion" title="Are you sure delete this question?"
		@confirm="handleDeleteQuestion(question)"
		ok-text="Yes"
		cancel-text="No"
		placement="top">
		<a-button icon="delete" shape="circle"></a-button>
	</a-popconfirm>
</template>

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

          <a-popconfirm v-if="$mobx.account.isLoggedIn" @confirm="handleDeleteQuestion(question)" v-on:submit="handleDeleteQuestion" title="Are you sure delete this question?"
          ok-text="Yes"
      		cancel-text="No"
          placement="top">
          Delete
          </a-popconfirm>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
</template>


<script>
  import {MARK_SPAM, MARK_BLOCK_NOTIF} from '~/constants'
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

      handleDeleteQuestion(question) {
      if (this.$mobx.account.isLoggedIn) {
        this.isPending = true
        this.$http.delete('questions/' + question._id).then(() => {
          this.fetch()
        }).catch(() => {
          this.isPending = false
          this.$router.push('/collection/newest/')
          message.success('Success!') // add after this redirection and only own Q can be deleted
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
