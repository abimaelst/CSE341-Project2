const router = require('express').Router()
const usersRoute = require('./users')
const productsRoute = require('./products')
const swaggerRoute = require('./swagger')

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World')

})

router.use('/users', usersRoute)
router.use('/products', productsRoute)
router.use('/', swaggerRoute)

module.exports = router