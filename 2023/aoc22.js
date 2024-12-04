import _ from 'lodash';
import { input, test } from './input/aoc22.js';

let bricks = [];
let brickMap = {};
let supportBricks = [];
let grid = {};
let bricksByPlane = {};
let xMin = 0, yMin = 0, zMin = 0, xMax = 0, yMax = 0, zMax = 0;

function updateMinMax(x, y, z) {
  xMin = Math.min(x, xMin);
  yMin = Math.min(y, yMin);
  zMin = Math.min(z, zMin);
  xMax = Math.max(x, xMax);
  yMax = Math.max(y, yMax);
  zMax = Math.max(z, zMax);
}

function parseInput(input) {
  const lines = input.split('\n');
  let id = 1;
  bricks = lines.map(line => {
    const points = line.split('~').map(parts => parts.split(',').map(num => parseInt(num)));

    let [ x, y, z ] = points[0];
    const p1 = { x, y, z };
    updateMinMax(x, y, z);

    [ x, y, z ] = points[1];
    const p2 = { x, y, z };
    updateMinMax(x, y, z);

    const b = {
      id: id++,
      p1,
      p2,
      supporting: {},
      supportedBy: {},
      xMin: Math.min(p1.x, p2.x),
      yMin: Math.min(p1.y, p2.y),
      xMax: Math.max(p1.x, p2.x),
      yMax: Math.max(p1.y, p2.y),
      zMin: Math.min(p1.z, p2.z),
      zLen: Math.abs(p1.z - p2.z)+1,
      xs: [],
      ys: []
    }

    for (let i = b.xMin; i <= b.xMax; i++) {
      b.xs.push(i);
    }

    for (let i = b.yMin; i <= b.yMax; i++) {
      b.ys.push(i);
    }

    brickMap[b.id] = b;
    return b;
  });
}

function printPlanes(min, max) {
  for (let y = 0; y <= yMax; y++) {
    let str = `${y}: |  `;
    for (let z = min; z <= max; z++) {
      for (let x = 0; x <= xMax; x++) {
        str += _.get(grid, [z, y, x], false) ? '# ' : '. ';
      }

      str += ' |  ';
    }
    console.log(str);
  }
  console.log('\n')
}

function collision(b) {
  const collidedWith = {};
  let collided = false;
  for (let y = b.yMin; y <= b.yMax; y++) {
    for (let x = b.xMin; x <= b.xMax; x++) {
      const node = _.get(grid, [b.zMin, y, x], null)
      if (node) {
        collidedWith[node.id] = node;
        b.supportedBy[node.id] = node;
        node.supporting[b.id] = b;
        collided = true;
      }
    }
  }

  return (collided) ? collidedWith : null;
}

function settleBrick(b) {
  let collided = false;
  while (b.zMin !== 0 && !collided) {
    const collidedWith = collision(b);
    if (collidedWith) {
      collided = true;
      b.zMin++;
      break;
    } else {
      b.zMin--;
    }
  }
  if (b.zMin === 0) {
    b.zMin++;
  }

  for (let z = b.zMin, i = 0; i < b.zLen; i++, z++) {
    for (let y = b.yMin; y <= b.yMax; y++) {
      for (let x = b.xMin; x <= b.xMax; x++) {
        _.set(grid, [z, y, x], b);
      }
    }
  }

  // printPlanes(1, 5);
}

function part1() {
  bricks = bricks.sort((B1, B2) => B1.zMin - B2.zMin);

  bricks.forEach(brick => {
    settleBrick(brick);
  });

  // console.log(bricks);

  let sum = 0;
  bricks.forEach(b => {
    let canDisintegrate = true;
    const bSupporting = Object.keys(b.supporting);
    for (let i = 0; i < bSupporting.length; i++) {
      const supported = b.supporting[bSupporting[i]];
      if (Object.keys(supported.supportedBy).length <= 1) {
        canDisintegrate = false;
        break;
      }
    }

    if (canDisintegrate) {
      sum++;
    } else {
      supportBricks.push(b);
    }
  })

  return sum;
}

function findSupporting(b, supporting) {
  Object.values(b.supporting).forEach(supported => {
    if (!supporting[supported.id]) {
      supporting[supported.id] = true;
      findSupporting(supported, supporting);
    }
  });
}

function part2() {
  let most = 0;
  let sum = 0;
  console.log(Object.keys(supportBricks).length, Object.keys(bricks).length);

  supportBricks.forEach(b => {
    const supporting = {};
    findSupporting(b, supporting);
    const numSupporting = Object.keys(supporting).length;
    sum += numSupporting;
    most = Math.max(numSupporting, most);
  });
  return sum;
}

parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);

// 129297 not right
// 1476 too low
