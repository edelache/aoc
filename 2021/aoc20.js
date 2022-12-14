const _ = require('lodash');

const input = `########...#.###.##..#.....#####....#.#...#..##..##.###.....####...#.#..#.###...#.#.##...#..##.###..##......##....##....#.#..#...##.###..#.#.#####..##.##....#.#####.#.######...#.####....#.#.####..#.####.#.#..##......#....#.##...#...#...#......#...#...#.#.....###..#.##..#...####.##....#.#.#...##...####.#####.####.###.##.###.##...#.#.#...###.######....#.#.#.#..#.#....#####.#.##...##...##...##...#.#.#####.#...#.#######..#...##..#..#...#..####....###..#..##.##..#.#.##...#####......#.#.###.####...#.#.###.#.##.#.

###....###.#.#####.#..#..#.##...##.#.##.#..##..####..##....#.##.###..##....#####.#..#.######.#.#.##.
.##....######....#..#....###.#..##.#...##..#..#####..#.###...####.####...#.######.#.#.##.####.#.####
#.......#..#.#.##.##.##.#.##..###...###.#.#..#####...#..####.###..#.#..#.###.#..#..#.###.##..#...##.
....#......####.#...#.##.#..##....####.#.....####.#..##..#...#.##...#.#.##..##......#....#..#.##....
####..#.#....#...#.######.#.####.#.####.#####..###...##.#.###.##...##.........#.##.#..###..#.##...##
.##..#.#..#...#####.......#.##.#....###.#..###..##.##.#....###.##.#.#..##..#.#.....#.#.###...###.#..
..#.##.#...#.#..#.##.##..#.##.#...###..##..#.#..#..##..#.#.###.##.##...##.###....#.###...#.###..#...
####....#######.#.#..#..###......##..###.#.#.#.#.#..###.##...###.##.##..##.#..#.#.##..#..#..###..#.#
..##..###.##......###.####.#....##.##.#..#..#...#.####......###.#.##.#..#.##.......#..#...#..###.###
##.##.##..#.##..#..#..##.###..###..#.##.###.#...####.#.#......###........##.#.#######.#.#...###.##.#
.##.#...#..###.###..###.##.##.#..##.#.#.#...#....######.#...#.....##...##.#.#....###.###....#.#.##..
##...#..#.#.#.#.#.###.....#....##.##.#.##.##...#.#.#.#.#...#....####..##..#.####........#...#.##....
.#.#####.#...###.###..##.##.##..#...###.##.#.#..#..#.#.###..#.###..#.#..####..#......####.#.#....###
##.#####.#...#..#..##..###.##.##..#.......#.####.#.#..####..###.....###.....#..#..#..#.##....####...
.##.##.#.#..##..####...#..#..#..#.#.#.#.####.####.#####.....#.#.##..#...#.###.#.....#..####.#.##.###
###.#.....#..#..##........#.#..##....##.###..#.#..#..#.#####..##.#.###..##.#######...#..#.....##.###
.##.##..##..##..##..####.##.#..##..####.##.##.#.##..#.##.###..#.##.#...#.###..#.#.###.#####..#.#.#..
...#.#...#..#...#....####.....##...###...#..######.##..##.##..###...#..###..###.##..####.###.###.#..
##.#..##....#.#.##..##......#..##.....##.##..#.##...##.##.#####.#....#.#..#...#.#....#.###...###....
.#.#......##.#...#...###....###...##.#.###.#...#..#######..#######.#....###.#..#.#.#.##....#.#..#.##
###.####...#....#...#####.#.###.#.#.#......##.##..#.#####..#.####.##.##.##..###.##...##..#.##...##..
####.##...##....#..###.#...#.#.#...#..##..##.##.##..#.#.####..#..#.#.#.####......#.###.##.....#...##
.##.##..#.#....######.##......#...#.#.####..#.####.##.##.###.#.#..######.######.#.#...#.######..#...
#....##.#.##.#.###..#####.###.##.#...#..#.#..###.#....#.###..#..#.#..#.###...#.....#..##............
#.#.###..##.###...#..###.#.##.#####.##.#...#...#........#....###.#######..##.#.....#..#.#.###..####.
..####.##..#.##.#.....#....##....#..######.#..#...#......#.##..##.#.#..######..###..##.#.#.###...###
##....#..##.#..#.#....#...###..#.###......##.##.#.#.#..#...###....#.###.##....###.###.#..###..#.###.
##...###.####.#...#.####.##.#...#.##....#.....#.##..##..#####.#.#.......#.#..#...#.##.###.....######
#.###...##..##.##.####....##.#..###########.#..##..#...#.##.###...#...#..##.#.....#.#..##.##...#.#..
....#..##...#.#####.#.####.#..##..###.###..#.#.##..#.#.#.#..#.....##..######.####.#####.#....##..#.#
##..##.#.#.##..#..#....#.#.#..##.###.......#.###..#.#..####...##...#####......####..##.#.#.##.####.#
#####.#.##.#....#.##....#...###.##..##...#...#.###..###..##.###.#.#.#.#...#.#..#.#.##.#.##.######.##
#.##..#.##.#.###.##..#####..#.....#.###..##.#.#.####.###.#....###...#.#..#..##..#.##....#.##.##.###.
.#...##..##.#..#..##.##..#.#.........##.#######...#.#......##########..##.##..#.#.###.....#....#####
##.......#.##.#..#.####..##.#.####.##..#.#....#..#..#.###.#.#.#.##..####..##.##.#..#..#.##..#.##..#.
#######...........#...####.####........##.###.###.#.###.###.##.#.##.#..#.####...###..#..###...##...#
.##......#.####.####..#.#......###.#.##.#####..###.##....#.##..##.#.##.#.#..#####..#.#...#..#.##..##
..#.####..###.#.##.#..##.###..###.#..#...#########...#.....#.##....###....#..#..#.##.#...###..###.##
###.#.##.#.#...#..##.###.#.#...#.##.#..#..#..#.#.#.#..##.#.###.#....#......###..##.#.#.####.##...#.#
.##...........#..#..#.#....##..#.#.###.#.#.###.##.#..##...#...##..###.#......#.##.##...#..##.#......
##..###..##.#..##..##..####...#......###.#.###...#.###..#.#.#..#####....##.###.......###..#.#..##...
##...#.#####.###.#####...#####..#.#..##.#.###..#.###.#..##.#.#..#.##....#....#.#..##.##.###.##..###.
.#....#.##.#..#.#.#.#.##...###..#...#..##.########.....####.#####..#.#..#.#.##....#..#.#..##.##.....
..#...#..###.#.#.#.##.#####.#.#...#...#..###...#...#.#.....##...#.###.#...###.....#..#.####.#.###.##
.#...##..#...#..#.#.#..######..##.....#######.####......##.#.##.#..##..#.##....#...##.###..###.#....
.#..#..###.####..#.##.###......####...#####...#..#.#.####..#..####.#.####..#..##.##.#.#...###...##.#
######.#....#.#......#..#..#....#.###...##..#.#.##.##.#.##.##.##.#..#.##.#.##.##...#.####.#.##...###
..####.#####.###.###.##..##..#..#..########..##.####..#..#..##.####.##.####.###....##..#..###...#..#
##.#....####.#..#...##...#..#..#.#..#.#.####...###.#.###.###...#..#.####.####.#......####.#####..#..
...#...#....##..#...#....###.....#.#...#.##.#######.....#..#.#.#...#..#.###.##.###....#...#.##.....#
##.#.#.#########...##.#########.#....#.#..#.##...##......#.##..###.####.#.#.#...#.##.##..##.##.##.##
.............#.#.#..##.#..#.#.####..#..###.###.##.#.#.###.#..#.#..#...###..###.##......#.###.###..##
..##.#.....#..###..##.#...###...###..##.#####...#.#.#.#...##.#.....###.####...####.##......#.#.#...#
##.#...#.......###...##..#.#..#..###...###..##......#.#.#...##..###...#..#.#..##.#...#..###.##..#.##
#...#.###.#..#...###..#.###.#####..##.###..#.##.##....####.#.##########..#####.###.###...##.#..##.#.
.#.#.#...#.#.#..#...##....#.#...###.#.#####.#.##.#....##..#.#..#..##..#..#........###..#..#.......##
####.##...#....#####...##.###.#...###..##....#....#.#.###..##.##.#....#...###..#####.##.#..###.##.##
..##..#.#.#.##.#.....#.#.....#.##..#.#.#..#.##.#..####.#...#.###.#...#####.##...###..#.#.#.#####.#..
#.###.##....##..#.##.#...#..###...#...#.......###...#.#..##...###.#.#.###..#.#####.#.###.##.#.####..
.#.###..##...#...####.##.##.##...#..#.#...#...#...#..##.###......#.#...#.#.#.#....#.#..#.##.#.####.#
.##########.#..#.##..#.###..#####.#..##.#......#.####..##.#.####.####.####....###.###.###...#.#..#..
#..##.###..#########......#..#.#.#..#.#.##...#.##.#...#.#.#.#...#.....##.#..#.######.###....#.#...#.
.##..#..##.#..#..####.#....##....###...#.####....############.#.......#.#.##.#...###.##.#...####.#..
#...#######..###..##......#....##....#.###.##..#.#.#.###.#.#.#.#.....##.#.#...####..#.#...#.#.#####.
..##.#.#...###....###..##.#######.#...##.#.#####.......#.#..##.#.#...##..##.#.#####..####....##..##.
#######.#.#.##.#.###..###.##..#.#.#.#..#...#...##..#...###..##.##..#.###.......##..##...#...#.#.##.#
#..#..#.###.#..#....##....#..####....#####.....##.##########.##.#...#..#.#.#.#.#.#.#.#.###..###..#..
.....##...##....#.....#.###..#.##.#..##...#..#.#####.##....####..##..##.##......#.#.#....###.#.#.##.
#..##....###...#.#.#...#.##......#.#####..#....#.#..#..#####.#.##..##.########.....#.#...#.########.
#.####...#....##..#.###....###.#......#..#..####.#.####.#...###.#..####...#....###...#.#..##.##..#..
....#.###....#...##......##.###.#####..##...######.##...#.#...#...#.###..#######.#####...#.#.####..#
.##.#.#..#..#.#.####..###.##....#...#.####..##.#...#..#.##..#.#.#...##.#...#..##.#..#####...#..##...
##.#..######.##..#.#.#...#.#.##....#...#.###...#####..#.#.....#...#.##..#...####.#..###.#.##.#.#..##
#.#..#.#...#.....#.##.###.#..#.###.#.#..###..##.#......#..#..##.....###.#...#.....##.#..###..##..#..
#.####.#.##.##..######.#.###...###.###...#.##......#..####...###..#..#.#.##.#....#####..##..##.#....
..##..#.#..#.####.#####.##.######.###..##.#.###.#...###.#.##..#.###.#########..##.#.#.#..#...###.###
##..#####.##.....#...###..####.##.#...#..#....###......##...#..#.#...##.#..###...#.#.#..##.##.#.#.##
#...#....#...###.##..##.#.##.......###.##.###..#.##.#.#.#...#..####.####.##.....##......##.##..###.#
..#...#...###.#.##.##.##.#.##...####..#..##..#..####.#.#..####...###.#.#...#..#..#.#....#.#.##.###.#
.###.#.#.##.......##...#.####.#.######.#..##....#.#.....#..#.#..####...#.#..##.....#.#.#.......##..#
########.#.####...###.#...##.#..##.#.#.#####.#...#...#.####...#####..#.###.....##...#..###.##...#.##
...#.....#..####......###.##.##.###.#.#.#..###..##..##########.###.######.###....#.#..######.###...#
##....#.#......#..##.###.#..#.....###.##.###.####..#.#...#..#####.#..##.#....##...#..##....#.###.#.#
.#.#...#..##..##.###.#...#.#.........###.#.#....#..#...#.###.####...#.#...#.....#...#####.###..#..#.
#...#.###......######.#...#.##.#.#.##.....####..#..##.##..##.#.###........###..####.######.#....#...
..####......##.#..#..#...#.###.######...####..##...#..###.##.#.######.#.##..#.##.##.##...####.#.....
..#.#.##..#.###..##.##.#.#.#.#.##....#.#.###..#.###.....#.#..########..##......##.#..###...#.##.##..
..#.....##..##.#..#.#..#..#.##..#.###..#..##.#..#.#..#..##.#.##..########.###.#.##.....#...#...#.###
...#..######..####......#..#............#.#..#.##..###.#...##....#..#..#.#.###.###.#..##...#.#......
...#.........#..##.##..#........#..#.##.....#...#.###.#.###.#.##.#####..#.##.#...#.###.###.#...#....
#..#####.##..####..###.#....#..#...#.####...#..#..##.#.###..##...###.#.#...##.#..####.#.#.#..##.#..#
..#..#...#.##.#.#.##.###...##..##.##.###...###.#..###...##.#..##.####....###.###..#.#..#.###.#.....#
.#.#.#.#....###.#..#..########.##.###..#.#.##..##..##.######...##.##..#.#.####.#.#####.#..#.##.####.
.##.#.##.##.#..#####..#.##..#.#.###..#..#..##...#.#.###.#.#.#...#..####.###.#........###.##..#...##.
.#.#####.#..##..##..##.#.#.#####.#.#.....#.#.#..#...#.#.#.####..#.#..#########...####..###.#...#.#..
.##..#..#.#.##.#.##..##.#.#..######..#..##..##...####.#.##..#.##.#..####.#.###...####..##...#.##..##
#..#.###..####.#####.#.#..#.##.##.##.##......#.#.###...#.........###...#.#.#.###.####.#..######..#.#
#.##########.#.##.##....#..#.######.####.#.####.##.####.##...###...#######.#..#.##..###.##..######..
....#.....#..###.......##.#...####...#.#..##.#..###..###...#...###.#..###.#.#.##.#.#.##.#....#...#..
..##...#.#.#.####.#..#.####...#...###.#..###..#.###.####....#.#....#...##...#.#.#....##.#.#.##....##`;

