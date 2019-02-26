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
	.main-layout-footer {
		display: flex;
		flex-direction: column-reverse;
		align-items: stretch;
		padding: 24px 15px;

		@media @xs {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}

		@media @lg {
			align-items: center;
			padding: 24px 50px;
		}

		ul {
			li {
				margin: 10px 15px 5px 0;
				padding: 5px 0;
				display: block;
				@media @xs {
					margin: 10px 15px 5px 0;
				}
				@media @md {
					display: inline-block;
					margin: 0px 15px 0 0;
		    }
			}
		}
	}
</style>
