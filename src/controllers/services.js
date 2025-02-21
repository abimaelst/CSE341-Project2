// controllers/services.js
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database')

const getAll = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    const db = mongodb.getDatabase().db('your_database_name');
    const result = await db.collection('services').find().toArray();
    res.status(200).json({ services: result });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving services', error: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const db = mongodb.getDatabase().db('your_database_name');
    const serviceId = new ObjectId(req.params.id);
    const result = await db.collection('services').findOne({ _id: serviceId });

    if (!result) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ service: result });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving service', error: err.message });
  }
};

const createService = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    const service = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      availability: req.body.availability,
      created_by: req.body.created_by,
      created_at: new Date()
    };

    const db = mongodb.getDatabase().db('your_database_name');
    const result = await db.collection('services').insertOne(service);

    if (!result.acknowledged) {
      throw new Error('Error creating service');
    }

    service._id = result.insertedId;
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    res.status(500).json({ message: 'Error creating service', error: err.message });
  }
};

const updateService = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const serviceId = new ObjectId(req.params.id);
    const service = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      availability: req.body.availability,
      created_by: req.body.created_by,
      updated_at: new Date()
    };

    const db = mongodb.getDatabase().db();
    const result = await db.collection('services')
      .updateOne({ _id: serviceId }, { $set: service });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (err) {
    res.status(500).json({ message: 'Error updating service', error: err.message });
  }
};

const deleteService = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const serviceId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection('services').deleteOne({ _id: serviceId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createService,
  updateService,
  deleteService
};