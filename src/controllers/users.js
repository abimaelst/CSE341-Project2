const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  //#swagger.tags=['Users]
  const result = await mongodb.getDatabase().db().collection('users').find()
  const users = await result.toArray()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(users)
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Users]
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId })

  const users = await result.toArray()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(users[0])
}

const createUser = async (req, res) => {
  //#swagger.tags=['Users]
  const {
    firstName,
    lastName,
    email,
    role,
    created_at } = req.body

  const user = {
    firstName,
    lastName,
    email,
    role,
    created_at
  }

  const response = await mongodb.getDatabase().db().collection('users').insertOne(user)

  res.setHeader('Content-Type', 'application/json')

  if (response.acknowledged) {
    return res.status(204).json({ message: 'User created' })
  }

  return res.status(500).json(response.error || 'Some error occourred while create the user.')
}

const updateUser = async (req, res) => {
  //#swagger.tags=['Users]
  const userId = new ObjectId(req.params.id)

  const {
    firstName,
    lastName,
    email,
    role,
    created_at } = req.body

  const user = {
    firstName,
    lastName,
    email,
    role,
    created_at
  }

  const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user)

  res.setHeader('Content-Type', 'application/json')

  if (response.modifiedCount > 0) {
    res.status(204).json({ "message": 'User modified sucessefuly' })
    return
  }

  res.status(500).json(response.error || 'Some error occourred while update the user.')
}


const deleteUser = async (req, res) => {
  //#swagger.tags=['Users]
  const userId = new ObjectId(req.params.id)

  const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId })

  res.setHeader('Content-Type', 'application/json')

  if (response.deletedCount > 0) {
    res.status(204).json({ message: 'User deleted successefuly.' })
    return
  }

  res.status(500).json(response.error || 'Some error occourred while update the contant.')
}


module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
}