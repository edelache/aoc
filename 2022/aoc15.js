import { Stopwatch } from '../Utils/Stopwatch.js';
import _ from 'lodash';
const input = {};

input.puzzle = `Sensor at x=407069, y=1770807: closest beacon is at x=105942, y=2000000
Sensor at x=2968955, y=2961853: closest beacon is at x=2700669, y=3091664
Sensor at x=3069788, y=2289672: closest beacon is at x=3072064, y=2287523
Sensor at x=2206, y=1896380: closest beacon is at x=105942, y=2000000
Sensor at x=3010408, y=2580417: closest beacon is at x=2966207, y=2275132
Sensor at x=2511130, y=2230361: closest beacon is at x=2966207, y=2275132
Sensor at x=65435, y=2285654: closest beacon is at x=105942, y=2000000
Sensor at x=2811709, y=3379959: closest beacon is at x=2801189, y=3200444
Sensor at x=168413, y=3989039: closest beacon is at x=-631655, y=3592291
Sensor at x=165506, y=2154294: closest beacon is at x=105942, y=2000000
Sensor at x=2720578, y=3116882: closest beacon is at x=2700669, y=3091664
Sensor at x=786521, y=1485720: closest beacon is at x=105942, y=2000000
Sensor at x=82364, y=2011850: closest beacon is at x=105942, y=2000000
Sensor at x=2764729, y=3156203: closest beacon is at x=2801189, y=3200444
Sensor at x=1795379, y=1766882: closest beacon is at x=1616322, y=907350
Sensor at x=2708986, y=3105910: closest beacon is at x=2700669, y=3091664
Sensor at x=579597, y=439: closest beacon is at x=1616322, y=907350
Sensor at x=2671201, y=2736834: closest beacon is at x=2700669, y=3091664
Sensor at x=3901, y=2089464: closest beacon is at x=105942, y=2000000
Sensor at x=144449, y=813212: closest beacon is at x=105942, y=2000000
Sensor at x=3619265, y=3169784: closest beacon is at x=2801189, y=3200444
Sensor at x=2239333, y=3878605: closest beacon is at x=2801189, y=3200444
Sensor at x=2220630, y=2493371: closest beacon is at x=2966207, y=2275132
Sensor at x=1148022, y=403837: closest beacon is at x=1616322, y=907350
Sensor at x=996105, y=3077490: closest beacon is at x=2700669, y=3091664
Sensor at x=3763069, y=3875159: closest beacon is at x=2801189, y=3200444
Sensor at x=3994575, y=2268273: closest beacon is at x=3072064, y=2287523
Sensor at x=3025257, y=2244500: closest beacon is at x=2966207, y=2275132
Sensor at x=2721366, y=1657084: closest beacon is at x=2966207, y=2275132
Sensor at x=3783491, y=1332930: closest beacon is at x=3072064, y=2287523
Sensor at x=52706, y=2020407: closest beacon is at x=105942, y=2000000
Sensor at x=2543090, y=47584: closest beacon is at x=3450858, y=-772833
Sensor at x=3499766, y=2477193: closest beacon is at x=3072064, y=2287523`;

input.example = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;


let data = input[process.argv[2]] ? input[process.argv[2]] : input.puzzle;
let calcLine = process.argv[3] ? parseInt(process.argv[3]) : 2000000;
// data = input.example;
// calcLine = 10;
const max = (calcLine * 2);

