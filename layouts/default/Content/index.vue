<template>
	<a-layout-content v-bind:class="classObject">
		<nuxt/>
	</a-layout-content>
</template>

<script>

export default {
	name: "main-layout-content",
	props: {
		type: {
			type: String,
			default: 'default'
		}
	},
	computed: {
		classObject() {
			return {
				'main-layout-content': true,
				centered: this.type === 'centered',
				default: this.type !== 'centered'
			}
		}
	}
}

</script>

<style lang="less" scoped>

	.main-layout-content {
		background-color: #fff;
	}

	.main-layout-content.default {
		margin-bottom: 25px;
		width: 100%;
		padding: 0 15px;

		@media @lg {
      width: 960px;
      margin: 0px auto;
      padding: 25px 50px;
    }
	}
	.main-layout-content.centered {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
