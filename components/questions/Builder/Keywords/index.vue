<template>
  <div class="question-builder-keywords">
    <ul>
      <li v-for="(keyword, index) in keywords">
        <a-tag closable @close="cancel(index)">
        {{ keyword }}
        </a-tag>
      </li>
    </ul>
    <div class="input-wrap">
      <a-input-search
        v-if="inputVisible"
        ref="input"
        type="text"
        v-model="inputText"
        @blur="onInputBlur"
        @keyup.enter.native="onInputSubmit"
      >
        <a-button slot="enterButton" icon="plus" type="primary">
        </a-button>
      </a-input-search>
      <a-tag v-else @click="showInput" class="add-tag-btn">
        <a-icon type="plus"></a-icon> Add keywords
      </a-tag>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: "question-builder-keywords",
    props: {
      keywords: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        inputText: '',
        inputVisible: false
      }
    },
    methods: {
      getValue() {
        const text = _.trim(this.inputText)
        if (text && !this.keywords.length) {
          return [text]
        }
        return this.keywords
      },
      showInput() {
        this.inputVisible = true
        setTimeout(() => {
          this.$refs.input.focus()
        },0)
      },
      onInputSubmit() {
        this.addKeywordFromInput()
        this.inputVisible = true
      },
      onInputBlur() {
        this.addKeywordFromInput()
        this.inputVisible = false
      },
      addKeywordFromInput() {
        const text = _.trim(this.inputText)
        if (text) {
          this.keywords.push(text)
        }
        this.inputText = ''
      },
      cancel(index) {
        this.keywords.splice(index,1)
      }
    }
  }
</script>

<style scoped lang="less">
  .question-builder-keywords {
    li {
      text-align: left;
      line-height: 18px;
      margin-bottom: 5px;
      font-size: 14px;
      color: rgba(0,0,0,0.65);
      &:hover {
        .cancel-icon {
          display: inline-block;
          &:hover {
            opacity: 1;
          }
        }
      }
      .ant-tag {
        margin-bottom: 5px;
      }
    }
    .input-wrap{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 30%;
      .ant-tag {
        background: #fff;
        border-style: dashed;
      }
    }
  }
</style>
