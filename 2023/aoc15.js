import { input, test } from './input/aoc15.js';

function hashAlgo(curr, char) {
  curr += char.charCodeAt(0);
  curr *= 17;
  curr %= 256;
  return curr;
}

function computeChunk(chunk) {
  let curr = 0;
  for (let i = 0; i < chunk.length; i++) {
    curr = hashAlgo(curr, chunk[i]);
  }
  return curr;
}

const chunks = [];
const boxes = {};

function part1(input) {
  const parts = input.split(',');
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    const chunk = {
      full: parts[i],
      hashVal: computeChunk(parts[i])
    }

    if (parts[i].indexOf('=') !== -1) {
      const chunkParts = parts[i].split('=');
      chunk.op = '=';
      chunk.label = chunkParts[0];
      chunk.boxNum = computeChunk(chunkParts[0]);
      chunk.focal = parseInt(chunkParts[1]);
    } else {
      const chunkParts = parts[i].split('-');
      chunk.op = '-';
      chunk.label = chunkParts[0];
      chunk.boxNum = computeChunk(chunkParts[0]);
    }

    chunks.push(chunk);
    sum += chunk.hashVal;
  }
  return sum;
}

const ops = {
  '=': ({ boxNum, label, focal }) => {
    if (!boxes[boxNum].lensMap[label]) {
      boxes[boxNum].lenses.push(label);
    }
    boxes[boxNum].lensMap[label] = focal;
  },
  '-': ({ boxNum, label }) => {
    if (boxes[boxNum].lensMap[label]) {
      delete boxes[boxNum].lensMap[label];
      boxes[boxNum].lenses.splice(boxes[boxNum].lenses.indexOf(label), 1);
    }
  }
}

function printBoxes() {
  for (let i = 0; i < 256; i++) {
    if (boxes[i].lenses.length) {
      console.log(i, boxes[i]);
    }
  }
  console.log(' ')
}

function calculate() {
  let sum = 0;
  for (let i = 0; i < 256; i++) {
    const box = boxes[i];
    box.value = 0;
    box.lenses.forEach((lens, index) => {
      box.value += box.lensMap[lens] * (index+1) * (i+1);
    });
    sum += box.value;
  }
  return sum;
}

function part2() {
  for (let i = 0; i < 256; i++) {
    boxes[i] = {
      lensMap: {},
      lenses: []
    }
  }
  chunks.forEach(chunk => {
    ops[chunk.op](chunk);
    // printBoxes();
  });

  return calculate();
}


const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
