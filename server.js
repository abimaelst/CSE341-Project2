const express = require('express')
const routes = require('./src/routes')
const mongoDb = require('./src/data/database')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 10000

app.use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader(
      'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'
    )

    next()
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
  .use('/api/v1/', routes)

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/',
  (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged Out`)
  })

app.get('/api/v1/callback/github', passport.authenticate(`github`, {
  failureRedirect: '/api/v1/api-docs', session: false
}),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/api/v1')
  }
)

mongoDb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port, () => console.log(`Database is listining and Nodde is Running on port ${port}`))
  }
})
