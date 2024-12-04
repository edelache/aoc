import { input, test } from './input/aoc12.js';

let rows;

function parseInput(input) {
  rows = input.split('\n').reduce((acc, line) => {
    const parts = line.split(' ');

    acc.push({
      data: parts[0],
      alt: parts[1].split(',').map(val => parseInt(val))
    });
    return acc;
  }, []);
}

const looseEnds = [];
function fill() {

}

function recurse() {
  recurse();
}

function part1() {
  console.log(rows);
  let max = 0;
  rows.forEach(row => {
    if (row.data.length > max) {
      max = row.data.length;
    }
  });

  recurse() {

  }

  console.log(`max row length: ${max}`)
}

function part2() {

}

parseInput(test);
const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
