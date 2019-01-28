const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  isLoggedIn: null
})

export const mutations = {
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authToken = null,
      parsed = {}
    if (req.headers.cookie) {
      parsed = cookieparser.parse(req.headers.cookie)
    }
    commit('setLoggedIn', parsed.auth_token ? true : false)
  }
}
