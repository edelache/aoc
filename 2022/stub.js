const input = {};

input.puzzle = ``;

input.example = ``;


const data = input[process.argv[2]] ? input[process.argv[2]] : input.puzzle;

const lines = data.split('\n');

lines.forEach(line => {
});


console.log(`Part 1: ${data}`)
