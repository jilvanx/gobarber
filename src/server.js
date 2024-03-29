const express = require('express') // microframework nodejs
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const nunjucks = require('nunjucks') // views
const path = require('path') // lida com o caminhos dentro do projeto (windows)
const flash = require('connect-flash') // lida com o caminhos dentro do projeto (windows)

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
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
        }),
        saveUninitialized: true
      })
    )
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
