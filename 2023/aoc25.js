import { input, test } from './input/aoc25.js';

let graph = {};

function parseInput(input) {
  const map = input.split('\n')
    .reduce((acc, line) => {
      const [key, vals] = line.split(': ')
      acc[key] = vals.split(' ');
      graph[key] = {
        id: key,
        neighbours: {},
        color: null
      }
      return acc;
    }, {});

  Object.keys(map).forEach(key =>
    map[key].forEach(neighbour => {
      if (!graph[neighbour]) {
        graph[neighbour] = { id: neighbour, neighbours: [], color: null }
      }
      graph[key].neighbours[neighbour] = graph[neighbour];
    })
  );

  Object.keys(graph).forEach(key =>
    Object.keys(graph[key].neighbours).forEach(neighbourId => {
      graph[neighbourId].neighbours[key] = graph[key];
    })
  );

  Object.keys(graph).forEach(key =>
    graph[key].numNeighbours = Object.keys(graph[key].neighbours).length
  );
}

function findTrouble(node) {
  const queue = [];
  const colors = {};

  queue.push(node);

  let prev = null;

  while (queue.length) {
    const v = queue.shift(); // maybe pop?
    const neighbours = Object.keys(v.neighbours);
    for (let i = 0; i < neighbours.length; i++) {
      const dest = graph[neighbours[i]];

      if (typeof colors[dest.id] === 'undefined') {
        colors[dest.id] = !colors[v.id];
        queue.push(dest);
      } else if (colors[v.id] === colors[dest.id]) {
        //means vertex v and dest are in same color, so graph is not bipartite
        return { a: v, b: dest, prev };
      }
    }
    prev = v
  }

  return true;
}

function part1() {
  const potentialTrouble = {};
  const sortedKeys = Object.keys(graph).sort((a, b) => (graph[b].numNeighbours - graph[a].numNeighbours) );
  sortedKeys.forEach(key => {
    const trouble = findTrouble(graph[key]);
    potentialTrouble[trouble.a.id] = (!potentialTrouble[trouble.a.id]) ? 1 : potentialTrouble[trouble.a.id]++;
    potentialTrouble[trouble.b.id] = (!potentialTrouble[trouble.b.id]) ? 1 : potentialTrouble[trouble.b.id]++;
  });
  console.log(potentialTrouble)
}

function part2() {

}

parseInput(test);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
