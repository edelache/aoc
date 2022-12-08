const input = `1326253315
3427728113
5751612542
6543868322
4422526221
2234325647
1773174887
7281321674
6562513118
4824541522`;
const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const grid = input.split('\n').map((line, y) => {
  return line.split('').map((strNum, x) => ({ val: parseInt(strNum, 10), y, x, lastFlash: -1 }));
});

const gridMap = [];

const yMax = grid.length;
const xMax = grid[0].length;

function initGridMap() {
  for (let y = 0; y < yMax; y++) {
    gridMap[y] = [];
    for (let x = 0; x < xMax; x++) {
      gridMap[y][x] = [];
      if (y-1 >= 0) {
        gridMap[y][x].push(grid[y-1][x]);
        if (x-1 >= 0) {
          gridMap[y][x].push(grid[y-1][x-1]);
        }

        if (x+1 < xMax) {
          gridMap[y][x].push(grid[y-1][x+1]);
        }
      }

      if (y+1 < yMax) {
        gridMap[y][x].push(grid[y+1][x]);
        if (x-1 >= 0) {
          gridMap[y][x].push(grid[y+1][x-1]);
        }

        if (x+1 < xMax) {
          gridMap[y][x].push(grid[y+1][x+1]);
        }
      }

      if (x-1 >= 0) {
        gridMap[y][x].push(grid[y][x-1]);
      }

      if (x+1 < xMax) {
        gridMap[y][x].push(grid[y][x+1]);
      }
    }
  }
}

let totalFlashes = 0;

function flash(cycleNum, y, x) {
  totalFlashes++;
  grid[y][x].val = 0;
  grid[y][x].lastFlash = cycleNum;

  gridMap[y][x].forEach(p => {
    if (p.lastFlash !== cycleNum) {
      p.val++;
      if (p.val === 10) {
        flash(cycleNum, p.y, p.x);
      }
    }
  })
}

function flashCycle(cycleNum) {
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (grid[y][x].lastFlash !== cycleNum) {
        grid[y][x].val++;
        if (grid[y][x].val === 10) {
          flash(cycleNum, y, x);
        }
      }
    }
  }
}

function printGrid() {
  for (let y = 0; y < yMax; y++) {
    console.log(grid[y].reduce((acc, val) => acc + val.val, ''));
  }
}

function isSimultaneousFlash() {
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (grid[y][x].val !== 0) {
        return false;
      }
    }
  }
  return true;
}

initGridMap();


let rowNum = 0;
while (!isSimultaneousFlash()) {
  flashCycle(rowNum);
  rowNum++;

  if (rowNum === 100) {
    console.log(`Part 1: ${totalFlashes}`);
  }
}


console.log(`Part 2: ${rowNum}`);
