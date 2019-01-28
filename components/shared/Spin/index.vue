<template>
  <div v-bind:class="{'spin-wrap': true, 'no-mask': noMask}">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin></a-icon>
    </a-spin>
  </div>
</template>

<script>
export default {
	name: "spin",
  props: {
    noMask: Boolean
  }
}

</script>

<style lang="less" scoped>
	.spin-wrap {
  	 position: absolute;
     top: 0;
     bottom: 0;
     right: 0;
     left: 0;
     background-color: rgba(255, 255, 255, 0.65);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 100;
     &.no-mask {
      background-color: transparent;
     }
	}
</style>