const testInput = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

const [algorithm, dataRaw] = testInput.split('\n\n');
const data = dataRaw.split('\n').reduce((acc, d, y) => {
  acc[y] = d.split('').reduce((a2, val, x) => {
    a2[x] = val;
    return a2;
  }, {})
  return acc;
}, {});

// const dirs = {
//   1: [1, 1],
//   2: [1, 0],
//   4: [1, -1],
//   8: [0, 1],
//   16: [0, 0],
//   32: [0, -1],
//   64: [-1, 1],
//   128: [-1, 0],
//   256: [-1, -1],
// };

const dirs = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, 1],
  [0, 0],
  [0, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];


let minY = 0;
let minX = 0;
let maxY = Object.keys(data).length;
let maxX = Object.keys(data[0]).length;

function enhance(image) {
  minY--;
  minX--;
  maxY++;
  maxX++;

  const newImage = {};
  console.log(minY, maxY)
  for (let y = minY; y <= maxY; y++) {
    newImage[y] = {};
    for (let x = minX; x <= maxX; x++) {
      const val = dirs.reduce((acc, dir, bit) => {
        return acc + ((image[y+dir[0]] && image[y+dir[0]][x+dir[1]] === '#') ? Math.pow(2, bit) : 0);
      }, 0);
      // const val = Object.keys(dirs).reduce((acc, bit) => {
      //   const dir = dirs[bit];
      //   return acc + (((image[y+dir[0]] && image[y+dir[0]][x+dir[1]] === '#')) ? parseInt(bit) : 0);
      // }, 0);
      if (!algorithm[val]) {
        console.log('uh oh', val)
      }
      newImage[y][x] = algorithm[val];
    }
  }

  return newImage;
}

function countPixels(image) {
  let count = 0;
  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      if (image[y][x] === '#') {
        count++;
      }
    }
  }
  return count;
}

function printImage(image) {
  for (let y = minY; y < maxY; y++) {
    let str = '';
    for (let x = minX; x < maxX; x++) {
      str += (image[y][x] === '#') ? '#' : '.';
    }
    console.log(str);
  }
}

// printImage(data);
// console.log('')
let img = enhance(data);
printImage()
img = enhance(img);

console.log(countPixels(img));
printImage(img);
