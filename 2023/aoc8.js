import { LeastCommonMultiple } from '../Utils/Math.js';
import { input, test, test2 } from './input/aoc8.js';

let instructions, guide;
const As = [];
const Zs = [];

const dirLookup = {
  'L': 0,
  'R': 1
}

function step(key, end) {
  let instKey = key;
  let count = 0;

  while (end.indexOf(instKey) === -1) {
    const currInst = instructions[count % instructions.length];
    count++;

    instKey = guide[instKey][dirLookup[currInst]];
  }

  return { key: instKey, count };
}

function parseInput(input) {
  const lines = input.split('\n');
  instructions = lines.shift();
  lines.shift();

  guide = lines.reduce((acc, line) => {
    const [key, vals] = line.split(' = ');
    const cleanedVals = vals.substring(1, vals.length - 1);
    const [left, right] = cleanedVals.split(', ');

    if (key[2] === 'A') {
      As.push(key);
    } else if (key[2] === 'Z') {
      Zs.push(key);
    }

    acc[key] = [ left, right ];
    return acc;
  }, {});
}

function part1(input) {
  parseInput(input);
  if (guide.AAA && guide.ZZZ) {
    const { key, count } = step('AAA', ['ZZZ']);
    return count;
  }
}

function part2() {
  let times = [];
  let product = 1;

  console.log(As)
  console.log(Zs)

  for (let i = 0; i < As.length; i++) {
    const { key, count } = step(As[i], Zs);
    times.push(count);
  }

  return LeastCommonMultiple(times);
}

const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
