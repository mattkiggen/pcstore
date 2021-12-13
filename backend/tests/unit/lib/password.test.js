const { hashPassword, isValidPassword } = require('../../../lib/password');

describe('hashPassword', () => {
  it('should return a hashed password of a string password input', async () => {
    const result = await hashPassword('password');
    expect(result).toBeTruthy();
  });
});

describe('isValidPassword', () => {
  it('should return true if a password matches a previously hashed password', async () => {
    const hashed = await hashPassword('password');
    const result = await isValidPassword('password', hashed);
    expect(result).toBe(true);
  });
  it('should return false if a password does not match a previously hashed password', async () => {
    const hashed = await hashPassword('password');
    const result = await isValidPassword('1234', hashed);
    expect(result).toBe(false);
  });
});
