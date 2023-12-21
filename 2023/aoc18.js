import { input, test } from './input/aoc18.js';
import fs from 'fs';

let instructions;
let grid = {};
let points = [];
let perimeter = 0;

let yMin = 0;
let yMax = 0;
let xMin = 0;
let xMax = 0;

const dirLookup = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U'
}

function buildGrid(style) {
  grid = {};
  points = [];
  let x = 0;
  let y = 0;
  perimeter = 0;

  const ops = {
    'U': (num) => {
      y -= num;
      yMin = Math.min(yMin, y);
      perimeter += num;
    },
    'D': (num) => {
      y += num;
      yMax = Math.max(yMax, y);
      perimeter += num;
    },
    'L': (num) => {
      x -= num;
      xMin = Math.min(xMin, x);
      perimeter += num;
    },
    'R': (num) => {
      x += num;
      xMax = Math.max(xMax, x);
      perimeter += num;
    },
  }

  instructions.forEach((inst, i) => {
    points.push({ x, y });
    style === 1 ?
      ops[inst.dir](inst.num) :
      ops[inst.dir2](inst.num2);
  });

  // shifting the co-ordinates is only required to make an SVG for funzies
  let xShift = 1;
  let yShift = 1;

  if (xMin < 0) {
    xShift = (xMin * -1) + 1;
    xMin += xShift;
    xMax += xShift;
  }

  if (yMin < 0) {
    yShift = (yMin * -1) + 1;
    yMin += yShift;
    yMax += yShift;
  }

  points.map(p => {
    p.x += xShift;
    p.y += yShift;
  });
}

function parseInput(input) {
  const lines = input.split('\n');
  instructions = lines.map(line => {
    const [dir, num, color] = line.split(' ');
    const num2 = parseInt(color.substr(2, 5), 16);
    const dir2 = dirLookup[color.substr(7, 1)];

    return { dir, dir2, num: parseInt(num), num2, color };
  });
}

function printGrid(factor=1) {
  const pVals = points.reduce((acc, p) => {
    acc.push(`${p.x/factor},${p.y/factor}`);
    return acc;
  }, []);

  const svg = `<svg height="${(yMax+1)/factor}" width="${(xMax+1)/factor}"><polygon points="${pVals.join(' ')}" style="fill:lime;stroke:purple;stroke-width:0" /></svg>`;
  fs.writeFile("output.svg", svg, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

function countGrid() {
  let area = 0;
  for (let i = 1; i <= points.length; i++) {
    let p1 = points[i-1];
    let p2 = points[(i % points.length)];

    area += (p1.x*p2.y) - (p1.y*p2.x);
  }

  area = Math.abs(area/2);
  return area + (perimeter / 2) + 1;
}

function part1() {
  buildGrid(1);
  return countGrid();
}

function part2() {
  buildGrid(2);
  // printGrid(1000);
  return countGrid();
}

parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
