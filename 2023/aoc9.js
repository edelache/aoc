import { input, test } from './input/aoc9.js';

function diffs(seq, trail=[seq]) {
  const nextSeq = [];
  let allSame = true;
  let allZero = true;
  let last = null;
  for (let i = 0; i < seq.length-1; i++) {
    const val = seq[i+1] - seq[i];
    if (val !== 0) {
      allZero = false;
    }
    nextSeq.push(val);
    if (last != null) {
      if (last !== val) {
        allSame = false;
      }
    }

    last = val;
  }

  trail.push(nextSeq);

  if (allZero) {
    return trail;
  }

  return diffs(nextSeq, trail);
}

let nums;

function part1(input) {
  nums = input.split('\n').map(line => line.split(' ').map(val => parseInt(val)));
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    const bigSeq = diffs(nums[i]);
    bigSeq[bigSeq.length-1].push(0);
    let prev = 0;

    for (let j = bigSeq.length-2; j >= 0; j--) {
      prev = bigSeq[j][bigSeq[j].length-1] + prev;
      bigSeq[j].push(prev);
    }

    sum += prev;
  }
  return sum;
}

function part2(input) {
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    const bigSeq = diffs(nums[i]);
    bigSeq[bigSeq.length-1].unshift(0);
    let prev = 0;

    for (let j = bigSeq.length-2; j >= 0; j--) {
      prev = bigSeq[j][0] - prev;
      bigSeq[j].unshift(prev);
    }

    sum += prev;
  }
  return sum;
}


const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
