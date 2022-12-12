const Stopwatch = require('../Stopwatch');
const AStarSearch = require('../AStarSearch');

const input = `abccccccccccccccccccaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaa
abcccccccccccccccaaaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaaa
abcaaccaacccccccccaaaaaaaaaacccccccccccccccccccccaaacccccccccccccaaaaa
abcaaaaaaccccccccaaaaaaaaaaaaacccccccccccccccccccaacccccccccccccaaaaaa
abcaaaaaacccaaacccccaaaaaaaaaaaccccccccccccccccccaaaccccccccccccccccaa
abaaaaaaacccaaaaccccaaaaaacaaaacccccccccccaaaacjjjacccccccccccccccccca
abaaaaaaaaccaaaaccccaaaaaaccccccaccccccccccaajjjjjkkcccccccccccccccccc
abaaaaaaaaccaaacccccccaaaccccccaaccccccccccajjjjjjkkkaaacccaaaccaccccc
abccaaacccccccccccccccaaccccaaaaaaaacccccccjjjjoookkkkaacccaaaaaaccccc
abcccaacccccccccccccccccccccaaaaaaaaccccccjjjjoooookkkkcccccaaaaaccccc
abcccccccaacccccccccccccccccccaaaacccccccijjjoooooookkkkccaaaaaaaccccc
abccaaccaaaccccccccccccccccccaaaaacccccciijjooouuuoppkkkkkaaaaaaaacccc
abccaaaaaaaccccccccccaaaaacccaacaaaccciiiiiooouuuuupppkkklllaaaaaacccc
abccaaaaaacccccccccccaaaaacccacccaaciiiiiiqooouuuuuupppkllllllacaccccc
abcccaaaaaaaacccccccaaaaaaccccaacaiiiiiqqqqoouuuxuuupppppplllllccccccc
abccaaaaaaaaaccaaaccaaaaaaccccaaaaiiiiqqqqqqttuxxxuuuppppppplllccccccc
abccaaaaaaaacccaaaaaaaaaaacccaaaahiiiqqqttttttuxxxxuuuvvpppplllccccccc
abcaaaaaaacccaaaaaaaaaaacccccaaaahhhqqqqtttttttxxxxuuvvvvvqqlllccccccc
abcccccaaaccaaaaaaaaaccccccccacaahhhqqqttttxxxxxxxyyyyyvvvqqlllccccccc
abcccccaaaccaaaaaaaacccccccccccaahhhqqqtttxxxxxxxyyyyyyvvqqqlllccccccc
SbcccccccccccaaaaaaaaaccccccccccchhhqqqtttxxxxEzzzyyyyvvvqqqmmlccccccc
abcccccccccccaaaaaaaacccaacccccccchhhppptttxxxxyyyyyvvvvqqqmmmcccccccc
abccccccccccaaaaaaaaaaccaacccccccchhhpppptttsxxyyyyyvvvqqqmmmccccccccc
abcaacccccccaaaaaaacaaaaaaccccccccchhhppppsswwyyyyyyyvvqqmmmmccccccccc
abaaaacccccccaccaaaccaaaaaaacccccccchhhpppsswwyywwyyyvvqqmmmddcccccccc
abaaaaccccccccccaaaccaaaaaaacccccccchhhpppsswwwwwwwwwvvqqqmmdddccccccc
abaaaacccccccccaaaccaaaaaaccccccccccgggpppsswwwwrrwwwwvrqqmmdddccccccc
abccccccaaaaaccaaaacaaaaaaccccccaacccggpppssswwsrrrwwwvrrqmmdddacccccc
abccccccaaaaaccaaaacccccaaccccaaaaaacggpppssssssrrrrrrrrrnmmdddaaccccc
abcccccaaaaaaccaaaccccccccccccaaaaaacggppossssssoorrrrrrrnnmdddacccccc
abcccccaaaaaaccccccccaaaaccccccaaaaacgggoooossoooonnnrrnnnnmddaaaacccc
abccccccaaaaaccccccccaaaacccccaaaaaccgggoooooooooonnnnnnnnndddaaaacccc
abccccccaaaccccccccccaaaacccccaaaaacccgggoooooooffennnnnnnedddaaaacccc
abcccccccccccccccccccaaacccccccaacccccggggffffffffeeeeeeeeeedaaacccccc
abccccccccccccccccccaaacccccaccaaccccccggfffffffffeeeeeeeeeecaaacccccc
abccccccccccccccccccaaaacccaaaaaaaaaccccfffffffaaaaaeeeeeecccccccccccc
abccccccccaacaaccccaaaaaacaaaaaaaaaaccccccccccaaaccaaaaccccccccccccccc
abccccccccaaaaacccaaaaaaaaaaacaaaaccccccccccccaaaccccaaccccccccccaaaca
abcccccccaaaaaccccaaaaaaaaaaacaaaaacccccccccccaaaccccccccccccccccaaaaa
abcccccccaaaaaacccaaaaaaaaaacaaaaaacccccccccccaaccccccccccccccccccaaaa
abcccccccccaaaaccaaaaaaaaaaaaaaccaaccccccccccccccccccccccccccccccaaaaa`;
const ex = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const sw = new Stopwatch();

const starts = []
let end;
let part1index;

const grid = input.split('\n').map((line, y) => line.split('').map((chr, x) => {
  if (chr === 'E') {
    end = { y, x };
    chr = 'z';
  } else if (chr === 'S') {
    part1index = starts.length;
    starts.push({ y, x });
    chr = 'a';
  } else if (chr === 'a') {
    starts.push({ y, x });
  }

  return chr.charCodeAt(0) - 97;
}));

const graph = [];

let yMax = grid.length;
let xMax = grid[0].length;

function initGraph() {
  for (let y = 0; y < yMax; y++) {
    graph[y] = [];

    for (let x = 0; x < xMax; x++) {
      graph[y][x] = {
        y,
        x,
        elevation: grid[y][x],
        cost: 1,
        neighbors: []
      };
    }
  }

  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (y-1 >= 0) {
        if (graph[y-1][x].elevation - (graph[y][x].elevation) <= 1) {
          graph[y][x].neighbors.push(graph[y-1][x]);
        }
      }
      if (y+1 < yMax) {
        if (graph[y+1][x].elevation - (graph[y][x].elevation) <= 1) {
          graph[y][x].neighbors.push(graph[y+1][x]);
        }
      }
      if (x-1 >= 0) {
        if (graph[y][x-1].elevation - (graph[y][x].elevation) <= 1) {
          graph[y][x].neighbors.push(graph[y][x-1]);
        }
      }
      if (x+1 < xMax) {
        if (graph[y][x+1].elevation - (graph[y][x].elevation) <= 1) {
          graph[y][x].neighbors.push(graph[y][x+1]);
        }
      }
    }
  }
}

initGraph();
const aStar = new AStarSearch(yMax, xMax, graph);

console.log(`Wayfinding [${yMax},${xMax}] grid...`);
sw.lap();
const costs = [];
let part1;
starts.forEach((start, index) => {
  const cost = aStar.search(graph[start.y][start.x], graph[end.y][end.x]);
  if (index === part1index) {
    part1 = cost;
  }
  if (cost !== null) {
    costs.push(cost)
  }
});
sw.lap();

costs.forEach((cost, index) => {
  if (!cost) {
    console.log(cost, index)
  }
})

const sortedCosts = costs.sort((a, b) => a-b);

console.log(`\n\nPart 1: ${part1}`);
console.log(`Part 2: ${sortedCosts[0]}`);
