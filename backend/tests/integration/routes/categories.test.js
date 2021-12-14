const request = require('supertest');
const app = require('../../../app');
const prisma = require('../../../lib/prisma');

describe('/api/categories', () => {
  describe('GET /', () => {
    beforeEach(async () => {
      await prisma.category.createMany({
        data: [{ name: 'category1' }, { name: 'category2' }],
      });
    });

    afterEach(async () => {
      await prisma.category.deleteMany();
      await prisma.$disconnect();
    });

    it('should return a list of all categories', async () => {
      const res = await request(app).get('/api/categories');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /', () => {
    afterEach(async () => {
      await prisma.category.deleteMany();
      await prisma.$disconnect();
    });

    it('should create a new record in the database from req.body', async () => {
      const data = {
        name: 'category1',
      };

      const res = await request(app).post('/api/categories').send(data);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('category1');
    });
  });

  it('should return 400 if req.body does not meet validation', async () => {
    const data = {};
    const res = await request(app).post('/api/categories').send(data);
    expect(res.status).toBe(400);
  });
});
