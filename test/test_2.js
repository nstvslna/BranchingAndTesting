let hamming = require('../index.js').hamming;
let assert = require('chai').assert;

describe('HammingCode', function() {

  it('should be fast enough when encoding many times', function(done) {
    let input = [1, 0, 1, 0];
    let startTime = Date.now();
    for (let i = 0; i < 150000; i++) {
      hamming.encode(input);
    }
    let endTime = Date.now();
    let duration = endTime - startTime;
    assert.isBelow(duration, 1000, 'Encoding 10000 times should take less than 1000ms');
    done();
  });

  it('should be fast enough when decoding many times', function(done) {
    let input = [1, 1, 1, 0, 0, 1, 0];
    let startTime = Date.now();
    for (let i = 0; i < 150000; i++) {
      hamming.decode(input);
    }
    let endTime = Date.now();
    let duration = endTime - startTime;
    assert.isBelow(duration, 1000, 'Decoding 10000 times should take less than 1000ms');
    done();
  });

  it('should reject invalid inputs with an appropriate error message', function() {
    try {
      hamming.encode([1, 0, 'x', 1]); // Неправильний символ
    } catch (err) {
      assert.instanceOf(err, Error);
      assert.match(err.message, /encode input must consist of bits/, 'Error message should mention input format issue');
    }

    try {
      hamming.decode([1, 0, null, 1, 0, 1, 0]); // null у вхідних даних
    } catch (err) {
      assert.instanceOf(err, Error);
      assert.match(err.message, /decode input must consist of bits/, 'Error message should mention input format issue');
    }
  });

  it('should reject encoding when input length is not 4 bits', function() {
    assert.throws(() => hamming.encode([1, 0, 1]), Error, 'HammingCode: encode input must have exactly 4 bits');
    assert.throws(() => hamming.encode([1, 0, 1, 0, 0]), Error, 'HammingCode: encode input must have exactly 4 bits');
  });

  it('should reject decoding when input length is not 7 bits', function() {
    assert.throws(() => hamming.decode([1, 0, 1, 0, 1]), Error, 'HammingCode: decode input must have exactly 7 bits');
    assert.throws(() => hamming.decode([1, 0, 1, 0, 1, 0]), Error, 'HammingCode: decode input must have exactly 7 bits');
  });

  it('should throw an error when invalid characters are used in input (strings, objects, etc.)', function() {
    assert.throws(() => hamming.encode([1, 'string', 0, 1]), Error, 'HammingCode: encode input must consist of bits');
    assert.throws(() => hamming.decode([1, 0, { invalid: true }, 0, 1, 0, 1]), Error, 'HammingCode: decode input must consist of bits');
  });

  it('should throw an error when decoding input contains undefined', function() {
    assert.throws(() => hamming.decode([1, 0, undefined, 0, 1, 0, 1]), Error, 'decode input must consist of bits');
  });
    it('should throw an error when encoding empty input', function() {
  assert.throws(() => hamming.encode([]), Error, 'HammingCode: encode input cannot be empty');
    });


});
