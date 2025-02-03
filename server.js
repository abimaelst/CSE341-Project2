const express = require('express')
const routes = require('./src/routes')
const mongoDb = require('./src/data/database')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 10000

app.use(bodyParser.json())
app.use((req, res, next) => {
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
app.use('/api/v1/', routes)

mongoDb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port, () => console.log(`Database is listining and Nodde is Running on port ${port}`))
  }
})
