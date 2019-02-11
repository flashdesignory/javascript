/*
 * @title: Array.reduce
 * @description: Examples of Array.reduce function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * Input Value: Required. A function to be run for each element
 * in the array.
 * Return Value: Returns the accumulated result from the last call of the
 * callback function.
 */

// npx jest functional/array.reduce.js
describe('various Array.reduce functions', () => {
  it('should return total of all values', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(values.reduce((acc, value) => acc + value, 0)).toEqual(55);
  });
  it('should return the average all values', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(values.reduce((acc, value, index, arr) => { // eslint-disable-line
      return acc + value / arr.length;
    }, 0)).toEqual(5.5);
  });
  it('should reverse a string', () => {
    const str = 'hello';
    expect(str.split('').reduce((acc, char) => char + acc, '')).toEqual('olleh');
  });
  it('should remove duplicates', () => {
    const values = [1, 2, 4, 2, 4, 1, 3];
    expect(values.reduce((acc, value) => (acc.indexOf(value) === -1
      ? [...acc, value] : acc), [])).toEqual([1, 2, 4, 3]);
  });
  it('should flatten array with spread', () => {
    const values = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    expect(values.reduce((acc, item) => [...acc, ...item], [])).toEqual(
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    );
  });
  it('should flatten array with concat', () => {
    const values = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    expect(values.reduce((acc, item) => acc.concat(item), [])).toEqual(
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    );
  });
  it('should give total weight of all small animals', () => {
    const animals = [
      { name: 'cat', size: 'small', weight: 5 },
      { name: 'dog', size: 'small', weight: 10 },
      { name: 'lion', size: 'medium', weight: 150 },
      { name: 'elephant', size: 'big', weight: 5000 },
    ];
    expect(animals.reduce((acc, animal) => { //eslint-disable-line
      return animal.size === 'small' ? acc + animal.weight : acc;
    }, 0)).toEqual(15);
  });
  it('should compose functions', () => {
    const addOne = n => n + 1;
    const double = n => n * 2;
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    const addOneThenDouble = compose(
      double,
      addOne,
    );
    expect(addOneThenDouble(2)).toEqual(6);
  });
  it('should pipe functions', () => {
    const addOne = n => n + 1;
    const double = n => n * 2;
    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
    const addOneThenDouble = pipe(
      addOne,
      double,
    );
    expect(addOneThenDouble(2)).toEqual(6);
  });
});
