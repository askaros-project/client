<template>
	<a-layout class="admin-layout">
		<Aside></Aside>
		<a-layout style="background-color: #fff;">
			<Content>
				<slot/>
			</Content>
		</a-layout>
	</a-layout>
</template>

<script>
import Aside from "./admin/Aside"
import Content from "./admin/Content"

export default {
	name: "admin-layout",
	components: { Aside, Content }
}

</script>

<style lang="less">
	.admin-layout {
		height: 100%;

		.ant-layout-content {
			height: 100%;
		}

		.ant-table-pagination {
			padding: 0 10px 10px;
		}
	}
</style>
