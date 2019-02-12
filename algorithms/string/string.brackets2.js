/*
 * @title: String parse brackets
 * @description: simple function to parse brackets out of input
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a string, parse it and return a string array.
   For exmple, string="abc(edf)hij{klmn}opq[rst]uvw"

   1.) The delimitors are (), {}, []. They are in pair.
   output: ["abc", "edf", "hij", "klmn", "opq", "rst", "uvw"]

   2.) If any two consecutive "(" means escaping, that is "((" is actually
   output char "(". It's not part of the delimitor.
   Similar to ")", "{", "}", "[", "]".

   abc(e))df) = ["abc", "e)df"], since the "))" outputs ")".

   3.) if "{" is inside a delimitor pair (), then "{" isn't part of the
   delimitor. Output it as is.

   abc(e{df}}g) = ["abc", "e{df}}g"]
*/


function parseString(str) {
  const options = '(){}[]';
  let position;
  let current = [];
  const stack = [];
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    position = options.indexOf(char);

    if (position === -1) {
      // no option found;
      current.push(char);
      continue; // eslint-disable-line
    }

    if (position % 2 === 0) {
      // found opening bracket
      if (stack.length === 0) {
        stack.push(position + 1);
        result.push(current.join(''));
        current = [];
      } else {
        current.push(char);
      }
    } else {
      // found closing bracket
      // closing bracket in the beginning or
      // without a previous opening bracket
      // push it in and continue
      if (stack.length === 0) {
        current.push(char);
        continue // eslint-disable-line
      }

      const next = str[i + 1];
      const prev = str[i - 1];
      // const close = options[stack[0]];
      const open = options[stack[0] - 1];
      if (next === char) {
        current.push(char);
        continue; // eslint-disable-line
      } else if (prev === char) {
        if (open === '(' && char !== ')') {
          current.push(char);
        }
        continue; // eslint-disable-line
      } else {
        result.push(current.join(''));
        current = [];
        stack.pop();
      }
    }
  }

  if (current.length > 0) {
    result.push(current.join(''));
  }

  return result;
}

// npx jest algorithms/string/string.brackets2.js
describe('parsing out brackets from string', () => {
  it('should remove brackets', () => {
    expect(parseString('abc(edf)hij{klmn}opq[rst]uvw'))
      .toEqual(['abc', 'edf', 'hij', 'klmn', 'opq', 'rst', 'uvw']);
  });
  it('should remove brackets', () => {
    expect(parseString('abc(e))df)'))
      .toEqual(['abc', 'e)df']);
  });
  it('should remove brackets', () => {
    expect(parseString('abc(e{df}}g)'))
      .toEqual(['abc', 'e{df}}g']);
  });
});
