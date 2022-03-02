const single = {
  0: '',
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
};

const double = {
  0: '',
  1: 'Ten',
  2: 'Twenty',
  3: 'Thirty',
  4: 'Forty',
  5: 'Fifty',
  6: 'Sixty',
  7: 'Seventy',
  8: 'Eighty',
  9: 'Ninety',
};

const tenth = {
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fourteen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen',
};

const large = {
  0: '',
  1: '',
  2: 'Thousand',
  3: 'Million',
  4: 'Billion',
};

const getHundreds = (num) => {
  const result = [];

  const hundredValue = Math.floor(num / 100);
  // eslint-disable-next-line
  hundredValue && result.push(single[hundredValue], 'Hundred');

  const remainder = num - (hundredValue * 100);

  if (remainder > 10 && remainder < 20) {
    result.push(tenth[remainder]);
    return result.join(' ').trim();
  }

  const tenValue = Math.floor((num % 100) / 10);
  // eslint-disable-next-line
  tenValue && result.push(double[tenValue]);
  const oneValue = num % 10;
  // eslint-disable-next-line
  oneValue && result.push(single[oneValue]);
  return result.join(' ').trim();
};

const numberToWords = (num) => {
  if (num === 0) return 'Zero';

  const size = 3;
  const values = num.toString().split('');
  const numChunks = Math.ceil(values.length / size);
  const chunks = [];

  for (let i = values.length - 1; i >= 0; i -= size) {
    const end = i + 1;
    const start = i - size + 1 < 0 ? 0 : i - size + 1;
    chunks.push(values.slice(start, end));
  }

  chunks.reverse();
  const result = [];
  for (let i = 0; i < chunks.length; i++) {
    const current = Number(chunks[i].join(''));
    // eslint-disable-next-line
    current && result.push(getHundreds(Number(chunks[i].join(''))), large[numChunks - i]);
  }

  return result.join(' ').trim();
};

// npx jest algorithms/misc/numbertoword.three.js
describe('numberToWords', () => {
  test('numberToWords()', () => {
    expect(numberToWords(1234567)).toEqual('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
  });
});
