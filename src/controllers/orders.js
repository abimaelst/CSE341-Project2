const { ObjectId } = require('mongodb');
const mongodb = require('../data/database')

const getAll = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const db = mongodb.getDatabase().db();
    const result = await db.collection('orders').find().toArray();
    res.status(200).json({ orders: result });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving orders', error: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const db = mongodb.getDatabase().db();
    const orderId = new ObjectId(req.params.id);
    const result = await db.collection('orders').findOne({ _id: orderId });

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order: result });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving order', error: err.message });
  }
};

const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const order = {
      customerName: req.body.customerName,
      orderItems: req.body.orderItems,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      created_by: req.body.created_by,
      created_at: new Date()
    };

    const db = mongodb.getDatabase().db();
    const result = await db.collection('orders').insertOne(order);

    if (!result.acknowledged) {
      throw new Error('Error creating order');
    }

    order._id = result.insertedId;
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

const updateOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const orderId = new ObjectId(req.params.id);
    const order = {
      customerName: req.body.customerName,
      orderItems: req.body.orderItems,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      created_by: req.body.created_by,
      updated_at: new Date()
    };
    //#swagger.tags=['Orders']
    const db = mongodb.getDatabase().db('your_database_name');
    const result = await db.collection('orders')
      .updateOne({ _id: orderId }, { $set: order });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const orderId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection('orders').deleteOne({ _id: orderId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder
};