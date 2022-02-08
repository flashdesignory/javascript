const single = {
    [1]: 'One',
    [2]: 'Two',
    [3]: 'Three',
    [4]: 'Four',
    [5]: 'Five',
    [6]: 'Six',
    [7]: 'Seven',
    [8]: 'Eight',
    [9]: 'Nine',
  }
  
  const double = {
    [1]: 'Ten',
    [2]: 'Twenty',
    [3]: 'Thirty',
    [4]: 'Forty',
    [5]: 'Fifty',
    [6]: 'Sixty',
    [7]: 'Seventy',
    [8]: 'Eighty',
    [9]: 'Ninety',
  }
  
  const tenth = {
    [11]: 'Eleven',
    [12]: 'Twelve',
    [13]: 'Thirteen',
    [14]: 'Fourteen',
    [15]: 'Fifteen',
    [16]: 'Sixteen',
    [17]: 'Seventeen',
    [18]: 'Eighteen',
    [19]: 'Nineteen',
  }
  
  const getHundreds = (num) => {
    const result = [];
  
    const hundredValue = Math.floor(num / 100);
    if (hundredValue) {
      result.push(single[hundredValue], 'Hundred');
    }
  
    const remainder = num - (hundredValue * 100);
    if (remainder === 0) {
      return result.join(' ');
    }
  
    if (remainder > 10 && remainder < 20) {
      result.push (tenth[remainder]);
      return result.join(' ');
    }
  
    const tenValue = Math.floor((num % 100) / 10);
    const oneValue = num % 10;
  
    if (tenValue > 0 && oneValue > 0) {
      result.push(double[tenValue], single[oneValue]);
      return result.join(' ');
    }
  
    if (tenValue > 0 && oneValue == 0) {
      result.push(double[tenValue]);
      return result.join(' ');
    }
    
    result.push(single[oneValue]);
    return result.join(' ');
  }
  
  
  
  const numberToWords = (num) => {
    if (num === 0) return 'Zero';
  
    const result = [];
    let remainder = 0;
  
    const billionValue = Math.floor(num / 1000000000);
    if (billionValue > 0) {
      result.push(getHundreds(billionValue), 'Billion');
    }
  
    remainder = num - (billionValue * 1000000000);
  
    const millionValue = Math.floor(remainder / 1000000);
    if (millionValue > 0) {
      result.push(getHundreds(millionValue), 'Million');
    }
  
    remainder = remainder - (millionValue * 1000000);
  
    const thousandValue = Math.floor(remainder / 1000);
    if (thousandValue > 0) {
      result.push(getHundreds(thousandValue), 'Thousand');
    }
  
    remainder = remainder - (thousandValue * 1000);
    if (remainder) {
      result.push(getHundreds(remainder));
    }
    
    return result.join(' ');
  }
  
  // npx jest algorithms/misc/numbertoword.two.js
  describe('numberToWords', () => {
    test('numberToWords()', () => {
      expect(numberToWords(1234567)).toEqual('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
    });
  });
  