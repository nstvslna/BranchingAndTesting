let hamming = require('../index.js').hamming;
let assert = require('chai').assert;

describe('HammingCode', function() {
  
  describe('#calculateChecksum()', function() {
    it('should return correct checksum for a valid 7-bit array', function() {
      const data = [1, 0, 1, 0, 1, 0, 1];
      const checksum = hamming.calculateChecksum(data);
      assert.equal(checksum, 1); // XOR всіх бітів: 1 XOR 0 XOR 1 XOR 0 XOR 1 XOR 0 XOR 1 = 1
    });

    it('should throw an error if the input is not a 7-bit array', function() {
      const invalidData = [1, 0, 1, 0];
      assert.throws(() => hamming.calculateChecksum(invalidData), Error, "calculateChecksum: input must be a 7-bit array");
    });
  });

  describe('#verifyChecksum()', function() {
    it('should return true if checksum is valid', function() {
      const data = [1, 0, 1, 0, 1, 0, 1];
      const checksum = hamming.calculateChecksum(data);
      const result = hamming.verifyChecksum(data, checksum);
      assert.equal(result, true); // Якщо контрольна сума не змінилася, має повернути true
    });

    it('should return false if checksum is invalid', function() {
      const data = [1, 0, 1, 0, 1, 0, 1];
      const validChecksum = hamming.calculateChecksum(data);
      const invalidChecksum = validChecksum === 1 ? 0 : 1; // змінюємо контрольну суму
      const result = hamming.verifyChecksum(data, invalidChecksum);
      assert.equal(result, false); // Має повернути false, оскільки контрольна сума змінена
    });

    it('should throw an error if the input is not a 7-bit array', function() {
      const data = [1, 0, 1, 0]; // неправильний масив
      const validChecksum = 1; // контрольна сума для тесту
      assert.throws(() => hamming.verifyChecksum(data, validChecksum), Error, "verifyChecksum: input must be a 7-bit array");
    });
  });

});

