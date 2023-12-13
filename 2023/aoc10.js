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
          verticalPerimiter: false,
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

  if (westNode && node.west && 'F-L'.indexOf(westNode.tile) !== -1) {
    neighbours.push(westNode);
  }

  if (eastNode && node.east && '7-J'.indexOf(eastNode.tile) !== -1) {
    neighbours.push(eastNode);
  }

  if (northNode && node.north && 'F|7'.indexOf(northNode.tile) !== -1) {
    neighbours.push(northNode);
  }

  if (southNode && node.south && 'L|J'.indexOf(southNode.tile) !== -1) {
    neighbours.push(southNode);
  }

  if (prev) {
    node.next = (neighbours[0] === prev) ? neighbours[1] : neighbours[0];
    node.prev = prev;
  } else {
    node.next = neighbours[0];
    node.prev = neighbours[1];
  }
}

function part1() {
  let node = grid[start.y][start.x];

  do {
    const curr = node;
    curr.perimeter = true;
    curr.verticalPerimiter = ('S|LFJ7'.indexOf(curr.tile) !== '-1') ? true : false;
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
  // floodFill.fill({ x: 70, y: 73 }, (node) => {
  //   return !node.counted && !node.perimeter;
  // }, (node) => {
  //   count++;
  //   node.counted = true;
  //   node.glyph = '*';
  // });

  // floodFill.fill({ x: 0, y: 0 }, (node) => {
  //   return !node.counted && !node.perimeter;
  // }, (node) => {
  //   node.glyph = '#';
  //   node.counted = true;
  // });

  for (let y = 0; y < grid.length; y++) {
    visual[y] = [];

    for (let x = 0; x < grid[0].length; x++) {
      visual[y][x] = '.';
    }
  }


  let unaccounted = 0;
  // determine inner/outer fill the remaining unaccounted (literal) edge cases
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const node = grid[y][x];
      if (!node.counted && !node.perimeter) {
        let even = true;
        let topLeftCornerOpen = false;
        let topRightCornerOpen = false;
        let bottomLeftCornerOpen = false;
        let bottomRightCornerOpen = false;

        function resetCorners() {
          topLeftCornerOpen = false;
          topRightCornerOpen = false;
          bottomLeftCornerOpen = false;
          bottomRightCornerOpen = false;
        }

        for (let i = x + 1; i < grid[0].length; i++) {
          const next = grid[y][i];
          if (next.perimeter) {
            if (next.tile === 'F') {
              if (topLeftCornerOpen) {
                if (bottomRightCornerOpen) {
                  even = !even;
                  resetCorners();
                } else if (topRightCornerOpen) {
                  resetCorners();
                }
              } else {
                topLeftCornerOpen = !topLeftCornerOpen;
              }
            } else if (next.tile === '7') {
              if (topRightCornerOpen) {
                if (bottomLeftCornerOpen) {
                  even = !even;
                  resetCorners();
                } else if (topLeftCornerOpen) {
                  resetCorners();
                }
              } else {
                topRightCornerOpen = true;
              }
            } else if (next.tile === 'L') {
              if (bottomLeftCornerOpen) {
                if (topRightCornerOpen) {
                  even = !even;
                  resetCorners();
                } else if (bottomRightCornerOpen) {
                  resetCorners();
                }
              } else {
                bottomLeftCornerOpen = true;
              }
            } else if (next.tile === 'J') {
              if (bottomRightCornerOpen) {
                if (topLeftCornerOpen) {
                  even = !even;
                  resetCorners();
                } else if (bottomLeftCornerOpen) {
                  resetCorners();
                }
              } else {
                bottomRightCornerOpen = true;
              }
            } else if (next.tile === '|') {
              even = !even;
              resetCorners();
            }
          }
        }

        unaccounted++;
        if (even) {
          visual[y][x] = '#';
        } else {
          visual[y][x] = '*'
          count++;
        }
      }
    }
  }

  console.log({count, unaccounted});

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
    const utf8str = new String().concat(...visual[y]);
    console.log(utf8str);
  }


  return count;
}

parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
