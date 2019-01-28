<template>
  <div class="comment">
    <div class="author-row">
      {{ owner.username }} <span>{{ createdAt | formatDateFromNow }}</span>
    </div>
    <div class="text-wrap">
      <p>
        {{ text }}
      </p>
      <div class="controls">
        <a @click="handleReplyClick">Reply</a>
        <a-icon type="like"></a-icon>
        <a-icon type="ellipsis"></a-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: {
      text: String,
      owner: Object,
      createdAt: String,
      replyTo: Object,
    },
    data() {
      return {
        //
      }
    },
    methods: {
      tag() {
        if (this.$mobx.account.isLoggedIn) {
          //
        } else {
          this.$mobx.ui.loginModal.show('signup')
        }
      },
      handleReplyClick() {
        this.$emit('reply')
      }
    }
  }
</script>

<style scoped lang="less">
  .comment {
    padding: 20px 0;
    margin-bottom: 0px;
    .author-row {
      margin-bottom: 10px;
      font-size: 12px;
      color: #949494;
      span {
        color: #ccc;
        padding-left: 5px;
      }
    }
    .text-wrap {
      padding: 0 0 0 10px;
      p {
        font-size: 14px;
        line-height: 16px;
      }
      .controls {
        margin-top: 10px;
        color: #949494;
        font-size: 12px;
        a {
          color: #949494;
          &:hover {
            text-decoration:underline;
          }
        }
      }
      border-left: 1px dotted #ccc;
    }
  }
</style>
