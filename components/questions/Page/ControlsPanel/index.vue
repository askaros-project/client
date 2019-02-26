<template>
	<ul class="question-controls">
    <li>
			<a-tooltip placement="top" title="Share on Facebook">
	      <a-icon type="facebook" theme="filled" @click="fbClick"></a-icon>
	    </a-tooltip>
	  </li>
    <li>
			<a-tooltip placement="top" title="Share on Twitter">
				<a-icon type="twitter" @click="twitterClick"></a-icon></a>
			</a-tooltip>
		</li>
		<li>
			<a-tooltip placement="top" title="Share on Reddit">
				<a :href="redditShareUrl" target="_blank">
					<a-icon type="reddit"></a-icon>
				</a>
			</a-tooltip>
		</li>
		<li class="comments-item" @click="toggleComments">
			<a-tooltip placement="top" title="Comments">
	      <a-icon type="message">
	      </a-icon>
	      <span class="num">
	      	{{ question.comments.total || '' }}
	      </span>
	    </a-tooltip>
	  </li>
	</ul>
</template>

<script>
	import { observer } from "mobx-vue"
	import { message } from "ant-design-vue"
	
  export default observer({
  	name: 'ControlsPanel',
  	props: { question: Object, toggleComments: Function},

  	data() {
  		return {
  			redditShareUrl: ''
  		}
  	},

  	mounted() {
  		this.redditShareUrl = '//www.reddit.com/submit?url=' + location.href
  	},

  	methods: {
			fbClick() {
				if (window.FB) {
					window.FB.ui({
				    method: 'share',
				    display: 'popup',
				    href: location.href,
				  }, function(response){});
				}
			},
			
			twitterClick(e) {
				e.preventDefault()

				var getWindowOptions = function() {
					let width, height, top, left
					if (window.innerWidth > 500) {
						width = 500
						left = (window.innerWidth / 2) - (width / 2)
					} else {
						width = window.innerWidth
						left = 0
					}
					if (window.innerHeight > 350) {
						height = 350
						top = (window.innerHeight / 2) - (height / 2)
					} else {
						height = window.innerHeight
						top = 0
					}
				  return [
				    'resizable,scrollbars,status',
				    'height=' + height,
				    'width=' + width,
				    'left=' + left,
				    'top=' + top
				  ].join()
				}

				const shareUrl = 'https://twitter.com/intent/tweet?hashtags=askaros&text=' +
					this.question.title +'&url=' + location.href
				const win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions())
				win.opener = null
			}
  	},
	})
</script>

<style lang="less" scoped>
	.question-controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

		li {
			opacity: 0.8;
			cursor: pointer;
			&:hover {
				opacity: 1;
			}
			margin: 5px;
			.anticon {
				font-size: 20px;
				color: rgba(0,0,0,0.8);
			}

			&.comments-item {
				font-size: 14px;
				margin-left: 25px;
				position: relative;

				.num {
					margin-top: -5px;
					position: absolute;
					top: 3px;
					left: 20px;
    			font-size: 12px;
				}
			}
		}
	}	
</style>
