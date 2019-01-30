/*
 * @title: History with Stack
 * @description:Simple Undo / Redo with Stack
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class StackWithLimit {
  constructor(limit = 10) {
    this.data = {};
    this.last = 0;
    this.first = 0;
    this.limit = limit;
  }

  push(value) {
    this.data[this.last] = value;
    this.last++;
    if (this.last - this.first > this.limit) {
      delete this.data[this.first];
      this.first++;
    }
  }

  pop() {
    const temp = this.data[this.last - 1];
    delete this.data[this.last - 1];
    this.last--;
    return temp;
  }

  peek() {
    return this.data[this.last - 1];
  }

  empty() {
    return this.last === this.first;
  }

  reset() {
    this.data = {};
    this.last = 0;
    this.first = 0;
  }

  print(key) {
    const result = [];
    let count = this.first;
    while (count < this.last) {
      if (key) {
        result.push(this.data[count++][key]);
      } else {
        result.push(this.data[count++]);
      }
    }
    return result;
  }
}

class History {
  constructor(limit = 10) {
    this.limit = limit;
    this.undoStack = new StackWithLimit(limit);
    this.redoStack = new StackWithLimit(limit);
  }

  push(value) {
    this.undoStack.push(value);
    this.redoStack.reset();
  }

  empty(stack) {
    if (stack === 'undo') return this.undoStack.empty();
    if (stack === 'redo') return this.redoStack.empty();
    return null;
  }

  undo(value) {
    if (this.undoStack.empty()) return null;
    this.redoStack.push(value);
    return this.undoStack.pop();
  }

  redo(value) {
    if (this.redoStack.empty()) return null;
    this.undoStack.push(value);
    return this.redoStack.pop();
  }

  print(key) {
    console.log(`undo: ${this.undoStack.print(key)}`);
    console.log(`redo: ${this.redoStack.print(key)}`);
  }
}

// npx jest datastructures/stack.history.js
describe('it should implement undo and redo', () => {
  const history = new History(5);
  let countValue = 0;

  function updateHistory() {
    history.push({ count: countValue });
    // history.print('count');
  }

  function increment() {
    updateHistory();
    countValue++;
    return countValue;
  }

  function decrement() {
    updateHistory();
    countValue--;
    return countValue;
  }

  function undo() {
    const temp = history.undo({ count: countValue });
    if (temp) {
      countValue = temp.count;
      // history.print('count');
    }
    return temp;
  }

  function redo() {
    const temp = history.redo({ count: countValue });
    if (temp) {
      countValue = temp.count;
      // history.print('count');
    }
    return temp;
  }

  increment();
  increment();
  increment();
  increment();
  increment();
  increment();
  increment();
  increment();
  increment();
  increment();

  it('undo once.. ', () => {
    expect(undo().count).toEqual(9);
  });
  it('undo once.. ', () => {
    expect(undo().count).toEqual(8);
  });
  it('redo once.. ', () => {
    expect(redo().count).toEqual(9);
  });
  it('decrement once.. ', () => {
    expect(decrement()).toEqual(8);
  });
});
