import { input, test, test2 } from './input/aoc1.js';

const part1 = (input) => {
  const lines = input.split('\n');
  const data = lines.reduce((acc, line, index) => {
    acc.push(line.replace(/\D+/g, ''));
    return acc;
  }, []);

  return data.reduce((acc, str) => {
    const val = `${str[0]}${str[str.length-1]}`;
    return acc + parseInt(val, 10);
  }, 0);
}

const numberWords = {
  'nine': '9',
  'eight': '8',
  'seven': '7',
  'six': '6',
  'five': '5',
  'four': '4',
  'three': '3',
  'two': '2',
  'one': '1',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2',
  '1': '1',
  '0': '0',
}

const part2 = (input) => {
  const lines = input.split('\n');

  const data = lines.reduce((acc, line) => {
    const newLine = Object.entries(numberWords).reduce((newLine, [word, number]) => {
      let pos = 0
      while (pos !== -1) {
        pos = line.indexOf(word, pos);
        if (pos !== -1) {
          newLine[pos] = number;
          pos += 1;
        }
      }
      return newLine;
    }, []);
    acc.push(newLine.join(''));
    return acc;
  }, []);

  return data.reduce((acc, str) => {
    const val = `${str[0]}${str[str.length-1]}`;
    return acc + parseInt(val, 10);
  }, 0);
}

const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2(input);
console.log(`Part 2: `, part2answer);
