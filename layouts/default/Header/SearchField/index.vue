<template>
	<a-popover
    :title="() => 'Search for \'' + value + '\''"
    :visible="isResultsVisible"
  >
		<div class="search-field" v-bind:class="{ collapsed: isCollapsed }">
			<div>
				<a-icon type="search" @click=toggle></a-icon>
				<a-input ref="search" v-on:blur=toggle v-model=value v-on:change=change placeholder="Search"></a-input>
			</div>
		</div>
		<div slot="content">
			<ul v-if="items.length">
					<li v-for="item in items" style="margin-bottom: 5px; max-width: 450px;">
						<Link :question="item"></Link>
					</li>
			</ul>
			<EmptyListMessage v-else title="Nothing found."></EmptyListMessage>
		</div>
	</a-popover>
</template>

<script>
import _ from 'lodash'
import queryString from 'query-string'
import EmptyListMessage from '~/components/shared/EmptyListMessage'
import Link from '~/components/questions/Link'
export default {
	name: "search-field",
	components: { EmptyListMessage, Link },
	data() {
		return {
			isCollapsed: true,
			isResultsVisible: false,
			value: '',
			items: []
		}
	},
	mounted() {
		this.debounceSearch = _.debounce(this.search.bind(this), 300)
	},
	methods: {
		toggle() {
			this.isCollapsed = !this.isCollapsed
			if (!this.isCollapsed) {
				setTimeout(() => {
					this.$refs.search.focus()
				})
			} else {
				this.value = ''
				this.isResultsVisible = false
			}
		},
		change(e) {
			if (this.value.length >= 3) {
				this.debounceSearch()
			}
		},
		search() {
			this.$http.get('questions/search?' + queryString.stringify({search: this.value}))
				.then((resp) => {
					if (this.value) {
						this.items = resp.body.questions
						this.isResultsVisible = true
					}
				})
		}
	}
}

</script>

<style lang="less" scoped>
	.search-field {
		overflow: hidden;
		> div {
			display: flex;
			flex-direction: row;
			align-items: center;
			transform: translateX(0px);
		}

		&.collapsed {
			> div {
				transform: translateX(calc(100% - 16px));
			}
		}

		.anticon {
			cursor: pointer;
			opacity: 0.6;
			&:hover {
				opacity: 1;
			}
		}

		.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
      border-right-width: 0 !important;
    }

    input {
      background-color: transparent !important;
      border-width: 0 0 0 0 !important;
      border-radius: 0;
      border-right-color: transparent !important;
    }
    input:hover {
      border-right-width: 0 !important;
      border-color: #d9d9d9 !important;
    }
    input:focus {
      box-shadow: none;
      border-right-width: 0 !important;
    }
	}
</style>
