/*
 * @title: Sleep / Delay
 * @description: wait to execute function with args
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
  await wait(3000);
  return fn(...args);
}

// npx jest utils/sleep.js
test('promisify timeout()', async () => {
  const sum = (a, b) => a + b;
  const result = await sleep(sum, 1, 2);
  expect(result).toEqual(3);
});
