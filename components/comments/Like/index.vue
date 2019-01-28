<template>
  <a-tooltip placement="top" title="Give a taco">
    <div class="comment-like" v-bind:class="{active: active}" @click=onClick>
      <div class="icon"></div>
      <span v-if="count">{{count}}</span>
    </div>
  </a-tooltip>
</template>

<script>
  export default {
    name: "comment-like",
    props: {
      count: Number,
      onClick: Function,
      active: Boolean
    }
  }
</script>

<style scoped lang="less">
  .comment-like {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 3px;
    }
    .icon {
      background-image: url('/static/images/taco-icon.png');
      background-repeat: no-repeat;
      background-size: contain;
      width: 16px;
      height: 16px;
      display: inline-block;
      opacity: 0.3;
      cursor: pointer;
    }

    &.active { 
      .icon {
        opacity: 0.6;
      }
    }
  }
</style>
