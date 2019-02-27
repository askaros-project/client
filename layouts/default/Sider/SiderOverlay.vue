<template>
	<div v-show="!$mobx.ui.sider.collapsed" class="sider-overlay" @click="handleClick"></div>
</template>

<script>
import { observer } from "mobx-vue"
export default observer({
	name: "DefaultLayoutSiderOverlay",
	methods: {
		handleClick() {
			this.$mobx.ui.sider.toggle()
		}
	}
})
</script>

<style lang="less" scoped>
  .sider-overlay {
  	position: fixed;
  	top: 0;
  	right: 0;
  	left: 0;
  	bottom: 0;
  	z-index: 300;
  	background-color: rgba(0,0,0,0.2);
  }
</style>
