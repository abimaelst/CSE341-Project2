const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  //#swagger.tags=['Products]
  const result = await mongodb.getDatabase().db().collection('products').find()
  const users = await result.toArray()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(users)
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Products]
  const productId = new ObjectId(req.params.id)
  const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId })

  const products = await result.toArray()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(products[0])
}

const createProduct = async (req, res) => {
  //#swagger.tags=['Products]
  const {
    name,
    type,
    value,
    quantity,
    created_by } = req.body

  const product = {
    name,
    type,
    value,
    quantity,
    created_by
  }

  const response = await mongodb.getDatabase().db().collection('products').insertOne(product)

  res.setHeader('Content-Type', 'application/json')

  if (response.acknowledged) {
    return res.status(204).json({ message: 'User created' })
  }

  return res.status(500).json(response.error || 'Some error occourred while create the product.')
}

const updateProduct = async (req, res) => {
  //#swagger.tags=['Products]
  const productId = new ObjectId(req.params.id)

  const {
    name,
    type,
    value,
    quantity,
    created_by } = req.body

  const product = {
    name,
    type,
    value,
    quantity,
    created_by
  }

  const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product)

  res.setHeader('Content-Type', 'application/json')

  if (response.modifiedCount > 0) {
    res.status(204).json({ "message": 'User modified sucessefuly' })
    return
  }

  res.status(500).json(response.error || 'Some error occourred while update the product.')
}


const deleteProduct = async (req, res) => {
  //#swagger.tags=['Products]
  const productId = new ObjectId(req.params.id)

  const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId })

  res.setHeader('Content-Type', 'application/json')

  if (response.deletedCount > 0) {
    res.status(204).json({ message: 'Product deleted successefuly.' })
    return
  }

  res.status(500).json(response.error || 'Some error occourred while update a product.')
}


module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
}