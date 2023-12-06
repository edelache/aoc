import { input, test } from './input/aoc5.js';

const instructions = {};
let seeds = [];

const order = [
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location'
];

const mapCache = {
  'seed-to-soil': {},
  'soil-to-fertilizer': {},
  'fertilizer-to-water': {},
  'water-to-light': {},
  'light-to-temperature': {},
  'temperature-to-humidity': {},
  'humidity-to-location': {},
};

const nextStep = {
  'seed-to-soil': 'soil-to-fertilizer',
  'soil-to-fertilizer': 'fertilizer-to-water',
  'fertilizer-to-water': 'water-to-light',
  'water-to-light': 'light-to-temperature',
  'light-to-temperature': 'temperature-to-humidity',
  'temperature-to-humidity': 'humidity-to-location',
  'humidity-to-location': null,
};

const reverseSteps = {
  'seed-to-soil': null,
  'soil-to-fertilizer': 'seed-to-soil',
  'fertilizer-to-water': 'soil-to-fertilizer',
  'water-to-light': 'fertilizer-to-water',
  'light-to-temperature': 'water-to-light',
  'temperature-to-humidity': 'light-to-temperature',
  'humidity-to-location': 'temperature-to-humidity',
};

function toTuples(arr) {
  return arr.reduce(function (acc, a, i) {
    if (i % 2) {
        acc[acc.length - 1].push(a);
    } else {
        acc.push([a]);
    }
    return acc;
  }, []);
}

function findNextVal(src, key) {
  if (mapCache[key][src]) {
    return mapCache[key][src];
  }

  const inst = instructions[key];

  for (let i = 0; i < inst.length; i++) {
    const [destination, source, range] = inst[i];
    const sourceMax = source + range;
    if (src >= source && src <= sourceMax) {
      const dest = destination + (src - source);
      mapCache[key][src] = dest;
      return dest;
    }
  }

  mapCache[key][src] = src;

  return src;
}

function findPrevVal(dest, key) {
  const inst = instructions[key];

  for (let i = 0; i < inst.length; i++) {
    const [destination, source, range] = inst[i];
    const destMax = destination + range - 1;

    if (dest >= destination && dest <= destMax) {
      const src = source + (dest - destination);
      return src;
    }
  }

  return dest;
}

function traverseMap(src, key) {
  const nextVal = findNextVal(src, key);

  if (!nextStep[key]) {
    return nextVal;
  }

  return traverseMap(nextVal, nextStep[key]);
}

function reverseTraverse(dest, key) {
  const prevVal = findPrevVal(dest, key);

  if (!reverseSteps[key]) {
    return prevVal;
  }

  return reverseTraverse(prevVal, reverseSteps[key]);
}

function part1(input) {
  const blocks = input.split('\n\n');
  const seedLine = blocks.shift();
  seeds = seedLine.split(' ')
  seeds.shift();
  seeds = seeds.map(val => parseInt(val));

  blocks.map(block => {
    const parts = block.split(' map:\n');
    instructions[parts[0]] = parts[1].split('\n')
      .map(val => val.split(' ')
        .map(val => parseInt(val)));
  });

  const locations = seeds.map(seed => {
    return traverseMap(seed, 'seed-to-soil');
  });

  return Math.min(...locations);
}

function part2() {
  const sortedLocations = instructions['humidity-to-location'].sort((a, b) => a[0]-b[0]);
  const seedTuples = toTuples(seeds);

  const max = sortedLocations[sortedLocations.length-1][0] + sortedLocations[sortedLocations.length-1][2];
  for (let i = 0; i < max; i++) {
    const seed = reverseTraverse(i, 'humidity-to-location');

    for (let j = 0; j < seedTuples.length; j++) {
      const [minSeed, seedRange] = seedTuples[j];
      if (seed >= minSeed && seed <= (minSeed+seedRange)) {
        return i;
      }
    }
  }
}

const part1answer = part1(input);
console.log(`Part 1: `, part1answer);
const part2answer = part2();
console.log(`Part 2: `, part2answer);