function DistressFinder(data) {
  const items = [];
  const grid = {};
  const gridLines = {};

  let minX = null, minY = null, maxX = null, maxY = null;

  function init(data) {
    const lines = data.split('\n');
    lines.forEach(line => {
      const parts = line.split(': closest beacon is at ');
      const sRaw = parts[0].split('Sensor at ');
      const sCoordsRaw = sRaw[1].split(', ').map(val => parseInt(val.split('=')[1]));
      const bCoordsRaw = parts[1].split(', ').map(val => parseInt(val.split('=')[1]));
      items.push({ sensor: { x: sCoordsRaw[0], y: sCoordsRaw[1] }, beacon: { x: bCoordsRaw[0], y: bCoordsRaw[1] } });
    });
  }

  function putItem(x, y, glyph) {
    // if (minX === null || x < minX) {
    //   minX = x;
    // }

    // if (minY === null || y < minY) {
    //   minY = y;
    // }

    // if (maxX === null || x > maxX) {
    //   maxX = x;
    // }

    // if (maxY === null || y > maxY) {
    //   maxY = y;
    // }

    if (!grid[y]) {
      grid[y] = {};
    }

    if (!grid[y][x] || grid[y][x] === '.') {
      grid[y][x] = glyph;
    }
  }
  function plotSensorBeacon (sensor, beacon) {
    putItem(sensor.x, sensor.y, 'S');
    putItem(beacon.x, beacon.y, 'B');
  }

  function plot (sensor, beacon) {
    const manhattan = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    let y, j, inc;
    for (j = 0, inc = 0, y = sensor.y - manhattan; j < manhattan + 1; inc++, y++, j++) {
      for (let i = 0, x = sensor.x - inc; i < ((inc*2) + 1); x++, i++) {
        putItem(x, y, '.');
      }
    }
    inc -= 2;
    for (j = 0; j < manhattan ; inc--, y++, j++) {
      for (let i = 0, x = sensor.x - inc; i < ((inc*2) + 1); x++, i++) {
        putItem(x, y, '.');
      }
    }
  }

  function pushLine(y, line) {
    if (y < 0 || y > (calcLine * 2)) {
      return;
    }
    if (!gridLines[y]) {
      gridLines[y] = [];
    }
    for (let i = line.x1; i <= line.x2; i++) {
      gridLines[y][i].push(line);
    }
  }

  function calcLines(sensor, beacon) {
    const manhattan = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    let y, j, inc;
    for (j = 0, inc = 0, y = sensor.y - manhattan; j <= manhattan; inc++, y++, j++) {
      const x1 = sensor.x - inc;
      const x2 = sensor.x + inc;
      pushLine(y, {x1, x2});
    }
    inc-=2;
    for (j = 0; j < manhattan ; inc--, y++, j++) {
      const x1 = sensor.x - inc;
      const x2 = sensor.x + inc;
      pushLine(y, {x1, x2});
    }
  }

  function calcLineForRow(r, s, b) {
    const m = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);
    const d = Math.abs(r - s.y);
    const i = m - d;

    if (i >= 0) {
      const x1 = s.x - i;
      const x2 = s.x + i;

      return { x1: Math.max(0,x1), x2: Math.min(max, x2) };
    }

    return null;
  }

  function plotLines() {
    // const ys = Object.keys(gridLines).map(a => parseInt(a)).sort((a, b) => a - b);
    // yMin = ys[0];
    // yMax = ys[ys.length-1];

    Object.keys(gridLines).forEach((y) => {
      gridLines[y].forEach(({x1, x2}) => {
        for (let x = x1; x <= x2; x++) {
          putItem(x, y, '.');
        }
      });
    });
  }

  function printGrid() {
    for (let y = minY; y <= maxY; y++) {
      let str = String(y).padStart(4, ' ') + ': ';
      for (let x = minX; x <= maxX; x++) {
        if (!grid[y] || !grid[y][x]) {
          str += ' ';
        } else {
          str += grid[y][x];
        }
      }
      console.log(str);
    }
    console.log();
  }


  function isFullLine(coords, r) {
    coords.sort((a, b) => a.x1-b.x1 );
    let c1 = coords[0];
    let merged = [];
    let gap = null;
    let incomplete = false;

    for (let i = 0; i < coords.length-1; i++) {
      const c2 = coords[i+1];
      if (c1.x2 >= c2.x2) {
        // c2 is completely irrelevant
      } else if ((c1.x2 + 1) < c2.x1) { // gap!
        merged.push(_.cloneDeep(c1));
        gap = c1.x2 + 1;
        c1 = c2;
        incomplete = true;
      } else {  //  ((c1.x2 + 1) === c1.x1) || (c1.x2 > c2.x1 && c1.x2 < c2.x2)
        c1.x2 = c2.x2;
      }
    }

    merged.push(c1);
    if (incomplete) {
      console.log({gap, merged});
      console.log(`Part 2: ${(gap * max) + r}`)
      return false;
    }
    return true;
  }


  function run() {
    const sw = new Stopwatch();
    for (let r = 0; r < max; r++) {
      const row = {};
      const coords = [];
      let item;

      for (let j = 0; j < items.length; j++) {
        item = items[j];
        const res = calcLineForRow(r, item.sensor, item.beacon);
        if (res) {
          coords.push(res);
        }
      }

      if (!isFullLine(coords, r)) {
        console.log('row found: ', r);
        console.log(coords);
        break;
      }
      // break;
      // sw.lap(); console.log({row:r})

    //   const xs = Object.keys(row);
    //   const len = xs.length;
    //   if (len < (max+1)) {
    //     console.log({len, r});
    //     const sorted = xs.map(x => parseInt(x)).sort((a,b) => a-b);
    //     let i;
    //     for (i = 0; i < sorted.length; i++) {
    //       if ((sorted[i+1] - sorted[i]) > 1) {
    //         i++;
    //         break;
    //       }
    //     }

    //     console.log('coord', { x: i, y: r })
    //   }
    }

  }

  function count(row) {
    const line = gridLines[row];

    // const vals = {};
    // line.forEach(({x1, x2}) => {
    //   for (let i = x1; i <= x2; i++) {
    //     if (!grid[row][i]) {
    //       vals[i] = 1;
    //     }
    //   }
    // })

    return Object.keys(gridLines[row]).length
  }

  init(data);

  return {
    printGrid,
    run,
    count
  }
}

const df = new DistressFinder(data);
df.run();
// df.printGrid();

// console.log(df.count(calcLine))
// df.printGrid
