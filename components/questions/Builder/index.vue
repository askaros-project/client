<template>
  <div class="question-builder">
    <a-input-group compact>
  <!--    <a-select :default-value="selectedPrefix" @select="onSelect">
        <a-select-option
          v-for="(prefix, index) in prefixes"
          :key="`prefix-${index}`"
          :value="index">
          {{ prefix }}
        </a-select-option>
      </a-select> -->
      <a-input :placeholder="placeholder" ref="input" v-model="inputText"></a-input>
      <div class="buttons">
    <!--    <span class="tip">People should be able to answer<br/>yes or no to your question :)</span> -->
        <a-button type="primary" @click="post" size="large" >Ask</a-button>
      </div>
    </a-input-group>
    <div class="keywords-row">
      <Keywords ref="keywords" :keywords="keywords" class="keywords"></Keywords>
    </div>
  </div>
</template>

// TODO: refactoring - remove unused code and reuse code

<script>
  import _ from 'lodash'
  import Keywords from './Keywords'
  import { message } from "ant-design-vue"
  export default {
    name: "question-builder",
    components: {
      Keywords
    },
    props: {
      autofocus: Boolean
    },
    data() {
      return {
//        prefixes: ['Is it ok','Is it still ok','Is it normal','Is it safe','Are','Should','Do','Is','Will','Can','Does','Has','Did','Should','As',],
//        placeholders: _.shuffle([
//          'Is it ok to listen Justin Bieber',
//          'Is it ok to wear red dress in a wedding',
//          'Is it ok to have two moms',
//          'Is it safe to use cellphone under water',
//          'Is it safe to travel to the moon',
//          'Is it still ok to listen to hard-rock',
//          'Is it still ok to have one wife',
//          'Is it normal to talk to yourself',
//          'Is it normal for cats to snore',
//          'Are you ready for a good time',
//          'Are Spain and Portugal similar',
//          'Should I leave my job',
//          'Should I listen to my heart',
//          'Do you care about fashion',
//          'Do you care about your health',
//          'Is it worth going to university',
//          'Is it dangerous to travel to Mexico',
//          'Will Spain win the world cup',
//          'Will Obama become a president again',
//          'Will Spain win the world cup',
//          'Can Croatia win the world cup',
//          'Can Brazil win the world cup',
//          'Does wearing leather pants make you itch',
//          'Does wearing bikini make you uncomfortable',
//          'Has Britain left the EU?',
//          'Has France ever won the World Cup in Football',
//          'Did Spain win the world cup',
//          'Did France win the world cup',
//          'Should Spain win the world cup',
//          'Should Spain win the world cup',
//          'As there is a next world cup coming could France win again',
//          'As Spain won the world cup could they win it again',
//        ]),
//        selectedPrefix: 0,
        placeholder: 'People should be able to answer yes or no to your question :)',
        inputText: '',
        keywords: []
      }
    },

    mounted() {
      const data = this.getSavedData()
      if (!_.isEmpty(data)) {
    //    this.selectedPrefix = data.selectedPrefix
        this.inputText = data.inputText
        this.keywords = data.keywords
        this.clearSavedData()
      }
  //    this.rotatePlaceholder()
  //    if (this.autofocus) {
  //      this.$refs.input.$el.focus()
  //    }
    },

    methods: {

  //    onSelect(index) {
    //    this.selectedPrefix = index
    //    this.rotatePlaceholder()
  //      setTimeout(() => {
  //        this.$refs.input.$el.focus()
//        }, 0)

//      },

//      rotatePlaceholder() {
//        const prefix = this.prefixes[this.selectedPrefix]
//        let index = _.random(0, this.placeholders.length-1)
//        let placeholder = ''
//        while(!placeholder) {
//          if ( this.placeholders[index].indexOf(prefix) === 0 ) {
//            placeholder = _.trim(this.placeholders[index].replace(prefix, ''))
//          } else {
//            index = index + 1 === this.placeholders.length ? 0 : index + 1
//          }
//        }
//        this.placeholder = placeholder
//      },

      post() {
        if (!this.inputText) {
          this.$refs.input.$el.focus()
          return
        }
        if (this.$mobx.account.isLoggedIn) {
          this.$http.post('questions', {
            title: this.inputText,
            keywords: this.$refs.keywords.getValue()
          }).then((resp) => {
            this.inputText = ''
            this.keywords = []
            this.$mobx.ui.activityCounter.update()
            message.success('Question posted!')
            this.$router.push('/q/' + resp.data.question.uri)
            this.$emit('success')
          })
        } else {
          this.saveInputData()
          this.$mobx.ui.loginModal.show('signup')
        }
      },

      saveInputData() {
        const data = {
          inputText: this.inputText,
          keywords: this.$refs.keywords.getValue()
        }
        localStorage.setItem('builder', JSON.stringify(data))
      },

      getSavedData() {
        let data = localStorage.getItem('builder')
        if (data) {
          try {
            data = JSON.parse(data)
          } catch(e) {
            data = {}
          }
        } else {
          data = {}
        }
        return data
      },

      clearSavedData() {
        localStorage.setItem('builder', '')
      }
    }
  }
</script>

<style lang="less">
  .question-builder {
    .ant-input-group {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;

/*      .ant-select-selection {
        border-right-width: 0;
        border-radius: 20px 0px 0px 20px !important;
        width: 125px;
        text-align: center;
        height: 44px;
        background-color: #F8F8F8;

        .ant-select-selection-selected-value {
          margin-top: 5px;
        }
      } */

      .ant-input {
        width: calc(100% - 125px);
        border-radius: 20px 20px 20px 20px !important;
        height: 44px;
        text-align: center;
      }

      .buttons {
        text-align: right;
        font-size: 14px;
        color: rgba(0,0,0,0.45);
        margin: 3px 0 0 10px;
        .tip {
          padding: 5px 10px 0 10px;
          text-align: right;
        }

    }

    .keywords-row {
      display: flex;
      flex-direction: row;
      }
      .keywords {
        flex: 2;
      }


    }
  }
</style>
