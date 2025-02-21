const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()

describe('Get Routes Tests', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('dbTest');
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Users Routes', () => {
    it('should get all users', async () => {
      const users = db.collection('users');

      const mockUsers = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'user',
          created_at: new Date().toISOString()
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@test.com',
          role: 'admin',
          created_at: new Date().toISOString()
        }
      ];

      await users.insertMany(mockUsers);
      const allUsers = await users.find().toArray();

      expect(allUsers).toHaveLength(2);
      expect(allUsers.some(user => user.firstName === 'John')).toBeTruthy();
      expect(allUsers.some(user => user.firstName === 'Jane')).toBeTruthy();

      // Cleanup
      await users.deleteMany({
        firstName: { $in: ['John', 'Jane'] }
      });
    });

    it('should get a single user by id', async () => {
      const users = db.collection('users');

      const mockUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        role: 'user',
        created_at: new Date().toISOString()
      };

      const user = await users.insertOne(mockUser);
      const foundUser = await users.findOne({ _id: user.insertedId });

      expect(foundUser).toEqual(mockUser);

      // Cleanup
      await users.deleteOne({ _id: user.insertedId });
    });
  });

  describe('Products Routes', () => {
    it('should get all products', async () => {
      const products = db.collection('products');

      const mockProducts = [
        {
          name: 'Laptop',
          type: 'Electronics',
          value: 999.99,
          quantity: 10,
          created_by: 'John Doe'
        },
        {
          name: 'Desk Chair',
          type: 'Furniture',
          value: 199.99,
          quantity: 5,
          created_by: 'Jane Smith'
        }
      ];

      await products.insertMany(mockProducts);
      const allProducts = await products.find().toArray();

      expect(allProducts).toHaveLength(2);
      expect(allProducts.some(product => product.name === 'Laptop')).toBeTruthy();
      expect(allProducts.some(product => product.name === 'Desk Chair')).toBeTruthy();

      // Cleanup
      await products.deleteMany({
        name: { $in: ['Laptop', 'Desk Chair'] }
      });
    });

    it('should get a single product by id', async () => {
      const products = db.collection('products');

      const mockProduct = {
        name: 'Test Product',
        type: 'Test Type',
        value: 99.99,
        quantity: 1,
        created_by: 'Tester'
      };

      const product = await products.insertOne(mockProduct);
      const foundProduct = await products.findOne({ _id: product.insertedId });

      expect(foundProduct).toEqual(mockProduct);

      // Cleanup
      await products.deleteOne({ _id: product.insertedId });
    });
  });

  describe('Orders Routes', () => {
    it('should get all orders', async () => {
      const orders = db.collection('orders');

      const mockOrders = [
        {
          customerName: 'John Smith',
          orderItems: [
            {
              productId: '123',
              name: 'Laptop',
              quantity: 1,
              price: 999.99
            }
          ],
          totalAmount: 999.99,
          status: 'pending',
          created_by: 'Admin'
        },
        {
          customerName: 'Jane Doe',
          orderItems: [
            {
              productId: '456',
              name: 'Chair',
              quantity: 1,
              price: 199.99
            }
          ],
          totalAmount: 199.99,
          status: 'completed',
          created_by: 'Admin'
        }
      ];

      await orders.insertMany(mockOrders);
      const allOrders = await orders.find().toArray();

      expect(allOrders).toHaveLength(2);
      expect(allOrders.some(order => order.customerName === 'John Smith')).toBeTruthy();
      expect(allOrders.some(order => order.customerName === 'Jane Doe')).toBeTruthy();

      // Cleanup
      await orders.deleteMany({
        customerName: { $in: ['John Smith', 'Jane Doe'] }
      });
    });

    it('should get a single order by id', async () => {
      const orders = db.collection('orders');

      const mockOrder = {
        customerName: 'Test Customer',
        orderItems: [
          {
            productId: '789',
            name: 'Test Product',
            quantity: 1,
            price: 99.99
          }
        ],
        totalAmount: 99.99,
        status: 'pending',
        created_by: 'Tester'
      };

      const order = await orders.insertOne(mockOrder);
      const foundOrder = await orders.findOne({ _id: order.insertedId });

      expect(foundOrder).toEqual(mockOrder);

      // Cleanup
      await orders.deleteOne({ _id: order.insertedId });
    });
  });

  describe('Services Routes', () => {
    it('should get all services', async () => {
      const services = db.collection('services');

      const mockServices = [
        {
          name: 'Computer Repair',
          description: 'Fix computer issues',
          category: 'Tech Support',
          price: 89.99,
          duration: 60,
          availability: true,
          created_by: 'Admin'
        },
        {
          name: 'Data Recovery',
          description: 'Recover lost data',
          category: 'Tech Support',
          price: 149.99,
          duration: 120,
          availability: true,
          created_by: 'Admin'
        }
      ];

      await services.insertMany(mockServices);
      const allServices = await services.find().toArray();

      expect(allServices).toHaveLength(2);
      expect(allServices.some(service => service.name === 'Computer Repair')).toBeTruthy();
      expect(allServices.some(service => service.name === 'Data Recovery')).toBeTruthy();

      // Cleanup
      await services.deleteMany({
        name: { $in: ['Computer Repair', 'Data Recovery'] }
      });
    });

    it('should get a single service by id', async () => {
      const services = db.collection('services');

      const mockService = {
        name: 'Test Service',
        description: 'Test Description',
        category: 'Test Category',
        price: 99.99,
        duration: 30,
        availability: true,
        created_by: 'Tester'
      };

      const service = await services.insertOne(mockService);
      const foundService = await services.findOne({ _id: service.insertedId });

      expect(foundService).toEqual(mockService);

      // Cleanup
      await services.deleteOne({ _id: service.insertedId });
    });
  });
});