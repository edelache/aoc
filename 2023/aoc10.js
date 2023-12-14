import { FloodFill } from '../Utils/FloodFill.js';
import { input, test, test2, test3 } from './input/aoc10.js';

const nodes = {};
const grid = [];
let start;
let length = 1;

function parseInput(input) {
  let i = 0;
  input.split('\n')
    .map((line, y) => {
      grid[y] = [];
      for (let x = 0; x < line.length; x++) {
        const tile = line[x];
        const node = {
          id: i++,
          x,
          y,
          tile,
          next: null,
          prev: null,
          perimeter: false,
          west: false,
          east: false,
          north: false,
          south: false,
          glyph: ' '
        };
        grid[y][x] = node;

        if (tile === 'S') {
          start = node;
          node.west = true;
          node.east = true;
          node.north = true;
          node.south = true;
          node.glyph = '╬';
        } else if (tile === '-') {
          node.west = true;
          node.east = true;
          node.glyph = '═';
        } else if (tile === '|') {
          node.north = true;
          node.south = true;
          node.glyph = '║';
        } else if (tile === 'F') {
          node.east = true;
          node.south = true;
          node.glyph = '╔';
        } else if (tile === 'J') {
          node.west = true;
          node.north = true;
          node.glyph = '╝';
        } else if (tile === '7') {
          node.west = true;
          node.south = true;
          node.glyph = '╗';
        } else if (tile === 'L') {
          node.east = true;
          node.north = true;
          node.glyph = '╚';
        } else if (tile === '.') {
          node.glyph = '.';
        }
      }
    });

  findNeighbours(start);
}

function findNeighbours(node, prev=null) {
  // find the two adjacent starting pipes
  const westNode = grid[node.y][node.x-1] || null;
  const eastNode = grid[node.y][node.x+1] || null;
  const northNode = grid[node.y-1] ? grid[node.y-1][node.x] : null;
  const southNode = grid[node.y+1] ? grid[node.y+1][node.x] : null;
  const neighbours = [];
  let hasWest = false;
  let hasEast = false;
  let hasNorth = false;
  let hasSouth = false;

  if (westNode && node.west && 'F-L'.indexOf(westNode.tile) !== -1) {
    neighbours.push(westNode);
    hasWest = true;
  }

  if (eastNode && node.east && '7-J'.indexOf(eastNode.tile) !== -1) {
    neighbours.push(eastNode);
    hasEast = true;
  }

  if (northNode && node.north && 'F|7'.indexOf(northNode.tile) !== -1) {
    neighbours.push(northNode);
    hasNorth = true;
  }

  if (southNode && node.south && 'L|J'.indexOf(southNode.tile) !== -1) {
    neighbours.push(southNode);
    hasSouth = true;
  }

  if (prev) {
    node.next = (neighbours[0] === prev) ? neighbours[1] : neighbours[0];
    node.prev = prev;
  } else {
    node.next = neighbours[0];
    node.prev = neighbours[1];

    if (node.tile === 'S') {
      if (hasSouth && hasEast) {
        node.tile = 'F';
        node.glyph = '╔';
      } else if (hasSouth && hasWest) {
        node.tile = '7';
        node.glyph = '╗';
      } else if (hasSouth && hasNorth) {
        node.tile = '|';
        node.glyph = '║';
      } else if (hasNorth && hasEast) {
        node.tile = 'L';
        node.glyph = '╚';
      } else if (hasNorth && hasWest) {
        node.tile = 'J';
        node.glyph = '╝';
      } else if (hasWest && hasEast) {
        node.tile = '-';
        node.glyph = '═';
      }
    }
  }
}

function part1() {
  let node = grid[start.y][start.x];

  do {
    const curr = node;
    curr.perimeter = true;
    node = node.next;
    findNeighbours(node, curr);
    length++;
  } while (node !== grid[start.prev.y][start.prev.x]);
  node.next = start;

  return length / 2;
}

const visual = [];

function part2() {
  let count = 0;
  const floodFill = new FloodFill(grid);
  floodFill.fill({ x: 70, y: 73 }, (node) => {
    return !node.counted && !node.perimeter;
  }, (node) => {
    node.counted = true;
    node.glyph = '*';
  });

  floodFill.fill({ x: 0, y: 0 }, (node) => {
    return !node.counted && !node.perimeter;
  }, (node) => {
    node.glyph = '#';
    node.counted = true;
  });

  for (let y = 0; y < grid.length; y++) {
    visual[y] = [];

    for (let x = 0; x < grid[0].length; x++) {
      visual[y][x] = '.';
    }
  }

  // determine inner/outer fill the remaining unaccounted (literal) edge cases
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const node = grid[y][x];
      if (!node.counted && !node.perimeter) {
        let even = true;
        let topCornerOpen = false;
        let bottomCornerOpen = false;
        for (let i = x + 1; i < grid[0].length; i++) {
          const next = grid[y][i];
          if (next.perimeter) {
            if (next.tile === 'F' || next.tile === '7') {
              if (bottomCornerOpen) {
                even = !even;
                topCornerOpen = false;
                bottomCornerOpen = false;
              } else {
                topCornerOpen = !topCornerOpen;
              }
            } else if (next.tile === 'L' || next.tile === 'J') {
              if (topCornerOpen) {
                even = !even;
                topCornerOpen = false;
                bottomCornerOpen = false;
              } else {
                bottomCornerOpen = !bottomCornerOpen;
              }
            } else if (next.tile === '|') {
              even = !even;
              topCornerOpen = false;
              bottomCornerOpen = false;
            }
          }
        }

        if (even) {
          visual[y][x] = '#';
        } else {
          visual[y][x] = '*'
        }
      }
    }
  }

  let node = grid[start.y][start.x];
  let i = 0;
  do {
    visual[node.y][node.x] = node.glyph;
    node = node.next;
  } while (node !== start);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].glyph === '#') {
        visual[y][x] = '#'
      } else if (grid[y][x].glyph === '*') {
        visual[y][x] = '*'
      }
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (visual[y][x] === '*') {
        count++;
      }
    }

    const utf8str = new String().concat(...visual[y]);
    // console.log(utf8str);
  }

  return count;
}

parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
