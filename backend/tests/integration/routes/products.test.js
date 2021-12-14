const request = require('supertest');
const app = require('../../../app');
const prisma = require('../../../lib/prisma');

describe('/api/products', () => {
  describe('GET /', () => {
    it('should return a list of products', async () => {
      const category = await prisma.category.create({
        data: { name: 'category' },
      });
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

      const res = await request(app).get('/api/products');
      await prisma.product.deleteMany({});
      await prisma.category.deleteMany({});

      expect(res.status).toBe(200);
    });
  });
});
