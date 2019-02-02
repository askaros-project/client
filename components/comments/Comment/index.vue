<template>
  <div class="comment">
    <div class="author-row">
      {{ owner.username }}
      <div v-if="replyTo" class="reply-title">
        reply on @{{ replyTo.owner.username }} "{{ replyTo.text | striphtml }}"
      </div>
       <span>{{ createdAt | formatDateFromNow }}</span>
    </div>
    <div class="text-wrap">
      <p v-if="!isSpammed && !isDeleted" v-html="text"></p>
      <p v-else-if="isDeleted">
        <Mark title="Deleted" light icon="close"></Mark>
      </p>
      <p v-else>
        <Mark title="Marked as spam" light></Mark>
      </p>
      <div class="controls" v-if="!isSpammed && !isDeleted">
        <a-tooltip placement="top" title="Reply on this comment">
          <a @click="toggleEditor">Reply</a>
        </a-tooltip>
          <Like
            :count=likes
            :on-click=handleLikeClick style="margin: 0 10px;"
            :active=isLiked></Like>
        <a-dropdown :trigger="['click']">
          <a-icon type="ellipsis"></a-icon>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleMarkAsSpam">Mark the comment as spam</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <Editor
      class="editor"
      v-if="isEditorShown"
      placeholder="Type your reply..."
      btn-text="Reply"
      v-on:submit="handleEditorSubmit"></Editor>
    <div class="replies-wrap">
      <slot name="reply"></slot>
    </div>
  </div>
</template>

<script>
  import Editor from '~/components/comments/Editor'
  import Like from '~/components/comments/Like'
  import { MARK_SPAM, MARK_LIKE } from '~/constants'
  import Mark from '~/components/questions/Mark'
  export default {
    name: "comment",
    components: {Editor, Like, Mark},
    props: {
      text: String,
      owner: Object,
      createdAt: String,
      replyTo: Object,
      likes: Number,
      isLiked: Boolean,
      isSpammed: Boolean,
      isDeleted: Boolean
    },
    data() {
      return {
        isEditorShown: false
      }
    },
    methods: {
      tag() {
        if (!this.$mobx.account.isLoggedIn) {
          return this.$mobx.ui.loginModal.show('signup')
        }
      },
      toggleEditor() {
        if (!this.$mobx.account.isLoggedIn) {
          return this.$mobx.ui.loginModal.show('signup')
        }
        this.isEditorShown = !this.isEditorShown
      },
      handleEditorSubmit(text) {
        this.$emit('reply', text)
        this.isEditorShown = false
      },
      handleMarkAsSpam() {
        this.$emit('mark', MARK_SPAM)
      },
      handleLikeClick() {
        this.$emit('mark', MARK_LIKE)
      }
    }
  }
</script>

<style scoped lang="less">
  .comment {
    padding: 10px 0;
    margin-bottom: 0px;
    .author-row {
      margin-bottom: 10px;
      font-size: 12px;
      color: #949494;
      display: flex;
      flex-direction: row;
      span {
        color: #ccc;
        padding-left: 5px;
      }
      .reply-title {
        margin-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 280px;
      }
    }
    .text-wrap {
      padding: 0 0 0 10px;
      border-left: 1px dotted #ccc;
      p {
        font-size: 14px;
        line-height: 16px;
      }
      .controls {
        margin-top: 10px;
        color: #949494;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        a {
          color: #949494;
          &:hover {
            text-decoration:underline;
          }
        }
        .anticon {
          cursor: pointer;
          opacity: 0.6;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .editor {
      padding: 10px 0 0 10px;
    }
    .replies-wrap {
      margin: 10px 0 0 0;
      padding-left: 10px;
      border-left: 1px dotted #ccc;
      .text-wrap {
        //border-left: none;
      }
    }
  }
</style>
