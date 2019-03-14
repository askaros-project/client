const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const port = process.env.PORT || 3000
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const path = require('path')

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

if (!config.dev) {
  app.use(redirectToHTTPS())
}

app.get('/privacypolicy', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/privacypolicy.html'))
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port)
  consola.ready({
    message: `Server listening on ${port}`,
    badge: true
  })
}
start()
