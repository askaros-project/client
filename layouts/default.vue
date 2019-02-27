<template>
	<a-layout class="layout-wrap">
		<a-layout class="main-layout">
			<div class="slider-trigger" @click="toggleSider">
				<a-icon
					:type="$mobx.ui.sider.collapsed ? 'menu-unfold' : 'menu-fold'"
					:style="$mobx.ui.sider.collapsed ? {} : {color: '#fff'}">
				</a-icon>
			</div>
			<div class="header-wrap">
				<Header />
			</div>
			<div class="content-wrap">
				<Content :type="contentType" />
			</div>
			<Footer></Footer>
			<login-modal></login-modal>
			<search-modal v-if="$mobx.ui.searchModal.visible"></search-modal>
		</a-layout>
		<Sider />
	</a-layout>
</template>

<script>
import Header from "./default/Header"
import Content from "./default/Content"
import Footer from "./default/Footer"
import Sider from './default/Sider'
import LoginModal from "./default/LoginModal"
import SearchModal from "./default/SearchModal"
import { observer } from "mobx-vue"
export default observer({
	name: "DefaultLayout",
	components: { Header, Content, Footer, Sider, LoginModal, SearchModal },
	props: {
		contentType: {
			type: String,
		}
	},
	data() {
		return {
			siderCollapsed: true
		}
	},
	methods: {
		toggleSider() {
			this.$mobx.ui.sider.toggle()
		}
	}
})
</script>

<style lang="less" scoped>

	.layout-wrap {
		min-height: 100%;

		.main-layout {
			min-height: 100%;
			background-color: #fff;

			.header-wrap {
				@media @md_max {
					position: fixed;
					left: 0;
					right: 0;
					z-index: 1;
				}
			}

			.content-wrap {
				flex: 1;
				@media @md_max {
					margin-top: 84px;
				}
			}

			.ant-layout-footer {
				border-top: 1px solid #f8f8f8;
			}

			.slider-trigger {
				position: fixed;
				top: 21px;
				right: 15px;
				font-size: 24px;
				z-index: 3;
				@media @md {
					display: none;
				}
			}
		}
	}
</style>
