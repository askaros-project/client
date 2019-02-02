import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', function(value) {
	if (value) {
		return value.toUpperCase()
	}
})

Vue.filter('formatDate', function(value) {
	if (value) {
		return moment(String(value)).format('MM/DD/YYYY hh:mm')
	}
})

Vue.filter('formatDateFromNow', function(value) {
	if (value) {
		return moment(String(value)).fromNow()
	}
})

Vue.filter('striphtml', function(value) {
	var div = document.createElement('div')
	div.innerHTML = value.replace(/<br \/>/g, ' ')
	var text = div.textContent || div.innerText || ''
	return text
})
