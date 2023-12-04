import { input, test } from './input/aoc4.js';

const parseNums = (acc, val) => {
  if (val != '') {
    acc.push(parseInt(val));
  }
  return acc;
}

let cards = [];

function part1(input) {
  const lines = input.split('\n');
  let sum = 0;

  lines.forEach((line, index) => {
    const parts = line.split(': ');
    const parts2 = parts[1].split(' | ');
    const winning = parts2[0].trim().split(' ').reduce(parseNums, []);
    const numbers = parts2[1].trim().split(' ').reduce(parseNums, []);

    let totalWins = 0;
    for (let i = 0; i < winning.length; i++) {
      if (numbers.indexOf(winning[i]) !== -1) {
        totalWins++;
      }
    }

    let points = 0;
    if (totalWins > 0) {
      points = Math.pow(2, (totalWins-1));
    }

    cards.push( {
      id: index + 1,
      winning,
      numbers,
      totalWins,
      points,
      instances: 1
    });

    sum += points
  });

  return sum;
}

function part2() {
  cards.forEach((card, index) => {
    for (let i = 0; i < card.totalWins; i++) {
      cards[index + i + 1].instances += card.instances;
    }
  });

  return cards.reduce((acc, card) => acc += card.instances, 0);
}


const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
