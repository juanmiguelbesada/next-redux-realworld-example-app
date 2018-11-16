const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express();

    server.get('/login', (req, res) => {
      return app.render(req, res, '/auth', { action: "login" })
    })

    server.get('/register', (req, res) => {
      return app.render(req, res, '/auth', { action: "register" })
    })

    server.get('/article/:slug', (req, res) => {
      return app.render(req, res, '/article', { slug: req.params.slug })
    })

    server.get('/editor/:slug', (req, res) => {
      return app.render(req, res, '/editor', { slug: req.params.slug })
    })

    server.get('/profile/:username', (req, res) => {
      return app.render(req, res, '/profile', { slug: req.params.username })
    })

    server.get('/profile/:username/favorites', (req, res) => {
      return app.render(req, res, '/profile', { slug: req.params.username, tab: "favorites" })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })