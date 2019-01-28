<template>
  <section class="container">
    <a-button>{{ title }}</a-button>
  </section>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	export default {
		layout: 'default/index',
		data() {
			return {
				title: 'OPA'
			}
		},

		asyncData(params) {
			return Promise.resolve({title: "ASYNC title"})
		},

		mounted() {
			//
		}
	}
</script>