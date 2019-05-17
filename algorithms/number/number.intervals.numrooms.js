/*
 * @title: number of rooms required
 * @description: Given an array of meeting time intervals consisting
 * of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the
 * minimum number of conference rooms required.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function minMeetingRooms(intervals) {
  const starts = intervals.slice(0).sort((a, b) => a[0] - b[0]);
  const ends = intervals.slice(0).sort((a, b) => a[1] - b[1]);

  let numRooms = 0;
  let endIndex = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (starts[i][0] < ends[endIndex][1]) {
      numRooms++;
    } else {
      endIndex++;
    }
  }

  return numRooms;
}

// npx jest algorithms/number/number.intervals.numrooms.js
describe('return number of rooms needed', () => {
  test('minMeetingRooms()', () => {
    const nums = [[0, 30], [5, 10], [15, 20]];
    expect(minMeetingRooms(nums)).toEqual(2);
  });
});
