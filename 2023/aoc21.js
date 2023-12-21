import { input, test } from './input/aoc21.js';
const graph = [];
let yMax, xMax, start;
let queue = [];

function parseInput(input) {
  input.split('\n').map((line, y) => {
    graph[y] = [];
    line.split('').map((val, x) => {
      graph[y][x] = {
        x,
        y,
        tile: val,
        cost: 1,
        stepped: {}
      };
      if (val === 'S') {
        start = graph[y][x];
      }
    });

    yMax = graph.length;
    xMax = graph[0].length;

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        graph[y][x].neighbors = [];

        if (y > 0) {
          if (graph[y-1][x].tile !== '#') {
            graph[y][x].neighbors.push(graph[y-1][x]);
          }
        }
        if (y < (yMax-1)) {
          if (graph[y+1][x].tile !== '#') {
            graph[y][x].neighbors.push(graph[y+1][x]);
          }
        }
        if (x > 0) {
          if (graph[y][x-1].tile !== '#') {
            graph[y][x].neighbors.push(graph[y][x-1]);
          }
        }
        if (x < (xMax-1)) {
          if (graph[y][x+1].tile !== '#') {
            graph[y][x].neighbors.push(graph[y][x+1]);
          }
        }
        graph[y][x].numNeighbors = graph[y][x].neighbors.length;
      }
    }
  })
}

function processQueue() {
  while (queue.length) {
    const task = queue.pop();
    stepper(task.node, task.maxSteps, task.stepNum);
  }
}

function stepper(node, maxSteps, stepNum=1) {
  if (node.stepped[stepNum]) {
    return;
  }
  node.stepped[stepNum] = true;
  node.wasStepped = true;
  node.neighbors.forEach(next => {
    if (!next.stepped[stepNum] && stepNum <= maxSteps) {
      queue.push({ node: next, maxSteps, stepNum: stepNum + 1 });
    }
  });
}

function countGrid(stepNum) {
  let count = 0;

  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (graph[y][x].stepped[stepNum]) {
        count++;
      }
    }
  }

  return count;
}



function part1() {
  let maxSteps = 64;
  queue.push({ node: start, maxSteps: maxSteps+1, stepNum: 1 });
  processQueue();
  return countGrid(maxSteps+1);
}

function part2() {

}



parseInput(input);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
