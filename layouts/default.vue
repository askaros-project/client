<template>
	<a-layout class="main-layout">
		<Header></Header>
		<Content :type="contentType">
			<slot/>
		</Content>
		<Footer></Footer>
		<login-modal></login-modal>
	</a-layout>
</template>

<script>
import Header from "./default/Header"
import Content from "./default/Content"
import Footer from "./default/Footer"
import LoginModal from "./default/LoginModal"
export default {
	name: "DefaultLayout",
	components: { Header, Content, Footer, LoginModal },
	props: {
		contentType: {
			type: String,
		}
	}
}

</script>

<style lang="less" scoped>
	.main-layout {
		min-height: 100%;
		background-color: #fff;

		.ant-layout-header {
			background-color: #fff;
		}

		.ant-layout-footer {
			border-top: 1px solid #f8f8f8;
		}

		.ant-layout-content {
			flex: 1;
			background-color: #fff;
		}
	}
</style>
