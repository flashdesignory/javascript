/*
 * @title: Observer Pattern
 * @description: Simple example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(obj) {
    this.observers.push(obj);
  }

  unsubscribe(obj) {
    this.observers = this.observers.filter(subscriber => subscriber !== obj);
  }

  notify(data) {
    this.observers.forEach(subscriber => subscriber.update(data));
  }
}

class Observer {
  constructor(id) {
    this.id = id;
  }

  update(data) {
    console.log(this.id, 'update', data);
  }
}

test('patterns.observer', () => {
  console.log = jest.fn();
  const subj = new Subject();
  const o1 = new Observer('foo');
  const o2 = new Observer('bar');
  const o3 = new Observer('baz');
  subj.subscribe(o1);
  subj.subscribe(o2);
  subj.subscribe(o3);
  subj.notify('hello world');
  expect(console.log).toHaveBeenCalledTimes(3);
});
