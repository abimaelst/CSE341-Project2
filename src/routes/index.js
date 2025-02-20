const router = require('express').Router()
const usersRoute = require('./users')
const productsRoute = require('./products')
const swaggerRoute = require('./swagger')
const passport = require('passport')

router.get('/login', passport.authenticate('github'), (req, res) => {

})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/api/v1')

  })
})

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World')

})

router.use('/users', usersRoute)
router.use('/products', productsRoute)
router.use('/', swaggerRoute)

module.exports = router