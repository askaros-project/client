<template>
	<a-layout-footer class="main-layout-footer" id="footer">
		<ul>
			<li><router-link to="/contacts">Contact</router-link></li>
			<li><router-link to="/terms">Terms</router-link></li>
			<li><router-link to="/about">About Askaros</router-link></li>
			<li><router-link to="/collection/unexpected">Unexpected Sentiment</router-link></li>
			<li><a href="https://www.reddit.com/r/askaros" target="_blank">Discuss</a></li>
</a>
		</ul>
    <p>Askaros data is crowdsourced by open collaboration. Content available under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC-BY-SA-4.0</a> and <a href="https://github.com/askaros-project" target="_blank">source code</a> under <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a>. Help peers by answering yes/no questions.</p>
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
