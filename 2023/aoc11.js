import _ from 'lodash';
import { input, test } from './input/aoc11.js';
import { CardinalDistance } from '../Utils/Math.js';

const galaxies = [];
const emptyRows = [];
const emptyCols = [];

let grid;

function findGalaxies() {
  let id = 1;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '#') {
        galaxies.push({x, y, exX: x, exY: y, galaxyId: id++});
      }
    }
  }
}

function parseInput(input) {
  grid = input.split('\n').map(row => row.split(''));

  for (let y = 0; y < grid.length; y++) {
    let x;
    for (x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== '.') {
        break;
      }
    }
    if (x === grid[0].length) {
      emptyRows.push(y);
    }
  }

  for (let x = 0; x < grid[0].length; x++) {
    let y;
    for (y = 0; y < grid.length; y++) {
      if (grid[y][x] !== '.') {
        break;
      }
    }
    if (y === grid.length) {
      emptyCols.push(x);
    }
  }

  findGalaxies();
}


function expandGalaxies(expansion) {
  const expandedGalaxies = _.cloneDeep(galaxies);

  for (let i = 0; i < expandedGalaxies.length; i++) {
    const galaxy = expandedGalaxies[i];

    for (let y = 0; y < emptyRows.length; y++) {
      if (galaxy.y > emptyRows[y]) {
        galaxy.exY += expansion;
      }
    }

    for (let x = 0; x < emptyCols.length; x++) {
      if (galaxy.x > emptyCols[x]) {
        galaxy.exX += expansion;
      }
    }

    galaxy.x = galaxy.exX;
    galaxy.y = galaxy.exY;
  }

  return expandedGalaxies;
}


function calc(expansion) {
  let found = {};
  let sum = 0;

  const expandedGalaxies = expandGalaxies(expansion);

  for (let i = 0; i < expandedGalaxies.length; i++) {
    for (let j = 0; j < expandedGalaxies.length; j++) {
      const key = `${expandedGalaxies[i].galaxyId}->${expandedGalaxies[j].galaxyId}`;
      const reverseKey = `${expandedGalaxies[j].galaxyId}->${expandedGalaxies[i].galaxyId}`;

      if (i === j || found[key]) {
        continue;
      }

      found[key] = true;
      found[reverseKey] = true;

      const cost = CardinalDistance(expandedGalaxies[i], expandedGalaxies[j]);

      sum += cost;
    }
  }

  return sum;
}

parseInput(input);
const part1answer = calc(1);
console.log(`Part 1: `, part1answer);

const part2answer = calc(999999);
console.log(`Part 2: `, part2answer);
