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
		},

    head () {
        return {
          title: this.title,
          meta: [
            { hid: 'google-site-verification', name: 'google-site-verification', content: '3DJw946r2rT19s1wjLrFBcowqzBiE8KqHsozVt9j1Jc' }
          ]
        }
      }

	}
</script>
