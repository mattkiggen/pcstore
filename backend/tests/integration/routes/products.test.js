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
  await prisma.category.deleteMany({});
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
      await prisma.product.deleteMany({});
    });

    it('should return a list of products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});
