import { input, test } from './input/aoc3.js';

function isNumeric(s) {
  return Number.isInteger(parseInt(s));
}

const numbers = [];
const symbols = [];

const part1 = (input) => {
  let lines = input.split('\n');
  let y = 0;
  lines.forEach((line) => {
    let regEx = /\d+/g;
    let match;
    while ((match = regEx.exec(line)) != null) {
      const x = match.index;
      numbers.push({
        num: parseInt(match[0]),
        x1: x,
        x2: match[0].length + x-1,
        y
      });
    }
    y++;
  });

  y = 0;

  lines.forEach((line) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] !== '.' && !isNumeric(line[x])) {
        symbols.push ({
          symbol: line[x],
          x,
          y
        })
      }
    }
    y++;
  });

  const parts = [];
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < symbols.length; j++) {
      const symbol = symbols[j];

      if (Math.abs(number.y - symbol.y) <= 1) {
        if (Math.abs(number.x1 - symbol.x) <= 1 || Math.abs(number.x2 - symbol.x) <= 1) {
          parts.push(number);
          sum += number.num;
          break;
        }
      }
    }
  }

  return sum;
}

const part2 = () => {
  let sum = 0;
  for (let j = 0; j < symbols.length; j++) {
    const symbol = symbols[j];

    if (symbol.symbol !== '*') {
      continue;
    }

    let found = 0;
    let firstFind = null;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];

      if (Math.abs(number.y - symbol.y) <= 1) {
        if (Math.abs(number.x1 - symbol.x) <= 1 || Math.abs(number.x2 - symbol.x) <= 1) {
          found++;

          if (found === 2) {
            sum += (firstFind.num * number.num);
          } else {
            firstFind = number;
          }
        }
      }
    }
  }
  return sum;
}

const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
