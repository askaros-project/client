import Vue from 'vue'
import VueResource from 'vue-resource'
import { message } from 'ant-design-vue'
import Cookie from 'js-cookie'

Vue.use(VueResource)

Vue.http.options.root = process.env.API_URL

const requestMap = {}
const authToken = Cookie.get('auth_token')

Vue.http.interceptors.push((request, next) => {
  let key
  // abort the same post request
  if (/POST|PUT|DELETE/.test(request.method)) {
    key = `${request.method}${request.url}${JSON.stringify(request.body)}`
    // abort the existed request
    if (key && requestMap[key]) {
      key = null
      setTimeout(() => {
        request.abort()
      })
    } else {
      requestMap[key] = request
    }
  }

  if (authToken) {
    request.headers.set('Authorization', `JWT ${authToken}`)
  }
  next(response => {
    // delete current request in the map
    if (key) {
      delete requestMap[key]
    }
    if (response.status === 401) {
      message.error('Unauthorized')
      if (authToken) {
        Cookie.set('auth_token', '')
        window.location.reload()
      } else {
        window.location = '/'
      }
      return
    }
    if (response.status === 403) {
      message.error('Forbidden')
      window.location = '/'
      return
    }
    if (response.status === 404) {
      message.error('Not found')
      return
    }
    if (response.status === 500) {
      if (response.body && response.body.error && response.body.error.type) {
        message.error(response.body.error.type)
      } else {
        message.error('Internal server error')
      }
      return
    }
    // other errors
    if (!response.ok) {
      message.error(response.data || 'Internal server error')
    }
  })
})
