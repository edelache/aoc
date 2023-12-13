function FloodFill(grid) {
  const stack = [];

  const maxX = grid[0].length;
  const maxY = grid.length;

  let fillCondition = null;
  let fillMethod = null;

  const queueFill = (curr) => {
    if (curr.x < 0 || curr.x >= maxX || curr.y < 0 || curr.y >= maxY) {
      return;
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
    fill: (fillLocation, _fillCondition, _fillMethod) => {
      fillMethod = _fillMethod;
      fillCondition = _fillCondition

      stack.push(fillLocation);

      while (stack.length > 0) {
        const location = stack.pop();
        queueFill(location)
      }
    }
  };
}

export { FloodFill }
