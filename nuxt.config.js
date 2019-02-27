const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /** Forwarding env vars from heroku config vars **/
  env: {
    APP_NAME: process.env.APP_NAME,
    API_URL: process.env.API_URL,
    FB_APP_ID: process.env.FB_APP_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SITE_URL: process.env.SITE_URL
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://apis.google.com/js/client:platform.js' },
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlkdr6FNyLSU6rAAOvFtGE3f5x1XW2JYU&libraries=places&language=en-US'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~~/node_modules/ant-design-vue/dist/antd.min.css',
    '~/static/styles/reset.css',
    '~/static/styles/app.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/antd',
    '~/plugins/filters',
    '~/plugins/messages',
    '~/plugins/mobx',
    '~/plugins/wysiwyg',
    { src: '~/plugins/highcharts', ssr: false },
    { src: '~/plugins/infinite_scroll', ssr: false },
    { src: '~/plugins/init_load', ssr: false },
    { src: '~/plugins/third_party_load', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', 'cookie-universal-nuxt', '@nuxtjs/style-resources'],

  styleResources: {
    less: ['~/vars.less']
  },
  /*
  ** Axios module configuration
  */
  axios: {
    //
  },

  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true
          }
        ],
        [
          '@babel/plugin-proposal-class-properties',
          {
            loose: true
          }
        ]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
