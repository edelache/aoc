import _ from 'lodash';

function FloodFill(grid) {
  const stack = [];

  let xMin = 0;
  let yMin = 0;
  let xMax = grid[0].length;
  let yMax = grid.length;

  let fillCondition = null;
  let fillMethod = null;
  let defaultNode = {};

  const queueFill = (curr) => {
    if (curr.x < xMin || curr.x >= xMax || curr.y < yMin || curr.y >= yMax) {
      return;
    }

    if (!grid[curr.y][curr.x]) {
      grid[curr.y][curr.x] = _.cloneDeep(defaultNode);
    }
    const node = grid[curr.y][curr.x];

    if (fillCondition(node)) {
      fillMethod(node);
      stack.push({ y: curr.y - 1, x: curr.x });
      stack.push({ y: curr.y + 1, x: curr.x });
      stack.push({ y: curr.y, x: curr.x - 1 });
      stack.push({ y: curr.y, x: curr.x + 1 });
    }
  }

  return {
    setXMin: function (_xMin) {
      xMin = _xMin;
    },
    setXMax: function (_xMax) {
      xMax = _xMax;
    },
    setYMin: function (_yMin) {
      yMin = _yMin;
    },
    setYMax: function (_yMax) {
      yMax = _yMax;
    },
    setDefaultNode: function (_defaultNode) {
      defaultNode = _defaultNode;
    },
    fill: (fillLocation, _fillCondition, _fillMethod) => {
      fillMethod = _fillMethod;
      fillCondition = _fillCondition;

      stack.push(fillLocation);

      while (stack.length > 0) {
        const location = stack.pop();
        queueFill(location)
      }
    }
  };
}

export { FloodFill }
