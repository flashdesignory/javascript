/*
 * @title: Number to Word
 * @description: convert an int to words
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const BILLION = 1000000000;
const MILLION = 1000000;
const THOUSAND = 1000;
const HUNDRED = 100;
const TEN = 10;

const one = (num) => {
  switch (num) {
    case 1: return 'One';
    case 2: return 'Two';
    case 3: return 'Three';
    case 4: return 'Four';
    case 5: return 'Five';
    case 6: return 'Six';
    case 7: return 'Seven';
    case 8: return 'Eight';
    case 9: return 'Nine';
    default:
      return '';
  }
};

const twoLessThan20 = (num) => {
  switch (num) {
    case 10: return 'Ten';
    case 11: return 'Eleven';
    case 12: return 'Twelve';
    case 13: return 'Thirteen';
    case 14: return 'Fourteen';
    case 15: return 'Fifteen';
    case 16: return 'Sixteen';
    case 17: return 'Seventeen';
    case 18: return 'Eighteen';
    case 19: return 'Nineteen';
    default:
      return '';
  }
};

const ten = (num) => {
  switch (num) {
    case 2: return 'Twenty';
    case 3: return 'Thirty';
    case 4: return 'Forty';
    case 5: return 'Fifty';
    case 6: return 'Sixty';
    case 7: return 'Seventy';
    case 8: return 'Eighty';
    case 9: return 'Ninety';
    default:
      return '';
  }
};

const two = (num) => {
  if (num === 0) return '';
  if (num < 10) return one(num);
  if (num < 20) return twoLessThan20(num);

  const tenValue = Math.floor(num / TEN);
  const restValue = num - tenValue * TEN;
  if (restValue !== 0) return `${ten(tenValue)} ${one(restValue)}`;
  return ten(tenValue);
};

const three = (num) => {
  const hundredValue = Math.floor(num / HUNDRED);
  const restValue = num - hundredValue * HUNDRED;

  if (hundredValue !== 0 && restValue !== 0) {
    return `${one(hundredValue)} Hundred ${two(restValue)}`;
  }

  if (hundredValue === 0 && restValue !== 0) {
    return two(restValue);
  }

  if (hundredValue !== 0 && restValue === 0) {
    return `${one(hundredValue)} Hundred`;
  }

  return '';
};

function numberToWords(num) {
  if (num === 0) return 'Zero';

  const billion = Math.floor(num / BILLION);
  const million = Math.floor((num - billion * BILLION) / MILLION);
  const thousand = Math.floor((num - billion * BILLION - million * MILLION) / THOUSAND);
  const rest = num - billion * BILLION - million * MILLION - thousand * THOUSAND;

  let result = '';
  if (billion !== 0) result = `${three(billion)} Billion`;
  if (million !== 0) {
    if (result.length > 0) result += ' ';
    result += `${three(million)} Million`;
  }
  if (thousand !== 0) {
    if (result.length > 0) result += ' ';
    result += `${three(thousand)} Thousand`;
  }
  if (rest !== 0) {
    if (result.length > 0) result += ' ';
    result += three(rest);
  }
  return result;
}

numberToWords(1234567);

// npx jest algorithms/misc/numbertoword.js
describe('numberToWords', () => {
  test('numberToWords()', () => {
    expect(numberToWords(1234567)).toEqual('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
  });
});
