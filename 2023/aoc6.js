import { input, test } from './input/aoc6.js';


function part1(input) {
  const lines = input.split('\n').map(val => val.split(':').map(val => val.trim()));
  const batch = [];
  lines.map(line => line.shift());
  lines.map(line => line.map(str => {
    const matches = str.match(/\d+/g).map(match => parseInt(match))
    batch.push(matches);
  }));

  const races = batch[0].reduce((acc, val, i) => {
    acc.push({
      time: batch[0][i],
      distance: batch[1][i]
    });
    return acc;
  }, [])

  races.forEach(race => {
    let winPoint = null;
    for (let i = 0; i < race.time; i++) {
      const diff = race.time-i;
      if (i * diff > race.distance) {
        winPoint = i;
        race.totalWins = race.time - ((i * 2) - 1);
        return;
      }
    }
  });

  return races.reduce((acc, race) => acc * race.totalWins, 1);
}

function part2(input) {
  const lines = input.split('\n').map(val => val.split(':').map(val => val.trim()));
  const batch = [];
  lines.map(line => line.shift());
  lines.map(line => line.map(str => {
    const matches = parseInt(str.replace(/ /g, ''));
    batch.push(matches);
  }));

  const race = {
    time: batch[0],
    distance: batch[1]
  }

  let winPoint = null;
  for (let i = 0; i < race.time; i++) {
    const diff = race.time-i;
    if (i * diff > race.distance) {
      winPoint = i;
      race.totalWins = race.time - ((i * 2) - 1);
      break;
    }
  }

  return race.totalWins;
}


const part1answer = part1(input);
console.log(`Part 1: `, part1answer);

const part2answer = part2(input);
console.log(`Part 2: `, part2answer);
