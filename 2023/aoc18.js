import { FloodFill } from '../Utils/FloodFill.js';
import { input, test } from './input/aoc18.js';

let instructions;
const points = [];
const grid = {};

let yMin = 0;
let yMax = 0;
let xMin = 0;
let xMax = 0;

function parseInput(input) {
  const lines = input.split('\n');
  instructions = lines.map(line => {
    const [dir, num, color] = line.split(' ');
    return { dir, num: parseInt(num), color };
  });

  let x = 0;
  let y = 0;

  const ops = {
    'U': (num) => {
      for (let i = 0; i < num; i++) {
        if (!grid[y]) {
          grid[y] = {};
        }
        grid[y][x] = { tile: '#' };
        y--;
      }

      yMin = Math.min(yMin, y);
    },
    'D': (num) => {
      for (let i = 0; i < num; i++) {
        if (!grid[y]) {
          grid[y] = {};
        }
        grid[y][x] = { tile: '#' };
        y++;
      }

      yMax = Math.max(yMax, y);
    },
    'L': (num) => {
      for (let i = 0; i < num; i++) {
        if (!grid[y]) {
          grid[y] = {};
        }
        grid[y][x] = { tile: '#' };
        x--;
      }

      xMin = Math.min(xMin, x);
    },
    'R': (num) => {
      for (let i = 0; i < num; i++) {
        if (!grid[y]) {
          grid[y] = {};
        }
        grid[y][x] = { tile: '#' };
        x++;
      }

      xMax = Math.max(xMax, x+1);
    },
  }

  instructions.forEach(inst => {
    ops[inst.dir](inst.num);
  });
}

function printGrid() {
  for (let y = yMin; y <= yMax; y++) {
    let str = '';
    if (!grid[y]) {
      continue;
    }
    for (let x = xMin; x < xMax; x++) {
      str += grid[y][x] ? grid[y][x].tile : '.'
    }
    console.log(str);
  }
}

function countGrid() {
  let sum = 0;
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      if (grid[y] && grid[y][x] && grid[y][x].tile === '#' ) {
        sum++;
      }
    }
  }
  return sum;
}

function part1() {
  const floodFill = new FloodFill(grid);
  floodFill.setXMin(xMin);
  floodFill.setXMax(xMax);
  floodFill.setYMin(yMin);
  floodFill.setYMax(yMax);
  floodFill.setDefaultNode({ tile: '.' });
  floodFill.fill({ x: 1, y: 1 }, (node) => {
    return node.tile !== '#';
  }, (node) => {
    node.tile = '#';
  });

  printGrid();
  return countGrid();
}

function part2(input) {

}

parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
