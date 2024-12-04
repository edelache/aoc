import { input, test } from './input/aoc02.js';

const reports = [];

function parseInput(input) {
  const map = input.split('\n')
    .reduce((acc, line) => {
      reports.push(line.split(' ').map(val => parseInt(val)));
    }, {});

}

function part1() {
  let part1 = 0;

  reports.forEach(report => {
    let first = true;
    let prevDiff;

    let safe = true;

    for (let i = 1; i < report.length; i++) {
      let diff = report[i] - report[i-1];
      let abs = Math.abs(diff);
      if (abs < 1 || abs > 3) {
        safe = false;
        break;
      }

      // determine if we have changed direction
      if (!first) {
        if (prevDiff > 0 && diff < 0) {
          safe = false;
          break;
        } else if (prevDiff < 0 && diff > 0) {
          safe = false;
          break;
        }
      }

      first = false;
      prevDiff = diff;

    }

    if (safe) {
      part1++;
    }
  })

  return part1;
}

function part2() {
  let part1 = 0;

  reports.forEach((report, index) => {
    let first = true;
    let prevDiff;

    let safe = true;
    let seenBadLevel = false;
    let dirChange = false;

    for (let i = 1; i < report.length; i++) {
      let diff = (seenBadLevel) ? report[i] - report[i-2] : report[i] - report[i-1];
      let abs = Math.abs(diff);
      if (abs < 1 || abs > 3) {
        if (seenBadLevel) {
          safe = false;
          break;
        }
        seenBadLevel = true;
      }

      // determine if we have changed direction
      if (index === 1) {
        if (prevDiff > 0 && diff < 0) {
          if (dirChange) {
            safe = false;
            break;
          }

          dirChange = true;

        } else if (prevDiff < 0 && diff > 0) {
          if (dirChange) {
            safe = false;
            break;
          }

          dirChange = true;
        }
      }

      first = false;

      if (!dirChange) {
        prevDiff = diff;
      }

    }

    if (safe) {
      part1++;
    }
  })

  return part1;
}


parseInput(test);

const part1answer = part1();
console.log(`Part 1: `, part1answer);

const part2answer = part2();
console.log(`Part 2: `, part2answer);
