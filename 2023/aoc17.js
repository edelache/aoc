import { AStarSearch } from '../Utils/AStarSearch.js';
import { input, test } from './input/aoc17.js';

const graph = [];
let yMax, xMax;

function parseInput(input) {
  input.split('\n').map((line, y) => {
    graph[y] = [];
    line.split('').map((val, x) => {
      graph[y][x] = {
        x,
        y,
        cost: parseInt(val)
      };
    });

    yMax = graph.length;
    xMax = graph[0].length;

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        graph[y][x].neighbors = [];

        if (y > 0) {
          graph[y][x].neighbors.push(graph[y-1][x]);
        }
        if (y < (yMax-1)) {
          graph[y][x].neighbors.push(graph[y+1][x]);
        }
        if (x > 0) {
          graph[y][x].neighbors.push(graph[y][x-1]);
        }
        if (x < (xMax-1)) {
          graph[y][x].neighbors.push(graph[y][x+1]);
        }
      }
    }
  })
}

function part1() {
  const aStar = new AStarSearch(yMax, xMax, graph);
  aStar.setMaxStride(3);
  aStar.setStopAtGoal(true);
  return aStar.search(graph[0][0], graph[yMax-1][xMax-1]);
}

function part2() {

}

parseInput(test);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
