const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const aspectRatio = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

const getNewWidth = (width, height, targetHeight) => (width / height) * targetHeight;

const getNewHeight = (width, height, targetWidth) => (height / width) * targetWidth;

// npx jest utils/image.js
test('aspectRatio', () => {
  expect(aspectRatio(1920, 1080)).toEqual('16:9');
});

test('getNewWidth', () => {
  expect(getNewWidth(1920, 1080, 337.5)).toEqual(600);
});

test('getNewHeight', () => {
  expect(getNewHeight(1920, 1080, 600)).toEqual(337.5);
});
