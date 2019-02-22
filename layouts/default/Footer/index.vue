<template>
	<a-layout-footer class="main-layout-footer" id="footer">
		<ul>
			<li><router-link to="/contacts">Contact Us</router-link></li>
			<li><router-link to="/terms">Terms and Conditions</router-link></li>
			<li><router-link to="/about">About Us</router-link></li>
			<li><router-link to="/collection/unexpected">Unexpected Sentiment</router-link></li>
		</ul>
		<SubscribeForm></SubscribeForm>
	</a-layout-footer>
</template>

<script>
import SubscribeForm from './SubscribeForm'
export default {
	name: "main-layout-footer",
	components: { SubscribeForm },
	methods: {
		
	}
}

</script>

<style lang="less" scoped>
	@import "../../../vars.less";
	.main-layout-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		@media @tabletmax {
      padding: 24px 15px;
    }

		.ant-input-search {
			max-width: 350px;
		}
		ul {
			li {
				display: inline-block;
				margin-right: 15px;
				padding: 5px 0;
				@media @mobile {
					display: block;
		      margin-bottom: 10px;
		    }
			}
		}
	}
</style>
