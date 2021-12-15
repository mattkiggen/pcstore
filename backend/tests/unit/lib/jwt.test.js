const { createToken, decodeToken } = require('../../../lib/jwt');

describe('jwt', () => {
  it('should create a valid JWT', () => {
    const user = { id: 1, email: 'email@gmail.com' };
    const token = createToken(user);
    expect(token).toBeTruthy();
  });

  it('should decode a valid JWT', () => {
    const user = { id: 1, email: 'email@gmail.com' };
    const token = createToken(user);
    const { decoded } = decodeToken(token);
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email');
  });
});
