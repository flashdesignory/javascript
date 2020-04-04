/*
 * @title: Hit Counter
 * @description: simple solution
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class HitCounter {
  constructor(range = 500) {
    this.range = range;
    this.times = [];
    this.hits = [];

    for (let i = 0; i < range; i++) {
      this.times[i] = 0;
      this.hits[i] = 0;
    }
  }

  hit(time) {
    const index = time % this.range;

    if (this.times[index] !== time) {
      this.times[index] = time;
      this.hits[index] = 1;
    } else {
      this.hits[index]++;
    }
  }

  getHits(time) {
    let result = 0;

    for (let i = 0; i < this.range; i++) {
      if (time - this.times[i] < this.range) {
        result += this.hits[i];
      }
    }

    return result;
  }
}


// npx jest algorithms/misc/hitcounter.js
test('HitCounter', () => {
  const counter = new HitCounter();
  // hit at timestamp 1.
  counter.hit(1);
  // hit at timestamp 2.
  counter.hit(2);
  // hit at timestamp 3.
  counter.hit(3);
  // get hits at timestamp 4, should return 3.
  counter.getHits(4);
  // hit at timestamp 300.
  counter.hit(300);
  // get hits at timestamp 300, should return 4.
  counter.getHits(300);
  // get hits at timestamp 301, should return 3.
  counter.getHits(301);
  counter.hit(301);
  counter.hit(302);
  expect(counter.getHits(302)).toEqual(6);
});
