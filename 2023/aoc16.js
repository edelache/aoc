import { input, test } from './input/aoc16.js';

const grid = [];
const nodes = {};

const queue = [];

const dirs = {
  w: [0, -1],
  e: [0, +1],
  s: [+1, 0],
  n: [-1, 0]
}

let maxX, maxY;

function step(node, dir) {
  if (!node || node.dirs.indexOf(dir) !== -1) {
    return;
  }

  node.dirs.push(dir);
  node.passed++;
  const x = node.x;
  const y = node.y;

  if (node.tile === '.' || (node.tile === '|' && 'ns'.indexOf(dir) !== -1) || (node.tile === '-' && 'ew'.indexOf(dir) !== -1)) {
    const nextY = y + dirs[dir][0];
    const nextX = x + dirs[dir][1];
    if (nextY >= 0 && nextY < maxY && nextX >= 0 && nextX < maxX) {
      queue.push({ node: grid[nextY][nextX], dir });
    }
  } else if (node.tile === '|') {
    if (y+1 < maxY) {
      const next1 = grid[y+1][x];
      queue.push({ node: next1, dir: 's' });
    }
    if (y-1 >= 0) {
      const next2 = grid[y-1][x];
      queue.push({ node: next2, dir: 'n' });
    }
  } else if (node.tile === '-') {
    if (x+1 < maxX) {
      const next1 = grid[y][x+1];
      queue.push({ node: next1, dir: 'e'});
    }
    if (x-1 >= 0) {
      const next2 = grid[y][x-1];
      queue.push({ node: next2, dir: 'w' });
    }
  } else if (node.tile === '/') {
    if (dir === 'w') {
      queue.push({ node: node.south, dir: 's' });
    } else if (dir === 'n') {
      queue.push({ node: node.east, dir: 'e' });
    } else if (dir === 'e') {
      queue.push({ node: node.north, dir: 'n' });
    } else if (dir === 's') {
      queue.push({ node: node.west, dir: 'w' });
    }
  } else if (node.tile === '\\') {
    if (dir === 'w') {
      queue.push({ node: node.north, dir: 'n' });
    } else if (dir === 'n') {
      queue.push({ node: node.west, dir: 'w' });
    } else if (dir === 'e') {
      queue.push({ node: node.south, dir: 's' });
    } else if (dir === 's') {
      queue.push({ node: node.east, dir: 'e' });
    }
  }
}

function processQueue() {
  while (queue.length) {
    // printGrid();
    const item = queue.shift();
    step(item.node, item.dir);
  }
}

function printGrid() {
  for (let y = 0; y < maxY; y++) {
    let str = '';
    for (let x = 0; x < maxX; x++) {
      if (grid[y][x].passed) {
        str += '#';
      } else {
        str += '.';
      }
    }
    console.log(str);
  }

  console.log('')
}

function resetGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].dirs = [];
      grid[y][x].passed = 0;
    }
  }
}

function countEnergized() {
  let sum = 0;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (grid[y][x].passed) {
        sum++;
      }
    }
  }
  return sum;
}



function part1(input) {
  const lines = input.split('\n');

  lines.forEach((line, y) => {
    grid[y] = [];

    for (let x = 0; x < line.length; x++) {

      const node = {
        x,
        y,
        tile: line[x],
        passed: 0,
        dirs: [],
        east: null,
        west: null,
        north: null,
        south: null
      };
      nodes[`${x}-${y}`] = node;
      grid[y][x] = node;
    }
  })

  maxX = grid[0].length;
  maxY = grid.length;

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const curr = grid[y][x];
      if ((x-1) >= 0) {
        curr.west = grid[y][x-1];
      }
      if ((x+1) < maxX) {
        curr.east = grid[y][x+1];
      }
      if ((y-1) >= 0) {
        curr.north = grid[y-1][x];
      }
      if ((y+1) < maxY) {
        curr.south = grid[y+1][x];
      }
    }
  }

  queue.push({ node: grid[0][0], dir: 'e'});

  processQueue();

  let sum = countEnergized();

  return sum;
}


function part2() {
  let maxSum = 0;
  let sum;

  for (let y = 0; y < maxY; y++) {
    resetGrid();
    queue.push({ node: grid[y][0], dir: 'e' });
    processQueue();
    sum = countEnergized();

    if (sum > maxSum) {
      maxSum = sum;
    }

    resetGrid();
    queue.push({ node: grid[y][maxX-1], dir: 'w' });
    processQueue();
    sum = countEnergized();

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  for (let x = 0; x < maxX; x++) {
    resetGrid();
    queue.push({ node: grid[0][x], dir: 's' });
    processQueue();
    sum = countEnergized();

    if (sum > maxSum) {
      maxSum = sum;
    }

    resetGrid();
    queue.push({ node: grid[maxY-1][x], dir: 'n' });
    processQueue();
    sum = countEnergized();

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
}


const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
