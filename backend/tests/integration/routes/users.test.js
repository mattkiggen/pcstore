const request = require('supertest');
const app = require('../../../app');
const prisma = require('../../../lib/prisma');

describe('/api/users', () => {
  describe('POST /', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
      await prisma.$disconnect();
    });

    it('should insert a new record from req.body', async () => {
      const data = {
        firstName: 'name',
        lastName: 'lastname',
        email: 'email@gmail.com',
        password: 'password123',
      };

      const res = await request(app).post('/api/users').send(data);
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('name');
    });
  });
});
