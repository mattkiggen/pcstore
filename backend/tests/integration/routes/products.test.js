const request = require('supertest');
let server;
const prisma = require('../../../lib/prisma');

describe('/api/products', () => {
  beforeEach(() => {
    server = require('../../../app');
  });
  afterEach(async () => {
    server.close();
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
  });

  describe('GET /', () => {
    it('should return a list of products', async () => {
      // add data
      const category = await prisma.category.create({
        data: { name: 'category1' },
      });
      await prisma.product.createMany({
        data: [
          {
            title: 'title1',
            productImage: 'image1',
            description: 'description1',
            price: 1,
            productCode: '1234',
            categoryId: category.id,
          },
          {
            title: 'title2',
            productImage: 'image2',
            description: 'description2',
            price: 1,
            productCode: '5678',
            categoryId: category.id,
          },
        ],
      });

      // test route
      const res = await request(server).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});
