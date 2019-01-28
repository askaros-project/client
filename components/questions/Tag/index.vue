<template>
  <div class="tag" v-bind:class="{selected: selected}">
    <a-tag @click="tag" :color="color">
      {{ title }}
      <span class="value">({{ count }})</span>
    </a-tag>
    
  </div>
</template>

<script>
  export default {
    name: "tag",
    props: {
      code: Number,
      title: String,
      count: {type: Number, default: 0},
      selected: Boolean,
      isTagged: Boolean
    },
    data() {
      return {
        //
      }
    },
    computed: {
      color() {
        return this.selected ? 'green' : this.isTagged ? 'blue' : ''
      }
    },
    methods: {
      tag() {
        if (this.$mobx.account.isLoggedIn) {
          this.$emit('tag', this.code)
        } else {
          this.$mobx.ui.loginModal.show('signup')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .tag {
    margin: 10px 20px 0 0;
    cursor: pointer;
    .value {
      min-width: 40px;
      text-align: center;
      border-radius: 0 4px 4px 0;
      border-left-width: 0;
    }
  }
</style>
