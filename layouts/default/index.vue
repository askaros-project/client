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
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import LoginModal from "./LoginModal"
export default {
	name: "MainLayout",
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
