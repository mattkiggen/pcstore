const request = require('supertest');
let server;

describe('/api/products', () => {
  // Need to initialize server before each test otherwise we get an error
  // that server is already listening on PORT
  beforeEach(() => {
    server = require('../../../app');
  });
  afterEach(() => server.close());

  describe('GET /', () => {
    it('should return a list of all products', async () => {
      const res = await request(server).get('/api/products');
      expect(res.status).toBe(200);
    });
  });
});
