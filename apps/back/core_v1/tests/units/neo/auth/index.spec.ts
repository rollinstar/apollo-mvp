import { hashPassword, verifyPassword } from '@xcore/neo/auth';

describe('Password Hashing Functions', () => {
  describe('hashPassword', () => {
    it('generates different password hashes for same password', async () => {
      /* Hashes should be different due to different salts */
      const password = 'MySecurePassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      expect(hash1).not.toBe(hash2);
    });

    it('generates valid bcrypt hash', async () => {
      const password = 'MySecurePassword123!';
      const hash = await hashPassword(password);
      expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
    });

    test('generates hash with correct number of rounds', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);
      // Extract rounds from hash
      const rounds = parseInt(hash.split('$')[2]);
      expect(rounds).toBe(10); // Assuming SALT_ROUNDS is 10
    });

    test('handles empty string password', async () => {
      const hash = await hashPassword('');
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
    });

    test('handles long passwords', async () => {
      /* bcrypt's maximum length is 72 */
      const longPassword = 'a'.repeat(72);
      await expect(hashPassword(longPassword)).resolves.not.toThrow();
    });
  });

  describe('verifyPassword', () => {
    test('correctly verifies matching password', async () => {
      const password = 'MySecurePassword123!';
      const hash = await hashPassword(password);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    test('correctly rejects non-matching password', async () => {
      const password = 'MySecurePassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hash = await hashPassword(password);

      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });
});
