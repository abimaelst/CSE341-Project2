const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDatabase().db().collection('users').find();
    const users = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    const users = await result.toArray();

    if (!users[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const { firstName, lastName, email, role, created_at } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      role,
      created_at: created_at || new Date().toISOString()
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

    if (response.acknowledged) {
      return res.status(201).json({
        message: 'User created successfully',
        userId: response.insertedId
      });
    }

    throw new Error('Database operation failed');
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, role, created_at } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      role,
      created_at
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (response.modifiedCount > 0) {
      return res.status(200).json({ message: 'User modified successfully' });
    }

    throw new Error('Database operation failed');
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};