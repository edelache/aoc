const PriorityQueue = require('./PriorityQueue');

function AStarSearch(yMax, xMax, graph) {
  function heuristic(node) {
    return Math.abs(yMax - node.y -1) + Math.abs(xMax - node.x -1);
  }

  function initGridMap() {
    const gridMap = [];
    for (let y = 0; y < yMax; y++) {
      gridMap[y] = [];
    }
    return gridMap;
  }

  return {
    search: (start, goal) => {
      const frontier = new PriorityQueue();
      const costSoFar = initGridMap();
      const cameFrom = initGridMap();

      frontier.put(start, 0);

      cameFrom[start.y][start.x] = start;
      costSoFar[start.y][start.x] = 0;

      while (!frontier.isEmpty()) {
        const curr = frontier.get();

        // if (curr.x === goal.x && curr.y === goal.y) {
        //   break;
        // }

        graph[curr.y][curr.x].neighbors.forEach(next => {
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

module.exports = AStarSearch;
