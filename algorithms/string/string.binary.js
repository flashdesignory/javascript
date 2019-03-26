/*
 * @title: Convert From Binary
 * @description: simple implementation to cnovert binary to string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function binary(str) {
  const parts = str.split(' ');
  const result = [];

  /* using the radix (or base) parameter in parseInt, we can convert the binary
   number to a decimal number while simultaneously converting to a char */

  for (let i = 0; i < parts.length; i++) {
    result.push(String.fromCharCode(parseInt(parts[i], 2)));
  }

  // we then simply join the string
  return result.join('');
}

// npx jest algorithms/string/string.binary.js
test('binary()', () => {
  const str = '01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111';
  expect(binary(str)).toEqual('Aren\'t bonfires fun!?');
});
