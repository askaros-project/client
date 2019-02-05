const pkg = require('./package')

module.exports = {
  mode: 'universal',

  env: {
    OPP: 'OPP'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://apis.google.com/js/client:platform.js' },
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlkdr6FNyLSU6rAAOvFtGE3f5x1XW2JYU&libraries=places'
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
    '~/plugins/antd',
    '~/plugins/filters',
    '~/plugins/messages',
    '~/plugins/mobx',
    '~/plugins/http',
    '~/plugins/wysiwyg',
    { src: '~/plugins/highcharts', ssr: false },
    { src: '~/plugins/infinite_scroll', ssr: false },
    { src: '~/plugins/init_load', ssr: false },
    { src: '~/plugins/third_party_load', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
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
      config.APII_URL = 'APPURL'
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
