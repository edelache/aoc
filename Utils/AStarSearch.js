import { PriorityQueue } from './PriorityQueue.js';

function AStarSearch(yMax, xMax, graph) {
  let maxStride = 0;
  let stopAtGoal = true;

  function heuristic(node) {
    return Math.abs(yMax - node.y - 1) + Math.abs(xMax - node.x - 1);
  }

  function initGridMap() {
    const gridMap = [];
    for (let y = 0; y < yMax; y++) {
      gridMap[y] = [];
    }
    return gridMap;
  }

  function printPath(cameFrom, node) {
    let curr = node;
    const points = [{x: 0, y: 0}];
    while (cameFrom[curr.y][curr.x] && cameFrom[curr.y][curr.x] != curr) {
      points.push({y: curr.y, x: curr.x});
      curr = cameFrom[curr.y][curr.x];
    }
    const grid = [];

    for (let y = 0; y < yMax; y++) {
      grid[y] = [];
      for (let x = 0; x < xMax; x++) {
        grid[y][x] = '.';
      }
    }

    points.forEach(p => {
      grid[p.y][p.x] = '#';
    });

    for (let y = 0; y < yMax; y++) {
      let str = '';
      for (let x = 0; x < xMax; x++) {
        str += grid[y][x];
      }
      console.log(str);
    }
  }

  return {
    setStopAtGoal: function (_stopAtGoal) {
      stopAtGoal = _stopAtGoal;
    },

    setMaxStride: function (_maxStride) {
      maxStride = _maxStride;
    },

    search: (start, goal) => {
      const frontier = new PriorityQueue();
      const costSoFar = initGridMap();
      const cameFrom = initGridMap();
      const statsSoFar = initGridMap();

      frontier.put(start, 0);

      cameFrom[start.y][start.x] = start;
      costSoFar[start.y][start.x] = 0;
      statsSoFar[start.y][start.x] = { y: 0, x: 0 };

      while (!frontier.isEmpty()) {
        const curr = frontier.get();

        if (stopAtGoal && curr.x === goal.x && curr.y === goal.y) {
          printPath(cameFrom, curr);
          break;
        }

        let xStrideMaxed = false;
        let yStrideMaxed = false;

        if (maxStride) {
          let prev = curr;
          let c1 = curr;
          let i;

          for (i = 0; i < maxStride; i++) {
            prev = cameFrom[c1.y][c1.x];
            if (c1.x !== prev.x || prev === start) {
              break;
            }
            c1 = prev;
          }
          if (i === maxStride) {
            xStrideMaxed = true;
          }

          for (i = 0; i < maxStride; i++) {
            prev = cameFrom[c1.y][c1.x];
            if (c1.y !== prev.y || prev === start) {
              break;
            }
            c1 = prev;
          }
          if (i === maxStride) {
            yStrideMaxed = true;
          }
        }

        graph[curr.y][curr.x].neighbors.forEach(next => {

            // if (curr.x === next.x) {
            //   next.strideX = curr.strideX ? curr.strideX + 1 : 1;
            //   next.strideY = 0;
            // } else if (curr.y === next.y) {
            //   next.strideY = curr.strideY ? curr.strideY + 1 : 1;
            //   next.strideX = 0;
            // } else {
            //   next.strideY = 0;
            //   next.strideX = 0;
            // }

          if (maxStride && ((yStrideMaxed && curr.y === next.y) || (xStrideMaxed && curr.x === next.x))) {
            return;
          }

          const newCost = costSoFar[curr.y][curr.x] + next.cost;
          if (costSoFar[next.y][next.x] === undefined || newCost < costSoFar[next.y][next.x]) {
            costSoFar[next.y][next.x] = newCost;
            const priority = newCost + heuristic(next);
            frontier.put(next, priority);
            cameFrom[next.y][next.x] = curr;
          }
        });
      }

      return costSoFar[goal.y][goal.x] || null;
    }
  }
}

export { AStarSearch };
