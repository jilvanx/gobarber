const express = require('express') // microframework nodejs
const nunjucks = require('nunjucks') // views
const path = require('path') // lida com o caminhos dentro do projeto (windows)

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middleware()
    this.views()
    this.routes()
  }
  middleware () {
    this.express.use(express.urlencoded({ extended: false }))
  }
  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }
  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
