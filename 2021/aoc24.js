const _ = require('lodash');

const main = `inp w
mul x 0
add x z
mod x 26
div z 1
add x 11
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 14
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 13
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -2
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y`;


const p1 = `inp x
mul x -1`;

const p2 = `inp z
inp x
mul z 3
eql z x`;

// let stack;
// let stackPointer = 0;

function parseProgram(prg) {
  return prg.map(line => line.split(' '))
    .reduce((acc, vals) => {
      acc.push({
        fn: vals[0],
        a: vals[1],
        b: (vals.length < 3) ? null : (isNaN(vals[2]) ? vals[2] : parseInt(vals[2], 10))
      })
      return acc;
    }, []);
}

const functions = {
  // 'inp': (a, b) => {
  //   return b;
  // },
  'add': (a, b) => {
    return a + b;
  },
  'mul': (a, b) => {
    return a * b;
  },
  'div': (a, b) => {
    return Math.floor(a / b);
  },
  'mod': (a, b) => {
    return a % b;
  },
  'eql': (a, b) => {
    return (a === b) ? 1 : 0;
  },
}

let registers = {
  w: 0,
  x: 0,
  y: 0,
  z: 0
};

function exec(inst, registers) {
  let b = (typeof inst.b === 'string') ? registers[inst.b] : inst.b;
  // if (inst.fn === 'inp') {
  //   b = stack[stackPointer++];
  // }
  registers[inst.a] = functions[inst.fn](registers[inst.a], b);
}

function cleanInput(dirty) {
  return dirty.split('').map(val => parseInt(val, 10));
}

function runProgram(instructions, registers) {
  instructions.forEach(inst => exec(inst, registers));
  return registers;
}

function initProgram(input) {
  registers = {
    w: input,
    x: 0,
    y: 0,
    z: 0
  };

}



const parts = main.split('inp w\n').map(part => {
  const arr = part.split('\n').reduce((acc, line) => {
    if (line) {
      acc.push(line);
    }
    return acc;
  }, [])
  // arr.unshift('inp w');
  return arr;
});
parts.shift();

const programs = parts.map(part => parseProgram(part))



function smushCode(codeMap) {
  let code = '';;
  for (let i = 0; i < 14; i++) {
    if (codeMap[i]) {
      code += codeMap[i].toString();
    } else {
      code += '0';
    }
  }
  return code;
}

const successfulCodes = {};
const attempts = {};

const lowHigh = {
  13: { l: 0, h: 20 },
  12: { l: 0, h: 500 },
  11: { l: 0, h: 12500 },
  10: { l: 0, h: 17600 },
  9: { l: 0, h: 25000 },
  8: { l: 0, h: 25000 },
  7: { l: 0, h: 25000 },
  6: { l: 0, h: 25000 },
  5: { l: 0, h: 25000 },
  4: { l: 0, h: 25000 },
  3: { l: 0, h: 25000 },
  2: { l: 0, h: 25000 },
  1: { l: 0, h: 25000 },
  0: { l: 0, h: 25000 }
}

function recurse(level, target, codeMap) {
  if (!attempts[level]) {
    attempts[level] = {};
  }
  const program = programs[level];
  if (level < 0) {
    const code = smushCode(codeMap);
    successfulCodes[code] = code;
    return;
  }

  for (let i = lowHigh[level].l; i < 1000000; i++) {
    for (let input = 1; input < 10; input += 26) {
      const registers = runProgram(program, {w: input, x: 0, y: 0, z: i});
      if (registers.z === target) {
        const newCodemap = Object.assign({}, codeMap);
        if (!attempts[level][i]) {
          if (level === 13) {
            console.log(input, registers, i)
          }
          attempts[level][i] = 1;
          newCodemap[level] = input;
          recurse(level -1, i, newCodemap);
        }
      }
    }
  }
}

recurse(13, 0, {});

console.log(attempts[13])

const possibles = Object.keys(successfulCodes)
  .map(code => parseInt(code, 10))
  .sort((a, b) => b-a)

console.log(possibles[0], possibles[possibles.length-1]);
