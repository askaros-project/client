<template>
  <a-modal
    class="search-modal"
    :visible="$mobx.ui.searchModal.visible"
    :footer="null"
    @cancel="hide">
    <a-input-search
      ref="search"
      placeholder="Search"
      v-model=value
      v-on:change=change
    />
    <div v-if="isResultsVisible">
      <h2>Search for '{{value}}'</h2>
      <ul v-if="items.length">
          <li v-for="item in items" style="margin-bottom: 5px; max-width: 450px;">
            <Link :question="item" @click="hide"></Link>
          </li>
      </ul>
      <EmptyListMessage v-else title="Nothing found."></EmptyListMessage>
    </div>
  </a-modal>
</template>

<script>
  import { observer } from "mobx-vue"
  import _ from 'lodash'
  import queryString from 'query-string'
  import EmptyListMessage from '~/components/shared/EmptyListMessage'
  import Link from '~/components/questions/Link'

  export default observer({
    components: { EmptyListMessage, Link },
    data() {
      return {
        value: '',
        items: [],
        isResultsVisible: false
      }
    },

    watch: {
      $route() {
        this.hide()
      }
    },

    mounted() {
      this.debounceSearch = _.debounce(this.search.bind(this), 300)
      this.$refs.search.focus()
    },

    methods: {
      hide() {
        this.$mobx.ui.searchModal.hide()
      },

      change(e) {
        if (this.value.length >= 3) {
          this.debounceSearch()
        } else {
          this.isResultsVisible = false
        }
      },

      search() {
        this.$http.get('questions/search?' + queryString.stringify({search: this.value}))
          .then((resp) => {
            if (this.value) {
              this.items = resp.data.questions
              this.isResultsVisible = true
            }
          })
      }
    }
})

</script>

<style lang="less">
  .search-modal{
    top: 0;
    .ant-modal-content {
      min-height: 250px;
      padding: 30px;
    }
    .ant-modal-body {
      background-color: #fff;
    }
}
</style>
