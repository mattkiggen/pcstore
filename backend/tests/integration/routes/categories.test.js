const request = require('supertest');
let server;
const prisma = require('../../../lib/prisma');

describe('/api/categories', () => {
  // Need to initialize server before each test otherwise we get an error
  // that server is already listening on PORT
  beforeEach(() => {
    server = require('../../../app');
  });
  afterEach(async () => {
    server.close();
    await prisma.category.deleteMany({});
  });

  describe('GET /', () => {
    it('should return a list of all categories', async () => {
      // create test data
      await prisma.category.createMany({
        data: [{ name: 'category1' }, { name: 'category2' }],
      });

      // test route
      const res = await request(server).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /', () => {
    it('should create a new record in the database from req.body', async () => {
      const data = {
        name: 'category1',
      };
      const res = await request(server).post('/api/categories').send(data);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('category1');
    });
  });

  describe('POST /', () => {
    it('should return 400 if req.body does not meet validation', async () => {
      const data = {};
      const res = await request(server).post('/api/categories').send(data);
      expect(res.status).toBe(400);
    });
  });
});
