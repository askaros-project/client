export default ({ app }, inject) => {

	let listeners = []

	const isBottom = () => {
    const layoutInnerEl = document.getElementById('__layout').children[0]
    return document.documentElement.scrollTop + window.innerHeight > layoutInnerEl.offsetHeight - 10
  }

  const handleScroll = () => {
  	if (isBottom()) {
  		listeners.forEach((listener) => listener())
  	}
  }

	if (process.client) {
		window.addEventListener('scroll', handleScroll)
	}

  inject('infiniteScroll', {
  	isBottom,

  	addBottomListener(listener) {
  		listeners.push(listener)
  	},

  	removeBottomListener(listener) {
  		const index = listeners.indexOf(listener)
  		if (index !== -1) {
  			listeners.splice(index, 1)
  		}
  	}
  })

}
