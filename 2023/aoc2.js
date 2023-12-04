import { input, test } from './input/aoc2.js';

const part1 = (input) => {
  const lines = input.split('\n');
  const data1 = lines.map((line) => line.split(': ')[1]);
  const games = data1.map((line) => line.split('; ')
    .map(part => part.split(', ')
      .map(part2 => {
        const parts = part2.split(' ');
        return { color: parts[1], qty: parseInt(parts[0], 10) };
      })));

  const maximums = games.map((game) => {
    let maximums = { blue: 0, green: 0, red: 0 };
    game.forEach(draws => {
      draws.forEach(draw => {
        if (maximums[draw.color] < draw.qty) {
          maximums[draw.color] = draw.qty;
        }
      })
    });

    return maximums;
  });

  const params = { red: 12, green: 13, blue: 14 };
  return maximums.reduce((acc, maximum, index) => {
    if (maximum.red <= params.red && maximum.green <= params.green && maximum.blue <= params.blue) {
      acc.part1 += (index + 1);
    }

    acc.part2 += (maximum.red * maximum.green * maximum.blue);
    return acc;
  }, { part1: 0, part2: 0 });
}

const answer = part1(input);
console.log(`Part 1: `, answer.part1);
console.log(`Part 2: `, answer.part2);
