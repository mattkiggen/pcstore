const request = require('supertest');
const app = require('../../../app');
const prisma = require('../../../lib/prisma');

let category;

beforeAll(async () => {
  category = await prisma.category.create({
    data: { name: 'category' },
  });
});

afterAll(async () => {
  await prisma.category.deleteMany();
  await prisma.$disconnect();
});

describe('/api/products', () => {
  describe('GET /', () => {
    beforeEach(async () => {
      await prisma.product.createMany({
        data: [
          {
            title: 'title1',
            description: 'description1',
            image: 'image1',
            price: 1.99,
            numberInStock: 1,
            categoryId: category.id,
          },
          {
            title: 'title2',
            description: 'description2',
            image: 'image2',
            price: 1.99,
            numberInStock: 1,
            categoryId: category.id,
          },
        ],
      });
    });

    afterEach(async () => {
      await prisma.product.deleteMany();
    });

    it('should return a list of products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /', () => {
    afterEach(async () => {
      await prisma.product.deleteMany();
    });

    it('should insert a new record from req.body', async () => {
      const product = {
        title: 'title1',
        description: 'description1',
        image: 'image1',
        price: 1.99,
        numberInStock: 1,
        categoryId: category.id,
      };
      const res = await request(app).post('/api/products').send(product);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('title1');
    });

    it('should return 400 if req.body does not contain correct data', async () => {
      const product = {};
      const res = await request(app).post('/api/products').send(product);
      expect(res.status).toBe(400);
    });
  });
});
