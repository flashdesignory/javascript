/*
 * @title: caesarCipher
 * @description: translate each letter k steps
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function caesarCipher(string, k) {
  const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'];

  const input = string.toLowerCase();
  const result = [];

  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    let index = alphabet.indexOf(letter);
    if (index === -1) {
      result.push(letter);
    } else {
      index += k % 26;
      if (index > 25) index -= 26;
      if (index < 0) index += 26;
      const temp = string[i] === string[i].toUpperCase()
        ? alphabet[index].toUpperCase() : alphabet[index];
      result.push(temp);
    }
  }

  return result.join('');
}

// npx jest algorithms/string/string.caesarcypher.js
test('caesarCipher()', () => {
  expect(caesarCipher('I love JavaScript!', 100)).toEqual('E hkra FwrwOynelp!');
});
